function preprocessElements(elementList, conditions, questions) {
    // console.log("Processing Elements");
    // console.log("elementList", elementList);
    // console.log("conditions", conditions);
    // console.log("questions", questions);

    for (let iCon = 0; iCon < conditions.length; iCon++) {
        //Check Terms
        let termElementCount = elementList[iCon].getElementsByClassName("if").length;
        // console.log("Found this many term elements:", termElementCount);
        // console.log("Found this many terms in condition:", conditions[iCon].terms.length);
        if (termElementCount != conditions[iCon].terms.length) {
            //for simplicity's sake, delete current term elements
            let termElements = elementList[iCon].getElementsByClassName("if");
            for (let iTer = termElements.length - 1; iTer >= 0; iTer--) {
                termElements[iTer].remove();
            }


            // console.log("There's elements to be unfolded for condition:", iCon);
            let moreElement = elementList[iCon].getElementsByClassName("more")[0];
            // console.log("The more element?", moreElement);
            //What even is this selector
            let spanElement = elementList[iCon].getElementsByClassName("content")[0].getElementsByTagName("span")[0];
            // console.log("The  spanElement?", spanElement);
            for (let iTer = 0; iTer < conditions[iCon].terms.length; iTer++) {

                let newTermElement = createTermElement(conditions[iCon].terms[iTer], questions);
                spanElement.insertBefore(newTermElement, moreElement);
                // // console.log(newTermElement);
            }
            moreElement.remove();

            //Check Actions


        }



        let actionElementCount = elementList[iCon].getElementsByClassName("do").length;
        // console.log("Found this many action elements:", actionElementCount);
        // console.log("Found this many actions in condition:", conditions[iCon].action.length);

        if (actionElementCount != conditions[iCon].action.length) {
            // console.log("There's elements to be unfolded for condition:", iCon);
            //for simplicity's sake, delete current action elements
            let actionElements = elementList[iCon].getElementsByClassName("do");
            for (let iAct = actionElements.length - 1; iAct >= 0; iAct--) {
                actionElements[iAct].remove();
            }

            let moreElement = elementList[iCon].getElementsByClassName("more")[0];
            // console.log("The more element?", moreElement);
            //What even is this selector
            let spanElement = elementList[iCon].getElementsByClassName("content")[0].getElementsByTagName("span")[0];
            // console.log("The  spanElement?", spanElement);
            for (let iAct = 0; iAct < conditions[iCon].action.length; iAct++) {

                let newActionElement = createActionElement(conditions[iCon].action[iAct], questions);
                spanElement.insertBefore(newActionElement, moreElement);
                // // console.log(newTermElement);
            }
            moreElement.remove();
        }


    }
    return "done";
}

function createActionElement(action, questions) {
    // <div class="content-infos do icon_HideMultiple">
    let parentElement = document.createElement("div");
    parentElement.classList.add("content-infos");
    parentElement.classList.add("do");
    // Add logic to set the icon class
    // Maybe not even needed?
    // parentElement.classList.add("icon_HideMultiple");

    //     <div class="info bgColor-before">
    let secondElement = document.createElement("div");
    secondElement.classList.add("info");
    secondElement.classList.add("bgColor-before");
    parentElement.appendChild(secondElement);

    //         <div class="content-infos-icon content-infos-icon-field">
    let thirdElement = document.createElement("div");
    thirdElement.classList.add("content-infos-icon");
    thirdElement.classList.add("content-infos-icon-field");
    secondElement.appendChild(thirdElement);

    //             <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="16" height="16">
    let svgNamespace = 'http://www.w3.org/2000/svg';
    let svgElement = document.createElementNS(svgNamespace, 'svg');
    svgElement.setAttribute('xmlns', svgNamespace);
    svgElement.setAttribute('fill', 'currentColor');
    svgElement.setAttribute('viewBox', '0 0 24 24');
    svgElement.setAttribute('width', '16');
    svgElement.setAttribute('height', '16');
    // <path>
    let pathElement = document.createElementNS(svgNamespace, 'path');
    pathElement.setAttribute('fill-rule', 'evenodd');
    pathElement.setAttribute('d', getActionSvgPath(action));
    pathElement.setAttribute('clip-rule', 'evenodd');
    svgElement.appendChild(pathElement);
    thirdElement.appendChild(svgElement);
    //                 </path>
    //             </svg>
    //         </div>
    //         <div class="text-truncate " style="width: calc(100% - 5px);">
    //             <b> Hide </b>
    //             <span class=""></span>
    //             <span class="">Type a question</span>
    //         </div>
    let termTextElement = document.createElement("div");
    termTextElement.classList.add("text-truncate");
    termTextElement.style.width = "calc(100% - 5px)";
    // Add logic for different condition types
    termTextElement.innerHTML = getActionText(action, questions);
    secondElement.appendChild(termTextElement);
    //     </div>
    // </div>
    return parentElement;
}
// `<b> ${getActionText(action)} </b><span class=""></span> <span>${questions[action.field].text}</span>`
function getActionText(action, questions) {
    if (action.hasOwnProperty("visibility")) {
        let actionType = action.visibility;
        switch (actionType) {
            case "HideMultiple":
            case "Hide":
                // return "Hide";
                return `<b> Hide </b><span class=""></span> <span>${questions[action.field].text}</span>`;
            case "ShowMultiple":
            case "Show":
                return `<b> Show </b><span class=""></span> <span>${questions[action.field].text}</span>`;
            case "UnrequireMultiple":
            case "RequireMultiple":
            case "Unrequire":
            case "Require":
                return "not yet added"
        }
        return `'${actionType}' (not yet added)`;
    }
    else if (action.hasOwnProperty("skipHide")) {

    }
    else if (action.hasOwnProperty("newCalculationType")) {
        return "(not yet added)";
    }
    return `(Action type not yet added)`;
}

