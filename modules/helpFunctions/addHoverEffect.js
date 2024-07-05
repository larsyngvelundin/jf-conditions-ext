function addHoverEffect(element) {
    if(element.classList.contains("conditionExtHoverCheck")){
        return;
    }
    function getClassListStr() {
        var classListStr = "";
        var classList = element.classList;
        // console.log(" classListStr", classListStr);
        classList.forEach(classEntry => {
            // console.log("classEntry", classEntry);
            if (classEntry.indexOf("conflict-") > -1) {
                classListStr = classListStr + "." + classEntry + ",";
            }
        });
        classListStr = classListStr.slice(0, -1);
        // console.log("trying to show", classListStr);
        return classListStr;
    }

    // try {
    //     var elms = document.querySelectorAll(getClassListStr());
    // }
    // catch {
    //     var elms = []
    // }
    // console.log("elms", elms);
    // var n = elms.length;
    function addConflictClass() {
        try {
            var elms = document.querySelectorAll(getClassListStr());
            // console.log("this is the elements:", elms);
        }
        catch {
            var elms = []
        }
        for (var i = 0; i < elms.length; i++) {
            elms[i].classList.add("conflictConditionHover");
            // if (element.tagName == 'DIV'){
            //     elms[i].classList.remove("conflictConditionHover");
            // }
        }
        if (element.classList.contains("content-infos")) {
            // console.log("Hovering directly on action");
            let conflictClass = getClassListStr().slice(1);
            // console.log("conflictClass", conflictClass);
            let conditionsListElement = document.getElementsByClassName('listGroup-content')[0];
            let actionElements = conditionsListElement.getElementsByClassName("content-infos");
            for (var iActive = 0; iActive < actionElements.length; iActive++) {
                if (!actionElements[iActive].classList.contains(conflictClass)) {
                    actionElements[iActive].classList.add("conflictConditionHoverOverride");
                }
            }
            let conditionElements = conditionsListElement.getElementsByClassName("mediaBox");
            for (var iActive = 0; iActive < conditionElements.length; iActive++) {
                if (!conditionElements[iActive].classList.contains(conflictClass)) {
                    conditionElements[iActive].classList.add("conflictConditionHoverOverride");
                }
            }
            // var elms = document.querySelectorAll()
        }
    }
    function removeConflictClass() {
        if (!element.classList.contains("conditionClicked")) {
            try {
                var elms = document.querySelectorAll(getClassListStr());
            }
            catch {
                var elms = []
            }
            for (var i = 0; i < elms.length; i++) {
                elms[i].classList.remove("conflictConditionHover");
                elms[i].classList.remove("conflictConditionHoverOverride");
            }
        }
    }
    element.onmouseover = function () {
        console.log("Mouse hover, and clickToggle is", clickToggle);
        if (!clickToggle) {
            addConflictClass();
        }
    };
    element.onmouseout = function () {
        if (!clickToggle) {
            removeConflictClass();
        }
    };
    element.addEventListener("click", function (e) {
        console.log("element clicked");
        element.classList.toggle("conditionClicked");
        console.log("Is clicked?", element.classList.contains("conditionClicked"));
        console.log(element);
        if (element.classList.contains("conditionClicked")) {
            clickToggle = true;
            addConflictClass();
            console.log("Adding hover effects");
        }
        else {
            clickToggle = false;
            removeConflictClass();
            console.log("Removing hover effects");
        }

    }, false);

    element.classList.add("conditionExtHoverCheck");

    // for (var i = 0; i < n; i++) {
    //     elms[i].onmouseover = function () {
    //         addConflictClass();
    //     };
    //     elms[i].onmouseout = function () {
    //         removeConflictClass();
    //     };
    // }
}