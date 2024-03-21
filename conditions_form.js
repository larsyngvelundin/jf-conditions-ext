console.log("Loaded script");


function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function start() {


    await waitForElm(".form-all");

    var ConditionListStyles = document.createElement("style");
    ConditionListStyles.innerHTML = `
    #conditionListBtn{
        --rem: 16;
        font-family: Verdana;
        box-sizing: border-box;
        cursor: pointer;
        transition: all 0.3s ease 0s;
        text-decoration: none;
        padding: 8px 12px;
        background-color: rgb(218, 222, 243);
        color: rgb(52, 60, 106);
        border: 1px solid rgb(151, 157, 198);
        font-size: 13px;
        font-weight: 500;
        border-radius: 4px;
        position: relative;
    }


    #conditionListElement {
        position: absolute;
        z-index: 9;
        background-color: #f1f1f1;
        text-align: center;
        border: 1px solid #d3d3d3;
      }
      
    #conditionListBar {
        padding: 10px;
        cursor: move;
        z-index: 10;
        background-color: #2196F3;
        color: #fff;
    }

    .conditionsListHide{
        display:none;
    }
`;
    document.body.appendChild(ConditionListStyles);

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
    // conditionListElement.classList.add("conditionsListHide");
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


    document.body.addEventListener('click', function (event) {
        setTimeout(function () {
            updateList(event);
        }, 100); // Delay in milliseconds
    }, true);
    // console.log(JotForm);
    // console.log("Conditions", JotForm.conditions);
    // console.log("Calculations", JotForm.calculations);
    // console.log("Field Conditions", JotForm.fieldConditions);
    // console.log("Listing all:");
    // console.log(listAll.name);
    // for(let i = 0; i < 100; i++){
    //     let conditions = JotForm.conditions;
    //     let calculations = JotForm.calculations;
    //     for(let iCon = 0; iCon < conditions.length; iCon++){
    //         //List index
    //         console.log(`Condition: ${conditions[iCon].index}`);
    //         //List IFs
    //         console.log(conditions[iCon]);
    //         //List DOs

    //         //List currentlyTrue
    //         let currentlyTrueString = "";
    //         for (let iTrue = 0; iTrue < conditions[iCon].action.length; iTrue++){
    //             if(conditions[iCon].action[iTrue].currentlyTrue == false){
    //                 currentlyTrueString += "❌";
    //             }
    //             else{
    //                 currentlyTrueString += "✅";
    //             }
    //         }
    //         console.log(currentlyTrueString);

    //     }
    //     await sleep(1000);
    //     console.log("Delayed for 1 second.");

    dragElement(document.getElementById("conditionListElement"));


}

operatorObj = {
    "notEquals": "IS NOT EQUAL TO"
}
function getFieldLabel(id) {
    fieldElement = JotForm.getFieldFromID(id);
    fieldName = fieldElement.getElementsByTagName("label")[0].innerHTML;
    return fieldName;
}

function getConditionLi(condition, iCon) {
    var conditionLi = document.createElement("li");
    // conditionLi.innerHTML = condition.id;
    // conditionLi.innerHTML = "";
    var innerHTML = "";
    for (let iTer = 0; iTer < condition.terms.length; iTer++) {
        var term = condition.terms[iTer];
        innerHTML += `<b>IF</b> ${getFieldLabel(term.field)} <b>${operatorObj[term.operator]}</b> "${term.value}"<br>`;
    }
    for (let iAct = 0; iAct < condition.action.length; iAct++) {
        var action = condition.action[iAct];
        console.log(action);
        if ('field' in action) {
            innerHTML += `<b>${action.visibility}</b> ${getFieldLabel(action.field)}`;
        }
        innerHTML += `<div id="${iCon}-${iAct}-${action.id}" class="conditionCurrentResult"></div>`;
    }
    conditionLi.innerHTML = innerHTML;
    return conditionLi;
}

// {
//     "action": [
//         {
//             "id": "action_1709938873506",
//             "visibility": "Show",
//             "isError": false,
//             "field": "13",
//             "currentlyTrue": true
//         }
//     ],
//     "id": "1709938882341",
//     "index": "0",
//     "link": "Any",
//     "priority": "0",
//     "terms": [
//         {
//             "id": "term_1709938873506",
//             "field": "31",
//             "operator": "notEquals",
//             "value": "No",
//             "isError": false
//         }
//     ],
//     "type": "field"
// }

async function updateList() {
    console.log("Updating list");
    var resultElements = document.getElementsByClassName("conditionCurrentResult");
    for (let iEl = 0; iEl < resultElements.length; iEl++) {
        console.log(resultElements[iEl].id);
        var parts = resultElements[iEl].id.split("-");
        var iCon = parts[0];
        var iAct = parts[1];
        var currentStatus = JotForm.conditions[iCon].action[iAct].currentlyTrue;
        if (currentStatus) {
            console.log("true for this");
            resultElements[iEl].innerHTML = "✅";
        }
        else {
            console.log("false for this");
            resultElements[iEl].innerHTML = "❌";
        }
        // console.log(iEl);
    }
}

async function toggleList() {
    console.log("Toggling list");
    var conditionListElement = document.getElementById("conditionListElement");
    conditionListElement.classList.toggle("conditionsListHide");
}


// From Yong Wang on Stack Overflow
// https://stackoverflow.com/a/61511955
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

//From W3Schools
//https://www.w3schools.com/howto/howto_js_draggable.asp
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById("conditionListBar")) {
        document.getElementById("conditionListBar").onmousedown = dragMouseDown;
    } else {
        elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

start();