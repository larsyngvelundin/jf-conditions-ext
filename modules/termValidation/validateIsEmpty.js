function validateIsEmpty(term) {
    console.log("Checking an isFilled term");
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
            var boxes = field.getElementsByClassName("form-textbox");
            for (var i = 0; i < boxes.length; i++) {
                if (boxes[i].value.length > 0) {
                    return false;
                }
            }
            return true;
    }
}