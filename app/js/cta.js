document.addEventListener('DOMContentLoaded', function() {

    var mike = "Nicola";
    var age = 27;

    var elem = document.getElementById("target");

    elem.innerHTML = mike + ' is ' + age + ' years old.';

    var clicker = document.getElementById("clicker");
    var changer = document.getElementById("changer");
    var number = Math.ceil(Math.random() * 100);

    clicker.addEventListener("click", function(){
        changer.innerHTML = 'You clicked me ' + number.toFixed(2) + ' times!';
    })
})

