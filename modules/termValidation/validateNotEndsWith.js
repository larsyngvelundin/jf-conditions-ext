function validateNotEndsWith(term) {
    var field = JotForm.getFieldFromID(term.field);
    var fieldType = field.dataset.type;

    switch (fieldType) {
        case "control_email":
            if (validateEndsWith(term)) {
                return false;
            }
            return true;
    }

    return false;
}