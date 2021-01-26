export const handleRucCedula = (value, onlyRuc = false) => {
	if (value && value.length >= 10 ){
		 if(onlyRuc && value.length < 13) return false;

		 var firstTwo = parseInt(value.substr(0,2));
		 var third = parseInt(value.charAt(2));
		 var tenth;
		 var lastThree;

		 if(firstTwo <= 0 || firstTwo > 24) return false; // entre 1 y 24
		 if(third > 6 && third !== 6 && third !== 9) return false; //[0,...,5], para los rucs 6 o 9
		 if(third === 6){
			  tenth = digitoVerificadorRucPublico(value);
			  if(value.length === 13){
					var lastfour = verifryThreeFourLast(value, true);// 0001
					//lastThree = parseInt(value.substr(9,4)); // 0001, 0002, 0003 
					if(!lastfour)return false;
			  }
		 }else{  
			  if(third === 9){
					tenth = digitoVerificadorJuridico(value);
			  }
			  else tenth = digitoVerificador(value);

			  if(value.length === 13){
					lastThree = verifryThreeFourLast(value); // 001 
					//lastThree = parseInt(value.substr(10,3)); // 001, 002, 003 
					if(!lastThree)return false;
			  }
		 }
		 if(!tenth) return false;//Mudulo 10                
		 return true;
	}
	return false;
}

const verifryThreeFourLast = (value, isFour = false) => {
	var tam = value.length;
	var one = parseInt(value.charAt(tam-3));
	var two = parseInt(value.charAt(tam-2));
	var three = parseInt(value.charAt(tam-1));

	if(isFour){
		 var four = parseInt(value.charAt(tam-4));
	}
	return one === 0 && two === 0 && three === 1 && (isFour? four === 0 : true);
}

const digitoVerificador = (val) => {
	var one = parseInt(val.charAt(0));
	var two = parseInt(val.charAt(1));
	var three = parseInt(val.charAt(2));
	var four = parseInt(val.charAt(3));
	var five = parseInt(val.charAt(4));
	var six = parseInt(val.charAt(5));
	var seven = parseInt(val.charAt(6));
	var eight = parseInt(val.charAt(7));
	var nine = parseInt(val.charAt(8));
	var ten = parseInt(val.charAt(9));

	var newone = (2*one >= 10)? sumaString(String(2*one)) : 2*one;
	var newtwo = (1*two >= 10)? sumaString(String(1*two)) : 1*two;
	var newthree = (2*three >= 10)? sumaString(String(2*three)) : 2*three;
	var newfour = (1*four >= 10)? sumaString(String(1*four)) : 1*four;
	var newfive = (2*five >= 10)? sumaString(String(2*five)) : 2*five;
	var newsix = (1*six >= 10)? sumaString(String(1*six)) : 1*six;
	var newseven = (2*seven >= 10)? sumaString(String(2*seven)) : 2*seven;
	var neweight = (1*eight >= 10)? sumaString(String(1*eight)) : 1*eight;
	var newnine = (2*nine >= 10)? sumaString(String(2*nine)) : 2*nine;

	var suma = newone + newtwo + newthree + newfour + newfive + newsix + newseven + neweight + newnine;
	var residuo = suma % 10;
	return ten === (residuo === 0? 0: 10-residuo );
}

//6
const digitoVerificadorRucPublico = (val) => {
	var one = parseInt(val.charAt(0));
	var two = parseInt(val.charAt(1));
	var three = parseInt(val.charAt(2));
	var four = parseInt(val.charAt(3));
	var five = parseInt(val.charAt(4));
	var six = parseInt(val.charAt(5));
	var seven = parseInt(val.charAt(6));
	var eight = parseInt(val.charAt(7));
	var nine = parseInt(val.charAt(8));

	var newone =  3*one;
	var newtwo =  2*two;
	var newthree = 7*three;
	var newfour = 6*four;
	var newfive =  5*five;
	var newsix = 4*six;
	var newseven = 3*seven;
	var neweight = 2*eight;

	var suma = newone + newtwo + newthree + newfour + newfive + newsix + newseven + neweight;
	var residuo = suma % 11;
	return nine === (residuo === 0? 0: 11-residuo )
	
}

//9
const digitoVerificadorJuridico = (val) => {
	var one = parseInt(val.charAt(0));
	var two = parseInt(val.charAt(1));
	var three = parseInt(val.charAt(2));
	var four = parseInt(val.charAt(3));
	var five = parseInt(val.charAt(4));
	var six = parseInt(val.charAt(5));
	var seven = parseInt(val.charAt(6));
	var eight = parseInt(val.charAt(7));
	var nine = parseInt(val.charAt(8));
	var ten = parseInt(val.charAt(9));

	var newone =  4*one;
	var newtwo =  3*two;
	var newthree = 2*three;
	var newfour = 7*four;
	var newfive =  6*five;
	var newsix = 5*six;
	var newseven = 4*seven;
	var neweight = 3*eight;
	var newnine = 2*nine;

	var suma = newone + newtwo + newthree + newfour + newfive + newsix + newseven + neweight + newnine;
	var residuo = suma % 11;
	return ten === (residuo === 0? 0: 11-residuo )
	
}

function sumaString(entrada) {
	var res = 0;
	entrada.split('').forEach(c => res += parseInt(c));
	return res;
}
