const textarea = document.getElementById('code');

console.log(textarea);
textarea.onblur = (ev) => eval(ev.target.value);
