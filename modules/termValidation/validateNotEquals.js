function validateNotEquals(term) {
    console.log("Checking a notEquals term");
    console.log(term);
    fieldElement = JotForm.getFieldFromID(term.field);
    var fieldType = fieldElement.dataset.type;
    var equalToField = term.value[0] == "{" && term.value.slice(-1) == "}";
    if (equalToField) {
        targetFieldId = JotForm.getFieldIdFromFieldRef(term.value);
        targetField = JotForm.getFieldFromID(targetFieldId);
        
        switch (fieldType) {
        }
    }
    else {
        switch (fieldType) {
            case "control_email":
                if (validateEquals(term)){
                    return false;
                }
                return true;
        }
    }
    return false;
}