import fetch from 'node-fetch';

export default async function handler(request, res) {
  const { myDay } = request.query;
  const url = `https://random-word-api.herokuapp.com/all`;
  var currentWord = await fetch(url).then(res => res.json());

  // let seed = 1;
  // for (let i = 0; i < this.seed.length; i++) {
  //   seed *= seed.charCodeAt(i);
  // } 
  // seed = seed.toString().substring(1, 4);
  // seed = myDay;

  currentWord = currentWord.filter(item => item.length === 5);

  console.log(currentWord);

  // console.log(seed);

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
  res.json(await currentWord);
}
