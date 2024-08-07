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
    
    #conditionListElement > ul{
        padding-inline-start: 0px;
        margin-block-start: 0px;
        margin-block-end: 0px;
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

    .conditionListEntry{
        padding: 5px;
        font-size: 14px;
        line-height: 1.618em;
        list-style: none;
    }

    .conditionWarningIcon::before{
        content: "!";
        position: absolute;
        right: 10px;
        top: 4px;
        color: red;
    }
    li.mediaBox, div.content-infos{
        border: #ffffff00 solid 2px !important;
        box-sizing: border-box;
    }

    .conflictCondition{
        border: red dotted 1px;
    }

    li.conflictConditionHover{
        border: red solid 2px !important;
        border-radius: 3px;
    }
    li.conditionClicked{
        background-color: #FFE2E3 !important;
    }
    div.conflictConditionHover{
        border: orange solid 2px !important;
    }
    div.conditionClicked{
        background-color: #FED8B1;
    }

    li.conflictConditionHover.conflictConditionHoverOverride, div.conflictConditionHover.conflictConditionHoverOverride{
        border: #ffffff00 solid 2px !important;
    }

`;
    document.body.appendChild(ConditionListStyles);
}