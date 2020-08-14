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

export const fakeFetch = () => new Promise((resolve) => setTimeout(resolve, 2000, itemsMocks));

export const companies = [
  { name: 'PDV', balance: 130.0, logo: 'pdv.png', id: 0 },
  { name: 'Shell', balance: 55.0, logo: 'shell.png', id: 1 },
  { name: 'Terpel', balance: 30.0, logo: 'terpel.png', id: 2 },
  { name: 'Primax', balance: 0.0, logo: 'primax.png', id: 3 },
  { name: 'REPSOL', balance: 7.0, logo: 'repsol.png', id: 4 },
];


export const logos = [
  require('../assets/images/pdv.png'),
  require('../assets/images/shell.png'),
  require('../assets/images/terpel.png'),
  require('../assets/images/primax.png'),
  require('../assets/images/repsol.png'),
]