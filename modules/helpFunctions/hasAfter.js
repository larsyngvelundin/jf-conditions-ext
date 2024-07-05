const hasAfter = selector => {
    // console.log("hasAfter Selector", selector);
    const el = document.querySelector(selector);
    return getComputedStyle(el, '::after').content !== 'none';
}
//Ori Drori on Stackoverflow
//https://stackoverflow.com/questions/58197145/how-to-detect-whether-an-element-has-after-pseudo-element