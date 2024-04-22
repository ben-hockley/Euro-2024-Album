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
//assign card numbers of cards packed to the hidden form for sqlite3 db.
document.getElementById('pack1').value = pack[0];
document.getElementById('pack2').value = pack[1];
document.getElementById('pack3').value = pack[2];
document.getElementById('pack4').value = pack[3];
document.getElementById('pack5').value = pack[4];

//get checklist (before new stickers added)
checklist = document.getElementById('checklist').innerHTML;
checklist = JSON.parse(checklist);


//check if cards are swaps or new
for (i=0;i<5;i++){
    cardNumber = pack[i];
    console.log("cardNo: "+cardNumber)
    if (checklist[cardNumber-1] == 1){
        console.log("swap");
    } else {
        console.log("new card!");

        newStickerTag = document.createElement('div');
        newStickerTag.classList.add('newStickerTag');
        //add bootstrap
        newStickerTag.classList.add('alert');
        newStickerTag.classList.add('alert-success');
        newStickerTag.innerHTML = 'NEW';
        document.getElementsByClassName('card')[i].appendChild(newStickerTag);
    }
}