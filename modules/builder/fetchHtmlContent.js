async function fetchHtmlContent() {    
    let htmlContent = await fetch(window.location.href)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            throw new Error('Network response was not ok.');
        })
        .then(htmlString => {
            return htmlString;
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    return htmlContent;
}