import Controller from "sap/ui/core/mvc/Controller";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import { IBindingParams, ISubmitChangeResponse, Routes } from "../types/global.types";
import SmartTable, { SmartTable$BeforeRebindTableEvent, SmartTable$InitialiseEvent } from "sap/ui/comp/smarttable/SmartTable";
import { EntitySet } from "sap/ui/model/analytics/odata4analytics";
import { ISkillMatrix, ISkillMatrixCombined } from "../types/global.types"
import Table from "sap/m/Table";
import ColumnListItem from "sap/m/ColumnListItem";
import Column from "sap/m/Column";
import Label from "sap/m/Label";
import { foreach } from "@sap/cds";
import Text from "sap/m/Text";
/**
 * @namespace skillmatrixui.controller
 */
export default class Homepage extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {

    }

    public onBeforeRendering(): void | undefined {
        this.setSkillMatrixData()
    }

    private _handleSuccess(oData: ISkillMatrix[]): void {
        // Handle the success case, for example, set data to a model
        const skillMatrixData = this.skillMatrixFormatter(oData) as ISkillMatrixCombined[]
        const skillMatrixJSON = new JSONModel(skillMatrixData);
        this.getView()?.setModel(skillMatrixJSON, "skillMatrix");
        let oTable = this.byId("skillMatrixTable") as Table;
        oTable.setModel(skillMatrixJSON, "skillMatrix");
        oTable.bindItems({
            path: "skillMatrix>/",
            template: oTable.getBindingInfo("items")?.template as ColumnListItem
        });

        let columnNames: String[] = [];
        skillMatrixData.forEach(personnel => {
            Object.keys(personnel).forEach(column => {
                if (!columnNames.includes(column)) {
                    columnNames.push(column)
                }
            })
        })


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
        })

    }

    private _handleError(oError: Error): void {
        // Handle the error case, for example, show a message
        MessageToast.show("An error occurred while calling the function");
    }

    public setSkillMatrixData(): ISkillMatrix[] | void {
        const oModel = this.getView()?.getModel() as ODataModel
        oModel.read("/SkillMatrix", {
            success: (oData: { results: ISkillMatrix[] }) => {
                this._handleSuccess(oData.results)
            },
            error: (err: Error) => {
                this._handleError(err)
                console.log(err)
            }
        })
    }

    public skillMatrixFormatter(skillMatrix: ISkillMatrix[]): ISkillMatrixCombined[] {

        const combinedData: ISkillMatrixCombined[] = [];

        skillMatrix.forEach(item => {
            // Check if the person already exists in the output array
            let person = combinedData.find(p => p.ID === item.ID)!;

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
            person[(item.skillName).replace(/ /g, '')] = item.proficiencyLevel;
        });

        return combinedData;

    }



}