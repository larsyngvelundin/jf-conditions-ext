function validateEquals(term) {
    var field = JotForm.getFieldFromID(term.field);
    var fieldType = field.dataset.type;
    var equalToField = term.value[0] == "{" && term.value.slice(-1) == "}";
    if (equalToField) {
    }
    else {
        switch (fieldType) {
            case "control_email":
                currentInput = field.getElementsByTagName("input")[0].value;
                if (currentInput == term.value){
                    return true;
                }
                return false;
        }
    }
    return false;
}