function addHoverEffect(element) {
    if (element.classList.contains("conditionExtHoverCheck")) {
        return;
    }
    function getClassListStr() {
        var classListStr = "";
        var classList = element.classList;
        classList.forEach(classEntry => {
            if (classEntry.indexOf("conflict-") > -1) {
                classListStr = classListStr + "." + classEntry + ",";
            }
        });
        classListStr = classListStr.slice(0, -1);
        return classListStr;
    }

    function addConflictClass() {
        try {
            var elms = document.querySelectorAll(getClassListStr());
        }
        catch {
            var elms = []
        }
        for (var i = 0; i < elms.length; i++) {
            elms[i].classList.add("conflictConditionHover");
        }
        //Check if hover is directly on an action and un-highlight any unrelated conflicts
        if (element.classList.contains("content-infos")) {
            let conflictClass = getClassListStr().slice(1);
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
        if (clickToggle) {
            if (element.classList.contains("conditionClicked")) {
                element.classList.remove("conditionClicked");
                clickToggle = false;
            }
        }
        else {
            element.classList.add("conditionClicked");
            clickToggle = true;
            addConflictClass();
        }
    }, false);
    element.classList.add("conditionExtHoverCheck");
}