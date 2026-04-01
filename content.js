(() => {
  const BUTTON_CLASS = "notion-link-copier-btn";

  function isSidepeekTitle(titleEl) {
    // サイドピーク内のタイトルかどうかを判定
    return titleEl.closest(".notion-peek-renderer") !== null;
  }

  function getPageUrl(isSidepeek) {
    const url = new URL(window.location.href);
    const sidepeekId = url.searchParams.get("p");
    if (isSidepeek && sidepeekId) {
      // サイドピークのボタン → サイドピークページのURL
      return `${url.origin}/${sidepeekId}`;
    }
    // 親ページのボタン → クエリパラメータを除いたURL
    return `${url.origin}${url.pathname}`;
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
      button.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
      button.classList.add("copied");
    } else {
      button.innerHTML = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
      button.classList.add("error");
    }
    setTimeout(() => {
      button.innerHTML = original;
      button.classList.remove("copied", "error");
    }, 1500);
  }

  const COPY_ICON = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>`;

  function createCopyButton(titleEl) {
    // 直後の兄弟要素がすでにボタンならスキップ
    if (
      titleEl.nextElementSibling &&
      titleEl.nextElementSibling.classList.contains(BUTTON_CLASS)
    ) {
      return;
    }

    const button = document.createElement("button");
    button.className = BUTTON_CLASS;
    button.title = "ページタイトルとリンクをコピー";
    button.innerHTML = COPY_ICON;

    button.addEventListener("click", async (e) => {
      e.stopPropagation();
      try {
        const title = titleEl.textContent.trim();
        const isSidepeek = isSidepeekTitle(titleEl);
        const url = getPageUrl(isSidepeek);
        await copyAsRichText(title, url);
        showFeedback(button, true);
      } catch (err) {
        console.error("Notion Link Copier: コピーに失敗しました", err);
        showFeedback(button, false);
      }
    });

    titleEl.after(button);
  }

  function attachButtons() {
    const titles = document.querySelectorAll(
      'h1[aria-roledescription="ページタイトル"]'
    );
    titles.forEach((titleEl) => createCopyButton(titleEl));
  }

  // Notionはクライアントサイドルーティングのため、DOM変更を監視
  // debounceで高頻度呼び出しを抑制
  let debounceTimer = null;
  function init() {
    attachButtons();

    const observer = new MutationObserver(() => {
      if (debounceTimer) return;
      debounceTimer = setTimeout(() => {
        debounceTimer = null;
        attachButtons();
      }, 500);
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
