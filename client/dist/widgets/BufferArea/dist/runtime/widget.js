System.register(["jimu-core/react","esri/Graphic","esri/geometry/geometryEngine","esri/geometry/Point"], function(__WEBPACK_DYNAMIC_EXPORT__, __system_context__) {
	var __WEBPACK_EXTERNAL_MODULE_react__ = {};
	var __WEBPACK_EXTERNAL_MODULE_esri_Graphic__ = {};
	var __WEBPACK_EXTERNAL_MODULE_esri_geometry_geometryEngine__ = {};
	var __WEBPACK_EXTERNAL_MODULE_esri_geometry_Point__ = {};
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_react__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_esri_Graphic__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_esri_geometry_geometryEngine__, "__esModule", { value: true });
	Object.defineProperty(__WEBPACK_EXTERNAL_MODULE_esri_geometry_Point__, "__esModule", { value: true });
	return {
		setters: [
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_react__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_esri_Graphic__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_esri_geometry_geometryEngine__[key] = module[key];
				});
			},
			function(module) {
				Object.keys(module).forEach(function(key) {
					__WEBPACK_EXTERNAL_MODULE_esri_geometry_Point__[key] = module[key];
				});
			}
		],
		execute: function() {
			__WEBPACK_DYNAMIC_EXPORT__(
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "esri/Graphic":
/*!*******************************!*\
  !*** external "esri/Graphic" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_esri_Graphic__;

/***/ }),

/***/ "esri/geometry/Point":
/*!**************************************!*\
  !*** external "esri/geometry/Point" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_esri_geometry_Point__;

/***/ }),

/***/ "esri/geometry/geometryEngine":
/*!***********************************************!*\
  !*** external "esri/geometry/geometryEngine" ***!
  \***********************************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_esri_geometry_geometryEngine__;

/***/ }),

/***/ "react":
/*!**********************************!*\
  !*** external "jimu-core/react" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = __WEBPACK_EXTERNAL_MODULE_react__;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		__webpack_require__.p = "";
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other entry modules.
(() => {
/*!******************************************!*\
  !*** ./jimu-core/lib/set-public-path.ts ***!
  \******************************************/
/**
 * Webpack will replace __webpack_public_path__ with __webpack_require__.p to set the public path dynamically.
 * The reason why we can't set the publicPath in webpack config is: we change the publicPath when download.
 * */
// eslint-disable-next-line
// @ts-ignore
__webpack_require__.p = window.jimuConfig.baseUrl;

})();

// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*******************************************************************!*\
  !*** ./your-extensions/widgets/BufferArea/src/runtime/widget.tsx ***!
  \*******************************************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   __set_webpack_public_path__: () => (/* binding */ __set_webpack_public_path__),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var esri_Graphic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! esri/Graphic */ "esri/Graphic");
/* harmony import */ var esri_geometry_geometryEngine__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! esri/geometry/geometryEngine */ "esri/geometry/geometryEngine");
/* harmony import */ var esri_geometry_Point__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! esri/geometry/Point */ "esri/geometry/Point");




