"use strict";(self.webpackChunkfront=self.webpackChunkfront||[]).push([[733],{94733:(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35466);\n\nvar Adfit = function Adfit(props) {\n  var adRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(false);\n  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(function () {\n    // 로딩된 광고가 있으면, 추가 로딩 X\n    if (adRef.current) {\n      return;\n    }\n    var ins = document.createElement('ins');\n    var script = document.createElement('script');\n    ins.className = 'kakao_ad_area';\n    ins.style.display = 'none;';\n    script.async = true;\n    script.type = 'text/javascript';\n    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';\n    ins.setAttribute('data-ad-unit', \"\".concat(props.unit));\n    document.querySelector('.aside__kakaoAdFit').appendChild(ins);\n    document.querySelector('.aside__kakaoAdFit').appendChild(script);\n\n    // 광고 로딩 여부 상태 변경\n    adRef.current = true;\n  }, []);\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0__.createElement(\"aside\", {\n    className: \"aside__kakaoAdFit\"\n  });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Adfit);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiOTQ3MzMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udC8uL3NyYy9BcHAvQWRmaXQuanM/N2Y3YSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgdXNlUmVmLCB1c2VFZmZlY3QgfSBmcm9tIFwicmVhY3RcIjtcbnZhciBBZGZpdCA9IGZ1bmN0aW9uIEFkZml0KHByb3BzKSB7XG4gIHZhciBhZFJlZiA9IHVzZVJlZihmYWxzZSk7XG4gIHVzZUVmZmVjdChmdW5jdGlvbiAoKSB7XG4gICAgLy8g66Gc65Sp65CcIOq0keqzoOqwgCDsnojsnLzrqbQsIOy2lOqwgCDroZzrlKkgWFxuICAgIGlmIChhZFJlZi5jdXJyZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciBpbnMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnMnKTtcbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG4gICAgaW5zLmNsYXNzTmFtZSA9ICdrYWthb19hZF9hcmVhJztcbiAgICBpbnMuc3R5bGUuZGlzcGxheSA9ICdub25lOyc7XG4gICAgc2NyaXB0LmFzeW5jID0gdHJ1ZTtcbiAgICBzY3JpcHQudHlwZSA9ICd0ZXh0L2phdmFzY3JpcHQnO1xuICAgIHNjcmlwdC5zcmMgPSAnLy90MS5kYXVtY2RuLm5ldC9rYXMvc3RhdGljL2JhLm1pbi5qcyc7XG4gICAgaW5zLnNldEF0dHJpYnV0ZSgnZGF0YS1hZC11bml0JywgXCJcIi5jb25jYXQocHJvcHMudW5pdCkpO1xuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5hc2lkZV9fa2FrYW9BZEZpdCcpLmFwcGVuZENoaWxkKGlucyk7XG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmFzaWRlX19rYWthb0FkRml0JykuYXBwZW5kQ2hpbGQoc2NyaXB0KTtcblxuICAgIC8vIOq0keqzoCDroZzrlKkg7Jes67aAIOyDge2DnCDrs4Dqsr1cbiAgICBhZFJlZi5jdXJyZW50ID0gdHJ1ZTtcbiAgfSwgW10pO1xuICByZXR1cm4gLyojX19QVVJFX18qL1JlYWN0LmNyZWF0ZUVsZW1lbnQoXCJhc2lkZVwiLCB7XG4gICAgY2xhc3NOYW1lOiBcImFzaWRlX19rYWthb0FkRml0XCJcbiAgfSk7XG59O1xuZXhwb3J0IGRlZmF1bHQgQWRmaXQ7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///94733\n")}}]);