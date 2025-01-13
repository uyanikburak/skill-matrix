import Controller from "sap/ui/core/mvc/Controller";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import { IBindingParams, ISubmitChangeResponse, Routes } from "../types/global.types";
import {  } from "sap/m/Table";
import { ISkillMatrix, ISkillMatrixCombined } from "../types/global.types"
import Table from "sap/m/Table";
import { ListBase$ItemPressEvent } from  "sap/m/ListBase";
import ColumnListItem from "sap/m/ColumnListItem";
import Column from "sap/m/Column";
import Label from "sap/m/Label";
import Text from "sap/m/Text";
import BaseController from "./BaseController";
import PageCL from "skillmatrixui/util/common/PageCL";
import formatter from "skillmatrixui/model/formatter";
import { IPage } from "skillmatrixui/util/common/common.types";
import { Model$RequestFailedEvent } from "sap/ui/model/Model";
import View from "sap/ui/core/mvc/View";

/**
 * @namespace skillmatrixui.controller
 */
export default class Homepage extends BaseController implements IPage{
    public formatter = formatter;
    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const page = new PageCL<Homepage>(this,Routes.HOMEPAGE);
        page.initialize();
    }

    public onBeforeRendering(): void | undefined {
        this.setSkillMatrixData()
    }

    public onObjectMatched(): void {
        const oDataModel = this.getComponentModel();
        oDataModel.attachRequestFailed({}, this.onODataRequestFail, this);
    }

    public onODataRequestFail(event: Model$RequestFailedEvent): void {
        const view = this.getView() as View;
        // this.openMessagePopover();

        if (event.getParameter("statusCode") === "401") {
            (view.byId("skillMatrixTable") as Table).setBusy(false);
        }
    }

    private _handleSuccess(oData: ISkillMatrix[]): void {
        // Handle the success case, for example, set data to a model
        const skillMatrixData = this.skillMatrixFormatter(oData) as ISkillMatrixCombined[];
        const skillMatrixJSON = new JSONModel(skillMatrixData);
        this.getView()?.setModel(skillMatrixJSON, "skillMatrix");

        let oTable = this.byId("skillMatrixTable") as Table;

        // Collect column names
        let columnNames: String[] = [];
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
            type:"Active"
        });

        // Bind items once, after creating the columns
        oTable.bindItems({
            path: "skillMatrix>/",
            template: aColList
        });
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

    public onItemPress(event:ListBase$ItemPressEvent):void{
        let table = event.getSource();
        let context = event.getParameter("listItem")?.getBindingContext("skillMatrix");
        let personnelID = context?.getProperty("ID");

        let router = this.getRouter();
        router.navTo("RoutePersonnelDetail",{personnelID:personnelID})
    }

}