define(["exports","./index-4ba3e564","./index2-929c934e","./utils-170619d9","esri/request","esri/core/urlUtils","esri/geometry/Point","esri/geometry/Polyline","esri/geometry/Polygon","esri/identity/IdentityManager","esri/core/reactiveUtils","esri/rest/support/Query","esri/core/promiseUtils","esri/portal/PortalItemResource","esri/geometry/support/jsonUtils","esri/Color","esri/layers/FeatureLayer","esri/layers/Layer","esri/symbols/LineSymbolMarker","esri/layers/support/MosaicRule","esri/portal/PortalItem","esri/renderers/SimpleRenderer","esri/symbols/SimpleFillSymbol","esri/symbols/SimpleLineSymbol","esri/symbols/SimpleMarkerSymbol","esri/config","esri/layers/MapNotesLayer","esri/layers/support/Field","esri/renderers/Renderer","esri/rest/support/FeatureSet","esri/rest/support/ParameterValue","esri/core/lang","esri/layers/ImageryLayer","esri/smartMapping/raster/renderers/stretch","esri/layers/support/RasterFunction","esri/rest/support/AlgorithmicColorRamp","esri/rest/support/MultipartColorRamp","esri/rest/geoprocessor","esri/smartMapping/statistics/uniqueValues","esri/rest/support/JobInfo","esri/layers/GroupLayer","esri/core/sql"],(function(e,t,s,i,r,n,o,a,l,c,p,u,y,h,m,d,f,g,A,L,b,I,E,v,x,F,k,C,S,w,R,M,P,q,_,T,U,D,H,j,z,V){"use strict";const G=t.proxyCustomElement(class extends t.H{constructor(){super(),this.__registerHost(),this.__attachShadow(),this.analysisLayerInputActionsClick=t.createEvent(this,"analysisLayerInputActionsClick",7),this.analysisLayerInputActionsClose=t.createEvent(this,"analysisLayerInputActionsClose",7),this.referenceElement=void 0,this.placement="auto",this.open=void 0,this.showSelectFeaturesAction=void 0,this.showFilterFeaturesAction=void 0,this.showResetAction=void 0}async componentWillLoad(){({strings:this.strings}=await s.fetchComponentLocaleStrings(this.hostElement,t.getAssetPath(".")))}emitLayerInputAction(e,t){this.analysisLayerInputActionsClick.emit({action:e,referenceElement:t})}render(){return t.h(t.Host,{key:"9710b6f5f97c9eb45785dcd3e92a4082543a93be"},t.h("calcite-popover",{key:"f35351ff2383baec8934c3a31d9049495c7309c8",autoClose:!0,referenceElement:this.referenceElement,placement:this.placement??"auto",open:this.open,pointerDisabled:!0,focusTrapDisabled:!0,label:""},!0===this.showSelectFeaturesAction?t.h("calcite-action",{key:i.LayerInputActions.Select,textEnabled:!0,text:this.strings.selectFeaturesText,icon:"cursor-marquee",onClick:()=>this.emitLayerInputAction(i.LayerInputActions.Select,this.referenceElement)}):null,!0===this.showFilterFeaturesAction?t.h("calcite-action",{key:i.LayerInputActions.Filter,textEnabled:!0,text:this.strings.filterLayerText,icon:"filter",onClick:()=>this.emitLayerInputAction(i.LayerInputActions.Filter,this.referenceElement)}):null,!0===this.showResetAction?t.h("calcite-action",{key:i.LayerInputActions.Reset,textEnabled:!0,text:this.strings.resetText,icon:"reset",onClick:()=>this.emitLayerInputAction(i.LayerInputActions.Reset,this.referenceElement)}):null,t.h("calcite-action",{key:i.LayerInputActions.Remove,textEnabled:!0,text:this.strings.removeLayerText,icon:"x-circle",onClick:()=>this.emitLayerInputAction(i.LayerInputActions.Remove,this.referenceElement)})))}static get assetsDirs(){return["t9n"]}get hostElement(){return this}static get style(){return":root{--analysis-quarter-spacing:0.25rem;--analysis-half-spacing:0.5rem;--analysis-three-quarter-spacing:0.75rem;--analysis-full-spacing:1rem;--analysis-component-default-width:100%;--analysis-ui-border-input:#d4d4d4;--analysis-label-font-size:var(--calcite-font-size--2);--analysis-popover-content-min-height-s:7.5rem;--analysis-popover-content-min-height-m:8.75rem;--analysis-popover-content-max-height:60vh;--analysis-popover-content-height:45vh}:host{display:block}"}},[1,"analysis-layer-input-actions",{referenceElement:[16],placement:[513],open:[516],showSelectFeaturesAction:[516,"show-select-features-action"],showFilterFeaturesAction:[516,"show-filter-features-action"],showResetAction:[516,"show-reset-action"]}]);function J(){"undefined"!=typeof customElements&&["analysis-layer-input-actions"].forEach((e=>{"analysis-layer-input-actions"===e&&(customElements.get(e)||customElements.define(e,G))}))}J();const N=G,O=J;e.AnalysisLayerInputActions=N,e.defineCustomElement=O,Object.defineProperty(e,"__esModule",{value:!0})}));