import { Route$PatternMatchedEventParameters } from "sap/ui/core/routing/Route";
import BaseController from "./BaseController";
import { Route$PatternMatchedEvent } from "sap/ui/core/routing/Route";
import ODataModel from "sap/ui/model/odata/v2/ODataModel";
import ObjectPageLayout from "sap/uxap/ObjectPageLayout";
import View from "sap/ui/core/mvc/View";
import { IPersonnels } from "skillmatrixui/types/global.types";

/**
 * @namespace skillmatrixui.controller
 */
export default class PersonnelDetail extends BaseController {

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        const router = this.getRouter();
        router.getRoute("RoutePersonnelDetail")?.attachPatternMatched(this.onObjectMatched, this);
    }
    
    public onObjectMatched(event: Route$PatternMatchedEvent): void {
        const oDataModel = this.getComponentModel();
        const routeArgs = event.getParameter("arguments") as { personnelID: string };
    
        const objectPageLayout = this.byId("ObjectPageLayout") as ObjectPageLayout;
        if (objectPageLayout && routeArgs.personnelID) {
            objectPageLayout.bindElement({
                path: `/Personnels('${encodeURIComponent(routeArgs.personnelID)}')`
            });
        }
    }

}