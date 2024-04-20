//generate 5 random cards; card number from 1 to 390
for (i=0;i<5;i++){
    randomIndex = Math.floor(Math.random()*390 + 1)


    newCard = document.createElement('img');
    newCard.className = 'cardImg';
    newCard.setAttribute('src','/static/img/Stickers/' + randomIndex + '.png')

    document.getElementsByClassName('card')[i].appendChild(newCard);
}