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
            case "Equals":
                currentStatus = validateEquals(term);
                break;
            case "isFilled":
                currentStatus = validateIsFilled(term);
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
        var currentStatus = JotForm.conditions[iCon].action[iAct].currentlyTrue;
        if (currentStatus) {
            resultElements[iEl].innerHTML = "✅";
        }
        else {
            resultElements[iEl].innerHTML = "❌";
        }
    }
}
