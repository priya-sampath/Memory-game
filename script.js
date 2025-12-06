const cards = [
  {
    name: "chess",
    id: "c-1",
    icon: '<i class="fa-solid fa-chess"></i>',
  },
  {
    name: "chess",
    id: "c-1",
    icon: '<i class="fa-solid fa-chess"></i>',
  },
  {
    name: "chess-board",
    id: "c-2",
    icon: '<i class="fa-solid fa-chess-board"></i>',
  },
  {
    name: "chess-board",
    id: "c-2",
    icon: '<i class="fa-solid fa-chess-board"></i>',
  },
  {
    name: "bishop",
    id: "c-3",
    icon: '<i class="fa-solid fa-chess-bishop"></i>',
  },
  {
    name: "bishop",
    id: "c-3",
    icon: '<i class="fa-solid fa-chess-bishop"></i>',
  },
  {
    name: "king",
    id: "c-4",
    icon: '<i class="fa-solid fa-chess-king"></i>',
  },
  {
    name: "king",
    id: "c-4",
    icon: '<i class="fa-solid fa-chess-king"></i>',
  },
  {
    name: "queen",
    id: "c-5",
    icon: '<i class="fa-solid fa-chess-queen"></i>',
  },
  {
    name: "queen",
    id: "c-5",
    icon: '<i class="fa-solid fa-chess-queen"></i>',
  },
  {
    name: "knight",
    id: "c-6",
    icon: '<i class="fa-solid fa-chess-knight"></i>',
  },
  {
    name: "knight",
    id: "c-6",
    icon: '<i class="fa-solid fa-chess-knight"></i>',
  },

  {
    name: "pawn",
    id: "c-7",
    icon: '<i class="fa-solid fa-chess-pawn"></i>',
  },
  {
    name: "pawn",
    id: "c-7",
    icon: '<i class="fa-solid fa-chess-pawn"></i>',
  },
  {
    name: "rook",
    id: "c-8",
    icon: '<i class="fa-solid fa-chess-rook"></i>',
  },
  {
    name: "rook",
    id: "c-8",
    icon: '<i class="fa-solid fa-chess-rook"></i>',
  },
  // {
  //   name: "dice",
  //   id: "c-9",
  //   icon: '<i class="fa-solid fa-dice-six"></i>',
  // },
  // {
  //   name: "dice",
  //   id: "c-9",
  //   icon: '<i class="fa-solid fa-dice-six"></i>',
  // },
  // {
  //   name: "baseball",
  //   id: "c-10",
  //   icon: '<i class="fa-solid fa-baseball-bat-ball"></i>',
  // },
  // {
  //   name: "baseball",
  //   id: "c-10",
  //   icon: '<i class="fa-solid fa-baseball-bat-ball"></i>',
  // },
];
let timer = 0;
const gameGrid = document.getElementById("game-grid");
let button = document.getElementById("again-button");

