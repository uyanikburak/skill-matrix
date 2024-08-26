"use strict";

sap.ui.define(["sap/ui/core/UIComponent", "./model/models"], function (BaseComponent, ___model_models) {
  "use strict";

  const createDeviceModel = ___model_models["createDeviceModel"];
  /**
   * @namespace skillmatrixui
   */
  const Component = BaseComponent.extend("skillmatrixui.Component", {
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
      BaseComponent.prototype.init.call(this);

      // enable routing
      this.getRouter().initialize();

      // set the device model
      this.setModel(createDeviceModel(), "device");
    }
  });
  return Component;
});
//# sourceMappingURL=Component-dbg.js.map
