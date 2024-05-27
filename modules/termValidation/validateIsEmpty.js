function validateIsEmpty(term) {
    console.log("Checking an isFilled term");
    var field = JotForm.getFieldFromID(term.field);
    var fieldType = field.dataset.type;
    switch (fieldType) {
        case "control_textbox":
            currentInput = field.getElementsByTagName("input")[0].value;
            if (currentInput) {
                return false;
            }
            else {
                return true;
            }
            break;

        case "control_checkbox":
            let boxes = field.getElementsByClassName("form-checkbox");
            for (var i = 0; i < boxes.length; i++) {
                if (hasAfter(`#label_${boxes[i].id}`)) {
                    return false
                }
            }
            return true;
    }
}