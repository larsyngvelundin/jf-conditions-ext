function getFieldLabel(id) {
    try {
        fieldElement = JotForm.getFieldFromID(id);
        fieldName = fieldElement.getElementsByTagName("label")[0].innerHTML;
        fieldName = removeSpanTags(fieldName);
        fieldName = fieldName.trim();
        if (fieldName == "") {
            return "Empty Label"
        }
        return fieldName.trim();
    }
    catch (error) {
        fieldName = `Unkown Label ${id}`
        return fieldName;
    }
}