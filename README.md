# whacman_node

# Requirement

- node
- yarn

## nodeのインストール

### Windows

[Node.js / npmをインストールする（for Windows）](https://qiita.com/taiponrock/items/9001ae194571feb63a5e)

上を参考にインストールしてください

### Mac

[ここ](https://nodejs.org/ja/download/)から`macOS Installer (.pkg)`をダウンロードしてインストールしてください

### Ubuntu系

```bash
$ sudo apt install nodejs
```

## yarnのインストール

```bash
$ npm -g i yarn
```

# Usage

```bash
$ git clone git@github.com:AkashiSN/whacman_node.git
$ cd whacman_node
$ yarn
```

ubuntuのみ？シリアルポートの権限を変更

```bash
$ sudo chmod 666 /dev/ttyACM0
```

`app.js`のシリアルポートを環境に合わせて変更

```js
// TODO: comNameを自動取得
const port = new SerialPort("/dev/ttyACM0", {
  baudrate: 9600,
  dataBits: 8
})
```

実行

```bash
$ node app.js
```