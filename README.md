# Notion Link Copier

NotionのページタイトルとリンクをワンクリックでコピーできるChrome拡張機能です。Slackに貼り付けると、リンク付きのページタイトルとして表示されます。

## 機能

- ページタイトルの横にコピーボタンを表示
- クリックするとページタイトル+URLをリッチテキストとしてコピー
- Slackに貼り付けるとクリック可能なリンクとして表示
- サイドピークで開いたページにも対応

## インストール

1. このリポジトリをクローン or ダウンロード
   ```
   git clone https://github.com/hotsukai/notion-link-copier.git
   ```
2. Chromeで `chrome://extensions` を開く
3. 右上の「デベロッパーモード」をONにする
4. 「パッケージ化されていない拡張機能を読み込む」をクリック
5. クローンしたフォルダを選択

## 使い方

1. Notionのページを開く
2. ページタイトルの右横にあるコピーアイコンをクリック
3. Slackのメッセージ入力欄に貼り付け → リンク付きタイトルとして表示される

## ライセンス

[MIT](LICENSE)

---

# Notion Link Copier (English)

A Chrome extension that copies Notion page titles with their links in one click. When pasted into Slack, it appears as a clickable page title.

## Features

- Displays a copy button next to the page title
- Copies page title + URL as rich text with a single click
- Pastes as a clickable link in Slack
- Works with side-peek pages

## Installation

1. Clone or download this repository
   ```
   git clone https://github.com/hotsukai/notion-link-copier.git
   ```
2. Open `chrome://extensions` in Chrome
3. Enable "Developer mode" in the top right
4. Click "Load unpacked"
5. Select the cloned folder

## Usage

1. Open a Notion page
2. Click the copy icon next to the page title
3. Paste in Slack → it appears as a linked title

## License

[MIT](LICENSE)
