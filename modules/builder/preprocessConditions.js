function preprocessConditions(conditions){
    for (let iCon = 0; iCon < conditions.length; iCon++) {
        if (conditions[iCon].type == "field" || conditions[iCon].type == "require") {
            for (let iAct = 0; iAct < conditions[iCon].action.length; iAct++) {
                if (conditions[iCon].action[iAct].hasOwnProperty("fields")) {
                    let multiAction = conditions[iCon].action[iAct];
                    for (let iField = 0; iField < multiAction.fields.length; iField++) {
                        let newAction = {
                            "visibility": multiAction.visibility,
                            "field": multiAction.fields[iField]
                        }
                        conditions[iCon].action.splice(iAct+iField + 1,0,newAction);

                    }
                    conditions[iCon].action.splice(iAct, 1);
                }
            }
        }
    }
    // console.log("preprocessed conditions", conditions);
    return conditions
}