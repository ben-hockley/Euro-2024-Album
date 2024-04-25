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
    window.location.href = '/signIn'; //signs user out (redirects back to sign in page)
})

$("#viewSwapRequests").on("click", function(){
    window.location.href = '/home/' + username + '/viewSwapRequests'; //redirects user to view all swap requests
})

// Get JSON list of all card numbers of user's swaps
swapList = JSON.parse(document.getElementById('swapList').innerHTML);

// Append corresponding image to swapContainer for card numbers of all the user's swaps.
for (i=0;i<swapList.length;i++){
    swapBox = document.createElement('div');
    swapBox.className = 'swapBox';

    //hover node (shows on hover; links to user actions)
    hoverNode  = document.createElement('div');
    hoverNode.className = 'hoverNode';

    //create swap request button
    swapRequestButton = document.createElement('button');
    swapRequestButton.className = ("btn btn-success swapRequest");
    swapRequestButton.innerHTML = ("create swap request");
    hoverNode.appendChild(swapRequestButton);

    swapBox.appendChild(hoverNode);

    //sticker image
    swap = document.createElement('img');
    swap.classList.add('swap');
    swap.classList.add(swapList[i]);
    swap.setAttribute('src','/static/img/Stickers/'+swapList[i]+'.png');
    swapBox.appendChild(swap);

    //eventListeners (to display node on hover)
    swapBox.addEventListener("mouseover",function(){
        console.log("hover");
        node = this.firstChild;
        console.log(node);
        node.style.display = 'block';
    });
    swapBox.addEventListener("mouseout",function(){
        console.log("out");
        node = this.firstChild;
        console.log(node);
        node.style.display = 'none';
    })
    document.getElementById('swapContainer').appendChild(swapBox);

    //redirect user to createSwapRequest page specific to swap clicked.
    swapBox.firstChild.addEventListener("click",function(){
        window.location.href = '/home/'+ username +'/createSwapRequest/' + this.parentElement.lastChild.getAttribute('src').split("/").pop();
    })
}