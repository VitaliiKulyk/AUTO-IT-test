import express from "express";

import fileUpload from "express-fileupload";
import fs from "fs/promises";

import { processFile } from "./process";
import { Invoice } from "./invoices/invoice";
import { isEmpty } from "lodash";

const app = express();
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

app.get("/test", (req, res) => {
  res.send("GET. Test endpoint. OK.");
});

app.post("/invoice/process", async (req: any, res) => {
  const { invoicingMonth } = req.query;
  const file = await fs.readFile(req.files.file.tempFilePath);
  const { invoices, month, currencyRates } = processFile(file);

  if (!invoicingMonth === month) {
    return res.status(400).send("Invoicing month does not match with file");
  }

  const isInvoiceValid = (invoice: Invoice) => {
    const hasErrors = !isEmpty(invoice.validationErrors);
    const valid = invoice.status === "Ready" || !isEmpty(invoice.invoiceNumber);
    return !hasErrors && valid;
  };

  const validInvoices = invoices.filter(isInvoiceValid);

  res.send({
    invoicingMonth,
    currencyRates,
    invoicesData: validInvoices,
  });
});

app.listen(3006, () => {
  console.log(`Example app listening on port 3006`);
});
