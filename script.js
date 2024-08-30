// Sample data
const images = [
  {
    word: "ant",
    src: "https://media.istockphoto.com/id/917307466/vector/illustration-of-happy-ant-cartoon.jpg?s=612x612&w=0&k=20&c=WZrapZ95eNYip_flp2DORQYgYGjyCva5NL_Pm03QYEQ=",
  },
  {
    word: "bag",
    src: "https://previews.123rf.com/images/iimages/iimages1211/iimages121100055/16115128-illustration-of-a-school-bag-on-a-white-background.jpg",
  },
  {
    word: "cat",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyQ0M9UougMf1HUKwECevRhkBApBIXCjLBGg&s",
  },
  {
    word: "dog",
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPS6oYEr8SIi2UfxoE6Srn-V_iRGhMSm9s3w&s",
  },
  {
    word: "egg",
    src: "https://img.freepik.com/free-vector/egg-cartoon-style_1308-111705.jpg",
  },
  {
    word: "fish",
    src: "https://t4.ftcdn.net/jpg/02/74/20/69/360_F_274206901_Jt1PHZTbtwne17anw5eD9oABxStNJhYT.jpg",
  },
  {
    word: "girl",
    src: "https://cdn.vectorstock.com/i/1000v/04/50/little-girl-drawing-isolated-icon-vector-24630450.jpg",
  },
  {
    word: "hat",
    src: "https://media.istockphoto.com/id/1364448487/vector/classic-flat-illustration-with-top-hat-magic-top-hat-in-classic-style.jpg?s=612x612&w=0&k=20&c=ciQzn-4jWpTFIrZjDDZXsi5NX1E2ioS73FKzqvEuKVQ=",
  },
  {
    word: "icecream",
    src: "https://cdn.pixabay.com/photo/2016/06/02/22/14/ice-1432278_640.png",
  },
  {
    word: "jug",
    src: "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fjug&psig=AOvVaw1Lsxl31bw03kdjkQ_EuxJg&ust=1725047197061000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCMCV_t_7mogDFQAAAAAdAAAAABAE",
  },
];

let currentIndex = 0;
let currentWord = "";
let userSpelling = "";
let timer;
let interval;
let timeLeft = 60;
let report = [];
let score = 0;

function start() {
  loadImage();
  startTimer();
}
function setBoxes() {
  const inputContainer = document.getElementById("inputContainer");

  inputContainer.innerHTML = "";
  for (let i = 0; i < currentWord.length; i++) {
    const box = document.createElement("div");
    box.className = "w-8 h-8 border-2 border-gray-500";
    box.textContent = "_";
    inputContainer.appendChild(box);
    userSpelling = "";
  }
}
function loadImage() {
  if (currentIndex >= images.length) {
    end();
    return;
  }

  const image = images[currentIndex];
  currentWord = image.word;
  userSpelling = "";
  timeLeft = 60;

  // Update the image
  document.getElementById("currentImage").src = image.src;

  setBoxes();
  // Show alphabets
  const alphabetContainer = document.getElementById("alphabetContainer");
  alphabetContainer.innerHTML = "";
  const alphabets = "abcdefghijklmnopqrstuvwxyz".split("");
  alphabets.forEach((letter) => {
    const button = document.createElement("button");
    button.className = "p-2 bg-gray-700 text-white rounded hover:bg-black";
    button.textContent = letter;
    button.onclick = () => handleLetterClick(letter);
    alphabetContainer.appendChild(button);
  });
}

function handleLetterClick(letter) {
  document.getElementById("tryAgain").style.display = "none";
  if (userSpelling.length < currentWord.length) {
    userSpelling += letter;
    updateInput();

    if (
      userSpelling.length === currentWord.length &&
      userSpelling != currentWord
    ) {
      document.getElementById("tryAgain").style.display = "block";
      setBoxes();
      
    } else if (userSpelling === currentWord) {
      clearTimeout(timer);
      clearInterval(interval);
      report.push({ word: currentWord, correct: true });
      score++;
      nextImage();
    }
  }
}

function updateInput() {
  const boxes = document.getElementById("inputContainer").children;
  for (let i = 0; i < userSpelling.length; i++) {
    boxes[i].textContent = userSpelling[i];
  }
}

function startTimer() {
  document.getElementById("timeLeft").textContent = timeLeft;

  interval = setInterval(() => {
    timeLeft--;
    document.getElementById("timeLeft").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(interval);
      clearTimeout(timer);
      report.push({ word: currentWord, correct: userSpelling === currentWord });
      nextImage();
    }
  }, 1000);

  timer = setTimeout(() => {
    clearInterval(interval);
    report.push({ word: currentWord, correct: userSpelling === currentWord });
    nextImage();
  }, 60000);
}

function nextImage() {
  currentIndex++;
  loadImage();
  startTimer();
}

function end() {
  document.getElementById("scoreContainer").style.display = "block";
  document.getElementById("imageContainer").style.display = "none";
  document.getElementById("inputContainer").style.display = "none";
  document.getElementById("alphabetContainer").style.display = "none";
  document.getElementById("timer").style.display = "none";
  document.getElementById('score').textContent = `You got ${score} out of 10`

  const reportList = document.getElementById("report");
  reportList.innerHTML = "";
  report.forEach((result, index) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Image ${index + 1}: ${result.word} - ${
      result.correct ? "Correct" : "Incorrect"
    }`;
    reportList.appendChild(listItem);
  });
}

window.onload = start;
