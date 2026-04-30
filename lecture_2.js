const myName = "Adam";
const greet = (name) =>{
 return `OHAYOOO FRIEND, ${name}! I MISS YOU PEEPS`;
 };
 const classmates=["Jackie", "Jana", "Yator", "Jake", "Jaydee"];
 classmates.map(name=>greet(name));
 classmates.forEach(name => {
     console.log(`%c${greet(name)}`, "color: #8d1ce5; font-weight: bold;");
 });
