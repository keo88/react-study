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