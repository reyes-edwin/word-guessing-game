import fetch from 'node-fetch';

export default async function handler(request, res) {
  // headers for cache control
  res.setHeader('Cache-Control', 'max-age=0, s-maxage=1800');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,OPTIONS,PATCH,DELETE,POST,PUT'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  var { myDay } = request.query;
  // @feedback I made this accept a "date" called random
  // this way the game can be played either by supplying a date,
  // or asking for a new date, or for a "random" date
  if (myDay === 'random') {
    myDay = randomDate(new Date(1990, 1, 1), new Date());
  }

  const url = `https://random-word-api.herokuapp.com/all`;
  var wordList = await fetch(url).then(res => res.json());

  // filter array to just 5 letter words
  wordList = wordList.filter(item => item.length === 5);

  let seed = 1;
  for (let i = 0; i < myDay.length; i++) {
    seed *= myDay.charCodeAt(i);
  }

  seed = parseInt(seed.toString().substring(1, 4));

  // ensure we are not above the length of the array
  if (seed > wordList.length) {
    seed = wordList.length - 1;
  }

  // return word of the day
  // @feedback this API would not return a random word + word.
  // it would return a word and I've supplied the date
  // so that if it's random you'll know which date generates that word
  res.json({ word: wordList[seed], date: myDay, allWords: wordList });
}

function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
    .toISOString()
    .slice(0, 10);
}
