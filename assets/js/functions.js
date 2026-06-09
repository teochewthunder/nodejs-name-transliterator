function isValidChineseName(name) {
    const re = /^[\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]+$/;
    return re.test(name);
}
