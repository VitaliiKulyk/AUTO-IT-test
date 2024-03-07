import axios from "axios";
import { openAsBlob } from "node:fs";
import util from "util";

(async () => {
  const file = await openAsBlob("./invoiceFile.xlsx");
  const form = new FormData();
  form.set("file", file);

  const request_config = {
    method: "post",
    url: "http://127.0.0.1:3006/invoice/process-file",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    params: {
      invoicingMonth: "Sep 2023",
    },
    data: form,
  };

  const response = await axios(request_config);
  console.log(util.inspect(response.data, { showHidden: false, depth: null, colors: true }));

  console.log("ok");
  process.exit();
})();
