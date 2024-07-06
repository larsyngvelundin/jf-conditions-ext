async function fetchFormProps(htmlContent) {
    const formPropsRegex = /window\.__formProps\s*=\s*(\{[\s\S]*?\});/m;
    let match = htmlContent.match(formPropsRegex);
    let formProps;
    if (match && match[1]) {
        let formPropsString = match[1];
        try {
            formProps = JSON.parse(formPropsString);
        } catch (error) {
            console.error('Error parsing formProps:', error);
        }
    } else {
        console.log('%c ERROR: The variable window.__formProps was not found in the HTML content.', 'color: red;');
    }
    return formProps;
}