"use strict";

sap.ui.define([], function () {
  "use strict";

  var DefaultMessages = /*#__PURE__*/function (DefaultMessages) {
    DefaultMessages["NO_I18N_TEXT"] = "The message could not be displayed due to technical issues. Contact the administrator.";
    return DefaultMessages;
  }(DefaultMessages || {});
  var ApplicationModels = /*#__PURE__*/function (ApplicationModels) {
    ApplicationModels["GLOBAL_JSON"] = "globalJSONModel";
    ApplicationModels["VISIBILITY"] = "globalAppVisibilities";
    return ApplicationModels;
  }(ApplicationModels || {});
  var Routes = /*#__PURE__*/function (Routes) {
    Routes["HOMEPAGE"] = "RouteHomepage";
    Routes["PERSONNELS"] = "RoutePersonnels";
    Routes["ENGAGEMENTS"] = "RouteEngagements";
    Routes["TEAMS"] = "RouteTeams";
    Routes["FORECAST"] = "RouteForecast";
    Routes["ANALYTICS"] = "RouteAnalytics";
    Routes["UTILIZATION"] = "RouteUtilization";
    Routes["REVENUE"] = "RouteRevenue";
    Routes["GENERATOR"] = "RouteGenerator";
    Routes["CHECK"] = "RouteTimesheetCheck";
    Routes["LOGS"] = "RouteAppLogs";
    Routes["MAPPINGS"] = "RouteMappings";
    Routes["VISIBILITY"] = "RouteVisibility";
    Routes["CONFIGURATIONS"] = "RouteConfigurations";
    return Routes;
  }(Routes || {});
  var FioriThemes = /*#__PURE__*/function (FioriThemes) {
    FioriThemes[FioriThemes["HORIZON_HCW"] = 0] = "HORIZON_HCW";
    FioriThemes[FioriThemes["HORIZON_HCB"] = 1] = "HORIZON_HCB";
    FioriThemes[FioriThemes["HORIZON_DARK"] = 2] = "HORIZON_DARK";
    FioriThemes[FioriThemes["HORIZON"] = 3] = "HORIZON";
    FioriThemes[FioriThemes["FIORI_3_DARK"] = 4] = "FIORI_3_DARK";
    FioriThemes[FioriThemes["FIORI_3"] = 5] = "FIORI_3";
    FioriThemes[FioriThemes["HCB"] = 6] = "HCB";
    FioriThemes[FioriThemes["BELIZE_HCW"] = 7] = "BELIZE_HCW";
    FioriThemes[FioriThemes["BELIZE"] = 8] = "BELIZE";
    return FioriThemes;
  }(FioriThemes || {});
  var FioriThemeTexts = /*#__PURE__*/function (FioriThemeTexts) {
    FioriThemeTexts["HORIZON_HCW"] = "sap_horizon_hcw";
    FioriThemeTexts["HORIZON_HCB"] = "sap_horizon_hcb";
    FioriThemeTexts["HORIZON_DARK"] = "sap_horizon_dark";
    FioriThemeTexts["HORIZON"] = "sap_horizon";
    FioriThemeTexts["FIORI_3_DARK"] = "sap_fiori_3_dark";
    FioriThemeTexts["FIORI_3"] = "sap_fiori_3";
    FioriThemeTexts["HCB"] = "sap_hcb";
    FioriThemeTexts["BELIZE_HCW"] = "sap_belize_hcw";
    FioriThemeTexts["BELIZE"] = "sap_belize";
    return FioriThemeTexts;
  }(FioriThemeTexts || {});
  var UserRoles = /*#__PURE__*/function (UserRoles) {
    UserRoles["ADMIN"] = "A";
    UserRoles["MANAGER"] = "M";
    UserRoles["USER"] = "U";
    UserRoles["NONE"] = "N";
    return UserRoles;
  }(UserRoles || {});
  var ApplicationGroups = /*#__PURE__*/function (ApplicationGroups) {
    ApplicationGroups["HOMEPAGE"] = "Homepage";
    ApplicationGroups["PERSONNELS"] = "Personnels";
    ApplicationGroups["ENGAGEMENTS"] = "Engagements";
    ApplicationGroups["TEAMS"] = "Teams";
    ApplicationGroups["FORECAST"] = "Forecast";
    ApplicationGroups["ANALYTICS"] = "Analytics";
    ApplicationGroups["UTILIZATION"] = "Utilization";
    ApplicationGroups["REVENUE"] = "Revenue";
    ApplicationGroups["GENERATOR"] = "Generator";
    ApplicationGroups["CHECK"] = "TimesheetCheck";
    ApplicationGroups["LOGS"] = "AppLogs";
    ApplicationGroups["MAPPINGS"] = "Mappings";
    ApplicationGroups["VISIBILITY"] = "Visibility";
    ApplicationGroups["CONFIGURATIONS"] = "Configurations";
    return ApplicationGroups;
  }(ApplicationGroups || {});
  var __exports = {
    __esModule: true
  };
  __exports.DefaultMessages = DefaultMessages;
  __exports.ApplicationModels = ApplicationModels;
  __exports.Routes = Routes;
  __exports.FioriThemes = FioriThemes;
  __exports.FioriThemeTexts = FioriThemeTexts;
  __exports.UserRoles = UserRoles;
  __exports.ApplicationGroups = ApplicationGroups;
  return __exports;
});
//# sourceMappingURL=global.types-dbg.js.map
