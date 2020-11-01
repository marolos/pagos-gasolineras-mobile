import qrcode from 'qrcode-generator';
import format from 'date-fns/format';
import { es } from 'date-fns/locale';

export async function generateQR(text, typeNumber = 0, errorCorrection = 'L', cellSize = 12) {
   try {
      const qr = qrcode(typeNumber, errorCorrection);
      qr.addData(text);
      qr.make();
      const imgUri = qr.createDataURL(cellSize);
      return imgUri;
   } catch (err) {
      throw new Error(err.message);
   }
}

export function formatISODate(ISOString, pattern = 'PPpp') {
   return format(new Date(ISOString), pattern, { locale: es });
}
