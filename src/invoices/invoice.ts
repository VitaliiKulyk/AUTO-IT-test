export type Invoice = {
  customer: string;
  customerNumber: string;
  projectType: string;
  quantity: number;
  itemPrice: number;
  itemCurrency: string;
  totalPrice: number;
  invoiceCurrency: string;
  status: string;
  //
  invoiceNumber?: string;
  contractComments?: string;
  //
  validationErrors?: any;
};
