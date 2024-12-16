const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return numbers;
};

const numbers = [...Array(8).keys()].map((i) => [i + 1, i + 1]).flat();
const shuffledNumbers = shuffle(numbers);

let stackBox = [];
const NUM_OF_TRIALS = 2;

let correctTimes = 0;
let faultTimes = 0;

const onCard = (content) => (content.value = content.dataset.num);
const offCard = (contents) =>
  contents.forEach((content) => {
    content.removeAttribute("value");
  });
const done = (array) => {
  array.forEach((arr) => {
    arr.disabled = true;
    arr.classList.add("done");
  });
  array[0].disabled = true;
  array[1].disabled = true;
};
const resetStackBox = () => (stackBox.length = 0);

const answerText = document.getElementById("js-correct-times");
const faultText = document.getElementById("js-fault-times");

answerText.textContent = correctTimes;
faultText.textContent = faultTimes;

const gameStart = (content) => {
  if (stackBox.length === NUM_OF_TRIALS) return;
  onCard(content);

  if (stackBox.length === 0) {
    stackBox.push(content);
  } else if (stackBox.length < NUM_OF_TRIALS) {
    stackBox.push(content);

    if (stackBox[0].dataset.num === stackBox[1].dataset.num) {
      correctTimes++;
      answerText.textContent = correctTimes;
      done(stackBox);
      resetStackBox();
    } else {
      faultTimes++;
      faultText.textContent = faultTimes;

      setTimeout(() => {
        offCard(stackBox);
        resetStackBox();
      }, 500);
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
