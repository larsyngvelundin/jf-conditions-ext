function getActionType(action) {
    if (action.hasOwnProperty("visibility")) {
        let actionType = action.visibility;
        // // console.log("actionType", actionType);
        // // console.log("action", action);
        switch (actionType) {
            case "Show":
            case "ShowMultiple":
            case "Hide":
            case "HideMultiple":
                return "ShowHide";
            // return "ShowHideMultiple";
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
        // console.log("actionType", actionType);
        switch (actionType) {
            case "hidePage":
                return "skipHide";
        }
        return "null-skipHide";
    }
    else if (action.hasOwnProperty("newCalculationType")) {
        return "calculation";
    }
    else {
        // console.log("Found edge case");
        // console.log(action);
    }
}