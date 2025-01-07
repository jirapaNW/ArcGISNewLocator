///////////////////////////////////////////////////////////////////////////
// Copyright © GIS Co., Ltd. All Rights Reserved.
//
// Licensed under the Apache License Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
///////////////////////////////////////////////////////////////////////////
define([
  "dojo/_base/declare",
  "dojo/_base/lang",
  "dojo/on",
  "dojo/_base/html",
  "jimu/BaseWidget",
  "esri/toolbars/draw",
  "esri/graphic",
  "esri/layers/GraphicsLayer",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol",
  "esri/geometry/geometryEngine",
  "esri/geometry/projection",
  "esri/SpatialReference",
], function (
  declare,
  lang,
  on,
  html,
  BaseWidget,
  Draw,
  Graphic,
  GraphicsLayer,
  SimpleLineSymbol,
  SimpleFillSymbol,
  geometryEngine,
  projection,
  SpatialReference
) {
  var clazz = declare([BaseWidget], {
    name: "MeasurementThai",
    baseClass: "jimu-widget-MeasurementThai",

    drawTool: null,
    measureMode: null,
    currentGeometry: null,

    areaUnits: null,

    distanceUnits: null,

    sqMetersPerRai: 1600,
    sqMetersPerNgan: 400,
    sqMetersPerSqWah: 4,
    metersPerWah: 2,

    startup: function () {
      this.inherited(arguments);
      // Init units
      this.areaUnits = [
        {
          text: this.nls.sqMeters,
          value: "square-meters",
        },
        {
          text: this.nls.sqKilometers,
          value: "square-kilometers",
        },
        {
          text: this.nls.rai + "-" + this.nls.ngan + "-" + this.nls.sqWah,
          value: "rai",
        },
      ];
      this.distanceUnits = [
        {
          text: this.nls.meters,
          value: "meters",
        },
        {
          text: this.nls.kilometers,
          value: "kilometers",
        },
        {
          text: this.nls.miles,
          value: "miles",
        },
      ];
      // Create Draw Tool if not exists
      if (!this.drawTool) {
        this.drawTool = new Draw(this.map);
        this.own(
          on(
            this.drawTool,
            "draw-complete",
            lang.hitch(this, this._onDrawComplete)
          )
        );
      }
      // Create graphics layer if not exists
      if (!this.map.getLayer("layerMeasurementThai")) {
        const layer = new GraphicsLayer({ id: "layerMeasurementThai" });
        this.own(
          on(
            layer,
            "graphics-clear",
            lang.hitch(this, function () {
              console.log("Clearing all drawings from MeasurementThai...");
              this.currentGeometry = null;
              this.txtResult.innerHTML = "";
              this.measureMode = null;
              html.attr(this.divUnit, "style", "display: none");
              html.attr(this.txtResult, "style", "visibility: hidden");
              html.attr(this.btnClearResult, "disabled", true);
              html.removeClass(this.btnAreaTool, "active");
              html.removeClass(this.btnDistanceTool, "active");
            })
          )
        );
        this.map.addLayer(layer);
      }
    },

    _initUnitList: function () {
      this.selectUnit.innerHTML = "";
      if (this.measureMode === "area") {
        this.areaUnits.forEach((unit) => {
          this.selectUnit.innerHTML +=
            '<option value="' + unit.value + '">' + unit.text + "</option>";
        });
      }
      if (this.measureMode === "distance") {
        this.distanceUnits.forEach((unit) => {
          this.selectUnit.innerHTML +=
            '<option value="' + unit.value + '">' + unit.text + "</option>";
        });
      }
      html.attr(this.divUnit, "style", "display: block");
    },

    _activateAreaMeasurement: function () {
      if (this.measureMode === "area") return;

      const layer = this.map.getLayer("layerMeasurementThai");
      layer.clear();

      this.measureMode = "area";
      this.currentGeometry = null;
      this.txtResult.innerHTML = "";
      html.addClass(this.btnAreaTool, "active");
      html.removeClass(this.btnDistanceTool, "active");
      html.attr(this.txtResult, "style", "visibility: hidden");
      html.attr(this.btnClearResult, "disabled", true);
      this.drawTool.activate(Draw.POLYGON);
      this._initUnitList();
    },

    _activateDistanceMeasurement: function () {
      if (this.measureMode === "distance") return;

      const layer = this.map.getLayer("layerMeasurementThai");
      layer.clear();

      this.measureMode = "distance";
      this.currentGeometry = null;
      this.map.graphics.clear();
      this.txtResult.innerHTML = "";
      html.removeClass(this.btnAreaTool, "active");
      html.addClass(this.btnDistanceTool, "active");
      html.attr(this.txtResult, "style", "visibility: hidden");
      html.attr(this.btnClearResult, "disabled", true);
      this.drawTool.activate(Draw.POLYLINE);
      this._initUnitList();
    },

    _onDrawComplete: function (evt) {
      this.drawTool.deactivate();
      // Project geometry to supported spatial reference before measuring
      projection.load().then(() => {
        const geometry = projection.project(
          evt.geometry,
          new SpatialReference({ wkid: 4326 })
        );
        this.currentGeometry = geometry;
        this._displayGraphic(geometry);
      });
    },

    _displayGraphic: function (geometry) {
      let symbol;
      if (geometry.type === "polygon") {
        symbol = this.drawTool.fillSymbol;
        this._measureArea(geometry);
      } else if (geometry.type === "polyline") {
        symbol = this.drawTool.lineSymbol;
        this._measureDistance(geometry);
      }

      const graphic = new Graphic(geometry, symbol);

      const layer = this.map.getLayer("layerMeasurementThai");
      layer.add(graphic);
    },

    _measureArea: function (geometry) {
      let area = 0;

      let rai = 0;
      let ngan = 0;
      let sqwah = 0;

      switch (this.selectUnit.value) {
        case "rai":
          area = geometryEngine.geodesicArea(geometry, "square-meters");
          rai = Math.floor(area / this.sqMetersPerRai);
          ngan = Math.floor(
            (area % this.sqMetersPerRai) / this.sqMetersPerNgan
          );
          sqwah = Math.floor(
            ((area % this.sqMetersPerRai) % this.sqMetersPerNgan) /
              this.sqMetersPerSqWah
          );
          break;
        default:
          area = geometryEngine.geodesicArea(geometry, this.selectUnit.value);
      }

      const selectedUnit = this.areaUnits.find(
        (unit) => unit.value == this.selectUnit.value
      );

      if (this.selectUnit.value == "rai") {
        this.txtResult.innerHTML =
          rai.toLocaleString("en-US", { maximumFractionDigits: 2 }) +
          " " +
          this.nls.rai +
          " " +
          ngan +
          " " +
          this.nls.ngan +
          " " +
          sqwah.toLocaleString("en-US", { maximumFractionDigits: 2 }) +
          " " +
          this.nls.sqWah;
      } else {
        this.txtResult.innerHTML =
          area.toLocaleString("en-US", { maximumFractionDigits: 2 }) +
          " " +
          selectedUnit.text;
      }

      html.attr(this.txtResult, "style", "visibility: visible");
      html.attr(this.btnClearResult, "disabled", false);
    },

    _measureDistance: function (geometry) {
      let distance = 0;
      switch (this.selectUnit.value) {
        case "wah":
          distance = geometryEngine.geodesicLength(geometry, "meters");
          distance = distance / this.metersPerWah;
          break;
        default:
          distance = geometryEngine.geodesicLength(
            geometry,
            this.selectUnit.value
          );
      }

      const selectedUnit = this.distanceUnits.find(
        (unit) => unit.value == this.selectUnit.value
      );

      this.txtResult.innerHTML =
        distance.toLocaleString("en-US", { maximumFractionDigits: 2 }) +
        " " +
        selectedUnit.text;

      html.attr(this.txtResult, "style", "visibility: visible");
      html.attr(this.btnClearResult, "disabled", false);
    },

    _clearMeasurement: function () {
      const layer = this.map.getLayer("layerMeasurementThai");
      layer.clear();
    },

    _onUnitChange: function () {
      if (!this.currentGeometry) return;
      if (this.measureMode === "area") this._measureArea(this.currentGeometry);
      if (this.measureMode === "distance")
        this._measureDistance(this.currentGeometry);
    },

    destroy: function () {
      const layer = this.map.getLayer("layerMeasurementThai");
      if (layer) {
        layer.clear();
        this.map.removeLayer(layer);
      }
      if (this.drawTool) this.drawTool = null;
      this.inherited(arguments);
    },
  });
  return clazz;
});
