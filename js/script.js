$(document).ready(function() {


    const images = [
        { front: 'image/brane.jfif', back: 'image/карта.jpg', alt: 'мозг' },
        { front: 'image/сер.jfif', back: 'image/карта.jpg', alt: 'че' },
    ];

    let cardHtml = '';
    let usedAlts = []; 

    for (let i = 0; i < 10; i++) {
        let randomImage = images[Math.floor(Math.random() * images.length)];
        
        if (i % 2 === 0) {
            usedAlts.push(randomImage.alt);
        }
        
        cardHtml += `
            <div class="card">
                <div class="card-inner">
                    <div class="card-front">
                        <img src="${randomImage.front}" alt="${randomImage.alt}">
                    </div>
                    <div class="card-back">
                        <img src="${randomImage.back}" alt="${randomImage.alt}">
                    </div>
                </div>
            </div>
        `;
    }

    $('.card-grid').html(cardHtml);


    let openCard = [];
    let gameLocked = false;
    var count = 0


    $('.buttons').on('click', function() {
        $('.card').toggleClass('flipped open');
        $(this).text($(this).text() === 'Start' ? 'Reset' : 'Start');
    });


    console.log($('.buttons').text);
    if($('.buttons')){
        $('.card').on('click', function() {
            if (openCard.length >= 2 || gameLocked)return;

            $(this).toggleClass('flipped');
            let cardAlt = $(this).find('img').attr('alt');
            openCard.push({element: this, alt: cardAlt});

            if(openCard.length === 2){
                gameLocked = true;
                let first = openCard[0].alt;
                let second = openCard[1].alt;


                if(first !== second){
                    setTimeout(()=>{
                        openCard.forEach(card=>{
                            $(card.element).toggleClass('flipped')
                        });
                        openCard = []
                        gameLocked = false;
                    },500)
                }
                else{
                    openCard = []
                    count += 2;
                    gameLocked = false;
                    if(count === 10){
                        alert("ты выйграл")
                    }
                }
            }
        });
    }
});