import validate from "validate.js";

import { ParsingOptions } from "./parsingOptions";
import { Invoice } from "./invoice";

type ValidateAndParseOptions = {
  validationConstraints: Record<string, object>;
  parsingOptions: ParsingOptions;
};

export const validateAndParse = (data: any[], options: ValidateAndParseOptions): Invoice[] => {
  const { validationConstraints, parsingOptions } = options;

  const parsed = data.map((row) => {
    const validationErrors = validate(row, validationConstraints);
    const result: any = { validationErrors };

    for (const [key, { property, parse }] of Object.entries(parsingOptions)) {
      let value = parse ? parse(row[property]) : row[property];
      if (key === "totalPrice") {
        console.log({ key, raw: row[property], value });
      }
      result[key] = value;
    }

    return result;
  });

  return parsed;
};
