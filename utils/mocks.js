export const itemsMocks = [
   {
      href: 'https://i.imgur.com/u6u4Aps.jpg',
   },
   {
      href: 'https://i.imgur.com/sHX18Nz.jpg',
   },
   {
      href: 'https://i.imgur.com/VadzaDv.jpg',
   },
   {
      href: 'https://i.imgur.com/t0rP389.jpg',
   },
   {
      href: 'https://i.imgur.com/VadzaDv.jpg',
   },
];

export const fakeFetch = (data, timing) =>
   new Promise((resolve) => setTimeout(resolve, timing || 2000, data));

export const logos = [
   require('../assets/images/pdv.png'),
   require('../assets/images/shell.png'),
   require('../assets/images/terpel.png'),
   require('../assets/images/primax.png'),
   require('../assets/images/repsol.png'),
];

export const getLogoByPath = (path) => {
   switch (path) {
      case 'pdv.png':
         return logos[0];
      case 'shell.png':
         return logos[1];
      case 'terpel.png':
         return logos[2];
      case 'primax.png':
         return logos[3];
      case 'repsol.png':
         return logos[4];
   }
};

export const vehiclesIds = [
   { id: 0, user_id: 0, number: 'abc123', alias: 'carro azul' },
   { id: 1, user_id: 1, number: 'def452' },
   { id: 2, user_id: 2, number: 'cba321', alias: 'carro de mami' },
];

export const cards = [
   { id: 0, alias: 'débito - MANUELA CAÑISAREZ', type: 'visa' },
   { id: 1, alias: 'crédito - MANUELA CAÑISAREZ', type: 'mastercard' },
];

export const cities = [
   { name: 'Guayaquil' },
   { name: 'Quito' },
   { name: 'Cuenca' },
   { name: 'Ambato' },
   { name: 'Manta' },
];
