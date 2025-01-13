"use strict";

sap.ui.define(["sap/ui/base/Object", "sap/ui/core/Messaging"], function (BaseObject, Messaging) {
  "use strict";

  /**
   * @namespace com.ndbs.techhubreportingui.util.common
   */
  const PageCL = BaseObject.extend("com.ndbs.techhubreportingui.util.common.PageCL", {
    constructor: function _constructor(sourceController, pageRoute) {
      BaseObject.prototype.constructor.call(this);
      this.additionalRoutes = [];
      this.sourceController = sourceController;
      this.pageRoute = pageRoute;
      this.pageInitialized = false;
      this.sourceView = sourceController.getView();
      this.oDataModel = sourceController.getOwnerComponent().getModel();
    },
    isInitialized: function _isInitialized() {
      return this.pageInitialized;
    },
    attachAdditionalRoutes: function _attachAdditionalRoutes(routes) {
      this.additionalRoutes = routes;
    },
    initialize: function _initialize() {
      // register message model
      const messageModel = Messaging.getMessageModel();
      this.sourceView.setModel(messageModel, "message");
      Messaging.registerObject(this.sourceView, true);

      // detach the request fail event handler before leaving the page
      this.sourceView.addEventDelegate({
        onBeforeHide: () => {
          this.oDataModel.detachRequestFailed(this.sourceController.onODataRequestFail, this.sourceController);
        }
      }, this.sourceController);

      // attach the object match handler
      const route = this.sourceController.getRouter().getRoute(this.pageRoute);
      if (route) {
        route.attachPatternMatched(this.sourceController.onObjectMatched, this.sourceController);
      }
      for (const routeName of this.additionalRoutes) {
        const additionalRoute = this.sourceController.getRouter().getRoute(routeName);
        if (additionalRoute) {
          additionalRoute.attachPatternMatched(this.sourceController.onObjectMatched, this.sourceController);
        }
      }
      this.pageInitialized = true;
    }
  });
  return PageCL;
});
//# sourceMappingURL=PageCL-dbg.js.map
