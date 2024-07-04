type SortOrder = 'asc' | 'desc';

export function sortObjectDataByKey<T>(array: T[], key: keyof T, order: SortOrder): T[] {
  const arrayCopy = array.slice();

  return arrayCopy.sort((a, b) => {
    if (a[key] < b[key]) {
      return order === 'asc' ? -1 : 1;
    }
    if (a[key] > b[key]) {
      return order === 'asc' ? 1 : -1;
    }

    return 0;
  });
}
