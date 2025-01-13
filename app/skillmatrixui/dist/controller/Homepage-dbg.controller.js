"use strict";

sap.ui.define(["sap/ui/model/json/JSONModel", "sap/m/MessageToast", "../types/global.types", "sap/m/Table", "sap/m/ColumnListItem", "sap/m/Column", "sap/m/Label", "sap/m/Text", "./BaseController", "skillmatrixui/util/common/PageCL", "skillmatrixui/model/formatter"], function (JSONModel, MessageToast, ___types_globaltypes, sap_m_Table, ColumnListItem, Column, Label, Text, __BaseController, __PageCL, __formatter) {
  "use strict";

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule && typeof obj.default !== "undefined" ? obj.default : obj;
  }
  const Routes = ___types_globaltypes["Routes"];
  const BaseController = _interopRequireDefault(__BaseController);
  const PageCL = _interopRequireDefault(__PageCL);
  const formatter = _interopRequireDefault(__formatter);
  /**
   * @namespace skillmatrixui.controller
   */
  const Homepage = BaseController.extend("skillmatrixui.controller.Homepage", {
    constructor: function constructor() {
      BaseController.prototype.constructor.apply(this, arguments);
      this.formatter = formatter;
    },
    /*eslint-disable @typescript-eslint/no-empty-function*/onInit: function _onInit() {
      const page = new PageCL(this, Routes.HOMEPAGE);
      page.initialize();
    },
    onBeforeRendering: function _onBeforeRendering() {
      this.setSkillMatrixData();
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
    _handleSuccess: function _handleSuccess(oData) {
      // Handle the success case, for example, set data to a model
      const skillMatrixData = this.skillMatrixFormatter(oData);
      const skillMatrixJSON = new JSONModel(skillMatrixData);
      this.getView()?.setModel(skillMatrixJSON, "skillMatrix");
      let oTable = this.byId("skillMatrixTable");

      // Collect column names
      let columnNames = [];
      skillMatrixData.forEach(personnel => {
        Object.keys(personnel).forEach(column => {
          if (!columnNames.includes(column)) {
            columnNames.push(column);
          }
        });
      });

      // Create columns dynamically
      for (let i = 0; i < columnNames.length; i++) {
        var oColumn = new Column("col" + i, {
          width: "1em",
          header: new Label({
            text: columnNames[i]
          })
        });
        oTable.addColumn(oColumn);
      }

      // Create cells for each column
      let oCell = [];
      for (let i = 0; i < columnNames.length; i++) {
        var cell1 = new Text({
          text: `{skillMatrix>${columnNames[i]}}`,
          class: {
            path: `skillMatrix>${columnNames[i]}`,
            formatter: this.cellColorFormatter
          }
        });
        oCell.push(cell1);
      }

      // Create the ColumnListItem template
      let aColList = new ColumnListItem({
        cells: oCell,
        type: "Active"
      });

      // Bind items once, after creating the columns
      oTable.bindItems({
        path: "skillMatrix>/",
        template: aColList
      });
    },
    _handleError: function _handleError(oError) {
      // Handle the error case, for example, show a message
      MessageToast.show("An error occurred while calling the function");
    },
    setSkillMatrixData: function _setSkillMatrixData() {
      const oModel = this.getView()?.getModel();
      oModel.read("/SkillMatrix", {
        success: oData => {
          this._handleSuccess(oData.results);
        },
        error: err => {
          this._handleError(err);
        }
      });
    },
    skillMatrixFormatter: function _skillMatrixFormatter(skillMatrix) {
      const combinedData = [];
      skillMatrix.forEach(item => {
        // Check if the person already exists in the output array
        let person = combinedData.find(p => p.ID === item.ID);
        if (!person) {
          // If not found, create a new person object
          person = {
            ID: item.ID,
            fullName: item.fullName,
            country: item.country,
            hubName: item.hubName
          };
          combinedData.push(person);
        }

        // Add the skill to the person object
        person[item.skillName.replace(/ /g, '')] = item.proficiencyLevel;
      });
      return combinedData;
    },
    onItemPress: function _onItemPress(event) {
      let table = event.getSource();
      let context = event.getParameter("listItem")?.getBindingContext("skillMatrix");
      let personnelID = context?.getProperty("ID");
      let router = this.getRouter();
      router.navTo("RoutePersonnelDetail", {
        personnelID: personnelID
      });
    }
  });
  return Homepage;
});
//# sourceMappingURL=Homepage-dbg.controller.js.map
