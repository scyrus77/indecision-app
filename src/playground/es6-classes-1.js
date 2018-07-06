

class Person {

  constructor(name = 'Anonymous', age = 0) {
    // console.log('name', name);
    this.name = name;
    this.age = age;
  }
  getGreeting() {
    return `Hello ${this.name}`;
  }
  getDescription() {
    return `${this.name} is ${this.age} years old`;
  }

}

class Student extends Person {

  constructor(name = 'Anonymous', age = 0, major) {
    super(name, age)
    this.major = major

  }
  getDescription() {
    let desc = super.getDescription();
    if (this.hasMajor()) {
      desc += ' has major'
    }
    return desc;
  }
  hasMajor() {
    return !!this.major;
  }

}

// const me = new Person('Steve Cyrus', 34);
const me = new Student('Steve Cyrus', 34, 'Computer Science');
console.debug(me);
console.debug(me.hasMajor());
console.debug(me.getGreeting());
console.debug(me.getDescription());
// const other = new Person();
const other = new Student();
console.debug(other.getGreeting());
console.debug(other.getDescription());

