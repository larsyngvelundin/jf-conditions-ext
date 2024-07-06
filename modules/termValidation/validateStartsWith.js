function validateStartsWith(term) {
    var field = JotForm.getFieldFromID(term.field);
    var fieldType = field.dataset.type;
    var equalToField = term.value[0] == "{" && term.value.slice(-1) == "}";
    if (equalToField) {
        targetFieldId = JotForm.getFieldIdFromFieldRef(term.value);
        targetField = JotForm.getFieldFromID(targetFieldId);

        switch (fieldType) {
            case "control_email":
                currentValue = field.getElementsByTagName("input")[0].value;
                targetFieldValue = targetField.getElementsByTagName("input")[0].value;
                if (targetFieldValue && currentValue.startsWith(targetFieldValue)) {
                    return true;
                }
                return false;
        }
    }
    else {
        switch (fieldType) {
            case "control_email":
                currentValue = field.getElementsByTagName("input")[0].value;
                if (currentValue.startsWith(term.value)) {
                    return true;
                }
                return false;
        }
    }
    return false;
}