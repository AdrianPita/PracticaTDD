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


