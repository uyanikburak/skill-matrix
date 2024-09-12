"use strict";

sap.ui.define(["./BaseController"], function (__BaseController) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const BaseController = _interopRequireDefault(__BaseController);
  /**
   * @namespace skillmatrixui.controller
   */
  const PersonnelDetail = BaseController.extend("skillmatrixui.controller.PersonnelDetail", {
    /*eslint-disable @typescript-eslint/no-empty-function*/onInit: function _onInit() {
      const router = this.getRouter();
      router.getRoute("RoutePersonnelDetail")?.attachPatternMatched(this.onObjectMatched, this);
    },
    onObjectMatched: function _onObjectMatched(event) {
      const oDataModel = this.getComponentModel();
      const routeArgs = event.getParameter("arguments");
      const objectPageLayout = this.byId("ObjectPageLayout");
      if (objectPageLayout && routeArgs.personnelID) {
        objectPageLayout.bindElement({
          path: `/Personnels('${encodeURIComponent(routeArgs.personnelID)}')`
        });
      }
    }
  });
  return PersonnelDetail;
});
//# sourceMappingURL=PersonnelDetail-dbg.controller.js.map
