function getFieldText(id, questions) {
    try {
        fieldName = questions[id].text
        fieldName = removeSpanTags(fieldName);
        fieldName = fieldName.trim();
        if (fieldName == "") {
            return "Empty Label"
        }
        return fieldName.trim();
    }
    catch (error) {
        try{
            let baseId = id.split("|")[0];
            let baseField = questions[baseId]
            let subId = `field_${id.split("|")[1]}`
            return `${baseField.text} / ${baseField.sublabels[subId]}`
        }
        catch (error){
            fieldName = `Unkown Label ${id}`
            return fieldName;
        }
    }
}