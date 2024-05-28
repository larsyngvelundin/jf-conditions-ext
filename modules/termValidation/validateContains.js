function validateContains(term) {
    var field = JotForm.getFieldFromID(term.field);
    var fieldType = field.dataset.type;
    var equalToField = term.value[0] == "{" && term.value.slice(-1) == "}";
    console.log("DoesContain term:", term);
    if (equalToField) {
        targetFieldId = JotForm.getFieldIdFromFieldRef(term.value);
        targetField = JotForm.getFieldFromID(targetFieldId);
        
        switch (fieldType) {
            
        }
    }
    else {
        // var substring = term.value;
        switch (fieldType) {
            case "control_email":
                currentValue = field.getElementsByTagName("input")[0].value;
                if (currentValue.includes(term.value)){
                    return true;
                }
                return false;
        }
    }
    return false;
}