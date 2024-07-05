function resultOfTerm(term) {
    // console.log("term.operator", term.operator);
    // console.log("resultOperators", resultOperators);
    // console.log("term.operator in resultOperators", term.operator in resultOperators);
    if (resultOperators.includes(term.operator)) {
        return ` '${term.value}'`;
    }
    return "";
}