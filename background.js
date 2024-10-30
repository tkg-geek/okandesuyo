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
      showImage(3); // 残り時間が0になったときの画像
      return;
    }

    // 残り時間によって異なる画像を表示
    if (remainingTime === 20) {
      showImage(1); // 残り時間が20秒のときの画像
    } else if (remainingTime === 10) {
      showImage(2); // 残り時間が10秒のときの画像
    }

    // 残り時間をポップアップウィンドウに送信
    chrome.runtime.sendMessage({ action: "updateCountdown", remainingTime });

    remainingTime--;
  }, 1000);
}

function showImage(imageNumber) {
  // アクティブなタブを取得して画像を表示するメッセージを送信
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { action: "showImage", imageNumber });
  });
}
