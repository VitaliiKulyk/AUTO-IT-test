import { Invoice } from "./invoice";

import { isEmpty } from "lodash";

export const getInvoiceTotal = (invoice: Invoice, currencyRates: any) => {
  const { totalPrice, itemCurrency, invoiceCurrency } = invoice;

  if (itemCurrency === invoiceCurrency) {
    return totalPrice;
  }

  const rate = currencyRates[itemCurrency] / currencyRates[invoiceCurrency];
  return Number((totalPrice * rate).toFixed(2));
};

/// функція-умова, яка визначає, чи валідний інвойс.
export const isInvoiceValid = (invoice: Invoice) => {
  const hasErrors = !isEmpty(invoice.validationErrors);
  const valid = invoice.status === "Ready" || !isEmpty(invoice.invoiceNumber);
  return !hasErrors && valid;
};
