document.addEventListener("DOMContentLoaded", function () {
  const searchBox = document.querySelector(".search-box");
  const btn = document.querySelector(".btn");
  const action = document.querySelector(".action");
  let result = null;

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

  recognition.lang = "vi-VN";
  recognition.continuous = false;

  btn.addEventListener("click", function (e) {
    e.preventDefault();
    if (recognition && !recognition.recognizing) {
      if (result) {
        result.remove();
      }
      startRecognition();
    }
  });

  recognition.onend = recognition.onerror = () => {
    if (recognition && recognition.recognizing) {
      recognition.recognizing = false;
      stopRecognition();
    }
  };

  recognition.onnomatch = function () {
    if (recognition && recognition.recognizing) {
      handleRecognitionNoMatch();
    }
  };

  recognition.onresult = (e) => {
    if (recognition && recognition.recognizing) {
      const text = e.results[0][0].transcript.toLowerCase();
      handleRecognitionResult(text);
    }
  };

  const startRecognition = () => {
    recognition.start();
    btn.style.background = "green";
    action.innerHTML = "Hãy nói nội dung bạn muốn";
    recognition.recognizing = true;
  };

  const stopRecognition = () => {
    btn.style.background = "red";
    action.innerHTML = "Đã nói xong. Hy vọng kết quả như ý bạn";
  };

  const handleRecognitionNoMatch = () => {
    recognition.recognizing = false;
    action.innerHTML = "Vui lòng nói yêu cầu của bạn!";
  };

  const handleRecognitionResult = (text) => {
    result = document.createElement("div");
    Object.assign(result.style, {
      fontSize: "1.4rem",
      padding: "10px",
      border: "1px solid black",
      margin: "10px 0",
    });
    result.innerText = `Đang thực hiện: ${text}`;
    searchBox.append(result);

    setTimeout(() => {
      const handled = handleVoice(text);
      result.innerText = handled
        ? "Đã thực hiện thành công"
        : "Không thực hiện được";
    }, 1000);
  };

  const handleVoice = (text) => {
    const transcriptNew = text
      .replace(/(chỉ đường|tới|đường tới|bài hát|mở|nghe|video|xem)/g, "")
      .trim();

    if (transcriptNew === "google") {
      window.open("https://google.com");
      return true;
    } else if (transcriptNew === "youtube") {
      window.open("https://youtube.com");
      return true;
    } else if (transcriptNew === "facebook") {
      window.open("https://facebook.com");
      return true;
    } else if (transcriptNew === "google drive") {
      window.open("https://drive.google.com");
      return true;
    } else if (
      transcriptNew === "google maps" ||
      transcriptNew === "bản đồ" ||
      transcriptNew === "maps"
    ) {
      window.open("https://maps.google.com");
      return true;
    } else if (transcriptNew) {
      if (/^(chỉ đường|tới|đường tới)/.test(text)) {
        const url = `https://www.google.com/maps/search/${transcriptNew}`;
        window.open(url.trim());
        return true;
      } else if (/^(bài hát|mở bài hát|nghe bài hát)/.test(text)) {
        const url = `https://zingmp3.vn/tim-kiem/tat-ca?q=${transcriptNew}`;
        window.open(url.trim());
        return true;
      } else if (/^(video|mở video|xem video)/.test(text)) {
        const url = `https://www.youtube.com/results?search_query=${transcriptNew}`;
        window.open(url.trim());
        return true;
      }
    }

    return false;
  };
});
