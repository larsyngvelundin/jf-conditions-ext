
console.log("Loaded script");




function sleep(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function listAll(){
    
    await waitForElm(".form-all");
    var formToolbar = await waitForElm("#form-toolbar");
    var formToolbarRight = formToolbar.getElementsByClassName("right")[0];
    var conditionListBtn = document.createElement("div");
    conditionListBtn.innerHTML = "TEST";
    formToolbarRight.appendChild(conditionListBtn);


    console.log(JotForm);
    console.log("Conditions", JotForm.conditions);
    console.log("Calculations", JotForm.calculations);
    console.log("Field Conditions", JotForm.fieldConditions);
    console.log("Listing all:");
    console.log(listAll.name);
    for(let i = 0; i < 100; i++){
        let conditions = JotForm.conditions;
        let calculations = JotForm.calculations;
        for(let iCon = 0; iCon < conditions.length; iCon++){
            //List index
            console.log(`Condition: ${conditions[iCon].index}`);
            //List IFs
            console.log(conditions[iCon]);
            //List DOs

            //List currentlyTrue
            let currentlyTrueString = "";
            for (let iTrue = 0; iTrue < conditions[iCon].action.length; iTrue++){
                if(conditions[iCon].action[iTrue].currentlyTrue == false){
                    currentlyTrueString += "❌";
                }
                else{
                    currentlyTrueString += "✅";
                }
            }
            console.log(currentlyTrueString);

        }
        await sleep(1000);
        console.log("Delayed for 1 second.");


    }
}

// From Yong Wang on Stack Overflow
// https://stackoverflow.com/a/61511955
function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }
        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                observer.disconnect();
                resolve(document.querySelector(selector));
            }
        });
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

;var test = "this is a test";
listAll();