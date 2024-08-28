import Filter from "sap/ui/model/Filter";

export enum DefaultMessages {
    NO_I18N_TEXT = "The message could not be displayed due to technical issues. Contact the administrator."
}

export enum ApplicationModels {
    GLOBAL_JSON = "globalJSONModel",
    VISIBILITY = "globalAppVisibilities"
}

export enum Routes {
    HOMEPAGE = "RouteHomepage",
    PERSONNELS = "RoutePersonnels",
    ENGAGEMENTS = "RouteEngagements",
    TEAMS = "RouteTeams",
    FORECAST = "RouteForecast",
    ANALYTICS = "RouteAnalytics",
    UTILIZATION = "RouteUtilization",
    REVENUE = "RouteRevenue",
    GENERATOR = "RouteGenerator",
    CHECK = "RouteTimesheetCheck",
    LOGS = "RouteAppLogs",
    MAPPINGS = "RouteMappings",
    VISIBILITY = "RouteVisibility",
    CONFIGURATIONS = "RouteConfigurations"
}

export enum FioriThemes {
    HORIZON_HCW,
    HORIZON_HCB,
    HORIZON_DARK,
    HORIZON,
    FIORI_3_DARK,
    FIORI_3,
    HCB,
    BELIZE_HCW,
    BELIZE
}

export enum FioriThemeTexts {
    HORIZON_HCW = "sap_horizon_hcw",
    HORIZON_HCB = "sap_horizon_hcb",
    HORIZON_DARK = "sap_horizon_dark",
    HORIZON = "sap_horizon",
    FIORI_3_DARK = "sap_fiori_3_dark",
    FIORI_3 = "sap_fiori_3",
    HCB = "sap_hcb",
    BELIZE_HCW = "sap_belize_hcw",
    BELIZE = "sap_belize"
}

export enum UserRoles {
    ADMIN = "A",
    MANAGER = "M",
    USER = "U",
    NONE = "N"
}

export enum ApplicationGroups {
    HOMEPAGE = "Homepage",
    PERSONNELS = "Personnels",
    ENGAGEMENTS = "Engagements",
    TEAMS = "Teams",
    FORECAST = "Forecast",
    ANALYTICS = "Analytics",
    UTILIZATION = "Utilization",
    REVENUE = "Revenue",
    GENERATOR = "Generator",
    CHECK = "TimesheetCheck",
    LOGS = "AppLogs",
    MAPPINGS = "Mappings",
    VISIBILITY = "Visibility",
    CONFIGURATIONS = "Configurations"
}

export interface IUserAPI {
    name: string;
    firstname: string;
    lastname: string;
    email: string;
}

export interface IAppActivityLogs {
    ID: string;
    firstName: string;
    lastName: string;
    email: string;
    lastLoginTime?: Date;
    loginCount: number;
}

export interface IAppActivityLogsKeys {
    ID: string;
}

export interface IBindingParams {
    parameters: {
        expand: string;
    };
    filters: Filter[];
}

export interface IUserRole {
    ID: string;
    sfUser: string | null;
    userRole: UserRoles | null;
}

export interface ICurrentUserInfo {
    personnelID?: string;
    successFactorsID?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    teamID?: string | null;
    teamName?: string | null;
    userRole?: UserRoles | null;
}

export interface ISubmitChangeResponse<T> {
    __batchResponses: IBatchResponses<T>[];
}

export interface IBatchResponses<T> {
    __changeResponses?: IChangeResponses<T>[];
    response?: ISubmitResponse;
    $reported?: boolean;
    message?: string;
}

export interface IChangeResponses<T> {
    $reported?: boolean;
    _imported?: boolean;
    statusCode?: string;
    statusText?: string;
    headers?: object;
    data?: T;
    response?: ISubmitResponse;
}

export interface ISubmitResponse {
    statusCode?: string;
    body?: string;
    statusText?: string;
    headers?: object;
}

export interface ISkillMatrix {
    ID:string;
    fullName:string;
    country:string;
    hubName:string;
    skillName:string;
    skillsHubName:string;
    proficiencyLevel:number;
}

export interface ISkillMatrixCombined {
    ID:string;
    fullName:string;
    country:string;
    hubName:string;
    [skillName: string]: number | string | null;
}


