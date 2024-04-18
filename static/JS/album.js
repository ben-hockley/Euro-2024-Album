var pageNumber = 0; //special stickers
checklist = document.getElementsByClassName('hideThis')[0].innerHTML;
checklist = checklist.slice(2,-3);
checklist = checklist.split(',), ('); //make string into array (390 items)
console.log(checklist);
updatePage(); //call after defining checklist

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

            if (checklist[cardNumber-1] == 1){
                document.getElementsByClassName('cardSpot')[i].style.backgroundColor = 'green';
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
});
document.getElementById('pageUp').addEventListener("click",function(){
    pageNumber += 1;
    updatePage();
})

