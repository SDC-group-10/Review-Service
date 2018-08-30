const fs = require('fs');

const dataJSON = {
  version: 1,
  variables: [
    {
      names: ['id'],
      values: [],
    },
  ],
};

const makeFavoredIds = (pathToFile) => {
  // Data generation plan:
  const stream = fs.createWriteStream(pathToFile);
  const arrNums = [];
  for (let idx = 0; idx < 50000; idx += 1) {
    const rando = Math.random();
    let insertion;
    // 40 % chance that one of the top 1000 will be picked.
    if (rando > 0.35) {
      const subFrom10M = Math.floor(Math.random() * 1000);
      insertion = 10000000 - subFrom10M;
      // arrNums.push(insertion);
    } else if (rando > 0.2) {
      // 10 % chance that one of the next 9000 will be picked
      const subFrom = Math.floor(Math.random() * 10000);
      insertion = 9999000 - subFrom;
      // arrNums.push(insertion);
    } else if (rando > 0.2) {
      // 20% chance that it's > 8,000,000.
      const subFrom = Math.floor(Math.random() * 2000000);
      insertion = 10000000 - subFrom;
      // arrNums.push(insertion);
    } else {
      // 30 % chance that any other number will be picked.
      insertion = Math.ceil(Math.random() * 8000000);
      // arrNums.push(insertion);
    }
    dataJSON.variables[0].values.push([insertion]);
  }
  // write each number into a csv.

  const str1 = 'num';
  stream.once('open', (fd) => {
    stream.write(JSON.stringify(dataJSON));
    // stream.write(str1 + '\n');

    // for (let idx = 0; idx < arrNums.length; idx++) {
    //   stream.write(arrNums[idx] + '\n');
    // }
    stream.end();
  });
};

makeFavoredIds(
  '/Users/christiannoh/Desktop/HackReactorCode/SDC/Review-Service/server/loader/loaderIds.json',
);
