"use strict";

sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageToast"], function (Controller, JSONModel, MessageToast) {
  "use strict";

  /**
   * @namespace skillmatrixui.controller
   */
  const Homepage = Controller.extend("skillmatrixui.controller.Homepage", {
    /*eslint-disable @typescript-eslint/no-empty-function*/onInit: function _onInit() {},
    onBeforeRendering: function _onBeforeRendering() {
      const oModel = this.getView()?.getModel();
      const oParameters = {
        success: oData => {
          this._handleSuccess(oData);
        },
        error: oError => {
          this._handleError(oError);
        }
      };
      oModel.callFunction("/getSkillMatrix", oParameters);
    },
    _handleSuccess: function _handleSuccess(oData) {
      // Handle the success case, for example, set data to a model
      const oModel = new JSONModel(oData);
      this.getView()?.setModel(oModel, "skillMatrix");
    },
    _handleError: function _handleError(oError) {
      // Handle the error case, for example, show a message
      MessageToast.show("An error occurred while calling the function");
    },
    onBeforeRebindTable: function _onBeforeRebindTable(event) {
      const bindingParams = event.getParameter("bindingParams");
      const skillMatrixModel = this.getView()?.getModel("skillMatrix");
      event.getSource().getTable().setModel(skillMatrixModel);
    }
  });
  return Homepage;
});
//# sourceMappingURL=Homepage-dbg.controller.js.map
