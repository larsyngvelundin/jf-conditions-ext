async function updateList() {
    console.log("Updating list");
    //Updating Term results
    var resultElements = document.getElementsByClassName("conditionTermResult");
    for (let iEl = 0; iEl < resultElements.length; iEl++) {
        var parts = resultElements[iEl].id.split("-");
        var iCon = parts[0];
        var iTer = parts[1];
        var term = JotForm.conditions[iCon].terms[iTer];
        console.log("Updating", term);
        var currentStatus;
        switch (term.operator) {
            case "notEquals":
                currentStatus = validateNotEquals(term);
                break;
            case "equals":
                currentStatus = validateEquals(term);
                break;
            case "isFilled":
                currentStatus = validateIsFilled(term);
                break;
            case "isEmpty":
                currentStatus = validateIsEmpty(term);
                break;
            case "contains":
                currentStatus = validateContains(term);
                break;
            case "notContains":
                currentStatus = validateNotContains(term);
                break;
            case "startsWith":
                currentStatus = validateStartsWith(term);
                break;
            case "notStartsWith":
                currentStatus = validateNotStartsWith(term);
                break;
            case "endsWith":
                currentStatus = validateEndsWith(term);
                break;
            case "notEndsWith":
                currentStatus = validateNotEndsWith(term);
                break;
        }
        if (currentStatus) {
            resultElements[iEl].innerHTML = "✅";
        }
        else {
            resultElements[iEl].innerHTML = "❌";
        }
    }
    //Updating Action results (Still using currentlyTrue)
    resultElements = document.getElementsByClassName("conditionActionResult");
    for (let iEl = 0; iEl < resultElements.length; iEl++) {
        console.log(resultElements[iEl].id);
        var parts = resultElements[iEl].id.split("-");
        var iCon = parts[0];
        var iAct = parts[1];
        var action = JotForm.conditions[iCon].action[iAct];
        console.log("Checking action:", action);
        var actionType = action.visibility;
        var currentStatus;
        switch (actionType) {
            case "Show":
                currentStatus = validateShow(action);
                break;
            case "Hide":
                currentStatus = validateHide(action);
                break;
        }
        if (currentStatus) {
            resultElements[iEl].innerHTML = "✅";
        }
        else {
            resultElements[iEl].innerHTML = "❌";
        }
    }
}
