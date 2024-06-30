function addHoverEffect(element) {
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
        if(element.classList.contains("content-infos")){
            console.log("Hovering directly on action");
            let conflictClass = getClassListStr().slice(1);
            console.log("conflictClass", conflictClass);
            let conditionsListElement = document.getElementsByClassName('listGroup-content')[0];
            let actionElements = conditionsListElement.getElementsByClassName("content-infos");
            for (var iActive = 0; iActive < actionElements.length; iActive++){
                if (!actionElements[iActive].classList.contains(conflictClass)) {
                    actionElements[iActive].classList.add("conflictConditionHoverOverride");
                }
            }
            let conditionElements = conditionsListElement.getElementsByClassName("mediaBox");
            for (var iActive = 0; iActive < conditionElements.length; iActive++){
                if (!conditionElements[iActive].classList.contains(conflictClass)) {
                    conditionElements[iActive].classList.add("conflictConditionHoverOverride");
                }
            }
            // var elms = document.querySelectorAll()
        }
    }
    function removeConflictClass() {
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
    element.onmouseover = function () {
        addConflictClass();
    };
    element.onmouseout = function () {
        removeConflictClass();
    };

    // for (var i = 0; i < n; i++) {
    //     elms[i].onmouseover = function () {
    //         addConflictClass();
    //     };
    //     elms[i].onmouseout = function () {
    //         removeConflictClass();
    //     };
    // }
}