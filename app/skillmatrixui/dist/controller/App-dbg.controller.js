"use strict";

sap.ui.define(["sap/ui/core/mvc/Controller", "skillmatrixui/types/global.types"], function (Controller, __skillmatrixui_types_globaltypes) {
  "use strict";

  const DefaultMessages = __skillmatrixui_types_globaltypes["DefaultMessages"];
  /**
   * @namespace skillmatrixui.controller
   */
  const App = Controller.extend("skillmatrixui.controller.App", {
    /*eslint-disable @typescript-eslint/no-empty-function*/onInit: function _onInit() {
      this.router = this.getUIComponent().getRouter();
      this.router.attachRouteMatched(this.onRouteMatched, this);
    },
    getUIComponent: function _getUIComponent() {
      return this.getOwnerComponent();
    },
    onRouteMatched: function _onRouteMatched(event) {
      const routeName = event.getParameter("name");
      const routingArgs = event.getParameter("arguments");
      const fclModel = this.getUIComponent().getModel("fclModel");
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
    },
    changePageLabel: function _changePageLabel(event) {
      const routeName = event.getParameter("name");
      const mappings = this.getUIComponent().getModel("routeMappingsModel").getData();
      const routeMapping = mappings.find(map => map.route === routeName);
      this.getView().byId("sbApplication").setSecondTitle(this.getResourceBundleText(routeMapping.pageLabelKey));
    },
    getResourceBundleText: function _getResourceBundleText(key, parameters) {
      const resourceBundle = this.getResourceBundle();
      return resourceBundle.getText(key, parameters, true) || DefaultMessages.NO_I18N_TEXT;
    },
    getResourceBundle: function _getResourceBundle() {
      return this.getUIComponent().getModel("i18n").getResourceBundle();
    }
  });
  return App;
});
//# sourceMappingURL=App-dbg.controller.js.map
