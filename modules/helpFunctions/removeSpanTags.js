function removeSpanTags(str) {
    return str.replace(/<\/?span[^>]*>/g, '');
}