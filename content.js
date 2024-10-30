chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "showImage") {
    okan(request.imageNumber); // 画像番号を引数として渡す
  }
});

function okan(imageNumber) {
  const imageUrl = chrome.runtime.getURL(`img/${imageNumber}.png`); // 画像番号に応じたURLを取得
  console.log("Image URL:", imageUrl);
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.bottom = "0"; // 画面下部に配置
  overlay.style.zIndex = "9999";
  overlay.style.transition = "transform 0.5s ease-in-out"; // スライドインのためのトランジション

  const image = new Image();
  image.src = imageUrl;

  // 画像番号に応じてサイズと位置を設定
  if (imageNumber === 1) {
    overlay.style.right = "0"; // 右側に表示
    overlay.style.transform = "translateX(100%)"; // スライドイン
    setTimeout(() => {
      overlay.style.transform = "translateX(0)";
    }, 10); // スライドイン
    image.style.width = "100px";
    image.style.height = "auto";
  } else if (imageNumber === 2) {
    overlay.style.left = "0"; // 左側に表示
    overlay.style.transform = "translateX(-100%)"; // スライドイン
    setTimeout(() => {
      overlay.style.transform = "translateX(0)";
    }, 10); // スライドイン
    image.style.width = "400px";
    image.style.height = "auto";
  } else if (imageNumber === 3) {
    overlay.style.left = "50%"; // 中央に表示
    overlay.style.transform = "translate(-50%, 100%)"; // 中央に位置調整
    setTimeout(() => {
      overlay.style.transform = "translate(-50%, 0)";
    }, 10);
    image.style.width = "900px";
    image.style.height = "auto";
  }

  overlay.appendChild(image);

  image.onload = () => {
    console.log("画像が正常に読み込まれました");
    document.body.appendChild(overlay); // 画像が正常に読み込まれた後にオーバーレイを追加
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
    // 1.png と 2.png はクリックで非表示
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
