function addCss() {
    var ConditionListStyles = document.createElement("style");
    ConditionListStyles.innerHTML = `
    #conditionListBtn{
        --rem: 16;
        font-family: Verdana;
        box-sizing: border-box;
        cursor: pointer;
        transition: all 0.3s ease 0s;
        text-decoration: none;
        padding: 8px 12px;
        background-color: rgb(218, 222, 243);
        color: rgb(52, 60, 106);
        border: 1px solid rgb(151, 157, 198);
        font-size: 13px;
        font-weight: 500;
        border-radius: 4px;
        position: relative;
    }


    #conditionListElement {
        position: absolute;
        z-index: 9;
        background-color: #f1f1f1;
        text-align: left;
        border: 1px solid #d3d3d3;
      }
      
    #conditionListBar {
        padding: 10px;
        cursor: move;
        z-index: 10;
        background-color: #2196F3;
        color: #fff;
    }

    .collapsible{
        vertical-align: top;
    }

    .conditionsListHide{
        display:none;
    }

`;
    document.body.appendChild(ConditionListStyles);
}