import validate from "validate.js";

import { ParsingOptions } from "../invoices/parsingOptions";
import { Invoice } from "../invoices/invoice";

type ValidateAndParseOptions = {
  validationConstraints: Record<string, object>;
  parsingOptions: ParsingOptions;
};

export const validateAndParseInvoices = (
  data: any[],
  options: ValidateAndParseOptions
): Invoice[] => {
  const { validationConstraints, parsingOptions } = options;

  const parsed = data.map((row) => {
    const validationErrors = validate(row, validationConstraints);
    const result: any = { validationErrors };

    for (const [key, { property, parse }] of Object.entries(parsingOptions)) {
      let value = parse ? parse(row[property]) : row[property];
      result[key] = value;
    }

    return result;
  });

  return parsed;
};
