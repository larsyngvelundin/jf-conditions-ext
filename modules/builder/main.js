async function startInBuilder(){

    
    // let htmlContent = document.innerHTML;
    // console.log("content:",htmlContent);
    
    
    let conditionsListElement = await waitForElm('.listGroup-content');
    
    console.log("found condition list element");
    console.log(conditionsListElement);
    let conditionElements = conditionsListElement.getElementsByClassName("mediaBox");
    console.log("fetched conditionElements");
    console.log(conditionElements);
    // var conditions = __formProps.conditions;
    let htmlContent = await fetchHtmlContent();
    let conditions = await fetchFormProps(htmlContent);
    conditions = conditions.conditions;
    let questionProps = await fetchQuestionsProps(htmlContent);
    console.log("conditions",conditions);
    // console.log("questionProps",questionProps);

    var warningIcon = document.createElement("div");
    warningIcon.classList.add("conditionWarningIcon");
    warningIcon.innerHTML = "!";

    for (let iCon = 0; iCon < conditions.length - 1; iCon++) {
        console.log(`Condition ${iCon}`, conditions[iCon]);
        // var conditionLi = getConditionLi(conditions[iCon], iCon);
        // conditionList.appendChild(conditionLi);
        if (conditions[iCon].type == "field") {
            console.log("Field Condition");
            for (let iAct = 0; iAct < conditions[iCon].action.length; iAct++) {
                //for each action
                //go through the actions of conditions after iCon
                for (let iCon2 = iCon + 1; iCon2 < conditions.length; iCon2++) {
                    for (let iAct2 = 0; iAct2 < conditions[iCon2].action.length; iAct2++) {
                        //if the field and type 'visibility' is the same
                        if (conditions[iCon].action[iAct].field ==
                            conditions[iCon2].action[iAct2].field
                            && getActionType(conditions[iCon].action[iAct].visibility) ==
                            getActionType(conditions[iCon2].action[iAct2].visibility)) {
                            console.log("SAME FIELD SAME ACTION");
                            console.log(conditions[iCon].action[iAct]);
                            // conditionElements[iCon].style.backgroundColor = "red";
                            let className = `conflict-${iCon}-${iAct}_${iCon2}-${iAct2}`;
                            conditionElements[iCon].classList.add(className);
                            conditionElements[iCon2].classList.add(className);
                            addHoverEffect(className);
                            // conditionElements[iCon].classList.add(className);
                        

                            //add an icon to warn
                            console.log(conditionElements[iCon]);
                            console.log(conditionElements[iCon].getElementsByClassName("conditionWarningIcon").length == 0);
                            if (conditionElements[iCon].getElementsByClassName("conditionWarningIcon").length == 0) {
                                conditionElements[iCon].appendChild(warningIcon.cloneNode());
                            }

                            console.log(conditionElements[iCon2]);
                            console.log(conditionElements[iCon2].getElementsByClassName("conditionWarningIcon").length == 0);
                            if (conditionElements[iCon2].getElementsByClassName("conditionWarningIcon").length == 0) {
                                conditionElements[iCon2].appendChild(warningIcon.cloneNode());
                            }
                        }
                    }
                }

                //add a class to the to the condition element
                //if possible also on the action element
            }
        }
    }
    //check for changes to the checkboxes, if a condition is selected, add the hovereffect for the conflicts
    addCss();
}