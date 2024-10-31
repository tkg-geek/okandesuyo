chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showImage") {
    okan(request.imageNumber); 
  }
});

function okan(imageNumber) {
  const imageUrl = chrome.runtime.getURL(`img/${imageNumber}.png`);
  console.log("Image URL:", imageUrl);
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.bottom = "0"; 
  overlay.style.zIndex = "9999";
  overlay.style.transition = "transform 0.5s ease-in-out";

  const image = new Image();
  image.src = imageUrl;

  // 各オカンの配置とサイズ調整
  if (imageNumber === 1) {
    overlay.style.right = "0";
    overlay.style.transform = "translateX(100%)";
    setTimeout(() => {
      overlay.style.transform = "translateX(0)";
    }, 10); // スライドイン
    image.style.width = "100px";
    image.style.height = "auto";
  } else if (imageNumber === 2) {
    overlay.style.left = "0"; 
    overlay.style.transform = "translateX(-100%)"; 
    setTimeout(() => {
      overlay.style.transform = "translateX(0)";
    }, 10); // スライドイン
    image.style.width = "400px";
    image.style.height = "auto";
  } else if (imageNumber === 3) {
    overlay.style.left = "50%"; 
    overlay.style.transform = "translate(-50%, 100%)"; 
    setTimeout(() => {
      overlay.style.transform = "translate(-50%, 0)";
    }, 10);
    image.style.width = "900px";
    image.style.height = "auto";
  }

  overlay.appendChild(image);

  image.onload = () => {
    console.log("画像が正常に読み込まれました");
    document.body.appendChild(overlay); // オーバーレイで最前面に表示
  };

  image.onerror = () => {
    console.error("画像の読み込みに失敗しました:", imageUrl);
    const errorMessage = document.createElement("div");
    errorMessage.textContent = "画像の表示に失敗しました。";
    errorMessage.style.color = "white";
    errorMessage.style.fontSize = "24px";
    overlay.appendChild(errorMessage);
  };

  // クリックイベントの設定
  if (imageNumber !== 3) {
    // 1.png と 2.png はクリックで非表示にする
    overlay.addEventListener("click", () => {
      document.body.removeChild(overlay);
    });
  }
}
// content.js
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showImage") {
    showOverlayImage(request.imageNumber);
  }
});
