type CsvFormatValueCallback = (value: any, dataItem?: Record<string, any>) => string;

export interface CsvColumn {
  key: string;
  title: string;
  formatValue?: CsvFormatValueCallback;
}

export const downloadCsv = (
  data: Record<string, any>[],
  columns: CsvColumn[],
  filename: string,
) => {
  const nullToEmptyReplacer = (_key: string, value: any) => (null === value ? '' : value);

  // Converts a 'dataItem' object into an array of strings.
  const prepareDataItem = (dataItem: Record<string, any>) =>
    columns.map(column => {
      let value = dataItem[column.key] ?? '-';

      if (column.key in dataItem) {
        if (typeof column.formatValue === 'function') {
          value = column.formatValue(dataItem[column.key], dataItem);
        }
      }

      return JSON.stringify(value, nullToEmptyReplacer);
    });

  const headingsRow = columns.map(column => column.title).join(',');
  const contentRows = data.map(dataItem => prepareDataItem(dataItem).join(','));

  const csvDataString = [headingsRow, ...contentRows].join('\r\n');

  const universalBom = '\uFEFF';
  const blobParts = [universalBom + csvDataString];
  const blobOptions: BlobPropertyBag = {
    type: 'text/csv;charset=UTF-8',
  };

  const file = new Blob(blobParts, blobOptions);
  const link = document.createElement('a');

  link.href = window.URL.createObjectURL(file);
  link.download = `${filename}.csv`;
  link.click();
};
