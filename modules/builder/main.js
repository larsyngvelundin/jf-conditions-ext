var clickToggle = false; //find better solution for later
async function startInBuilder() {

    let conditionsListElement = await waitForElm('.listGroup-content');
    let conditionElements = conditionsListElement.getElementsByClassName("mediaBox");
    
    let htmlContent = await fetchHtmlContent();
    let conditions = await fetchFormProps(htmlContent);
    conditions = preprocessConditions(conditions.conditions);
    //preprocess conditions
    //use index and set a new "conditionIndex"
    //go through field/fields and save each as it's own "condition"
    //Save each action with a new "actionIndex"
    let questionProps = await fetchQuestionsProps(htmlContent);
    // console.log("conditions", conditions);
    // console.log("questionProps",questionProps);

    await preprocessElements(conditionElements, conditions, questionProps);

    var warningIcon = document.createElement("div");
    warningIcon.classList.add("conditionWarningIcon");
    warningIcon.innerHTML = "!";

    for (let iCon = 0; iCon < conditions.length - 1; iCon++) {

        //Use clone to remove eventListeners for now
        let cur_element = conditionElements[iCon].getElementsByClassName("mediaBox-content")[0];
        let new_element = cur_element.cloneNode(true);
        cur_element.parentNode.replaceChild(new_element, cur_element);

        // console.log(`Condition ${iCon}`, conditions[iCon]);
        // var conditionLi = getConditionLi(conditions[iCon], iCon);
        // conditionList.appendChild(conditionLi);
        if (conditions[iCon].type == "field" || conditions[iCon].type == "require" || conditions[iCon].type == "mask") {
            // console.log("Condition type:", conditions[iCon].type);
            for (let iAct = 0; iAct < conditions[iCon].action.length; iAct++) {
                //for each action
                //go through the actions of conditions after iCon
                for (let iCon2 = iCon + 1; iCon2 < conditions.length; iCon2++) {
                    for (let iAct2 = 0; iAct2 < conditions[iCon2].action.length; iAct2++) {
                        //if the field and type 'visibility' is the same
                        if (conditions[iCon].action[iAct].field ==
                            conditions[iCon2].action[iAct2].field
                            && getActionType(conditions[iCon].action[iAct]) ==
                            getActionType(conditions[iCon2].action[iAct2])) {

                            // console.log("SAME FIELD SAME ACTION");
                            // console.log(conditions[iCon].action[iAct]);
                            // conditionElements[iCon].style.backgroundColor = "red";
                            // let className = `conflict-${iCon}-${iAct}_${iCon2}-${iAct2}`;
                            let className = `conflict-${conditions[iCon].action[iAct].field}-${getActionType(conditions[iCon].action[iAct])}`;
                            conditionElements[iCon].classList.add(className);
                            conditionElements[iCon2].classList.add(className);
                            addHoverEffect(conditionElements[iCon]);
                            addHoverEffect(conditionElements[iCon2]);
                            let actionElements = conditionElements[iCon].querySelectorAll(".content-infos.do");
                            actionElements[iAct].classList.add(className);
                            addHoverEffect(actionElements[iAct]);
                            let actionElements2 = conditionElements[iCon2].querySelectorAll(".content-infos.do");
                            actionElements2[iAct2].classList.add(className);
                            addHoverEffect(actionElements2[iAct2]);
                            // conditionElements[iCon].classList.add(className);
                            //add an icon to warn
                            // console.log(conditionElements[iCon]);
                            // console.log(conditionElements[iCon].getElementsByClassName("conditionWarningIcon").length == 0);
                            if (conditionElements[iCon].getElementsByClassName("conditionWarningIcon").length == 0) {
                                conditionElements[iCon].appendChild(warningIcon.cloneNode());
                            }

                            // console.log(conditionElements[iCon2]);
                            // console.log(conditionElements[iCon2].getElementsByClassName("conditionWarningIcon").length == 0);
                            if (conditionElements[iCon2].getElementsByClassName("conditionWarningIcon").length == 0) {
                                conditionElements[iCon2].appendChild(warningIcon.cloneNode());
                            }
                        }
                    }
                }
                //add a class to the to the condition element
                //if possible also on the action element
            }
            addHoverEffect(conditionElements[iCon]);
        }
        else if (conditions[iCon].type == "calculation") {
            // console.log("Condition type:", conditions[iCon].type);
            for (let iAct = 0; iAct < conditions[iCon].action.length; iAct++) {
                for (let iCon2 = iCon + 1; iCon2 < conditions.length; iCon2++) {
                    for (let iAct2 = 0; iAct2 < conditions[iCon2].action.length; iAct2++) {
                        if (conditions[iCon].action[iAct].resultField ==
                            conditions[iCon2].action[iAct2].resultField) {
                            // console.log("SAME FIELD SAME ACTION");
                            // console.log(conditions[iCon].action[iAct]);
                            let className = `conflict-${conditions[iCon].action[iAct].resultField}-${getActionType(conditions[iCon].action[iAct])}`;
                            conditionElements[iCon].classList.add(className);
                            conditionElements[iCon2].classList.add(className);
                            addHoverEffect(conditionElements[iCon]);
                            addHoverEffect(conditionElements[iCon2]);
                            let actionElements = conditionElements[iCon].querySelectorAll(".content-infos.do");
                            actionElements[iAct].classList.add(className);
                            addHoverEffect(actionElements[iAct]);
                            let actionElements2 = conditionElements[iCon2].querySelectorAll(".content-infos.do");
                            actionElements2[iAct2].classList.add(className);
                            addHoverEffect(actionElements2[iAct2]);

                            // console.log(conditionElements[iCon]);
                            // console.log(conditionElements[iCon].getElementsByClassName("conditionWarningIcon").length == 0);
                            if (conditionElements[iCon].getElementsByClassName("conditionWarningIcon").length == 0) {
                                conditionElements[iCon].appendChild(warningIcon.cloneNode());
                            }

                            // console.log(conditionElements[iCon2]);
                            // console.log(conditionElements[iCon2].getElementsByClassName("conditionWarningIcon").length == 0);
                            if (conditionElements[iCon2].getElementsByClassName("conditionWarningIcon").length == 0) {
                                conditionElements[iCon2].appendChild(warningIcon.cloneNode());
                            }
                        }
                    }
                }
            }
        }
        else if (conditions[iCon].type == "page") {
            for (let iCon2 = iCon + 1; iCon2 < conditions.length; iCon2++) {
                if (conditions[iCon].action[0].skipHide ==
                    conditions[iCon2].action[0].skipHide &&
                    conditions[iCon].action[0].skipTo ==
                    conditions[iCon2].action[0].skipTo) {
                        let className = `conflict-${conditions[iCon].action[0].skipHide}-${conditions[iCon].action[0].skipTo}`;
                        conditionElements[iCon].classList.add(className);
                        conditionElements[iCon2].classList.add(className);
                        addHoverEffect(conditionElements[iCon]);
                        addHoverEffect(conditionElements[iCon2]);
                        let actionElements = conditionElements[iCon].querySelectorAll(".content-infos.do");
                        actionElements[0].classList.add(className);
                        addHoverEffect(actionElements[0]);
                        let actionElements2 = conditionElements[iCon2].querySelectorAll(".content-infos.do");
                        actionElements2[0].classList.add(className);
                        addHoverEffect(actionElements2[0]);
                        if (conditionElements[iCon].getElementsByClassName("conditionWarningIcon").length == 0) {
                            conditionElements[iCon].appendChild(warningIcon.cloneNode());
                        }
                        if (conditionElements[iCon2].getElementsByClassName("conditionWarningIcon").length == 0) {
                            conditionElements[iCon2].appendChild(warningIcon.cloneNode());
                        }
                }
            }
        }
    }
    //check for changes to the checkboxes, if a condition is selected, add the hovereffect for the conflicts
    addCss();
}