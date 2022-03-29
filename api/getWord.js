import fetch from 'node-fetch';

export default async function handler(request, res) {
  const { myDay } = request.query;
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

  let word;

  const url = `https://random-word-api.herokuapp.com/all`;
  var wordList = await fetch(url).then(res => res.json());
  // filter array to just 5 letter words
  wordList = wordList.filter(item => item.length === 5);

  console.log(wordList);

  let seed = 1;
  for (let i = 0; i < myDay.length; i++) {
    seed *= myDay.charCodeAt(i);
  }

  seed = parseInt(seed.toString().substring(1, 4));

  console.log('Current seed ' + seed);

  // ensure we are not above the length of the array
  if (seed > wordList.length) {
    seed = wordList.length - 1;
  }

  let wordOfDay = wordList[seed];

  let nums = Math.floor(Math.random() * 8786);

  let newWord = wordList[nums];

  console.log(newWord);
  // return word of the day
  res.json({ word: wordOfDay, randomWord: newWord });
}
