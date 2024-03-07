import xlsx, { read } from "xlsx";

import { validateAndParseInvoices } from "../utils/jsonParser";
import { getTableJsonFromSheet, getCellValue, TableRange } from "../utils/xlsxParser";

import { validationConstraints as invoiceTableValidationConstraints } from "./validation";
import { parsingOptions as invoiceTableParsingOptions } from "./parsingOptions";

type CurrencyParsingParams = {
  currencies: string[];
  rates: string[];
};

/// наступні 2 змінні мають динамічно вираховуватись, цього я не робив, враховуючи часові ліміти, але як мінімум їх можна змінити в майбутньому
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

const currencyRatesParams: CurrencyParsingParams = {
  currencies: ["A2", "A3", "A4"],
  rates: ["B2", "B3", "B4"],
};

const getCurrencyRates = (worksheet: xlsx.WorkSheet, params: CurrencyParsingParams) => {
  const result: any = {
    ILS: 1, //тут не зрозуміло з завдання, яка дефолтна валюта, мабуть ILS, бо вона є, а її рейт не вказаний
  };
  params.currencies.forEach((cell, i) => {
    const key = getCellValue(worksheet, cell).split(" ")[0];
    const value = getCellValue(worksheet, params.rates[i]);
    result[key] = value;
  });

  return result;
};

export const parseInvoiceFile = (fileBuffer: Buffer) => {
  const xlsxFile = read(fileBuffer, { type: "buffer" });
  const worksheet = xlsxFile.Sheets[xlsxFile.SheetNames[0]];

  const month = getCellValue(worksheet, "A1");
  const currencyRates = getCurrencyRates(worksheet, currencyRatesParams);
  const invoicesTableJson = getTableJsonFromSheet(worksheet, invoicesTableRange);

  const parsedInvoices = validateAndParseInvoices(invoicesTableJson, {
    validationConstraints: invoiceTableValidationConstraints,
    parsingOptions: invoiceTableParsingOptions,
  });

  return {
    month,
    currencyRates,
    invoices: parsedInvoices,
  };
};
