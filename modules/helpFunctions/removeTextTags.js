function removeTextTags(str) {
    str = str.replace(/<\/?span[^>]*>/g, '');
    // str = str.replace(/<\/?p[^>]*>/g, '');
    str = str.replace(/<\/?img[^>]*>/g, '');
    return str;
}