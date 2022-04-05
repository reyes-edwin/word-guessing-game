## Project Documentation - getWord.js

**Purpose**
The purpose of the getWord endpoint is to serve a random word to the front end game. This endpoint is called when the game is first launched to retireve the inital word and again when the player wishes to play another game using a different seed/date value. This endpoint is critical to the operation of our web component. 

**Data Requirements**
To correctly function, this endpoint requires a seed value to determine the date. Since each day has a different "word of the day" assigned to it, this seed value allows the endpoint to know which word to return. To request a random date, the frontend should request a date as "random". For example: `/api/getWord?myDay=random

**What does this endpoint return?**
This endpoint returns a JSON response with the word of the day. See below for an example:
```json
{
    "word": "apple"
}
```