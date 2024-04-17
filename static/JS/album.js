var pageNumber = 0; //special stickers
updatePage();
checklist = document.getElementsByClassName('hideThis')[0].innerHTML;
checklist = checklist.slice(2,-3);
checklist = checklist.split(',), ('); //make string into array (390 items)
console.log(checklist);

function updatePage(){
    if (pageNumber==0){
        document.getElementById('pageDown').style.display = 'none';
        for (i=0;i<6;i++){
            document.getElementsByClassName('cardSpot')[i].style.display = 'block';
            document.getElementsByClassName('cardSpot')[i].innerHTML = i+1;
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
            document.getElementsByClassName('cardSpot')[i].innerHTML = (16*pageNumber) - 9 + i;
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
