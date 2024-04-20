var pageNumber = 0; //special stickers
checklist = document.getElementsByClassName('hideThis')[0].innerHTML;
checklist = checklist.slice(2,-3);
checklist = checklist.split(',), ('); //make string into array (390 items)
console.log(checklist);
checklist[55] = 1; //Hungary Goalkeeper (Test; remove at end)
updatePage(); //call after defining checklist
formatPage();

//checklist is zero indexed -> ie. checklist[0] = cardNumber 1

function updatePage(){
    if (pageNumber==0){
        document.getElementById('pageDown').style.display = 'none';
        for (i=0;i<6;i++){
            document.getElementsByClassName('cardSpot')[i].style.display = 'block';
            document.getElementsByClassName('cardSpot')[i].innerHTML = i+1;

            if (checklist[i]==1){
                document.getElementsByClassName('cardSpot')[i].style.backgroundColor = 'green';
            } else {
                document.getElementsByClassName('cardSpot')[i].style.backgroundColor = 'white';
            };

        };
        for (i=6;i<16;i++){
            document.getElementsByClassName('cardSpot')[i].style.display = 'none';
        };
    } else {
        if (pageNumber==24){
            document.getElementById('pageUp').style.display = 'none';
        } else {
            document.getElementById('pageUp').style.display = 'block';
        };
        document.getElementById('pageDown').style.display = 'block';
        for (i=0;i<16;i++){
            document.getElementsByClassName('cardSpot')[i].style.display = 'block';
            cardNumber = (16*pageNumber) - 9 + i;
            document.getElementsByClassName('cardSpot')[i].innerHTML = cardNumber;

            if (checklist[cardNumber-1] == 0){

                //remove number to make room for sticker
                document.getElementsByClassName('cardSpot')[i].innerHTML = '';
                
                //stick sticker in if collected = true (1)
                sticker = document.createElement('img');
                sticker.className = 'sticker';
                sticker.setAttribute('src', '/static/img/Stickers/' + cardNumber + '.png');
                document.getElementsByClassName('cardSpot')[i].appendChild(sticker);
            } else {
                document.getElementsByClassName('cardSpot')[i].style.backgroundColor = 'white';
            }
        };
    };
    document.getElementById('pageNumber').innerHTML = pageNumber;
};

document.getElementById('pageDown').addEventListener("click",function(){
    pageNumber -= 1;
    updatePage();
    formatPage();
});
document.getElementById('pageUp').addEventListener("click",function(){
    pageNumber += 1;
    updatePage();
    formatPage();
})

function formatPage(){
    //adds title and changes background color depending on the team
    switch (pageNumber){
        case 0:
            //front page
            teamPage('Euro 2024', 'Green')
            break;
        case 1:
            //Switzerland
            teamPage('Switzerland', 'Red');
            break;
        case 2:
            teamPage('Germany', 'Black');
            break;
        case 3:
            teamPage('Scotland','DarkBlue');
            break;
        case 4:
            teamPage('Hungary','Green')
            break;
        case 5:
            teamPage('Croatia','Red')
            break;
        case 6:
            teamPage('Italy','Blue')
            break;
        case 7:
            teamPage('Albania','DarkRed')
            break;
        case 8:
            teamPage('Spain','Red')
            break;
        case 9:
            teamPage('Denmark','Red')
            break;
        case 10:
            teamPage('England','DarkBlue')
            break;
    }
}

function teamPage(Team, Color){
    //set background to team color
    document.getElementsByClassName('page')[0].style.backgroundColor = Color;
    document.getElementsByClassName('page')[1].style.backgroundColor = Color;

    //add Team Name to top of left page
    document.getElementsByClassName('TeamName')[0].innerHTML = Team;
}
