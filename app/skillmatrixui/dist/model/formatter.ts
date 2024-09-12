import BaseController from "skillmatrixui/controller/BaseController";

export default{
    getStatusForValue: function (value:number) {
        if (!value) return { state: "None", text: "" };
        if (value <= 2) return { state: "Error", text: value.toString() };
        if (value === 3) return { state: "Warning", text: value.toString() };
        if (value >= 4) return { state: "Success", text: value.toString() };
        return { state: "None", text: value.toString() };
    }
}