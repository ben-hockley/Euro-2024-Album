//generate 5 random cards; card number from 1 to 

pack = []; //array to hold all cards in the pack
username = window.location.href.split("/").pop();
console.log(username)

for (i=0;i<5;i++){
    randomIndex = Math.floor(Math.random()*390 + 1)
    pack.push(randomIndex)

    newCard = document.createElement('img');
    newCard.className = 'cardImg';
    newCard.setAttribute('src','/static/img/Stickers/' + randomIndex + '.png')

    document.getElementsByClassName('card')[i].appendChild(newCard);
}

document.getElementById('uname').value = username;
document.getElementById('pack1').value = pack[0];
document.getElementById('pack2').value = pack[1];
document.getElementById('pack3').value = pack[2];
document.getElementById('pack4').value = pack[3];
document.getElementById('pack5').value = pack[4];