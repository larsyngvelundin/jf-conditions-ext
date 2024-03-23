function validateIsFilled(term) {
    console.log("Checking an isFilled term");
    var field = JotForm.getFieldFromID(term.field);
    var fieldType = field.dataset.type;
    switch (fieldType){
        case "control_textbox":
            currentInput = field.getElementsByTagName("input")[0].value;
            if (currentInput == ""){
                return false;
            }
            else{
                return true;
            }
    }
}