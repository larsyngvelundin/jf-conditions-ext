function addHoverEffect(element) {
    function getClassListStr() {
        var classListStr = "";
        var classList = element.classList;
        console.log(" classListStr", classListStr);
        classList.forEach(classEntry => {
            console.log("classEntry", classEntry);
            if (classEntry.indexOf("conflict-") > -1) {
                classListStr = classListStr + "." + classEntry + ",";
            }
        });
        classListStr = classListStr.slice(0, -1);
        console.log("trying to show", classListStr);
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
            console.log("this is the elements:", elms);
        }
        catch {
            var elms = []
        }
        for (var i = 0; i < elms.length; i++) {
            elms[i].classList.add("conflictConditionHover");
            if (element.tagName == 'DIV'){
                elms[i].classList.remove("conflictConditionHover");
            }
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