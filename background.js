let countdownInterval;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "startTimer") {
    startTimer(request.duration);
  }
});

function startTimer(duration) {
  clearInterval(countdownInterval);
  let remainingTime = duration;

  countdownInterval = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      showImage(3); //ファイナルオカン
      return;
    }

    if (remainingTime === 30) {
      showImage(1); // オカン1号
    } else if (remainingTime === 15) {
      showImage(2); // オカン2号
    }

    // 残り時間をポップアップウィンドウに表示させる
    chrome.runtime.sendMessage({ action: "updateCountdown", remainingTime });

    remainingTime--;
  }, 1000);
}

function showImage(imageNumber) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "showImage", imageNumber });
  });
}
