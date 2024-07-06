function validateNotEquals(term) {
    fieldElement = JotForm.getFieldFromID(term.field);
    var fieldType = fieldElement.dataset.type;
    switch (fieldType) {
        case "control_email":
            if (validateEquals(term)) {
                return false;
            }
            return true;
    }

    return false;
}