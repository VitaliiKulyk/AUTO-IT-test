import axios from "axios";
import fs from "fs";
import { openAsBlob } from "node:fs";

(async () => {
  const file = await openAsBlob("./invoiceFile.xlsx");
  const form = new FormData();
  form.set("file", file);

  const request_config = {
    method: "post",
    url: "http://127.0.0.1:3006/invoice/process",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      invoicingMonth: "Sep 2023",
    },
    data: form,
  };

  const response = await axios(request_config);
  console.log(response.data);

  console.log("ok");
  process.exit();
})();
