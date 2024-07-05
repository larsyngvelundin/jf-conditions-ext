async function fetchFormProps(htmlContent) {
    // // console.log("Fetching Full Question Names");
    const formPropsRegex = /window\.__formProps\s*=\s*(\{[\s\S]*?\});/m;
    let match = htmlContent.match(formPropsRegex);
    let formProps;
    if (match && match[1]) {
        let formPropsString = match[1];
        try {
            formProps = JSON.parse(formPropsString);
            // // console.log("formProps",formProps);
        } catch (error) {
            console.error('Error parsing formProps:', error);
        }
    } else {
        // console.log('The variable window.__formProps was not found in the HTML content.');
    }

    // // console.log("Returning formProps", formProps);
    return formProps;
}