function getFieldText(id, questions) {
    try {
        // fieldElement = JotForm.getFieldFromID(id);
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
            console.log("Base field id:", baseId);
            let baseField = questions[baseId]
            console.log("Here's basefield", baseField);
            let subId = `field_${id.split("|")[1]}`
            return `${baseField.text} / ${baseField.sublabels[subId]}`
        }
        catch (error){
            fieldName = `Unkown Label ${id}`
            return fieldName;
        }
    }
}