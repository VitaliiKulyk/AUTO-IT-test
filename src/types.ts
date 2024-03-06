type Currency = "USD" | "EUR" | "GBP" | "ILS";
type InvoiceRowStatus = "Ready" | "Done";

// "Customer": "Microsof",
// "Cust No'": "21339",
// "Project Type": "Finance",
// "Quantity": "3",
// "Price Per Item": "6",
// "Item Price Currency": "USD",
// "Total Price": "18",
// "Invoice Currency": "ILS",
// "Status": "Done",
// "Invoice #": "",
// "Contract Comments": "Great deal"

type InvoiceRow = {
  customer: String;
  customerNumber: String;
  projectType: String;
  quantity: Number;
  itemPrice: Number;
  itemCurrency: Currency;
  totalPrice: Number;
  invoiceCurrency: Currency;
  status: InvoiceRowStatus;
  invoiceNumber?: String;
  contractComments?: String;
};
