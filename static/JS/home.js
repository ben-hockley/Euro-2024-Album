username = document.getElementById('spanUsername').innerHTML;

$("#packs").on("click", function() {
    window.location.href = '/openPacks/' + username; //redirects user to THEIR new sticker pack
});

$("#album").on("click", function() {
    window.location.href = '/album/' + username; //redirects user to THEIR sticker album
});

$("#backToHome").on("click", function() {
    window.location.href = '/home/' + username; //redirects user back to THEIR home page
});

$("#signOut").on("click", function() {
    window.location.href = '/signIn' //signs user out (redirects back to sign in page)
})
