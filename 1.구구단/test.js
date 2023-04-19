function fun1 () {
    console.log('fun1');
    const closure2 = (function () {
        console.log('fun2');
        return function () {
            console.log('fun3');
        }
    }) ();

    closure2();
}

console.log(document.querySelector('#track_form').children.namedItem('duration'));
document.querySelector('#track_form').addEventListener('submit', function (e) {
    console.log('submit');
});

getEventListeners(document.querySelector('#send_progress_btn'));

var f1 = temp1[0].listener;
function f_l (a) {
    console.log(a);
    return f1(a);
}

document.querySelector('#send_progress_btn').addEventListener('click', f_l);