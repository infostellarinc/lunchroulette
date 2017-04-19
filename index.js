const base = require('airtable').base('app2i7pjqJLqh8DVe');
const moment = require('moment');

var restaurants = [];

base('Restaurants').select({
  filterByFormula: "NOT({My Rating} = 'Meh...')"
}).eachPage((records, fetchNextPage) => {
  records.forEach(record => {
    restaurants.push(record);
  });
  fetchNextPage();
}, (err) => {
  if (err) return console.error(err);

  const rand = Math.random();
  const choice = restaurants[parseInt(rand * restaurants.length)];
  const messages = [
    `There are ${restaurants.length} restaurants in the databse.`,
    `And today's random number is ${rand}.`,
    `Which means we are eating at ...`,
    choice.fields.Name,
  ];
  console.info(messages.join('\n'));

  base('Logs').create({
    "Date": moment().format('YYYY-MM-DD'),
    "Restaurant": [choice.id],
  }, (err, record) => {
    if (err) return console.error(err);
  });
});

