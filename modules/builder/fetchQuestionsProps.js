async function fetchQuestionsProps(htmlContent) {
    const questionPropsRegex = /window\.__questionProps\s*=\s*(\{[\s\S]*?\});/m;
    match = htmlContent.match(questionPropsRegex);
    let questionProps;
    if (match && match[1]) {
        let questionPropsString = match[1];
        try {
            questionProps = JSON.parse(questionPropsString);
            // // console.log("questionProps", questionProps);
        } catch (error) {
            console.error('Error parsing questionProps:', error);
        }
    } else {
        // console.log('The variable window.__questionProps was not found in the HTML content.');
    }
    return questionProps;
}