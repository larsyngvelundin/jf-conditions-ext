var clickToggle = false; //find better solution for later
async function startInBuilder() {
    //getting the condition html elements
    let conditionsListElement = await waitForElm('.listGroup-content');
    let conditionElements = conditionsListElement.getElementsByClassName("mediaBox");

    //getting the form variables
    let htmlContent = await fetchHtmlContent();
    let formProps = await fetchFormProps(htmlContent);
    let questionProps = await fetchQuestionsProps(htmlContent);
    
    //preprocess conditions to unfold 'Multiple'
    conditions = preprocessConditions(formProps.conditions);
    
    //preocess the html elements to add all folded terms/actions
    await preprocessElements(conditionElements, conditions, questionProps);
    //maybe this await doesn't do anything?

    var warningIcon = document.createElement("div");
    warningIcon.classList.add("conditionWarningIcon");
    warningIcon.innerHTML = "!";


    //remove the existing click event that selects conditions when clicking on them
    for (let iCon = 0; iCon < conditions.length; iCon++) {
        let cur_element = conditionElements[iCon].getElementsByClassName("mediaBox-contentmain")[0];
        let clone_element = cur_element.cloneNode(true);
        cur_element.parentNode.replaceChild(clone_element, cur_element);
    }

    for (let iCon = 0; iCon < conditions.length - 1; iCon++) {
        //for now, these condition types are similar enough, might need to be separated later
        if (conditions[iCon].type == "field" || conditions[iCon].type == "require" || conditions[iCon].type == "mask") {
            for (let iAct = 0; iAct < conditions[iCon].action.length; iAct++) {
                for (let iCon2 = iCon + 1; iCon2 < conditions.length; iCon2++) {
                    for (let iAct2 = 0; iAct2 < conditions[iCon2].action.length; iAct2++) {
                        //if 2 actions are trying to affect the same field in the same way
                        if (conditions[iCon].action[iAct].field ==
                            conditions[iCon2].action[iAct2].field
                            && getActionType(conditions[iCon].action[iAct]) ==
                            getActionType(conditions[iCon2].action[iAct2])) {
                            let className = `conflict-${conditions[iCon].action[iAct].field}-${getActionType(conditions[iCon].action[iAct])}`;

                            conditionElements[iCon].classList.add(className);
                            conditionElements[iCon].classList.add("possibleConflict");
                            conditionElements[iCon2].classList.add(className);
                            conditionElements[iCon2].classList.add("possibleConflict");

                            let actionElements = conditionElements[iCon].querySelectorAll(".content-infos.do");
                            actionElements[iAct].classList.add(className);
                            actionElements[iAct].classList.add("possibleConflict");
                            let actionElements2 = conditionElements[iCon2].querySelectorAll(".content-infos.do");
                            actionElements2[iAct2].classList.add(className);
                            actionElements2[iAct2].classList.add("possibleConflict");

                            //redo to add warning icon after loop
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
        }
        else if (conditions[iCon].type == "calculation") {
            for (let iAct = 0; iAct < conditions[iCon].action.length; iAct++) {
                for (let iCon2 = iCon + 1; iCon2 < conditions.length; iCon2++) {
                    for (let iAct2 = 0; iAct2 < conditions[iCon2].action.length; iAct2++) {
                        if (conditions[iCon].action[iAct].resultField ==
                            conditions[iCon2].action[iAct2].resultField) {
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

                            //redo to add warning icon after loop
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

                        //redo to add warning icon after loop
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

    let conflictElements = conditionsListElement.getElementsByClassName("possibleConflict")
    for (let index = 0; index < conflictElements.length; index++) {
        addHoverEffect(conflictElements[index]);
    }

    addCss();
}