export function createChunks(array, chunkSize) {
  const chunks = [];
  const n = array.length;
  let i = 0;

  while (i < n) {
    chunks.push(array.slice(i, (i += chunkSize)));
  }

  return chunks;
}

export function passwordValidator(pass1, pass2) {
  const status = {
    message: '',
    isValid: false,
  };
  if (pass1.length < 8) {
    status.message =
      'La contraseña debe tener al menos 8 caracteres, un numero, y un caracter especial';
    return status;
  }
  if (pass1 != pass2) {
    status.message = 'Las contraseñas no coinciden';
    return status;
  }
  status.isValid = true;
  return status;
}

export function randomInt(nmax) {
  const max = nmax || 100000;
  return Math.floor(Math.random() * max);
}
