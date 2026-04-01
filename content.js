(() => {
  const BUTTON_ID = "notion-link-copier-btn";

  function getPageTitle() {
    // Notionのページタイトルは h1 要素から取得
    const titleEl =
      document.querySelector(".notion-page-block h1") ||
      document.querySelector('[placeholder="Untitled"]') ||
      document.querySelector("h1");
    if (titleEl) {
      return titleEl.textContent.trim();
    }
    // フォールバック: ドキュメントタイトルから " - Notion" を除去
    return document.title.replace(/\s*[-–]\s*Notion$/, "").trim();
  }

  function getPageUrl() {
    return window.location.href;
  }

  async function copyAsRichText(title, url) {
    const html = `<a href="${url}">${title}</a>`;
    const plain = `${title}\n${url}`;

    const htmlBlob = new Blob([html], { type: "text/html" });
    const textBlob = new Blob([plain], { type: "text/plain" });

    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": htmlBlob,
        "text/plain": textBlob,
      }),
    ]);
  }

  function showFeedback(button, success) {
    const original = button.innerHTML;
    if (success) {
      button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      button.classList.add("copied");
    } else {
      button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      button.classList.add("error");
    }
    setTimeout(() => {
      button.innerHTML = original;
      button.classList.remove("copied", "error");
    }, 1500);
  }

  function createCopyButton() {
    if (document.getElementById(BUTTON_ID)) return;

    const button = document.createElement("button");
    button.id = BUTTON_ID;
    button.title = "ページタイトルとリンクをコピー";
    button.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

    button.addEventListener("click", async () => {
      try {
        const title = getPageTitle();
        const url = getPageUrl();
        await copyAsRichText(title, url);
        showFeedback(button, true);
      } catch (err) {
        console.error("Notion Link Copier: コピーに失敗しました", err);
        showFeedback(button, false);
      }
    });

    document.body.appendChild(button);
  }

  // Notionはクライアントサイドルーティングのため、ページ遷移を監視
  function init() {
    createCopyButton();
  }

  // DOM準備後に初期化
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
