import Controller from "sap/ui/core/mvc/Controller";
import { Router$RouteMatchedEvent } from "sap/ui/core/routing/Router";
import Router from "sap/f/routing/Router";
import UIComponent from "sap/ui/core/UIComponent";
import JSONModel from "sap/ui/model/json/JSONModel";
import ResourceBundle from "sap/base/i18n/ResourceBundle";
import { DefaultMessages } from "skillmatrixui/types/global.types";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import View from "sap/ui/core/mvc/View";
import ShellBar from "sap/f/ShellBar";
/**
 * @namespace skillmatrixui.controller
 */
export default class App extends Controller {

    private router: Router;
    private currentRoute: string;

    /*eslint-disable @typescript-eslint/no-empty-function*/
    public onInit(): void {
        this.router = this.getUIComponent().getRouter() as Router;
        this.router.attachRouteMatched(this.onRouteMatched, this);
    }

    private getUIComponent(): UIComponent {
        return this.getOwnerComponent() as UIComponent;
    }

    private onRouteMatched(event: Router$RouteMatchedEvent) {
        const routeName = event.getParameter("name") as string;
        const routingArgs = event.getParameter("arguments") as { personnelID?: string; layout?: string; };
        const fclModel = this.getUIComponent().getModel("fclModel") as JSONModel;
        let layout = routingArgs.layout;

        // If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
        if (!layout) {
            const nextUIState = this.getUIComponent().getFclSemanticHelper().getNextUIState(0);
            layout = nextUIState.layout;
        }

        // Update the layout of the FlexibleColumnLayout
        if (layout) {
            fclModel.setProperty("/layout", layout);
        }
        this.changePageLabel(event);
        this.currentRoute = routeName;
    }

    private changePageLabel(event: Router$RouteMatchedEvent) {
        const routeName = event.getParameter("name") as string;
        const mappings = (this.getUIComponent().getModel("routeMappingsModel") as JSONModel).getData() as Array<{ route: string; pageLabelKey: string; }>;
        const routeMapping = mappings.find(map => map.route === routeName) as { route: string; pageLabelKey: string; };

        ((this.getView() as View).byId("sbApplication") as ShellBar).setSecondTitle(this.getResourceBundleText(routeMapping.pageLabelKey));
    }

    private getResourceBundleText(key: string, parameters?: any[]): string {
        const resourceBundle = this.getResourceBundle();
        return resourceBundle.getText(key, parameters, true) || DefaultMessages.NO_I18N_TEXT;
    }

    private getResourceBundle(): ResourceBundle {
        return ((this.getUIComponent().getModel("i18n") as ResourceModel).getResourceBundle() as ResourceBundle);
    }
}