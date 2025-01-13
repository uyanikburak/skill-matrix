
import { IBindingParams, IPersonnels, ISkills, ISubmitChangeResponse, Routes } from "../types/global.types";
import {  } from "sap/m/Table";
import Table from "sap/m/Table"
import BaseController from "./BaseController";
import PageCL from "skillmatrixui/util/common/PageCL";
import formatter from "skillmatrixui/model/formatter";
import { IPage } from "skillmatrixui/util/common/common.types";
import { Model$RequestFailedEvent } from "sap/ui/model/Model";
import View from "sap/ui/core/mvc/View";
import EntryCreateCL from "ui5/antares/entry/v2/EntryCreateCL";
import EntryUpdateCL from "ui5/antares/entry/v2/EntryUpdateCL";
import FragmentCL from "ui5/antares/ui/FragmentCL";

/**
 * @namespace skillmatrixui.controller
 */
export default class Administration extends BaseController implements IPage{
    public formatter = formatter;


    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const page = new PageCL<Administration>(this,Routes.ADMINISTRATION);
        page.initialize();
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

    public onAddSkill(){
        const skillEntry = new EntryCreateCL<ISkills>(this, "Skills");
        skillEntry.createNewEntry();
    }

    public onAddPersonnel(){
        const personnelEntry = new EntryCreateCL<IPersonnels>(this, "Personnels");
        personnelEntry.createNewEntry();
    }

}