const numbers = [];
for (let i = 1; i <= 8; i++) {
  numbers.push(i, i);
}

const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return numbers;
};

const shuffledNumbers = shuffle(numbers);

let stackBox = [];

const onCard = (content) => (content.value = content.dataset.num);
const done = (array) => {
  array[0].removeEventListener("click", gameStart);
  array[1].removeEventListener("click", gameStart);

  array[0].disabled = true;
  array[1].disabled = true;
};

const gameStart = (content) => {
  onCard(content);

  if (stackBox.length === 0) {
    stackBox.push(content);
  } else if (stackBox.length !== 0 && stackBox.length < 2) {
    stackBox.push(content);
    if (stackBox[0].dataset.num === stackBox[1].dataset.num) {
      console.log("Gooooood!!!");
      done(stackBox);
      stackBox.length = 0;
    } else {
      console.log(content);
      console.log("ハズレ");
      stackBox.length = 0;
    }
  }
};

const App = document.getElementById("app");
for (let i = 0; i < 16; i++) {
  const input = document.createElement("input");
  input.type = "button";
  input.dataset.num = shuffledNumbers[i];
  input.classList.add("card");

  input.addEventListener("click", (e) => gameStart(e.target));

  App.append(input);
}
