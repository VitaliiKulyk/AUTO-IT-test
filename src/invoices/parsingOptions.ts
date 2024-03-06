type ParseFunction = (v: string) => any;

export type ParsingOptions = Record<
  string,
  {
    property: string;
    parse?: ParseFunction;
  }
>;

const convertToNumber: ParseFunction = (v) => {
  return parseFloat(v) || 0;
};

export const parsingOptions: ParsingOptions = {
  customer: { property: "Customer" },
  customerNumber: { property: "Cust No'" },
  projectType: { property: "Project Type" },
  quantity: { property: "Quantity", parse: convertToNumber },
  itemPrice: { property: "Price Per Item", parse: convertToNumber },
  itemCurrency: { property: "Item Price Currency" },
  totalPrice: {
    property: "Total Price",
    parse: convertToNumber,
  },
  invoiceCurrency: { property: "Invoice Currency" },
  status: { property: "Status" },
  invoiceNumber: { property: "Invoice #" },
  contractComments: { property: "Contract Comments" },
};
