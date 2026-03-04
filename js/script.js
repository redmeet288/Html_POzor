$(document).ready(function() {
    const images = [
        { front: 'image/1028178216.jpg', back: 'image/карта.jpg', alt: 'мозг' },
        { front: 'image/images.jfif', back: 'image/карта.jpg', alt: 'че' },
        { front: 'image/images (1).jfif', back: 'image/карта.jpg', alt: 'не' },
        { front: 'image/480_480_2_botinki.jpg', back: 'image/карта.jpg', alt: 'ботинки' },
    ];


    let pairs = [];
    let count_pop = 0;
    let count = 0;
    let openCard = [];
    let gameLocked = false;
    let record = [];


    for (let i = 0; i < 5; i++) {
        let randomImage = images[Math.floor(Math.random() * images.length)];
        pairs.push(randomImage);  
        pairs.push(randomImage);  
    }


    for (let i = pairs.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
    }


    let cardHtml = '';
    pairs.forEach((imageData) => {
        cardHtml += `
            <div class="card">
                <div class="card-inner">
                    <div class="card-front">
                        <img src="${imageData.front}" alt="${imageData.alt}">
                    </div>
                    <div class="card-back">
                        <img src="${imageData.back}" alt="${imageData.alt}">
                    </div>
                </div>
            </div>
        `;
    });


    $('.card-grid').html(cardHtml);




function f(){
    $('.buttons').on('click', function() {
        $('.card').toggleClass('flipped open');
        count_pop = 0;
        count = 0;


        $(this).text($(this).text() === 'Start' ? 'Reset' : 'Start');
    });
}
    f();

    if($('.buttons')){
        $('.card').on('click', function() {
            if (openCard.length >= 2 || gameLocked)return;
            $('.buttons').off('click');
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
                        count_pop += 1

                        gameLocked = false;
                    },500)
                }
                else{
                    openCard = []
                    count += 2;
                    count_pop += 1

                    gameLocked = false;
                    if(count === 10){
                        alert("ты выйграл")
                        record.push(count_pop);

                        $('.span1').text(Math.min(...record));

                        f();
                    }
                }


                $('.spans').text(count_pop);

            }
        });
    }
});