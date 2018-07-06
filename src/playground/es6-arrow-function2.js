// argument object - no longer bound with arrow function
const add = function(a, b) {
  console.log(arguments);
  return a + b;
};
console.log(add(55, 1, 100));

const addArrow = (a,b) => {
  // console.log(arguments);
  return a + b;
};
console.log(addArrow(55, 1, 100));

// this keyword - no longer bound

const user = {
  name: 'Andrew',
  cities: ['Denver', 'Genrmantown', 'London'],
  // printPlacesLived: function () {
  // printPlacesLived: () => {
  printPlacesLived() {
    console.log(this.name);
    return this.cities.map( city => this.name + ' has lived in ' +  city);

    // this.cities.forEach( city => {
    //   console.log(this.name + ' has lived in ' +  city);
    // });

    // this.cities.forEach( function (city) {
    //   console.log(this.name + ' has lived in ' +  city);
    // });
  }
};

 // user.printPlacesLived();
console.log(user.printPlacesLived());

//

const multiplier = {
  numbers: [1, 4, 5],
  multiplyBy: 6,
  multiply() {
    return this.numbers.map( n => n * this.multiplyBy);
  }
};

console.log(multiplier.multiply());

