import { isEmpty } from "lodash";

import { validateAndParse } from "./invoices/parser";
import { Invoice } from "./invoices/invoice";

import rawData from "./input.json";

import { validationConstraints as invoiceTableValidationConstraints } from "./invoices/validation";
import { parsingOptions as invoiceTableParsingOptions } from "./invoices/parsingOptions";

const parsedInvoices = validateAndParse(rawData, {
  validationConstraints: invoiceTableValidationConstraints,
  parsingOptions: invoiceTableParsingOptions,
});

const isInvoiceValid = (invoice: Invoice) => {
  const hasErrors = !isEmpty(invoice.validationErrors);
  const valid = invoice.status === "Ready" || !isEmpty(invoice.invoiceNumber);
  return !hasErrors && valid;
};

const validInvoices = parsedInvoices.filter(isInvoiceValid);
console.log(validInvoices);
