function colorText() {
  const textElement = document.getElementById("Text");
  const text = textElement.innerText;
  const dividedText = text.split(" ");
  let currentWordIndex = 0;

  function changeColor() {
    const currentWord = dividedText[currentWordIndex];

    let newText = "";
    for (let index = 0; index < dividedText.length; index++) {
      const word = dividedText[index];
      if (index === currentWordIndex) {
        newText += `<span style="color: red;">${word}</span>`;
      } else {
        newText += word;
      }
      newText += " ";
    }

    textElement.innerHTML = newText.trim();
    currentWordIndex++;

    if (currentWordIndex >= dividedText.length) {
      currentWordIndex = 0;
    }
  }

  setInterval(changeColor, 500);
}

window.onload = colorText;
