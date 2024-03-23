//From W3Schools
//https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_collapsible
function addCollapsible() {
    var coll = document.getElementsByClassName("collapsible");
    for (var i = 0; i < coll.length; i++) {
        coll[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var content = this.nextElementSibling;
            if (content.style.display === "inline-block") {
                content.style.display = "none";
                this.innerHTML = "&gt;";
            } else {
                content.style.display = "inline-block";
                this.innerHTML = "v";
            }
        });
    }
}