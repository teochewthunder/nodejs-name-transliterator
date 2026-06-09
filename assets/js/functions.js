function setupNameValidation(id) {
    const re = /[^\u4E00-\u9FFF\u3400-\u4DBF\uF900-\uFAFF]/g;

    const input = document.getElementById(id);

    input.addEventListener("input", (e) => {
        e.target.value = e.target.value.replace(re, "");
    });
}
