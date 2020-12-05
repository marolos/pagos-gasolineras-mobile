import qrcode from 'qrcode-generator';

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
