import Controller from "sap/ui/core/mvc/Controller";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import JSONModel from "sap/ui/model/json/JSONModel";
import MessageToast from "sap/m/MessageToast";
import { IBindingParams, ISubmitChangeResponse, Routes } from "../types/global.types";
import SmartTable, { SmartTable$BeforeRebindTableEvent, SmartTable$InitialiseEvent } from "sap/ui/comp/smarttable/SmartTable";
import { EntitySet } from "sap/ui/model/analytics/odata4analytics";


/**
 * @namespace skillmatrixui.controller
 */
export default class Homepage extends Controller {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {

    }

    public onBeforeRendering(): void | undefined {
        const oModel = this.getView()?.getModel() as ODataModel

        const oParameters = {
            success: (oData: any) => {
                console.log("Function call was successful:", oData);
                this._handleSuccess(oData);
            },
            error: (oError: any) => {
                console.error("Function call failed:", oError);
                this._handleError(oError);
            }
        };
        oModel.callFunction("/getSkillMatrix", oParameters);
    }

    private _handleSuccess(oData: any): void {
        // Handle the success case, for example, set data to a model
        const oModel = new JSONModel(oData);
        this.getView()?.setModel(oModel, "skillMatrix");
    }

    private _handleError(oError: any): void {
        // Handle the error case, for example, show a message
        MessageToast.show("An error occurred while calling the function");
    }

    public onBeforeRebindTable(event: SmartTable$BeforeRebindTableEvent){
        const bindingParams = event.getParameter("bindingParams") as IBindingParams;
        const skillMatrixModel = this.getView()?.getModel("skillMatrix") as JSONModel;
        event.getSource().getTable().setModel(skillMatrixModel)
    }


}