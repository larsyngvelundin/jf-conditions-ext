function addHoverEffect(className) {
    var elms = document.getElementsByClassName(className);
    var n = elms.length;
    function addConflictClass() {
        for (var i = 0; i < n; i++) {
            var elms = document.getElementsByClassName(className);
            // elms[i].style.backgroundColor = color;
            elms[i].classList.add("conflictConditionHover")
        }
    }
    function removeConflictClass() {
        for (var i = 0; i < n; i++) {
            // var elms = document.getElementsByClassName(className);
            // elms[i].style.backgroundColor = color;
            elms[i].classList.remove("conflictConditionHover")
            // elms[i].style.backgroundColor = color;
        }
    }
    for (var i = 0; i < n; i++) {
        elms[i].onmouseover = function () {
            // console.log(elms[i]);
            // elms[i].classList.add(conflictConditionHover)
            // changeColor("yellow");
            addConflictClass();
        };
        elms[i].onmouseout = function () {
            removeConflictClass();
            // elms[i].classList.remove(conflictConditionHover)
            // changeColor("white");
        };
    }
}