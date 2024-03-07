import express from "express";
import fileUpload from "express-fileupload";
import fs from "fs/promises";

import { parseInvoiceFile } from "./invoices/invoiceParser";
import { Invoice } from "./invoices/invoice";
import { getInvoiceTotal, isInvoiceValid } from "./invoices/helper";

const app = express();
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));

app.get("/test", (req, res) => {
  res.send("GET. Test endpoint. OK.");
});

app.post("/invoice/process-file", async (req: any, res) => {
  const { invoicingMonth } = req.query;
  const file = await fs.readFile(req.files.file.tempFilePath);
  const { invoices, month, currencyRates } = parseInvoiceFile(file);

  if (!invoicingMonth === month) {
    return res.status(400).send("Invoicing month does not match with file");
  }

  /// якщо інвойс не валідний, він далі не процеситься, проте повертаються в респонсі з помилками
  const validInvoices: Invoice[] = invoices.filter(isInvoiceValid);

  validInvoices.forEach((invoice) => {
    const invoiceTotal = getInvoiceTotal(invoice, currencyRates);
    invoice.invoiceTotal = invoiceTotal;
  });

  res.send({
    invoicingMonth,
    currencyRates,
    invoicesData: invoices, //тут невалідні інвойси з помилками валідації, та валідні інвойси з тоталом
  });
});

app.listen(3006, () => {
  console.log(`Example app listening on port 3006`);
});
