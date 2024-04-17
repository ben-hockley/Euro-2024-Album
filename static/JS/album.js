var pageNumber = 0; //special stickers
checklist = document.getElementsByClassName('hideThis')[0].innerHTML;
checklist = checklist.slice(2,-3);
checklist = checklist.split(',), ('); //make string into array (390 items)
console.log(checklist);

if (pageNumber==0){
    for (i=0;i<6;i++){
        document.getElementsByClassName('cardSpot')[i].style.backgroundColor = 'Blue'
    }
} else {
    for (i=0;i<16;i++){
        document.getElementsByClassName('cardSpot')[i].style.backgroundColor = 'Blue'
    }
}