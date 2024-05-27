function getConditionLi(condition, iCon) {
    var conditionLi = document.createElement("li");
    conditionLi.classList.add("conditionListEntry");
    var innerHTML = `<button type="button" style="display:inline-block;" class="collapsible">v</button>`;
    innerHTML += `<div class="content" style="display:inline-block;">`;
    innerHTML += `<div class="termDiv" style="display:block;">`;
    for (let iTer = 0; iTer < condition.terms.length; iTer++) {
        var term = condition.terms[iTer];
        innerHTML += `<div>`;
        innerHTML += `<span id="${iCon}-${iTer}" class="conditionTermResult"></span>`;
        innerHTML += `<b>IF</b> ${getFieldLabel(term.field)} <b>${operatorObj[term.operator]}</b>${resultOfTerm(term)}`;
        innerHTML += `</div>`;
    }
    innerHTML += "</div>"
    innerHTML += `<div class="actionDiv" style="display:block;">`;
    for (let iAct = 0; iAct < condition.action.length; iAct++) {
        var action = condition.action[iAct];
        console.log(action);
        if ('field' in action) {
            innerHTML += `<div>`;
            innerHTML += `<span id="${iCon}-${iAct}-${action.id}" class="conditionActionResult"></span>`;
            innerHTML += `<b>${action.visibility}</b> ${getFieldLabel(action.field)}`;
            innerHTML += `</div>`;
        }
        else if ('fields' in action) {
            innerHTML += `<div>`;
            innerHTML += `<b>${action.visibility}</b>`;
            for (let iFie = 0; iFie < action.fields.length; iFie++) {
                innerHTML += "<div>";
                var field = action.fields[iFie];
                innerHTML += `<span id="${iCon}-${iAct}-${iFie}" class="conditionActionResult"></span>`;
                innerHTML += ` ${getFieldLabel(field)}`
                innerHTML += "</div>";
            }
            innerHTML += `</div>`;
        }
        else if('resultField' in action){
            innerHTML += `<div>`;
            innerHTML += `<span id="${iCon}-${iAct}-${action.id}" class="conditionActionResult"></span>`;
            var equationId = action.equation;
            innerHTML += `<b>ADD</b> ${getFieldLabel(equationId.substring(1, equationId.length - 1))} to ${getFieldLabel(action.resultField)}`;
            innerHTML += `</div>`;
        }
        else{
            console.log("Couldn't find");
            console.log(action);
        }
    }
    innerHTML += "</div>"
    innerHTML += "</div>"
    conditionLi.innerHTML = innerHTML;
    return conditionLi;
}