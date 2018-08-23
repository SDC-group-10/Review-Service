const fs = require('fs');
const faker = require('faker');

const timedates = [];
const sentences = [];
// const file = fs.createWriteStream("./../../users.txt");
const firstNames = [];
const lastNames = [];
let fullNames = '';
const links = [];
// for (let i = 0; i < 500; i++) {
//   const datetime = faker.date.between('2000-01-01', '2018-08-09').toISOString();
//   const formattedDatetime = `${datetime.slice(0, 10)} ${datetime.slice(11, 16)}`;
//   const content = faker.lorem.sentence();
//   timedates.push(formattedDatetime);
//   sentences.push(content);
// }

// console.log(sentences);

for (var i = 0; i < 70; i++) {
  if (i < 10) {
    links.push(`'https://s3-us-west-1.amazonaws.com/groupout98hr/000${i}.jpg'`);
  } else {
    links.push(`'https://s3-us-west-1.amazonaws.com/groupout98hr/00${i}.jpg'`);
  }
}

for (var i = 1; i < 101; i++) {
  links.push(`'https://s3-us-west-2.amazonaws.com/jae-bae-static/dogs/doggo/${i}.jpeg'`);
}

for (let i = 0; i < 1000; i++) {
  const name = faker.name.firstName();
  const lastname = faker.name.firstName();
  firstNames.push(`'${name}'`);
  lastNames.push(`'${lastname}'`);
}
let count = 0;
for (let i = 0; i < firstNames.length; i++) {
  for (let j = 0; j < lastNames.length; j++) {
    count++;
    fullNames += `'${firstNames[i]} ${lastNames[j]}', '${
      links[Math.floor(Math.random() * 170)]
    }' \n`;
  }
}
fs.appendFile('./names.js', [firstNames, links, lastNames]);

// file.write(fullNames);
// file.end();
