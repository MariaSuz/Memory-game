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


//Создаю карточки
function createCartDiv(arr) {
    arr.forEach(element => {
        let container = document.querySelector('.container');

        let  card = document.createElement('div');
        card.classList.add('card');
        card.id = element.id;
        card.setAttribute("data-name", element.name);

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

//логика игры!
let card = document.querySelectorAll('.card');
let hasFlippedCard = false;
let lockBoard = false;
let firtsCard, secondCard;
let score = 0;
let count = 0;
let modal = document.querySelector('.popup');
let games = [];

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firtsCard, secondCard] = [null, null];
  }


//Переворачиваем карточки и проверяем состояние
function flipCard() {
    if (lockBoard) return;
    if (this === firtsCard) return; //это чтобы на одну карту 2 раза не нажимать

    this.classList.add('flip');

    if(!hasFlippedCard){
        hasFlippedCard = true;
        firtsCard = this;
        return;
    }

    secondCard = this;

    score++;

    checkForMatch();
}

//логика сопоставления
function checkForMatch() {
    if(firtsCard.dataset.name === secondCard.dataset.name) {
        finishcount();
        disableCards();
        return;
    }

    unflipCards();
}

function finishcount() {
    count++;
    if (count === 10) { //10 совпадений, тк 10 карточек
        document.querySelector(".score").textContent = score;
        if(games.length === 10) { //Сохраняем только 10, если больше, то удаляем всегда первый элемент из массива
            games.shift();
        }
        games.push(score);
        localStorage.setItem("game", JSON.stringify(games));
        modal.classList.add('open');
        document.querySelector(".popup-best").textContent =  JSON.parse(localStorage.getItem("game"));
    }
}

function disableCards() {
    firtsCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
  }

function unflipCards() {
    lockBoard = true;


//1.5 секунды ждем, переворачиваем и сбрасываем карты
setTimeout(() => {
    firtsCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetBoard();
}, 1500);
}

card.forEach(cards => cards.addEventListener('click', flipCard));

//Рестарт игры
function restartGame() {
    resetBoard();
    document.querySelector('.container').innerHTML = '';
    cartArray.sort(() => 0.5 - Math.random());
    createCartDiv(cartArray);
    count = 0;
    score = 0;
    modal.classList.remove('open');
    let card = document.querySelectorAll('.card');
    card.forEach(cards => cards.addEventListener('click', flipCard));
}


let btnCross = document.querySelector('.popup-close');
btnCross.addEventListener('click', restartGame);


