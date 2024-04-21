username = document.getElementById('spanUsername').innerHTML;

$("#packs").on("click", function() {
    window.location.href = '/openPacks/' + username;
});

$("#album").on("click", function() {
    window.location.href = '/album/' + username;
});
$("#backToHome").on("click", function() {
    window.location.href = '/home/' + username;
});