const BufferArea = ({ jimuMapView, centerPoint }) => {
    const [bufferDistance, setBufferDistance] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(500); // ระยะห่างบัฟเฟอร์ (ค่าเริ่มต้น 500 เมตร)
    const createBuffer = () => {
        if (!jimuMapView || !centerPoint) {
            console.error('Map view or center point is not available');
            return;
        }
        const { view } = jimuMapView;
        // ตรวจสอบและสร้างจุดเริ่มต้น (Point)
        const centerGeometry = new esri_geometry_Point__WEBPACK_IMPORTED_MODULE_3__["default"]({
            longitude: centerPoint.lon,
            latitude: centerPoint.lat,
            spatialReference: view.spatialReference // ใช้ spatial reference เดียวกับแผนที่
        });
        // สร้าง Buffer โดยใช้ geometryEngine
        const bufferGeometry = esri_geometry_geometryEngine__WEBPACK_IMPORTED_MODULE_2__["default"].buffer(centerGeometry, bufferDistance, 'meters');
        // สร้าง Graphic สำหรับบัฟเฟอร์
        const bufferGraphic = new esri_Graphic__WEBPACK_IMPORTED_MODULE_1__["default"]({
            geometry: bufferGeometry,
            symbol: {
                type: 'simple-fill', // สัญลักษณ์แบบพื้นที่
                color: [0, 0, 255, 0.3], // สีฟ้าแบบโปร่งใส
                outline: {
                    color: [0, 0, 255],
                    width: 2
                }
            }
        });
        // ลบกราฟิกเก่า และเพิ่มบัฟเฟอร์ใหม่ในแผนที่
        view.graphics.removeAll();
        view.graphics.add(bufferGraphic);
        // เลื่อนกล้องไปยังพื้นที่บัฟเฟอร์
        view.goTo(bufferGeometry.extent);
    };
    return (react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", { className: "buffer-area-widget" },
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("h4", null, "Buffer Area Widget"),
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("div", null,
            react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("label", null,
                "Buffer Distance (meters):",
                ' ',
                react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("input", { type: "number", value: bufferDistance, onChange: (e) => { setBufferDistance(Number(e.target.value)); } }))),
        react__WEBPACK_IMPORTED_MODULE_0__["default"].createElement("button", { onClick: createBuffer, disabled: !centerPoint }, "Create Buffer!")));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (BufferArea);
function __set_webpack_public_path__(url) { __webpack_require__.p = url; }

})();

