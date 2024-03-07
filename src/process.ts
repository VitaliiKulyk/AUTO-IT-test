import { read } from "xlsx";

import { validateAndParseInvoices } from "./invoices/jsonParser";
import { getTableJsonFromSheet, getCellValue, TableRange } from "./invoices/xlsxParser";

import { validationConstraints as invoiceTableValidationConstraints } from "./invoices/validation";
import { parsingOptions as invoiceTableParsingOptions } from "./invoices/parsingOptions";

const invoicesTableRange: TableRange = {
  start: {
    cellIndex: 0,
    rowIndex: 4,
  },
  end: {
    cellIndex: 11,
    rowIndex: 32,
  },
};

export const processFile = (fileBuffer: Buffer) => {
  const xlsxFile = read(fileBuffer, { type: "buffer" });
  const worksheet = xlsxFile.Sheets[xlsxFile.SheetNames[0]];

  const month = getCellValue(worksheet, "A1");
  const invoicesTableJson = getTableJsonFromSheet(worksheet, invoicesTableRange);

  const parsedInvoices = validateAndParseInvoices(invoicesTableJson, {
    validationConstraints: invoiceTableValidationConstraints,
    parsingOptions: invoiceTableParsingOptions,
  });

  return {
    month,
    invoices: parsedInvoices,
    currencyRates: {
      USD: 3,
      EUR: 3,
      GBP: 3,
    },
  };
};
