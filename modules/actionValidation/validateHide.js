function validateHide(action){
    var field = JotForm.getFieldFromID(action.field);
    if (field.classList.contains("form-field-hidden")){
        return true;
    }
    else{
        return false;
    }
}