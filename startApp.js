$( document ).ready(function() {
    if (localStorage.user != undefined) {
        $('#root').fadeOut(200);
        $('#root').fadeIn(200).load('scheduler/scheduler.html');
    } else {
        $('#root').load('login/login.html');
    }
});