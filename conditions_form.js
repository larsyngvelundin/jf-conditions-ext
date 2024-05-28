console.log("Loaded script");

async function start() {
    await waitForElm(".form-all");

    addCss();

    var formToolbar = await waitForElm("#form-toolbar");
    var formToolbarRight = formToolbar.getElementsByClassName("right")[0];
    var conditionListBtn = document.createElement("div");
    conditionListBtn.id = "conditionListBtn";
    conditionListBtn.innerHTML = "Conditions Debugging";

    formToolbarRight.insertBefore(conditionListBtn, formToolbarRight.firstChild);

    conditionListBtn.addEventListener('click', toggleList, true);

    var conditionListElement = document.createElement("div");
    conditionListElement.style.top = "100px";
    conditionListElement.style.left = "0px";
    conditionListElement.id = "conditionListElement";
    document.body.appendChild(conditionListElement);
    conditionListElement.classList.add("conditionsListHide");
    var conditionListBar = document.createElement("div");
    conditionListBar.id = "conditionListBar";
    conditionListBar.innerHTML = "Conditions:"
    conditionListElement.appendChild(conditionListBar);
    var conditionList = document.createElement("ul");
    conditionListElement.appendChild(conditionList);
    let conditions = JotForm.conditions;
    let calculations = JotForm.calculations;

    for (let iCon = 0; iCon < conditions.length; iCon++) {
        console.log(`Condition ${iCon}`, conditions[iCon]);
        var conditionLi = getConditionLi(conditions[iCon], iCon);
        conditionList.appendChild(conditionLi);
    }

    var delayTime = 200;
    document.body.addEventListener('click', function (event) {
        setTimeout(function () {
            updateList();
        }, delayTime);
    }, true);
    document.body.onkeydown = function (event) {
        setTimeout(function () {
            updateList();
        }, delayTime);
    };

    dragElement(document.getElementById("conditionListElement"));
    addCollapsible();
    updateList();

}

let operatorObj = {
    "equals": "IS EQUAL TO",
    "notEquals": "IS NOT EQUAL TO",
    "isFilled": "IS FILLED",
    "isEmpty": "IS EMPTY",
    "contains": "CONTAINS",
    "notContains": "DOESN'T CONTAIN",
    "startsWith": "STARTS WITH"
};

let resultOperators = [
    "notEquals",
    "equals",
    "contains",
    "notContains",
    "startsWith"
];


window.navigation.addEventListener("navigate", (event) => {
    console.log('location changed!');
    console.log(event);
    console.log(event.srcElement.currentEntry.url);
    currentUrl = event.destination.url + "";
    console.log(typeof currentUrl);
    if (currentUrl.includes("/settings/conditions")){
        console.log("In conditions, starting script");
    }
    else{
        console.log("Not in conditions, waiting");
    }
})
start();