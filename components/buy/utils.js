import qrcode from 'qrcode-generator';
import format from 'date-fns/format';
import { es } from 'date-fns/locale';

export async function generateQR(text) {
   try {
      const qr = qrcode(0, 'L');
      qr.addData(text);
      qr.make();
      const imgUri = qr.createDataURL(12);
      return imgUri;
   } catch (err) {
      throw new Error(err.message);
   }
}

export function formatISO(ISOString) {
   return format(new Date(ISOString), 'PPpp', { locale: es });
}
