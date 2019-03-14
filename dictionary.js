var dictionary = {false: '', true: 'two'};
var a = 5
console.log(dictionary[a%2 == 0] || dictionary[a%2 != 0]);