import xlsx from "xlsx";

export type TableRange = {
  start: {
    cellIndex: number;
    rowIndex: number;
  };
  end: {
    cellIndex: number;
    rowIndex: number;
  };
};

export const getCellValue = (worksheet: xlsx.WorkSheet, cell: string) => {
  return worksheet[cell].v;
};

export const getTableJsonFromSheet = (worksheet: xlsx.WorkSheet, range: TableRange) => {
  const json = xlsx.utils.sheet_to_json(worksheet, {
    range: {
      s: { c: range.start.cellIndex, r: range.start.rowIndex },
      e: { c: range.end.cellIndex, r: range.end.rowIndex },
    },
  });
  return json;
};