let filteredArray = [];
let finalAllAddedArray = [];
function shuffleIcons() {
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}
function displayCards() {
  cards.forEach((Curr, index) => {
    const newCardContainer = document.createElement("div");
    newCardContainer.setAttribute("id", index);
    const newCardFront = document.createElement("div");
    const newCardBack = document.createElement("div");
    newCardFront.innerHTML = '<i class="fa-solid fa-heart"></i>';
    newCardFront.setAttribute("id", "front_" + index + "_" + Curr.id);
    newCardFront.classList.add(Curr.id);
    newCardFront.classList.add("play-cards-front");
    newCardFront.classList.add("cards-common");
    newCardFront.classList.add("heart-class");

    newCardBack.setAttribute("id", "back_" + index + "_" + Curr.id);
    newCardBack.classList.add("play-cards-back");
    newCardBack.classList.add("back-rotate-initial");
    newCardBack.classList.add("cards-common");
    newCardBack.classList.add(Curr.id);
    newCardBack.innerHTML = Curr.icon;
    newCardContainer.append(newCardFront);
    newCardContainer.append(newCardBack);
    gameGrid.append(newCardContainer);
    newCardFront.addEventListener("click", flipcard);
  });
}
function flipcard() {
  if (timer == 0) {
    startTimer();
    button.textContent = "";
    button.textContent = "Play Again!";
  } else {
    button.textContent = "";
    button.textContent = "Restart!!";
  }
  timer = 1;

  if (filteredArray.length < 2) {
    let getID = this.getAttribute("id");
    let newFront = document.getElementById(getID);
    let parts = getID.split("_");
    let number = parts[1];
    let uniqueID = parts[2];
    let num = parseInt(number);
    filteredArray.push(this);
    let newBack = document.getElementById("back_" + num + "_" + uniqueID);
    newFront.classList.add("front-rotate-after");
    newBack.classList.add("back-rotate-after");
    // console.log(filteredArray);
    if (filteredArray.length === 2) {
      checkMatch();
    }
  }
}
function checkMatch() {
  let firstCardID = filteredArray[0].getAttribute("id");
  let secondCardID = filteredArray[1].getAttribute("id");

  let firstCard = document.getElementById(firstCardID);
  let secondCard = document.getElementById(secondCardID);

  let firstParts = firstCardID.split("_");
  let firstNum = firstParts[1];
  let firstUniqueID = firstParts[2];

  let secondParts = secondCardID.split("_");
  let secondNum = secondParts[1];
  let secondUniqueID = secondParts[2];
  let firstCardFront = document.getElementById(firstCardID);
  let firstCardBack = document.getElementById(
    "back_" + firstNum + "_" + firstUniqueID
  );
  let secondCardFront = document.getElementById(secondCardID);
  let secondCardBack = document.getElementById(
    "back_" + secondNum + "_" + secondUniqueID
  );

  if (firstUniqueID === secondUniqueID) {
    setTimeout(() => {
      let firstWholeCardDiv = document.getElementById(firstNum);
      let secondWholeCardDiv = document.getElementById(secondNum);
      firstWholeCardDiv.classList.add("hidden");
      secondWholeCardDiv.classList.add("hidden");
    }, 1000);
    finalAllAddedArray.push(firstCardID);
    finalAllAddedArray.push(secondCardID);
    console.log(cards.length, finalAllAddedArray.length);
    if (cards.length === finalAllAddedArray.length) {
      stopTimer();
    }
  } else {
    //console.log(firstCardFront, firstCardBack, secondCardFront, secondCardBack);
    setTimeout(() => {
      firstCardFront.classList.remove("front-rotate-after");
      secondCardFront.classList.remove("front-rotate-after");
      firstCardBack.classList.remove("back-rotate-after");
      secondCardBack.classList.remove("back-rotate-after");
    }, 1000);
  }
  filteredArray = [];
}
function startTimer() {
  totalSeconds = 0;
  timerInterval = setInterval(() => {
    totalSeconds++;

    let hrs = Math.floor(totalSeconds / 3600);
    let mins = Math.floor((totalSeconds % 3600) / 60);
    let secs = totalSeconds % 60;

    if (hrs < 10) hrs = "0" + hrs;
    if (mins < 10) mins = "0" + mins;
    if (secs < 10) secs = "0" + secs;

    let timerElement = document.getElementById("heading-flex-value");
    timerElement.innerHTML = `${hrs}:${mins}:${secs}`;
  }, 1000);
}
function stopTimer() {
  clearInterval(timerInterval);
  isRunning = false;

  let hrs = Math.floor(totalSeconds / 3600);
  let mins = Math.floor((totalSeconds % 3600) / 60);
  let secs = totalSeconds % 60;

  // format with leading 0
  if (hrs < 10) hrs = "0" + hrs;
  if (mins < 10) mins = "0" + mins;
  if (secs < 10) secs = "0" + secs;
  let finishedTime = `${hrs}:${mins}:${secs}`;
  showPlayagain(finishedTime);
  //  return `${hrs}:${mins}:${secs}`;
}
function showPlayagain(finishedTime) {
  finalAllAddedArray = [];
  timer = 0;
  setTimeout(() => {
    let replay = confirm(
      `\n\n🎉💥   You finished in ${finishedTime}!  💥 🎉\n\nPlay Again?`
    );
    if (replay) {
      location.reload();
    } else {
      button.textContent = "";
      button.textContent = "Play Again!";
    }
  }, 3000);
}

button.addEventListener("click", function () {
  if (timer != 0) {
    let replay = confirm(`\n\nAre you Sure to Restart the game ?`);
    if (replay) {
      location.reload();
    }
  } else {
    replay = true;
    if (replay) {
      location.reload();
    }
  }
});

shuffleIcons();
displayCards();
