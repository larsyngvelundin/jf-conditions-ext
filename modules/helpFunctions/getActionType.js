function getActionType(actionType) {
    switch (actionType) {
        case "Show":
        case "Hide":
            return "ShowHide";
    }
    return "null";
}
