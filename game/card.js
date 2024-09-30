const cardData = [
    {
        name: 'bryzgat',
        img: 'src/images/bryzgat.png',
        id: 1,
    },
    {
        name: 'bulbazavr',
        img: 'src/images/bulbazavr.png',
        id: 2,
    },
    {
        name: 'dratini',
        img: 'src/images/dratini.png',
        id: 3,
    },
    {
        name: 'dzhigglipaff',
        img: 'src/images/dzhigglipaff.png',
        id: 4,
    },
    {
        name: 'manki',
        img: 'src/images/manki.png',
        id: 5,
    },
    {
        name: 'myaut',
        img: 'src/images/myaut.png',
        id: 6,
    },
    {
        name: 'pidzhi',
        img: 'src/images/pidzhi.png',
        id: 7,
    },
    {
        name: 'pikachu',
        img: 'src/images/pikachu.png',
        id: 8,
    },
    {
        name: 'psajdak',
        img: 'src/images/psajdak.png',
        id: 9,
    },
    {
        name: 'snorlaks',
        img: 'src/images/snorlaks.png',
        id: 10,
    },
]

//рандомно сортируем и удваиваем
let cartArray = cardData.concat(cardData);
cartArray.sort(() => 0.5 - Math.random())

function createCartDiv(arr) {
    arr.forEach(element => {
        let container = document.querySelector('.container');

        let  card = document.createElement('div');
        card.classList.add('card');
        card.id = element.id;

        let front = document.createElement('div');
        front.classList.add('front-face');
        card.appendChild(front);

        let imageFront = document.createElement('img');
        imageFront.src = element.img;
        imageFront.alt = element.name;
        front.appendChild(imageFront);

        let back = document.createElement('div');
        back.classList.add('back-face');
        card.appendChild(back);

        let imageBack = document.createElement('img');
        imageBack.src = 'src/images/pokebol.png';
        imageBack.alt = 'back-img';
        back.appendChild(imageBack);

        container.appendChild( card);
    }); 
}

createCartDiv(cartArray)

let card = document.querySelector('.card');

function flipCard() {
    card.classList.toggle('flip') ;
}