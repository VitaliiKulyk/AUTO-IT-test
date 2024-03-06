import { parsingOptions } from "./parsingOptions";

const mandatoryValidationConstraint = {
  presence: { message: "is mandatory" },
};

const optionalValidationConstraint = {
  presence: false,
};

const numericalValidationConstraint = {
  numericality: true,
};

export const validationConstraints = {
  [parsingOptions.customer.property]: mandatoryValidationConstraint,
  [parsingOptions.customerNumber.property]: {
    ...mandatoryValidationConstraint,
    ...numericalValidationConstraint,
  },
  [parsingOptions.projectType.property]: mandatoryValidationConstraint,
  [parsingOptions.quantity.property]: {
    ...mandatoryValidationConstraint,
    ...numericalValidationConstraint,
  },
  [parsingOptions.itemPrice.property]: mandatoryValidationConstraint,
  [parsingOptions.itemCurrency.property]: mandatoryValidationConstraint,
  [parsingOptions.totalPrice.property]: mandatoryValidationConstraint,
  [parsingOptions.invoiceCurrency.property]: mandatoryValidationConstraint,
  [parsingOptions.status.property]: mandatoryValidationConstraint,
  [parsingOptions.invoiceNumber.property]: optionalValidationConstraint,
  [parsingOptions.contractComments.property]: optionalValidationConstraint,
};
