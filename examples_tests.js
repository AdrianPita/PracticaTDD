// Run theses tests using Mocha
//sudo npm install -g chai

var chai = require('chai');
var expect = chai.expect;
var examples = require('./examples');

function suma (a, b){
	return a + b;
}


describe("the behavior of the code in the examples", function(){
  
  it("el numero de string que tiene el array", function(){ 
  var dias = ["lunes", "martes", "miercoles"];
	for (var i = 0; i < dias.length; i++) {
		 dias == 3;
	};
  expect(i).equal(3);
  });

  it("calculates the average of an array", function(){
      expect(examples.average([2,2,2])).equal(2);      
  });

  it("la funcion anidada esta correcta", function(){
  	function correr(zapatillas, kilometros){

  		return function(otro){
  			
  			return zapatillas*kilometros*otro;
  		}

  	}

  	expect(correr(2, 2)(2)).equal(8);
  }

  it("calculates the average of an array with decimals", function(){
      expect(examples.average([7,7,9])).equal(7.666666666666667);      
  });

});

