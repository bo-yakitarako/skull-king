## Express+Reactの開発環境のテンプレート
環境構築したよ

## スクリプト
### `yarn server`
Expressサーバーを起動するよ<br>
`nodemon`を使ってサーバーサイドの変更を検知して自動で再起動するようになってるよ

### `yarn watch`
フロントのHMRを開始するよ

### `yarn build`
バック、フロントのコードをビルドするよ<br>
バックエンドは`tsc`で、フロントエンドは`webpack`でビルドするよ

### `yarn production`
ビルド後のサーバーを開始するよ
