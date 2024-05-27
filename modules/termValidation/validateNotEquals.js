function validateNotEquals(term) {
    console.log("Checking a notEquals term");
    console.log(term);
    fieldElement = JotForm.getFieldFromID(term.field);
    console.log("fieldElement", fieldElement);
    var fieldType = fieldElement.dataset.type;
    switch (fieldType) {
        case "control_checkbox":
            console.log("Checking a control_checkbox");
            let boxes = fieldElement.getElementsByClassName("form-checkbox");
            for (var i = 0; i < boxes.length; i++){
                console.log(boxes[i].value);
                var afterElement = getComputedStyle(boxes[i], ':after');
                console.log(afterElement);
                console.log(afterElement.getPropertyValue("isConnected"));
                console.log(afterElement.getPropertyValue("baseURI"));
                console.log(afterElement.getPropertyValue("clientHeight"));
                console.log(afterElement.getPropertyValue("parentElement"));
                console.log(afterElement.getPropertyValue("tagName"));
                if (term.value == boxes[i].value){
                    return false;
                }
            }
            //list all input type="checkbox"
            //check term against it
            break;
    }
    return true;
}