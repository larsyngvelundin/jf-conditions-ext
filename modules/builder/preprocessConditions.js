function preprocessConditions(conditions){
    for (let iCon = 0; iCon < conditions.length; iCon++) {
        // console.log(`Condition ${iCon}`, conditions[iCon]);
        if (conditions[iCon].type == "field") {
            // console.log("Condition type:", conditions[iCon].type);
            for (let iAct = 0; iAct < conditions[iCon].action.length; iAct++) {
                // console.log("Checking iCon", iCon, " and iAct", iAct);
                // console.log("Sleeping?");
                // await sleep(1000);
                // console.log("Has 'fields'?", conditions[iCon].action[iAct].hasOwnProperty("fields"));
                // console.log("Action:", conditions[iCon].action[iAct]);
                if (conditions[iCon].action[iAct].hasOwnProperty("fields")) {
                    // console.log("Inside fields");
                    let multiAction = conditions[iCon].action[iAct];
                    for (let iField = 0; iField < multiAction.fields.length; iField++) {
                        let newAction = {
                            "visibility": multiAction.visibility,
                            "field": multiAction.fields[iField]
                        }
                        // console.log("Adding new action for field", conditions[iCon].action[iAct].fields[iField]);
                        conditions[iCon].action.splice(iAct+iField + 1,0,newAction);

                    }
                    // console.log("Removing original action", iAct);
                    conditions[iCon].action.splice(iAct, 1);
                    // console.log("HOW CONDITION ACTIONS LOOKS AFTER");
                    // console.log(conditions[iCon].action);
                }
            }
        }
    }
    return conditions
}