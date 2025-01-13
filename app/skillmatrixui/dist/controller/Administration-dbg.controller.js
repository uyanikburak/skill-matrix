"use strict";

sap.ui.define(["../types/global.types", "sap/m/Table", "./BaseController", "skillmatrixui/util/common/PageCL", "skillmatrixui/model/formatter", "ui5/antares/entry/v2/EntryCreateCL"], function (___types_globaltypes, sap_m_Table, __BaseController, __PageCL, __formatter, __EntryCreateCL) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const Routes = ___types_globaltypes["Routes"];
  const BaseController = _interopRequireDefault(__BaseController);
  const PageCL = _interopRequireDefault(__PageCL);
  const formatter = _interopRequireDefault(__formatter);
  const EntryCreateCL = _interopRequireDefault(__EntryCreateCL);
  /**
   * @namespace skillmatrixui.controller
   */
  const Administration = BaseController.extend("skillmatrixui.controller.Administration", {
    constructor: function constructor() {
      BaseController.prototype.constructor.apply(this, arguments);
      this.formatter = formatter;
    },
    /*eslint-disable @typescript-eslint/no-empty-function*/onInit: function _onInit() {
      const page = new PageCL(this, Routes.ADMINISTRATION);
      page.initialize();
    },
    onObjectMatched: function _onObjectMatched() {
      const oDataModel = this.getComponentModel();
      oDataModel.attachRequestFailed({}, this.onODataRequestFail, this);
    },
    onODataRequestFail: function _onODataRequestFail(event) {
      const view = this.getView();
      // this.openMessagePopover();

      if (event.getParameter("statusCode") === "401") {
        view.byId("skillMatrixTable").setBusy(false);
      }
    },
    onAddSkill: function _onAddSkill() {
      const skillEntry = new EntryCreateCL(this, "Skills");
      skillEntry.createNewEntry();
    },
    onAddPersonnel: function _onAddPersonnel() {
      const personnelEntry = new EntryCreateCL(this, "Personnels");
      personnelEntry.createNewEntry();
    }
  });
  return Administration;
});
//# sourceMappingURL=Administration-dbg.controller.js.map
