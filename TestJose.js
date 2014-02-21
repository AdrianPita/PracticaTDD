function add(a, b ){
  return a + b;
}

module.exports.average = function(numbers){
  var sum = 0, i, length = numbers.length;

  for (i = 0; i < length; i++){
    sum += numbers[i];
  }
  return sum / numbers.length;
}

module.exports.suma = function (a, b){
    return a + b;
}

module.exports.sameStringIf = function(stringa, stringb){
    if(stringa === stringb){
        return "mismo string a y b";
         }
}

module.exports.sameStringElse = function(stringa, stringb){
    if(stringa === stringb){
        return "mismo string a y b";
         } else {
            return "distinto string";
         }
}

module.exports.autoEjecutable = (function(j){
    return j;
})(6);

module.exports.dobleFuncion = function(x){
    return function(y){
        return x+y;
    };
};


EN EL SIGUIENTE ARCHIVO:

// Run theses tests using Mocha
var chai = require('chai');
var expect = chai.expect;
var examples = require('./examples');



describe("the behavior of the code in the examples", function(){

    xit("suma", function(){
        //var result = suma(2, 2);
        expect(examples.suma(2,2)).equal(4);
    });

    xit("devuelve si es mismo string", function(){
        expect(examples.sameStringIf("pepe", "pepe")).equal("mismo string a y b");
    });

    xit("devuelve si es distinto string", function(){
        expect(examples.sameStringElse("pepa", "juan")).equal("distinto string");
    });

    it("asigna valor a una variable", function(){
        expect(examples.autoEjecutable).equal(6);
    });

    it("valor dobleFuncion", function(){
        expect(examples.dobleFuncion("k")("j")).equal("kj");
    });

  xit("calculates the average of an array", function(){
      expect(examples.average([2,2,2])).equal(2);      
  });
  xit("calculates the average of an array with decimals", function(){
      expect(examples.average([7,7,9])).equal(7.666666666666667);      
  });

});