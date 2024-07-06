function resultOfTerm(term) {
    if (resultOperators.includes(term.operator)) {
        return ` '${term.value}'`;
    }
    return "";
}