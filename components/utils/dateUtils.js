import formatRelative from 'date-fns/formatRelative';
import format from 'date-fns/format';
import { es } from 'date-fns/locale';

export function formatISODate(ISOString, pattern = 'PPpp') {
	return format(new Date(ISOString), pattern, { locale: es });
}

export function formatISORelative(ISOString) {
	return formatRelative(new Date(ISOString), new Date(), { locale: es });
}
