System.register(["jimu-core","jimu-ui/advanced/setting-components","jimu-ui","jimu-theme","jimu-ui/basic/color-picker","esri/Graphic","jimu-arcgis","jimu-ui/advanced/data-source-selector","jimu-ui/basic/list-tree"],(function(e,t){var i={},a={},s={},n={},o={},l={},r={},c={},d={};return{setters:[function(e){i.DataSourceTypes=e.DataSourceTypes,i.EsriFieldType=e.EsriFieldType,i.Immutable=e.Immutable,i.JimuFieldType=e.JimuFieldType,i.React=e.React,i.classNames=e.classNames,i.css=e.css,i.jsx=e.jsx,i.polished=e.polished},function(e){a.MapWidgetSelector=e.MapWidgetSelector,a.SettingRow=e.SettingRow,a.SettingSection=e.SettingSection},function(e){s.Button=e.Button,s.Icon=e.Icon,s.Label=e.Label,s.NumericInput=e.NumericInput,s.Select=e.Select,s.Switch=e.Switch,s.defaultMessages=e.defaultMessages},function(e){n.styled=e.styled},function(e){o.ColorPicker=e.ColorPicker},function(){},function(){},function(e){c.FieldSelector=e.FieldSelector,c.dataComponentsUtils=e.dataComponentsUtils},function(e){d.List=e.List,d.TreeItemActionType=e.TreeItemActionType}],execute:function(){e((()=>{var e={31027:e=>{e.exports='<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 16 16"><path fill="#000" fill-rule="evenodd" d="M12 6.5c0 .527-.074 1.036-.212 1.518l.912.438a6.5 6.5 0 1 0-6.586 4.533l-.077-1.008A5.5 5.5 0 1 1 12 6.5m-9 0a3.5 3.5 0 0 0 2.88 3.445L5.8 8.901a2.501 2.501 0 1 1 3.194-2.224l.949.456A3.5 3.5 0 1 0 3 6.5M15.5 11l-5 1-3 4-1-9.5zm-5.57.094-1.702 2.269-.542-5.152 4.76 2.38z" clip-rule="evenodd"></path></svg>'},27132:e=>{e.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4IiBoZWlnaHQ9IjcyIiB2aWV3Qm94PSIwIDAgMTA4IDcyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHJlY3QgeD0iOCIgeT0iOCIgd2lkdGg9IjkyIiBoZWlnaHQ9IjU2IiBmaWxsPSIjMjgyODI4Ii8+DQo8cmVjdCB4PSIxMyIgeT0iNDAiIHdpZHRoPSI1MyIgaGVpZ2h0PSI2IiBmaWxsPSIjNkE2QTZBIi8+DQo8cmVjdCB4PSIxMyIgeT0iMzIiIHdpZHRoPSI4MSIgaGVpZ2h0PSIxIiBmaWxsPSIjNDQ0NDQ0Ii8+DQo8cmVjdCB4PSIxMyIgeT0iNTIiIHdpZHRoPSI4MSIgaGVpZ2h0PSI2IiBmaWxsPSIjNkE2QTZBIi8+DQo8cmVjdCB4PSIxMyIgeT0iMTQiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjIiIGZpbGw9IiM2QTZBNkEiLz4NCjxyZWN0IHg9IjI5IiB5PSIxNCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzZBNkE2QSIvPg0KPHJlY3QgeD0iNDUiIHk9IjE0IiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHJ4PSIyIiBmaWxsPSIjNkE2QTZBIi8+DQo8cmVjdCB4PSI2MSIgeT0iMTQiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjIiIGZpbGw9IiM2QTZBNkEiLz4NCjxyZWN0IHg9Ijc3IiB5PSIxNCIgd2lkdGg9IjEiIGhlaWdodD0iMTIiIGZpbGw9IiM0NDQ0NDQiLz4NCjxyZWN0IHg9IjgyIiB5PSIxNCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzZBNkE2QSIvPg0KPC9zdmc+DQo="},55677:e=>{e.exports="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4IiBoZWlnaHQ9IjcyIiB2aWV3Qm94PSIwIDAgMTA4IDcyIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPg0KPHJlY3QgeD0iOCIgeT0iMjYiIHdpZHRoPSI5MiIgaGVpZ2h0PSIyMCIgZmlsbD0iIzI4MjgyOCIvPg0KPHJlY3QgeD0iMTQiIHk9IjMwIiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHJ4PSIyIiBmaWxsPSIjNkE2QTZBIi8+DQo8cmVjdCB4PSIzMCIgeT0iMzAiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjIiIGZpbGw9IiM2QTZBNkEiLz4NCjxyZWN0IHg9IjQ2IiB5PSIzMCIgd2lkdGg9IjEyIiBoZWlnaHQ9IjEyIiByeD0iMiIgZmlsbD0iIzZBNkE2QSIvPg0KPHJlY3QgeD0iNjIiIHk9IjMwIiB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIHJ4PSIyIiBmaWxsPSIjNkE2QTZBIi8+DQo8cmVjdCB4PSI3OCIgeT0iMzAiIHdpZHRoPSIxIiBoZWlnaHQ9IjEyIiBmaWxsPSIjNDQ0NDQ0Ii8+DQo8cmVjdCB4PSI4MyIgeT0iMzAiIHdpZHRoPSIxMiIgaGVpZ2h0PSIxMiIgcng9IjIiIGZpbGw9IiM2QTZBNkEiLz4NCjwvc3ZnPg0K"},22089:e=>{"use strict";e.exports=l},62686:e=>{"use strict";e.exports=r},79244:e=>{"use strict";e.exports=i},1888:e=>{"use strict";e.exports=n},14321:e=>{"use strict";e.exports=s},13089:e=>{"use strict";e.exports=c},79298:e=>{"use strict";e.exports=a},54337:e=>{"use strict";e.exports=o},98640:e=>{"use strict";e.exports=d}},t={};function m(i){var a=t[i];if(void 0!==a)return a.exports;var s=t[i]={exports:{}};return e[i](s,s.exports,m),s.exports}m.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return m.d(t,{a:t}),t},m.d=(e,t)=>{for(var i in t)m.o(t,i)&&!m.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},m.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),m.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},m.p="";var p={};return m.p=window.jimuConfig.baseUrl,(()=>{"use strict";m.r(p),m.d(p,{__set_webpack_public_path__:()=>we,default:()=>De});var e,t,i,a,s,n=m(79244),o=m(79298),l=m(14321);!function(e){e.Panel="PANEL",e.Toolbar="TOOLBAR"}(e||(e={})),function(e){e.Distance="DISTANCE",e.Time="TIME"}(t||(t={})),function(e){e.ft="FT",e.m="M"}(i||(i={})),function(e){e.sec="S"}(a||(a={})),function(e){e.DD="DD",e.DMS="DMS"}(s||(s={}));var r=m(1888),c=m(54337),d=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(a=Object.getOwnPropertySymbols(e);s<a.length;s++)t.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(e,a[s])&&(i[a[s]]=e[a[s]])}return i};const g=r.styled.div`
  position: relative;
  .mask {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`,u=n.React.forwardRef(((e,t)=>{const{disabled:i}=e,a=d(e,["disabled"]);return n.React.createElement(g,{ref:t},i&&n.React.createElement("div",{className:"mask"}),n.React.createElement(c.ColorPicker,Object.assign({},a)))})),h="Arrangement",I="Panel",f="Bar",y="General settings",j="Highlight location",S="Symbol color",b="Show compass orientation",T="Show location accuracy",M="Zoom scale",v="Timeout (second)",x="Select fields",N="Default activation",D="Watch location",w="Streaming",C="Manual path tracing",P="Locations",A="Paths",O="Time",L="Distance",k="ft",E="m",R="sec",B=n.React.memo((e=>{const t=e.intl.formatMessage({id:"symbolColorTips",defaultMessage:S}),i=e.intl.formatMessage({id:"compassOrientationTips",defaultMessage:b}),a=e.intl.formatMessage({id:"locationAccuracyTips",defaultMessage:T}),{symbolColor:s,showCompassOrientation:r,showLocationAccuracy:c}=e.highlightInfo;return(0,n.jsx)(n.React.Fragment,null,(0,n.jsx)("div",{className:"highlight-info-section"},(0,n.jsx)(o.SettingRow,{label:t,className:"bold-font-label"},(0,n.jsx)(u,{className:"",color:s,onChange:t=>{e.onHighlightInfoChange(Object.assign(Object.assign({},e.highlightInfo),{symbolColor:t}))}})),(0,n.jsx)(o.SettingRow,{label:i,className:"bold-font-label"},(0,n.jsx)(l.Switch,{checked:r,onChange:()=>{e.onHighlightInfoChange(Object.assign(Object.assign({},e.highlightInfo),{showCompassOrientation:!r}))},"aria-label":i})),(0,n.jsx)(o.SettingRow,{label:a,className:"bold-font-label"},(0,n.jsx)(l.Switch,{checked:c,onChange:t=>{e.onHighlightInfoChange(Object.assign(Object.assign({},e.highlightInfo),{showLocationAccuracy:!c}))},"aria-label":a}))))})),H=n.React.memo((e=>{const s=e.intl.formatMessage({id:"streamingTips",defaultMessage:w}),r=e.intl.formatMessage({id:"manualPathTracingTips",defaultMessage:C}),{manualPathTracing:c,streaming:d}=e.watchLocationSettings,m=s=>s===t.Distance?e.intl.formatMessage({id:"streamingDistance",defaultMessage:L}):s===t.Time?e.intl.formatMessage({id:"streamingTime",defaultMessage:O}):s===i.ft?e.intl.formatMessage({id:"distanceFeet",defaultMessage:k}):s===i.m?e.intl.formatMessage({id:"distanceMeters",defaultMessage:E}):s===a.sec?e.intl.formatMessage({id:"timeSec",defaultMessage:R}):void 0;return(0,n.jsx)(n.React.Fragment,null,(0,n.jsx)("div",{className:"highlight-info-section"},(0,n.jsx)(o.SettingRow,{label:s,className:"bold-font-label"}),(0,n.jsx)(o.SettingRow,{className:"streaming-section"},(0,n.jsx)(l.Select,{size:"sm",className:"streaming-type-select",defaultValue:d.type===t.Distance?t.Distance:t.Time,value:d.type,onChange:(s,n)=>{const o=n.props.value===t.Distance?i.ft:a.sec,l=n.props.value===t.Distance?15:5;e.onTrackLocationSettingsChange(Object.assign(Object.assign({},e.watchLocationSettings),{streaming:Object.assign(Object.assign({},e.watchLocationSettings.streaming),{type:n.props.value,interval:l,unit:o})}))}},Object.keys(t).map((e=>(0,n.jsx)("option",{key:e,value:t[e]},m(t[e]))))),(0,n.jsx)(l.NumericInput,{className:"streaming-input",showHandlers:!1,min:0,defaultValue:d.type===t.Distance?15:5,value:d.interval,onAcceptValue:i=>{null===i&&(i=d.type===t.Distance?15:5),e.onTrackLocationSettingsChange(Object.assign(Object.assign({},e.watchLocationSettings),{streaming:Object.assign(Object.assign({},e.watchLocationSettings.streaming),{interval:i})}))}}),(0,n.jsx)(l.Select,{size:"sm",className:"streaming-unit-select",value:d.unit,onChange:(t,i)=>{e.onTrackLocationSettingsChange(Object.assign(Object.assign({},e.watchLocationSettings),{streaming:Object.assign(Object.assign({},e.watchLocationSettings.streaming),{unit:i.props.value})}))}},d.type===t.Distance?Object.keys(i).map((e=>(0,n.jsx)("option",{key:e,value:i[e]},m(i[e])))):Object.keys(a).map((e=>(0,n.jsx)("option",{key:e,value:a[e]},m(a[e])))))),(0,n.jsx)(o.SettingRow,{label:r,className:"bold-font-label"},(0,n.jsx)(l.Switch,{checked:c,onChange:t=>{e.onTrackLocationSettingsChange(Object.assign(Object.assign({},e.watchLocationSettings),{manualPathTracing:!c}))},"aria-label":r}))))}));m(22089),m(62686);const F="Timestamp",Z="Longitude",W="Latitude",Q="Altitude",z="Orientation",G="Speed",J="Accuracy",V="Start Time",_="End Time",$="Average Altitude",U="Average Speed",K="Average Accuracy";var Y;!function(e){e.CREATE="CREATE",e.ADD="ADD",e.DELETE="DELETE",e.UPDATE="UPDATE",e.CLEAR="CLEAR",e.REFRESH="REFRESH"}(Y||(Y={}));const q={jimuName:"ObjectID",name:"ObjectID",type:n.JimuFieldType.Number,esriType:n.EsriFieldType.GUID,alias:"ObjectID"},X={jimuName:"Time",name:"Time",type:n.JimuFieldType.Date,esriType:n.EsriFieldType.Date,alias:"Time",format:{dateFormat:"shortDateLongTime24"}},ee={jimuName:"Longitude",name:"Longitude",type:n.JimuFieldType.Number,esriType:n.EsriFieldType.Double,alias:"Longitude"},te={jimuName:"Latitude",name:"Latitude",type:n.JimuFieldType.Number,esriType:n.EsriFieldType.Double,alias:"Latitude"},ie={jimuName:"Altitude",name:"Altitude",type:n.JimuFieldType.Number,esriType:n.EsriFieldType.Double,alias:"Altitude"},ae={jimuName:"Orientation",name:"Orientation",type:n.JimuFieldType.Number,esriType:n.EsriFieldType.Double,alias:"Orientation"},se={jimuName:"Speed",name:"Speed",type:n.JimuFieldType.Number,esriType:n.EsriFieldType.Double,alias:"Speed"},ne={jimuName:"Accuracy",name:"Accuracy",type:n.JimuFieldType.Number,esriType:n.EsriFieldType.Double,alias:"Accuracy"},oe={jimuName:"LineId",name:"LineId",type:n.JimuFieldType.Number,esriType:n.EsriFieldType.Integer,alias:"LineID"},le={jimuName:"StartTime",name:"StartTime",type:n.JimuFieldType.Date,esriType:n.EsriFieldType.Date,alias:"StartTime",format:{dateFormat:"shortDateLongTime24"}},re={jimuName:"EndTime",name:"EndTime",type:n.JimuFieldType.Date,esriType:n.EsriFieldType.Date,alias:"EndTime",format:{dateFormat:"shortDateLongTime24"}},ce={jimuName:"AverageAltitude",name:"AverageAltitude",type:n.JimuFieldType.Number,esriType:n.EsriFieldType.Double,alias:"AverageAltitude"},de={jimuName:"AverageSpeed",name:"averageSpeed",type:n.JimuFieldType.Number,esriType:n.EsriFieldType.Double,alias:"AverageSpeed"},me={jimuName:"AverageAccuracy",name:"AverageAccuracy",type:n.JimuFieldType.Number,esriType:n.EsriFieldType.Double,alias:"AverageAccuracy"},pe=(e,t="",i="")=>{const a=((e,t)=>{let i;return X.alias=t.formatMessage({id:"trackTime",defaultMessage:F}),ee.alias=t.formatMessage({id:"trackLongitude",defaultMessage:Z}),te.alias=t.formatMessage({id:"trackLatitude",defaultMessage:W}),ie.alias=t.formatMessage({id:"trackAltitude",defaultMessage:Q}),ae.alias=t.formatMessage({id:"trackOrientation",defaultMessage:z}),se.alias=t.formatMessage({id:"trackSpeed",defaultMessage:G}),ne.alias=t.formatMessage({id:"trackAccuracy",defaultMessage:J}),le.alias=t.formatMessage({id:"trackStartTime",defaultMessage:V}),re.alias=t.formatMessage({id:"trackEndTime",defaultMessage:_}),ce.alias=t.formatMessage({id:"averageAltitude",defaultMessage:$}),de.alias=t.formatMessage({id:"averageSpeed",defaultMessage:U}),me.alias=t.formatMessage({id:"averageAccuracy",defaultMessage:K}),"track"===e?i={[q.jimuName]:q,[X.jimuName]:X,[ee.jimuName]:ee,[te.jimuName]:te,[ie.jimuName]:ie,[ae.jimuName]:ae,[se.jimuName]:se,[ne.jimuName]:ne}:"trackline_point"===e?i={[q.jimuName]:q,[oe.jimuName]:oe,[X.jimuName]:X,[ee.jimuName]:ee,[te.jimuName]:te,[ie.jimuName]:ie,[ae.jimuName]:ae,[se.jimuName]:se,[ne.jimuName]:ne}:"trackline"===e&&(i={[q.jimuName]:q,[le.jimuName]:le,[re.jimuName]:re,[ce.jimuName]:ce,[de.jimuName]:de,[me.jimuName]:me}),i})(i,e);return{label:t,idField:q.jimuName,fields:a}},ge=(e,t,i,a,s)=>{const o=pe(e,i,a),l=t+"__layer";return{id:t,type:n.DataSourceTypes.FeatureLayer,label:i,originDataSources:[],isOutputFromWidget:!0,isDataInDataSourceInstance:!1,schema:o,geometryType:s,layerId:l}};function ue(e,t){const i=e.ref.palette.neutral[300],a=e.ref.palette.neutral[1e3];return n.css`
      font-size: 13px;
      font-weight: lighter;

      .jimu-widget-setting--section {
        padding: 18px 16px;
      }

      .ui-mode-setting {
        display: flex;
      }

      /* ui-mode */
      .ui-mode-card-chooser{
        display: flex;
        align-items: start;

        .ui-mode-card-wapper {
          width: calc((100% - ${10}px - ${8}px) / 2);
        }

        .ui-mode-card-separator {
          width: ${10}px
        }
        .ui-mode-card {
          flex: 1;
          width: 100%;
          background: ${i};
          border: ${2}px solid ${i};
          margin: 0 0 0.5rem 0;

          .jimu-icon {
            margin: 0
          }
        }
        .ui-mode-card.active {
          border: ${2}px solid #00D8ED;
          background-color: ${i} !important;
        }
        .ui-mode-label {
          overflow: hidden;
          text-align: center;
        }
      }

      .placeholder-container{
        height: calc(100% - 180px);

        .placeholder{
          flex-direction: column;

          .icon{
            color: var(--ref-palette-neutral-800);
          }
          .hint{
            font-size: ${t.rem(14)};
            font-weight: ${e.ref.typeface.fontWeightBold}!important;
            color: var(--ref-palette-neutral-1000);
            max-width: ${t.rem(160)};
          }
        }

      }
      /* labels */

      .setting-label{
        font-weight: ${e.ref.typeface.fontWeightRegular};
        color:${e.ref.palette.neutral[1100]};
        letter-spacing: 4px;
      }

      /* zoom scale */
      .zoom-scale-input{
        max-width:40%;
        height: 26px!important;
        .jimu-numeric-input-input{
          height: 26px!important;
          line-height: 26px!important;
        }
      }
      .highlight-info-section{
        margin-top: 16px;
        margin-bottom: 16px;
        .bold-font-label{
          font-weight:${e.ref.typeface.fontWeightMedium}!important ;
          color: ${a} !important;
        }
        .streaming-section{
          display: flex;
          justify-content: space-between;
          align-items: center;
          .streaming-input{
            height: 26px!important;
            margin:0 0.5rem;
            .jimu-numeric-input-input{
              height: 26px!important;
              line-height: 26px!important;
            }
          }
          .streaming-type-select{
            width: 6rem;
          }
          .streaming-unit-select{
            width: 4rem;
          }
        }
      }
      .selected-fields-con{
            margin-top: 0;
            .selected-fields-list {
              flex: 1;
              max-height: 265px;
              overflow-y: auto;
            }
            .jimu-tree-item{
              background: ${e.ref.palette.neutral[300]};
              border-bottom: 1px solid ${e.ref.palette.neutral[400]};
              .jimu-tree-item__content{
                div:first-of-type{
                  padding-left: 2px;
                }
                .jimu-tree-item__body{
                  background: ${e.ref.palette.neutral[300]};
                }
              }
            }
      }
  `}const he=!1,Ie=e.Panel,fe={TYPE:t.Distance,UNIT:i.ft,INTERVAL:15};var ye;!function(e){e[e.Time=0]="Time",e[e.Longitude=1]="Longitude",e[e.Latitude=2]="Latitude",e[e.Altitude=3]="Altitude",e[e.Orientation=4]="Orientation",e[e.Speed=5]="Speed",e[e.Accuracy=6]="Accuracy"}(ye||(ye={}));const je=["Time","Altitude","Orientation","Speed","Accuracy","Latitude","Longitude"];var Se=m(31027),be=m.n(Se),Te=function(e,t){var i={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(i[a]=e[a]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var s=0;for(a=Object.getOwnPropertySymbols(e);s<a.length;s++)t.indexOf(a[s])<0&&Object.prototype.propertyIsEnumerable.call(e,a[s])&&(i[a[s]]=e[a[s]])}return i};const Me=e=>{const t=window.SVG,{className:i}=e,a=Te(e,["className"]),s=(0,n.classNames)("jimu-icon jimu-icon-component",i);return t?n.React.createElement(t,Object.assign({className:s,src:be()},a)):n.React.createElement("svg",Object.assign({className:s},a))};var ve=m(13089),xe=m(98640),Ne=function(e,t,i,a){return new(i||(i=Promise))((function(s,n){function o(e){try{r(a.next(e))}catch(e){n(e)}}function l(e){try{r(a.throw(e))}catch(e){n(e)}}function r(e){var t;e.done?s(e.value):(t=e.value,t instanceof i?t:new i((function(e){e(t)}))).then(o,l)}r((a=a.apply(e,t||[])).next())}))};class De extends n.React.PureComponent{constructor(e){var t;super(e),this.trackPointOutId=this.props.id+"_track_ouput",this.trackLinePointOutId=this.props.id+"_trackline_point_ouput",this.trackLinePointLabel=this.props.intl.formatMessage({id:"trackDsLabel",defaultMessage:P}),this.trackPointOutLabel=this.props.intl.formatMessage({id:"trackDsLabel",defaultMessage:P}),this.crateDataSources=e=>Ne(this,void 0,void 0,(function*(){if(e){const e=this.props.id+"_trackline_ouput",t=this.props.intl.formatMessage({id:"trackLineDsLabel",defaultMessage:A}),i=ge(this.props.intl,this.trackLinePointOutId,this.trackLinePointLabel,"trackline_point","esriGeometryPoint"),a=ge(this.props.intl,e,t,"trackline","esriGeometryPolyline");this.props.onSettingChange({id:this.props.id,useDataSources:[]},[i,a])}else{const e=ge(this.props.intl,this.trackPointOutId,this.trackPointOutLabel,"track","esriGeometryPoint");this.props.onSettingChange({id:this.props.id,useDataSources:[]},[e])}})),this.handleMapWidgetChange=e=>{var t;const i=!!(null==e?void 0:e[0]);this.setState({isSelectedMap:i}),this.props.onSettingChange({id:this.props.id,useMapWidgetIds:e}),i&&this.crateDataSources(null!==(t=this.props.config.watchLocation)&&void 0!==t?t:he)},this.handleArrangementChange=e=>{this.props.onSettingChange({id:this.props.id,config:this.props.config.set("arrangement",e)})},this.handleShowAdvancedSettingClick=()=>{this.setState({isShowAdvancedSetting:!this.state.isShowAdvancedSetting})},this.handleHighlightLocationChange=e=>{this.props.onSettingChange({id:this.props.id,config:this.props.config.set("highlightLocation",e)})},this.handleHighlightInfoChange=e=>{this.props.onSettingChange({id:this.props.id,config:this.props.config.set("highlightInfo",e)})},this.handleZoomScale=e=>{(e<35.2655368||e>591657527)&&(e=5e4),this.props.onSettingChange({id:this.props.id,config:this.props.config.set("zoomScale",e)})},this.handleTimeOut=e=>{(e<1||e>60)&&(e=15),this.props.onSettingChange({id:this.props.id,config:this.props.config.set("timeOut",e)})},this.handleFieldsChange=e=>{this.props.onSettingChange({id:this.props.id,config:this.props.config.set("selectedFields",e.map((e=>e.jimuName)))})},this.onItemUpdated=(e,t)=>{const i=e.map((e=>e.itemStateDetailContent.jimuName));this.props.onSettingChange({id:this.props.id,config:this.props.config.set("selectedFields",i)})},this.handleDefaultActivationTipsChange=e=>{this.props.onSettingChange({id:this.props.id,config:this.props.config.set("defaultActivation",e)})},this.handleTrackLocationChange=e=>{this.crateDataSources(e),this.props.onSettingChange({id:this.props.id,config:this.props.config.set("watchLocation",e)})},this.handleTrackLocationSettingsChange=e=>{this.props.onSettingChange({id:this.props.id,config:this.props.config.set("watchLocationSettings",e)})},this.getSelectorFields=e=>{const t=[];return e&&e.length>0&&e.forEach((e=>{t.push(e.jimuName)})),t},this.state={isSelectedMap:!!(null===(t=this.props.useMapWidgetIds)||void 0===t?void 0:t[0]),isShowAdvancedSetting:!1}}componentDidMount(){var e;(null===(e=this.props.useMapWidgetIds)||void 0===e?void 0:e[0])&&this.setState({isSelectedMap:!0})}componentDidUpdate(e){var t,i,a;(null===(t=e.useMapWidgetIds)||void 0===t?void 0:t[0])!==(null===(i=this.props.useMapWidgetIds)||void 0===i?void 0:i[0])&&this.setState({isSelectedMap:!!(null===(a=this.props.useMapWidgetIds)||void 0===a?void 0:a[0])})}render(){var t,i,a,s,r,c,d,p,g,u,S,b,T,w,C,P,A,O,L;const k={overrideItemBlockInfo:({itemBlockInfo:e},t)=>({name:xe.TreeItemActionType.RenderOverrideItem,children:[{name:xe.TreeItemActionType.RenderOverrideItemDroppableContainer,children:[{name:xe.TreeItemActionType.RenderOverrideItemContent,children:[{name:xe.TreeItemActionType.RenderOverrideItemBody,children:[{name:xe.TreeItemActionType.RenderOverrideItemMainLine,children:[{name:xe.TreeItemActionType.RenderOverrideItemDraggableContainer,children:[{name:xe.TreeItemActionType.RenderOverrideItemDragHandle},{name:xe.TreeItemActionType.RenderOverrideItemChildrenToggle},{name:xe.TreeItemActionType.RenderOverrideItemIcon},{name:xe.TreeItemActionType.RenderOverrideItemTitle},{name:xe.TreeItemActionType.RenderOverrideItemCommands}]}]},{name:xe.TreeItemActionType.RenderOverrideItemDetailLine}]}]}]}]})},E=(null===(t=this.props.outputDataSources)||void 0===t?void 0:t.length)>0?{dataSourceId:null===(i=this.props.outputDataSources)||void 0===i?void 0:i[0],mainDataSourceId:null===(a=this.props.outputDataSources)||void 0===a?void 0:a[0]}:null,R=null!==(s=this.props.config.selectedFields)&&void 0!==s?s:je,F=(null!==(r=this.props.config.watchLocation)&&void 0!==r?r:he)?pe(this.props.intl,this.trackLinePointLabel,"trackline_point"):pe(this.props.intl,this.trackPointOutLabel,"track"),Z=null==R?void 0:R.map((e=>{var t;const i=(null===(t=null==F?void 0:F.fields)||void 0===t?void 0:t[e])||{};return Object.assign(Object.assign({},e),i)})),W=this.props.id+"-uimode-description",Q=this.props.id+"-uimode-0",z=this.props.id+"-uimode-1",G=this.props.intl.formatMessage({id:"selectMapWidget",defaultMessage:l.defaultMessages.selectMapWidget}),J=this.props.intl.formatMessage({id:"selectMapHint",defaultMessage:l.defaultMessages.selectMapHint}),V=this.props.intl.formatMessage({id:"arrangementTips",defaultMessage:h}),_=this.props.intl.formatMessage({id:"panelTips",defaultMessage:I}),$=this.props.intl.formatMessage({id:"toolbarTips",defaultMessage:f}),U=this.props.intl.formatMessage({id:"generalSettingsTips",defaultMessage:y}),K=this.props.intl.formatMessage({id:"highlightLocationTips",defaultMessage:j}),Y=this.props.intl.formatMessage({id:"zoomScaleTips",defaultMessage:M}),q=this.props.intl.formatMessage({id:"timeoutTips",defaultMessage:v}),X=this.props.intl.formatMessage({id:"selectFieldsTips",defaultMessage:x}),ee=this.props.intl.formatMessage({id:"defaultActivationTips",defaultMessage:N}),te=this.props.intl.formatMessage({id:"trackLocationTips",defaultMessage:D});return(0,n.jsx)("div",{css:ue(this.props.theme,n.polished),className:"widget-setting-menu jimu-widget-setting"},(0,n.jsx)(o.SettingSection,{title:G,className:(0,n.classNames)("map-selector-section",{"border-0":!this.state.isSelectedMap})},(0,n.jsx)(o.SettingRow,null,(0,n.jsx)(o.MapWidgetSelector,{onSelect:this.handleMapWidgetChange,useMapWidgetIds:this.props.useMapWidgetIds}))),!this.state.isSelectedMap&&(0,n.jsx)("div",{className:"d-flex placeholder-container justify-content-center align-items-center"},(0,n.jsx)("div",{className:"d-flex text-center placeholder justify-content-center align-items-center "},(0,n.jsx)(Me,{size:48,className:"d-flex icon mb-2"}),(0,n.jsx)("p",{className:"hint"},J))),this.state.isSelectedMap&&(0,n.jsx)(n.React.Fragment,null,(0,n.jsx)(o.SettingSection,{title:V},(0,n.jsx)(o.SettingRow,{role:"group","aria-label":V},(0,n.jsx)("div",{className:"ui-mode-card-chooser"},(0,n.jsx)(l.Label,{className:"d-flex flex-column ui-mode-card-wapper"},(0,n.jsx)(l.Button,{icon:!0,className:(0,n.classNames)("ui-mode-card",{active:(null!==(c=this.props.config.arrangement)&&void 0!==c?c:Ie)===e.Panel}),onClick:()=>{this.handleArrangementChange(e.Panel)},"aria-labelledby":Q,"aria-describedby":W,title:_},(0,n.jsx)(l.Icon,{width:100,height:72,icon:m(27132),autoFlip:!0})),(0,n.jsx)("div",{id:Q,className:"mx-1 text-break ui-mode-label"},_)),(0,n.jsx)("div",{className:"ui-mode-card-separator"}),(0,n.jsx)(l.Label,{className:"d-flex flex-column ui-mode-card-wapper"},(0,n.jsx)(l.Button,{icon:!0,className:(0,n.classNames)("ui-mode-card",{active:(null!==(d=this.props.config.arrangement)&&void 0!==d?d:Ie)===e.Toolbar}),onClick:()=>{this.handleArrangementChange(e.Toolbar)},"aria-labelledby":z,"aria-describedby":W,title:$},(0,n.jsx)(l.Icon,{width:100,height:72,icon:m(55677),autoFlip:!0})),(0,n.jsx)("div",{id:z,className:"mx-1 text-break ui-mode-label"},$))))),(0,n.jsx)(o.SettingSection,{title:U},(0,n.jsx)(o.SettingRow,{label:K,className:"bold-font-label"},(0,n.jsx)(l.Switch,{checked:null===(p=this.props.config.highlightLocation)||void 0===p||p,onChange:e=>{this.handleHighlightLocationChange(e.target.checked)},"aria-label":K})),(null===(g=this.props.config.highlightLocation)||void 0===g||g)&&(0,n.jsx)(B,{theme:this.props.theme,intl:this.props.intl,highlightInfo:null!==(S=null===(u=this.props.config.highlightInfo)||void 0===u?void 0:u.asMutable())&&void 0!==S?S:{symbolColor:"#007AC2",showCompassOrientation:false,showLocationAccuracy:false},onHighlightInfoChange:this.handleHighlightInfoChange}),(0,n.jsx)(o.SettingRow,{label:Y,className:"bold-font-label"},(0,n.jsx)(l.Label,{className:"setting-label"},"1:")," ",(0,n.jsx)(l.NumericInput,{className:"zoom-scale-input",showHandlers:!1,defaultValue:5e4,value:null!==(b=this.props.config.zoomScale)&&void 0!==b?b:5e4,onAcceptValue:this.handleZoomScale})),(0,n.jsx)(o.SettingRow,{label:q,className:"bold-font-label"},(0,n.jsx)(l.NumericInput,{className:"zoom-scale-input",showHandlers:!0,defaultValue:15,value:null!==(T=this.props.config.timeOut)&&void 0!==T?T:15,onAcceptValue:this.handleTimeOut})),(0,n.jsx)(o.SettingRow,{flow:"wrap",label:X,className:"bold-font-label"},(0,n.jsx)(ve.FieldSelector,{useDataSources:E?(0,n.Immutable)([E]):(0,n.Immutable)([]),css:n.css`width: 120px; .jimu-dropdown { width: 100%; }`,"aria-label":X,onChange:this.handleFieldsChange,selectedFields:(0,n.Immutable)(R),isMultiple:!0,isDataSourceDropDownHidden:!0,useDropdown:!0,useMultiDropdownBottomTools:!0,hiddenFields:(0,n.Immutable)([])})),(0,n.jsx)(o.SettingRow,{className:"selected-fields-con"},(0,n.jsx)(xe.List,Object.assign({className:"selected-fields-list",itemsJson:Array.from(Z).map(((e,t)=>({itemStateDetailContent:e,itemExpandIconShown:!1,itemStateExpanded:!1,itemKey:`${t}`,itemStateIcon:ve.dataComponentsUtils.getIconFromFieldType(e.type,this.props.theme),itemStateTitle:e.alias||e.jimuName||e.name,isCheckboxDisabled:!0,itemStateCommands:[]}))),onUpdateItem:(e,t)=>{if(e.updateType===xe.TreeItemActionType.HandleDidDrop){const{itemJsons:e}=t.props,[i,a]=e;this.onItemUpdated(a,+i.itemKey)}},dndEnabled:!0,isMultiSelection:!1},k))),(0,n.jsx)(o.SettingRow,{label:te,className:"bold-font-label"},(0,n.jsx)(l.Switch,{checked:null!==(w=this.props.config.watchLocation)&&void 0!==w?w:he,onChange:e=>{this.handleTrackLocationChange(e.target.checked)},"aria-label":te})),(null!==(C=this.props.config.watchLocation)&&void 0!==C?C:he)&&(0,n.jsx)(H,{theme:this.props.theme,intl:this.props.intl,timeOut:null!==(P=this.props.config.timeOut)&&void 0!==P?P:15,watchLocationSettings:null!==(O=null===(A=this.props.config.watchLocationSettings)||void 0===A?void 0:A.asMutable())&&void 0!==O?O:{manualPathTracing:true,streaming:{type:fe.TYPE,unit:fe.UNIT,interval:fe.INTERVAL}},onTrackLocationSettingsChange:this.handleTrackLocationSettingsChange}),(0,n.jsx)(o.SettingRow,{label:ee,className:"bold-font-label"},(0,n.jsx)(l.Switch,{checked:null!==(L=this.props.config.defaultActivation)&&void 0!==L&&L,onChange:e=>{this.handleDefaultActivationTipsChange(e.target.checked)},"aria-label":ee})))))}}function we(e){m.p=e}})(),p})())}}}));