function getActionSvgPath(action) {
    if (action.hasOwnProperty("visibility")) {
        let actionType = action.visibility;
        switch (actionType) {
            case "Show":
            case "ShowMultiple":
                return "M12 4C9.277 4 7.031 5.239 5.33 6.698c-1.7 1.458-2.89 3.164-3.512 4.174-.43.697-.43 1.56 0 2.256.623 1.01 1.812 2.716 3.512 4.174C7.032 18.762 9.278 20 12 20c2.72 0 4.967-1.239 6.668-2.698 1.7-1.458 2.89-3.164 3.513-4.174a2.138 2.138 0 0 0 0-2.256c-.623-1.01-1.812-2.716-3.513-4.174C16.968 5.238 14.721 4 12 4Zm0 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm2-4a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z";
            case "Hide":
            case "HideMultiple":
                return 'M3.293 3.293a1 1 0 0 1 1.414 0l16 16a1 1 0 0 1-1.414 1.414l-16-16a1 1 0 0 1 0-1.414Zm13.046 14.461.728.728C15.636 19.372 13.938 20 12 20c-2.721 0-4.967-1.239-6.669-2.698-1.7-1.458-2.89-3.164-3.512-4.174a2.136 2.136 0 0 1 0-2.256c.62-1.005 1.8-2.699 3.487-4.152l.71.709 2.538 2.54a4 4 0 0 0 5.478 5.478l2.308 2.307Zm-.347-6a4 4 0 0 0-3.747-3.747L9.211 4.973l-.39-.39A9.032 9.032 0 0 1 11.998 4c2.722 0 4.968 1.239 6.67 2.698 1.7 1.458 2.89 3.164 3.512 4.174.429.697.429 1.56 0 2.256a19.216 19.216 0 0 1-2.061 2.754l-.354-.354-3.774-3.774Zm-5.925-.272a2 2 0 0 0 2.45 2.45l-2.45-2.45Z';
            case "UnrequireMultiple":
            case "RequireMultiple":
            case "Unrequire":
            case "Require":
                return "M12 4a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L14 12l4.562 2.634a1 1 0 0 1-1 1.732L13 13.732V19a1 1 0 1 1-2 0v-5.268l-4.563 2.634a1 1 0 1 1-1-1.732L10 12 5.437 9.366a1 1 0 0 1 1-1.732L11 10.268V5a1 1 0 0 1 1-1Z";
        }
    }
    else if (action.hasOwnProperty("skipHide")) {

    }
    else if (action.hasOwnProperty("newCalculationType")) {
        return "M7 1a3 3 0 0 0-3 3v16a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H7Zm.5 17a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h5a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-5ZM7 14.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm.5-4.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1ZM8 4a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H8Zm3 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm4.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm-4 4a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5h-1Zm3.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Zm0 4a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1Z";
    }

    // Random shape when action isn't found
    return "M 7 1 a 3 3 0 0 0 -3 3 v 16 a 3 3 0 0 0 3 3 h 10 a 3 3 0 0 0 3 -3 V 4 a 3 3 0 0 0 -3 -3 H 7 Z Z Z Z Z Z Z Z Z Z";
}


function createTermElement(term, questions) {
    let parentElement = document.createElement("div");
    parentElement.classList.add("content-infos");
    parentElement.classList.add("if");
    let secondElement = document.createElement("div");
    secondElement.classList.add("info");
    secondElement.classList.add("bgColor-before");
    parentElement.appendChild(secondElement);
    let thirdElement = document.createElement("div");
    thirdElement.classList.add("content-infos-icon");
    thirdElement.classList.add("content-infos-icon-arrow");
    secondElement.appendChild(thirdElement);
    let svgNamespace = 'http://www.w3.org/2000/svg';
    let svgElement = document.createElementNS(svgNamespace, 'svg');
    svgElement.setAttribute('xmlns', svgNamespace);
    svgElement.setAttribute('fill', 'currentColor');
    svgElement.setAttribute('viewBox', '0 0 24 24');
    svgElement.setAttribute('width', '16');
    svgElement.setAttribute('height', '16');
    let pathElement = document.createElementNS(svgNamespace, 'path');
    pathElement.setAttribute('fill-rule', 'evenodd');
    pathElement.setAttribute('d', 'M14.707 6.293a1 1 0 1 0-1.414 1.414L16.586 11H5a1 1 0 1 0 0 2h11.586l-3.293 3.293a1 1 0 0 0 1.414 1.414l5-5a1 1 0 0 0 0-1.414l-5-5Z');
    pathElement.setAttribute('clip-rule', 'evenodd');
    svgElement.appendChild(pathElement);
    thirdElement.appendChild(svgElement);
    let termTextElement = document.createElement("div");
    termTextElement.classList.add("text-truncate");
    termTextElement.style.width = "calc(100% - 5px)";
    termTextElement.innerHTML = `<b> If </b><span>${questions[term.field].text}</span><b>Is </b><b>${getTermText(term.operator)}</b><span></span>`;
    secondElement.appendChild(termTextElement);
    return parentElement;
}

function getTermText(operator) {
    switch (operator) {
        case "isEmpty":
            return "Empty";
        case "isFilled":
            return "Filled";
    }
    return `'${operator}' (term operator not yet added)`;
}
