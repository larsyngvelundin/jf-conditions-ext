function getFieldLabel(id) {
    fieldElement = JotForm.getFieldFromID(id);
    fieldName = fieldElement.getElementsByTagName("label")[0].innerHTML;
    return fieldName;
}