/******/ 	return __webpack_exports__;
/******/ })()

			);
		}
	};
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0cy9CdWZmZXJBcmVhL2Rpc3QvcnVudGltZS93aWRnZXQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7O1VDQUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7Ozs7Ozs7Ozs7QUNBQTs7O0tBR0s7QUFDTCwyQkFBMkI7QUFDM0IsYUFBYTtBQUNiLHFCQUF1QixHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsT0FBTzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ05aO0FBRUw7QUFDdUI7QUFFbEI7QUFPdkMsTUFBTSxVQUFVLEdBQThCLENBQUMsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRTtJQUM3RSxNQUFNLENBQUMsY0FBYyxFQUFFLGlCQUFpQixDQUFDLEdBQUcsK0NBQVEsQ0FBQyxHQUFHLENBQUMsRUFBQywwQ0FBMEM7SUFFcEcsTUFBTSxZQUFZLEdBQUcsR0FBRyxFQUFFO1FBQ3hCLElBQUksQ0FBQyxXQUFXLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNqQyxPQUFPLENBQUMsS0FBSyxDQUFDLDJDQUEyQyxDQUFDO1lBQzFELE9BQU07UUFDUixDQUFDO1FBRUQsTUFBTSxFQUFFLElBQUksRUFBRSxHQUFHLFdBQVc7UUFFNUIscUNBQXFDO1FBQ3JDLE1BQU0sY0FBYyxHQUFHLElBQUksMkRBQUssQ0FBQztZQUMvQixTQUFTLEVBQUUsV0FBVyxDQUFDLEdBQUc7WUFDMUIsUUFBUSxFQUFFLFdBQVcsQ0FBQyxHQUFHO1lBQ3pCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyx1Q0FBdUM7U0FDaEYsQ0FBQztRQUVGLHFDQUFxQztRQUNyQyxNQUFNLGNBQWMsR0FBWSwyRUFBcUIsQ0FDbkQsY0FBYyxFQUNkLGNBQWMsRUFDZCxRQUFRLENBQ1Q7UUFFRCwrQkFBK0I7UUFDL0IsTUFBTSxhQUFhLEdBQUcsSUFBSSxvREFBTyxDQUFDO1lBQ2hDLFFBQVEsRUFBRSxjQUFjO1lBQ3hCLE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsYUFBYSxFQUFFLHNCQUFzQjtnQkFDM0MsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUUsa0JBQWtCO2dCQUMzQyxPQUFPLEVBQUU7b0JBQ1AsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUM7b0JBQ2xCLEtBQUssRUFBRSxDQUFDO2lCQUNUO2FBQ0Y7U0FDRixDQUFDO1FBRUYsNENBQTRDO1FBQzVDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxFQUFFO1FBQ3pCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQztRQUVoQyxrQ0FBa0M7UUFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDO0lBQ2xDLENBQUM7SUFFRCxPQUFPLENBQ0wscUVBQUssU0FBUyxFQUFDLG9CQUFvQjtRQUNqQyw2RkFBMkI7UUFDM0I7WUFDRTs7Z0JBQzRCLEdBQUc7Z0JBQzdCLHVFQUNFLElBQUksRUFBQyxRQUFRLEVBQ2IsS0FBSyxFQUFFLGNBQWMsRUFDckIsUUFBUSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsR0FBRyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFDLENBQUMsR0FDOUQsQ0FDSSxDQUNKO1FBQ04sd0VBQVEsT0FBTyxFQUFFLFlBQVksRUFBRSxRQUFRLEVBQUUsQ0FBQyxXQUFXLHFCQUU1QyxDQUNMLENBQ1A7QUFDSCxDQUFDO0FBRUQsaUVBQWUsVUFBVTtBQUVqQixTQUFTLDJCQUEyQixDQUFDLEdBQUcsSUFBSSxxQkFBdUIsR0FBRyxHQUFHLEVBQUMsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2V4Yi1jbGllbnQvZXh0ZXJuYWwgc3lzdGVtIFwiZXNyaS9HcmFwaGljXCIiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC9leHRlcm5hbCBzeXN0ZW0gXCJlc3JpL2dlb21ldHJ5L1BvaW50XCIiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC9leHRlcm5hbCBzeXN0ZW0gXCJlc3JpL2dlb21ldHJ5L2dlb21ldHJ5RW5naW5lXCIiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC9leHRlcm5hbCBzeXN0ZW0gXCJqaW11LWNvcmUvcmVhY3RcIiIsIndlYnBhY2s6Ly9leGItY2xpZW50L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2V4Yi1jbGllbnQvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9leGItY2xpZW50L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly9leGItY2xpZW50Ly4vamltdS1jb3JlL2xpYi9zZXQtcHVibGljLXBhdGgudHMiLCJ3ZWJwYWNrOi8vZXhiLWNsaWVudC8uL3lvdXItZXh0ZW5zaW9ucy93aWRnZXRzL0J1ZmZlckFyZWEvc3JjL3J1bnRpbWUvd2lkZ2V0LnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZXNyaV9HcmFwaGljX187IiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFX2VzcmlfZ2VvbWV0cnlfUG9pbnRfXzsiLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfZXNyaV9nZW9tZXRyeV9nZW9tZXRyeUVuZ2luZV9fOyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV9yZWFjdF9fOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjsiLCIvKipcclxuICogV2VicGFjayB3aWxsIHJlcGxhY2UgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gd2l0aCBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgdG8gc2V0IHRoZSBwdWJsaWMgcGF0aCBkeW5hbWljYWxseS5cclxuICogVGhlIHJlYXNvbiB3aHkgd2UgY2FuJ3Qgc2V0IHRoZSBwdWJsaWNQYXRoIGluIHdlYnBhY2sgY29uZmlnIGlzOiB3ZSBjaGFuZ2UgdGhlIHB1YmxpY1BhdGggd2hlbiBkb3dubG9hZC5cclxuICogKi9cclxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXHJcbi8vIEB0cy1pZ25vcmVcclxuX193ZWJwYWNrX3B1YmxpY19wYXRoX18gPSB3aW5kb3cuamltdUNvbmZpZy5iYXNlVXJsXHJcbiIsImltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0J1xyXG5pbXBvcnQgeyB0eXBlIEppbXVNYXBWaWV3IH0gZnJvbSAnamltdS1hcmNnaXMnXHJcbmltcG9ydCBHcmFwaGljIGZyb20gJ2VzcmkvR3JhcGhpYydcclxuaW1wb3J0IGdlb21ldHJ5RW5naW5lIGZyb20gJ2VzcmkvZ2VvbWV0cnkvZ2VvbWV0cnlFbmdpbmUnXHJcbmltcG9ydCBQb2x5Z29uIGZyb20gJ2VzcmkvZ2VvbWV0cnkvUG9seWdvbidcclxuaW1wb3J0IFBvaW50IGZyb20gJ2VzcmkvZ2VvbWV0cnkvUG9pbnQnXHJcblxyXG5pbnRlcmZhY2UgQnVmZmVyQXJlYVByb3BzIHtcclxuICBqaW11TWFwVmlldzogSmltdU1hcFZpZXcgfCBudWxsIC8vIOC4o+C4seC4miBNYXAgVmlldyDguIjguLLguIEgV2lkZ2V0IEFcclxuICBjZW50ZXJQb2ludDogeyBsYXQ6IG51bWJlciwgbG9uOiBudW1iZXIgfSB8IG51bGwgLy8g4Lij4Lix4Lia4LiI4Li44LiU4Lio4Li54LiZ4Lii4LmM4LiB4Lil4Liy4LiH4LiI4Liy4LiBIFdpZGdldCBBXHJcbn1cclxuXHJcbmNvbnN0IEJ1ZmZlckFyZWE6IFJlYWN0LkZDPEJ1ZmZlckFyZWFQcm9wcz4gPSAoeyBqaW11TWFwVmlldywgY2VudGVyUG9pbnQgfSkgPT4ge1xyXG4gIGNvbnN0IFtidWZmZXJEaXN0YW5jZSwgc2V0QnVmZmVyRGlzdGFuY2VdID0gdXNlU3RhdGUoNTAwKSAvLyDguKPguLDguKLguLDguKvguYjguLLguIfguJrguLHguJ/guYDguJ/guK3guKPguYwgKOC4hOC5iOC4suC5gOC4o+C4tOC5iOC4oeC4leC5ieC4mSA1MDAg4LmA4Lih4LiV4LijKVxyXG5cclxuICBjb25zdCBjcmVhdGVCdWZmZXIgPSAoKSA9PiB7XHJcbiAgICBpZiAoIWppbXVNYXBWaWV3IHx8ICFjZW50ZXJQb2ludCkge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdNYXAgdmlldyBvciBjZW50ZXIgcG9pbnQgaXMgbm90IGF2YWlsYWJsZScpXHJcbiAgICAgIHJldHVyblxyXG4gICAgfVxyXG4gIFxyXG4gICAgY29uc3QgeyB2aWV3IH0gPSBqaW11TWFwVmlld1xyXG4gIFxyXG4gICAgLy8g4LiV4Lij4Lin4LiI4Liq4Lit4Lia4LmB4Lil4Liw4Liq4Lij4LmJ4Liy4LiH4LiI4Li44LiU4LmA4Lij4Li04LmI4Lih4LiV4LmJ4LiZIChQb2ludClcclxuICAgIGNvbnN0IGNlbnRlckdlb21ldHJ5ID0gbmV3IFBvaW50KHtcclxuICAgICAgbG9uZ2l0dWRlOiBjZW50ZXJQb2ludC5sb24sXHJcbiAgICAgIGxhdGl0dWRlOiBjZW50ZXJQb2ludC5sYXQsXHJcbiAgICAgIHNwYXRpYWxSZWZlcmVuY2U6IHZpZXcuc3BhdGlhbFJlZmVyZW5jZSAvLyDguYPguIrguYkgc3BhdGlhbCByZWZlcmVuY2Ug4LmA4LiU4Li14Lii4Lin4LiB4Lix4Lia4LmB4Lic4LiZ4LiX4Li14LmIXHJcbiAgICB9KVxyXG4gIFxyXG4gICAgLy8g4Liq4Lij4LmJ4Liy4LiHIEJ1ZmZlciDguYLguJTguKLguYPguIrguYkgZ2VvbWV0cnlFbmdpbmVcclxuICAgIGNvbnN0IGJ1ZmZlckdlb21ldHJ5OiBQb2x5Z29uID0gZ2VvbWV0cnlFbmdpbmUuYnVmZmVyKFxyXG4gICAgICBjZW50ZXJHZW9tZXRyeSxcclxuICAgICAgYnVmZmVyRGlzdGFuY2UsXHJcbiAgICAgICdtZXRlcnMnXHJcbiAgICApXHJcbiAgXHJcbiAgICAvLyDguKrguKPguYnguLLguIcgR3JhcGhpYyDguKrguLPguKvguKPguLHguJrguJrguLHguJ/guYDguJ/guK3guKPguYxcclxuICAgIGNvbnN0IGJ1ZmZlckdyYXBoaWMgPSBuZXcgR3JhcGhpYyh7XHJcbiAgICAgIGdlb21ldHJ5OiBidWZmZXJHZW9tZXRyeSxcclxuICAgICAgc3ltYm9sOiB7XHJcbiAgICAgICAgdHlwZTogJ3NpbXBsZS1maWxsJywgLy8g4Liq4Lix4LiN4Lil4Lix4LiB4Lip4LiT4LmM4LmB4Lia4Lia4Lie4Li34LmJ4LiZ4LiX4Li14LmIXHJcbiAgICAgICAgY29sb3I6IFswLCAwLCAyNTUsIDAuM10sIC8vIOC4quC4teC4n+C5ieC4suC5geC4muC4muC5guC4m+C4o+C5iOC4h+C5g+C4qlxyXG4gICAgICAgIG91dGxpbmU6IHtcclxuICAgICAgICAgIGNvbG9yOiBbMCwgMCwgMjU1XSxcclxuICAgICAgICAgIHdpZHRoOiAyXHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIFxyXG4gICAgLy8g4Lil4Lia4LiB4Lij4Liy4Lif4Li04LiB4LmA4LiB4LmI4LiyIOC5geC4peC4sOC5gOC4nuC4tOC5iOC4oeC4muC4seC4n+C5gOC4n+C4reC4o+C5jOC5g+C4q+C4oeC5iOC5g+C4meC5geC4nOC4meC4l+C4teC5iFxyXG4gICAgdmlldy5ncmFwaGljcy5yZW1vdmVBbGwoKVxyXG4gICAgdmlldy5ncmFwaGljcy5hZGQoYnVmZmVyR3JhcGhpYylcclxuICBcclxuICAgIC8vIOC5gOC4peC4t+C5iOC4reC4meC4geC4peC5ieC4reC4h+C5hOC4m+C4ouC4seC4h+C4nuC4t+C5ieC4meC4l+C4teC5iOC4muC4seC4n+C5gOC4n+C4reC4o+C5jFxyXG4gICAgdmlldy5nb1RvKGJ1ZmZlckdlb21ldHJ5LmV4dGVudClcclxuICB9XHJcblxyXG4gIHJldHVybiAoXHJcbiAgICA8ZGl2IGNsYXNzTmFtZT1cImJ1ZmZlci1hcmVhLXdpZGdldFwiPlxyXG4gICAgICA8aDQ+QnVmZmVyIEFyZWEgV2lkZ2V0PC9oND5cclxuICAgICAgPGRpdj5cclxuICAgICAgICA8bGFiZWw+XHJcbiAgICAgICAgICBCdWZmZXIgRGlzdGFuY2UgKG1ldGVycyk6eycgJ31cclxuICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcclxuICAgICAgICAgICAgdmFsdWU9e2J1ZmZlckRpc3RhbmNlfVxyXG4gICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHsgc2V0QnVmZmVyRGlzdGFuY2UoTnVtYmVyKGUudGFyZ2V0LnZhbHVlKSkgfX1cclxuICAgICAgICAgIC8+XHJcbiAgICAgICAgPC9sYWJlbD5cclxuICAgICAgPC9kaXY+XHJcbiAgICAgIDxidXR0b24gb25DbGljaz17Y3JlYXRlQnVmZmVyfSBkaXNhYmxlZD17IWNlbnRlclBvaW50fT5cclxuICAgICAgICBDcmVhdGUgQnVmZmVyIVxyXG4gICAgICA8L2J1dHRvbj5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgQnVmZmVyQXJlYVxyXG5cbiBleHBvcnQgZnVuY3Rpb24gX19zZXRfd2VicGFja19wdWJsaWNfcGF0aF9fKHVybCkgeyBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyA9IHVybCB9Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9