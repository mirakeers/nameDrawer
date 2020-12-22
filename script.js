let names, currentlyDrawing, currentName, counter;
$( document ).ready(init);
function init(){
    console.log('hello world');
    currentlyDrawing = false;
    counter = 1;
    names = ['Lena', 'Mira', 'Roland', 'Lissa', 'Tim', 'Alek', 'Nina', 'Tom']
    $('.button.next').click(drawName);
}

function drawName(e) {
    console.log("clicked");
    e.preventDefault();
    if(currentlyDrawing) {
        return;
    }
    startAnimation();
}

function startAnimation() {
    $('.nameBox p').fadeTo( "fast", 0 );
    currentlyDrawing = true;
    if(names.length <= 1) {
        currentName = names[0];
        displayCurrentName();
        displayLastNameInList();
        animateAvatar();
        $('.button.next').html("Merry Christmas!")
        return;
    }
    let selectionAnimation = setInterval(nextName, 150);
    setTimeout(function(){
        //when finished
        counter++;
        currentlyDrawing = false;
        clearInterval(selectionAnimation); //stop the selection process
        names = names.filter(name => name != currentName); //remove last name from list
        displayLastNameInList();
        animateAvatar();
    }, 3000)
}

function animateAvatar(){
    $('.nameBox p').fadeTo( 500, 1 );
    $('.nameBox img').css('transform', 'scale(1.2)').delay(200).queue(function(){
        $('.nameBox img').css('transform', 'scale(1)').dequeue();
    });
}

function displayCurrentName() {
    $('.nameBox h2').html(currentName);
    let imgPath = "img/avatar_" + currentName + ".png";
    $(".nameBox img").attr("src", imgPath);
}

function displayLastNameInList() {
    let imgPath = "img/avatar_" + currentName + ".png";
    $('.drawnNames li.next img').attr("src", imgPath);
    $('.drawnNames li').removeClass('next');
    $('.drawnNames li:nth-child(' + counter + ')').addClass('next');
}

function nextName(){
    currentName = newRandomName();
    displayCurrentName();
}

function newRandomName() {
    let filteredNames = names.filter(name => name != currentName);
    let index = Math.floor(Math.random() * filteredNames.length);
    return filteredNames[index];
}