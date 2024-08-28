"use strict";

sap.ui.define(["sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel", "sap/m/MessageToast", "sap/m/ColumnListItem", "sap/m/Column", "sap/m/Label", "sap/m/Text"], function (Controller, JSONModel, MessageToast, ColumnListItem, Column, Label, Text) {
  "use strict";

  /**
   * @namespace skillmatrixui.controller
   */
  const Homepage = Controller.extend("skillmatrixui.controller.Homepage", {
    /*eslint-disable @typescript-eslint/no-empty-function*/onInit: function _onInit() {},
    onBeforeRendering: function _onBeforeRendering() {
      this.setSkillMatrixData();
    },
    _handleSuccess: function _handleSuccess(oData) {
      // Handle the success case, for example, set data to a model
      const skillMatrixData = this.skillMatrixFormatter(oData);
      const skillMatrixJSON = new JSONModel(skillMatrixData);
      this.getView()?.setModel(skillMatrixJSON, "skillMatrix");
      let oTable = this.byId("skillMatrixTable");
      oTable.setModel(skillMatrixJSON, "skillMatrix");
      oTable.bindItems({
        path: "skillMatrix>/",
        template: oTable.getBindingInfo("items")?.template
      });
      let columnNames = [];
      skillMatrixData.forEach(personnel => {
        Object.keys(personnel).forEach(column => {
          if (!columnNames.includes(column)) {
            columnNames.push(column);
          }
        });
      });
      for (let i = 0; i < columnNames.length; i++) {
        var oColumn = new Column("col" + i, {
          width: "1em",
          header: new Label({
            text: columnNames[i]
          })
        });
        oTable.addColumn(oColumn);
      }
      let oCell = [];
      for (let i = 0; i < columnNames.length; i++) {
        var cell1 = new Text({
          text: `{skillMatrix>/${columnNames[i]}}`
        });
        oCell.push(cell1);
      }
      let aColList = new ColumnListItem("aColList", {
        cells: oCell
      });
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
    }
  });
  return Homepage;
});
//# sourceMappingURL=Homepage-dbg.controller.js.map
