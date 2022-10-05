import axios, { AxiosError } from "axios";
import React, { useState } from "react";

export const Uploader = () => {
  const [file, setFile] = useState<File | null>(null);

  // ファイル選択後に発火
  const onChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  // 送信ボタンクリック時
  const onClickSubmit = async () => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    const url = "api/todo/upload";
    await axios.post(url, formData)
      .then((res) => {
        console.log(res.data)
      })
      .catch((e: AxiosError) => {
        console.error(e)
      });
  };

  return (
    <>
      <div>
        <h1>アップローダー</h1>
        <p>ファイルをサーバーにアップロードするサンプル</p>
      </div>

      <div>
        <form>
          <input
            type="file"
            accept="text/plain, .dfm"
            onChange={onChangeFile}
          />
          <input
            type="button"
            disabled={!file}
            value="送信"
            onClick={onClickSubmit}
          />
        </form>
      </div>
    </>
  );
};
