function getActionType(action) {
    if (action.hasOwnProperty("visibility")) {
        let actionType = action.visibility;
        console.log("actionType", actionType);
        switch (actionType) {
            case "Show":
            case "Hide":
            case "HideMultiple":
                return "ShowHide";
                // return "ShowHideMultiple";
        }
        return "null";
    }
    else if (action.hasOwnProperty("skipHide")) {
        let actionType = action.skipHide;
        console.log("actionType", actionType);
        switch (actionType) {
            case "hidePage":
                return "skipHide";
        }
        return "null";
    }
    else if (action.hasOwnProperty("newCalculationType")) {
        return "calculation";
    }
    else {
        console.log("Found edge case");
        console.log(action);
    }
}