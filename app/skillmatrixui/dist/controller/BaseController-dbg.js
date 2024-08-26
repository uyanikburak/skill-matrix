"use strict";

sap.ui.define(["sap/ui/core/mvc/Controller"], function (Controller) {
  "use strict";

  /**
   * @namespace com.ndbs.techhubreportingui.controller
   */
  const BaseController = Controller.extend("com.ndbs.techhubreportingui.controller.BaseController", {
    /* ======================================================================================================================= */
    /* Global Methods                                                                                                          */
    /* ======================================================================================================================= */
    getODataModel: function _getODataModel(modelName) {
      return this.getView().getModel(modelName);
    },
    getComponentModel: function _getComponentModel(modelName) {
      return this.getOwnerComponent().getModel(modelName);
    },
    getRouter: function _getRouter() {
      return this.getOwnerComponent().getRouter();
    },
    getModel: function _getModel(modelName) {
      return this.getView().getModel(modelName);
    },
    setModel: function _setModel(oModel, modelName) {
      this.getView().setModel(oModel, modelName);
    },
    getResourceBundle: function _getResourceBundle() {
      return this.getOwnerComponent().getModel("i18n").getResourceBundle();
    },
    getCurrentView: function _getCurrentView() {
      return this.getView();
    }
  });
  return BaseController;
});
//# sourceMappingURL=BaseController-dbg.js.map
