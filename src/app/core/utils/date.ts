export function getDateFromString(value: string): Date {
  if(value.length) {
    let splited: string[] = [];

    if(value.includes('/')) {
      splited = value.split('/');
    }
    if(value.includes('-')) {
      splited = value.split('-');
    }

    const date = new Date(Number(splited[2]), Number(splited[1]) - 1, Number(splited[0]));
    return date;
  }
  return null;
}
