function validateShow(action){
    var field = JotForm.getFieldFromID(action.field);
    if (field.classList.contains("form-field-hidden")){
        return false;
    }
    else{
        return true;
    }
}