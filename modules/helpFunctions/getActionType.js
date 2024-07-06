function getActionType(action) {
    if (action.hasOwnProperty("visibility")) {
        let actionType = action.visibility;
        switch (actionType) {
            case "Show":
            case "ShowMultiple":
            case "Hide":
            case "HideMultiple":
                return "ShowHide";
            case "Enable":
            case "Disable":
                return "EnableDisable";
            case "UnrequireMultiple":
            case "RequireMultiple":
            case "Unrequire":
            case "Require":
                return "RequireUnrequire";
            case "Mask":
                return "Mask";
        }
        return "null";
    }
    else if (action.hasOwnProperty("skipHide")) {
        let actionType = action.skipHide;
        switch (actionType) {
            case "hidePage":
                return "skipHide";
        }
        return "null-skipHide"; // needs to be updated for other skipHide
    }
    else if (action.hasOwnProperty("newCalculationType")) {
        return "calculation";
    }
    else {
        console.log("Unknown Action Type:");
        console.log(action);
    }
}