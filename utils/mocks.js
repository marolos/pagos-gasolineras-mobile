export const itemsMocks = [
	{
      href:
         'https://scontent.fgye1-1.fna.fbcdn.net/v/t1.0-9/54428260_2712095958824138_3908843766085058560_o.jpg?_nc_cat=110&_nc_sid=730e14&_nc_eui2=AeHZa7n6QN7GenZlf7gvE0gvflBbu0hSfWJ-UFu7SFJ9YhIFwfJ6j3F0Le01xvP6fya6CIOpuMPtb0qjhCcR4jfT&_nc_ohc=PdRSj6el5dEAX-FYXNO&_nc_ht=scontent.fgye1-1.fna&oh=36d0a9425d42d4710c7a4aca52b50f50&oe=5F7EE1D2',
   },
   {
      href:
         'https://scontent.fgye1-1.fna.fbcdn.net/v/t1.0-9/68895444_2964908843542847_2411366743608918016_o.jpg?_nc_cat=104&_nc_sid=9267fe&_nc_eui2=AeEV7vjBSVuRrDZvcs3BYspN01y0A_inJWjTXLQD-KclaLFS79DXD_T_b1f3u3683iUwfZD9sCvvHWQwY_Tcb9BM&_nc_ohc=fUbEsBJiEk8AX9B5tMH&_nc_ht=scontent.fgye1-1.fna&oh=4806226a9541e0037f3d7c93dcf629ba&oe=5F7DD7CB',
   },
   {
      href:
         'https://scontent.fgye1-1.fna.fbcdn.net/v/t1.0-9/55437916_2720174384682962_608810549056110592_o.jpg?_nc_cat=100&_nc_sid=2c4854&_nc_eui2=AeG4-oqKWaJX4SiX9FORAHnMKEOwGkE1M48oQ7AaQTUzj3H1Z4kGn06Cni99u50v3vcPvg5Klw6mn4lfoN2MXKhP&_nc_ohc=Yjr5K3dW1E4AX9NsVE9&_nc_ht=scontent.fgye1-1.fna&oh=9b7d276c2bea56de3ad130e56167dc2a&oe=5F7F82A5',
   },
   
   {
      href:
         'https://scontent.fgye1-1.fna.fbcdn.net/v/t1.0-9/54257948_2702709499762784_5745833426414469120_o.jpg?_nc_cat=108&_nc_sid=2c4854&_nc_eui2=AeHlhYaotjazcPPh4ADz4UyAAsD_pwaKr6cCwP-nBoqvp7eygmhDo7T_WwKDJ1qjmj5qMwoik1et-wFoqhGBSktS&_nc_ohc=E8WgWh251PwAX-XFTXl&_nc_ht=scontent.fgye1-1.fna&oh=94872f23d5e7da1a1da16d061ac91ed1&oe=5F7D4AC6',
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

export const cities = [
   { name: 'Guayaquil' },
   { name: 'Quito' },
   { name: 'Cuenca' },
   { name: 'Ambato' },
   { name: 'Manta' },
];

