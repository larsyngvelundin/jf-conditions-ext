function validateIsEmpty(term) {
    var field = JotForm.getFieldFromID(term.field);
    var fieldType = field.dataset.type;
    switch (fieldType) {
        case "control_email":
        case "control_textbox":
            currentInput = field.getElementsByTagName("input")[0].value;
            if (currentInput) {
                return false;
            }
            else {
                return true;
            }

        case "control_checkbox":
            var boxes = field.getElementsByClassName("form-checkbox");
            for (var i = 0; i < boxes.length; i++) {
                if (hasAfter(`#label_${boxes[i].id}`)) {
                    return false
                }
            }
            return true;

        case "control_fullname":
        case "control_address":
            if (validateIsFilled(term)) {
                return false;
            }
            return true;
    }
}