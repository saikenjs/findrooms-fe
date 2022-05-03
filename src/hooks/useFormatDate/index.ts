import moment from 'moment';

export function useFormatDate() {
  return (_date: string) => moment(_date).format('DD/MM/YYYY');
}
