document.getElementById("start").addEventListener("click", () => {
  const minutes = parseInt(document.getElementById("minutes").value) || 0;
  const seconds = parseInt(document.getElementById("seconds").value) || 0;
  const totalSeconds = minutes * 60 + seconds;

  // タイマーを開始するメッセージを送信
  chrome.runtime.sendMessage({ action: "startTimer", duration: totalSeconds });
});

// 残り時間を更新するためのリスナー
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "updateCountdown") {
    displayCountdown(request.remainingTime);
  }
});

function displayCountdown(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  document.getElementById(
    "countdown"
  ).innerText = `残り時間: ${minutes}分 ${secs}秒`;
}
