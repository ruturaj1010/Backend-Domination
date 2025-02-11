console.log("Your application has been successfully started.")

arr = [1, 2 , 3]

function PersonMaker(name , age) {
    const person = {
        name: name,
        age : age,
        talk() {
            console.log(`Hello, my name is ${this.name}`);
        }
    }

    return person;
}

// constructors doesnt return anything and start with a capital letter
// function Person(name, age) {
//     this.name = name;
//     this.age = age;
// }

// Person.prototype.talk = function() {
//     console.log("karma is kicking your ass!");
// }

// let p1 = new Person("Ruturaj", 21);
// let p2 = new Person("Sakshi", 19);


// Creating classes
class Person {
    constructor (name , age) {
        this.name= name;
        this.age = age;
    }

    talk() {
        console.log(`Hello, my name is ${this.name}`);
    }
}

class Student extends Person{
    constructor (name, age, marks) {
        super(name , age);
        this.marks = marks;
    }
}

class Teacher {
    constructor (name, age, subject) {
        super (name, age);
        this.subject =  subject;
    }
}
