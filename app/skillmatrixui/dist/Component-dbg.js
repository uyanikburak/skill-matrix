"use strict";

sap.ui.define(["sap/ui/core/UIComponent", "./model/models", "sap/f/FlexibleColumnLayoutSemanticHelper", "sap/f/library", "sap/ui/model/json/JSONModel"], function (UIComponent, ___model_models, FlexibleColumnLayoutSemanticHelper, sap_f_library, JSONModel) {
  "use strict";

  const createDeviceModel = ___model_models["createDeviceModel"];
  const LayoutType = sap_f_library["LayoutType"];
  /**
   * @namespace skillmatrixui
   */
  const Component = UIComponent.extend("skillmatrixui.Component", {
    metadata: {
      manifest: "json"
    },
    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * @public
     * @override
     */
    init: function _init() {
      // call the base component's init function
      UIComponent.prototype.init.call(this);

      // enable routing
      this.getRouter().initialize();

      // set the device model
      this.setModel(createDeviceModel(), "device");
      this.setModel(new JSONModel(), "fclModel");
    },
    getFclSemanticHelper: function _getFclSemanticHelper() {
      const flexibleColumnLayout = this.getRootControl().byId("fcl");
      const settings = {
        defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
        maxColumnsCount: 2
      };
      return FlexibleColumnLayoutSemanticHelper.getInstanceFor(flexibleColumnLayout, settings);
    }
  });
  return Component;
});
//# sourceMappingURL=Component-dbg.js.map
