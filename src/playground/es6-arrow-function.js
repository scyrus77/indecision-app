const square  = function (x) {
  return x * x;
};

console.log(square(4));

const squareArrow = x => x * x;

console.log(squareArrow(4));


const getfirstName = fullName => fullName.split(' ')[0];

console.log(getfirstName('Steve Cyrus'));

