export const itemsMocks = [
   {
      href:
         'https://scontent.fgye1-1.fna.fbcdn.net/v/t1.0-9/68895444_2964908843542847_2411366743608918016_o.jpg?_nc_cat=104&_nc_sid=9267fe&_nc_ohc=GzAi9k7TWDUAX_4KJsf&_nc_ht=scontent.fgye1-1.fna&oh=b5e0af5f6138c5504dc58320a4db8c11&oe=5F564ACB',
   },
   {
      href:
         'https://scontent.fgye1-1.fna.fbcdn.net/v/t1.0-9/55549713_2718513924849008_6814843914441195520_o.jpg?_nc_cat=105&_nc_sid=2c4854&_nc_ohc=HTd82eb0h80AX_mcvJE&_nc_ht=scontent.fgye1-1.fna&oh=e4ff67cb75df13bec3063e9896e03a8d&oe=5F560875',
   },
   {
      href:
         'https://scontent.fgye1-1.fna.fbcdn.net/v/t1.0-9/55719352_2725008754199525_8935193604037541888_o.jpg?_nc_cat=102&_nc_sid=2c4854&_nc_ohc=_Fx69BLHbfkAX_h2FWQ&_nc_ht=scontent.fgye1-1.fna&oh=8246c0fa29c6c9a8a7fb0f7f18ee40fb&oe=5F54322A',
   },
   {
      href:
         'https://scontent.fgye1-1.fna.fbcdn.net/v/t1.0-9/55437916_2720174384682962_608810549056110592_o.jpg?_nc_cat=100&_nc_sid=2c4854&_nc_ohc=imp9f65x9hIAX9p3LXl&_nc_ht=scontent.fgye1-1.fna&oh=e82c041b8e7b4d93852b5e07f90fb4b8&oe=5F540125',
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
	switch(path){
		case 'pdv.png':
			return logos[0]
		case 'shell.png':
			return logos[1]
		case 'terpel.png':
			return logos[2]
		case 'primax.png':
			return logos[3]
		case 'repsol.png':
			return logos[4]
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
