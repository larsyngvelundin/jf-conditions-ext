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
        let baseId = id.split("|")[0];
        let baseField = JotForm.getFieldFromID(baseId)
        // console.log("Here's basefield", baseField);
        fieldName = `Unkown Label ${id}`
        return fieldName;
    }
}