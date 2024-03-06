import axios from "axios";
import fs from "fs";

(async () => {
  const file = fs.createReadStream("./invoiceFile.xlsx");
  const form = new FormData();
  form.append("invoicingMonth", "Sep 2023");
  form.append("file", file);

  const request_config = {
    method: "post",
    url: "http://127.0.0.1:3006/invoice/process",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: form,
  };

  const response = await axios(request_config);
  console.log(response.data);

  console.log("ok");
  process.exit();
})();
