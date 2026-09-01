const formatDateToObjDate = (dateStr: string | null): Date | null => {
  if (!dateStr) return null;

  const [year, month, day] = dateStr.split('-').map(Number);

  if (!year || !month || !day) return null;

  return new Date(year, month - 1, day);
};

const formatDateToString = (dataObj: Date | null): string | null => {
  if (!dataObj) return null;

  const offset = dataObj.getTimezoneOffset();
  const localDate = new Date(dataObj.getTime() - (offset * 60 * 1000));

  return localDate.toISOString().split('T')[0] ?? null;
}

export { formatDateToObjDate, formatDateToString };
