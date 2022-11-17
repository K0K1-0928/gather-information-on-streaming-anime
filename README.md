# Gather Information on streaming from Prime Video

Amazon Prime Video の URL から、配信作品の画像・タイトル・URL を抽出するプログラムです。  
コンテナバインド型の Google Apps Script ですので、  
以下のリンクからスプレッドシートをコピーして使用するのが簡単です。  
[Gather Information on streaming from Prime Video](https://docs.google.com/spreadsheets/d/1VvicInpOhsf1PVsZ_s7R1ya4OieBPp_VVhGZHpYAkVw/edit?usp=sharing)

## How To Use

スプレッドシートをコピーして使用する事を前提とします。

### 初回

1. [Gather Information on streaming from Prime Video](https://docs.google.com/spreadsheets/d/1VvicInpOhsf1PVsZ_s7R1ya4OieBPp_VVhGZHpYAkVw/edit?usp=sharing)を開き、 ファイル > コピーを作成 でスプレッドシートをコピーします。(この方法以外でのコピーは機能しません)
2. スプレッドシートを開くと、数十秒ほどでヘルプボタンの隣にスクリプトボタンが作成されます。
3. 「URL」シートに、情報を取得したい Amazon Prime Video の URL を記載します。
4. スプレッドシートのスクリプトボタンから、「配信作品情報取得」ボタンをクリックし、実行します。
5. 編集・閲覧権限を要求されるので、許可します。
6. 再度、スプレッドシートのスクリプトボタンから、「配信作品情報取得」ボタンをクリックし、実行します。
7. 実行完了後、指定した URL から取得したデータがスプレッドシートに書き込まれます。

### 2 回目以降

1. 「URL」シートに、情報を取得したい Amazon Prime Video の URL を記載します。
2. スプレッドシートのスクリプトボタンから、「配信作品情報取得」ボタンをクリックし、実行します。
3. 実行完了後、指定した URL から取得したデータがスプレッドシートに書き込まれます。
