#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];
const filmEndPoint = 'https://swapi-api.hbtn.io/api/films/' + movieId;
let people = [];
let names = [];


const requestCharacter = async  () => {
    await new Promise( resolve => request( filmEndPoint, (err, res, body) => {
        if(err || res.statusCode !== 200) {
            console.log("Error: ", err, '| statusCode: ', res.statusCode);
          } else {
              const jsonBody = JSON.parse(body);
              people = jsonBody.characters;
              resolve();
            }
    }
    ))
}

const requestNmaes = async () => {
    if (people.length > 0) {
        for (const p of people) {
            await new Promise(resolve => request(p, (err, res, body) => {
                if ( err || res.statusCode !== 200) {
                    console.log('Error: ', err, '| StatusCode: ', res.statusCode);
                  } else {
                      const jsonBody = JSON.parse(body);
                      names.push(jsonBody.name);
                      resolve();
                     }
            }))
        } 
    } else {
        console.log('Error: Got no Characters for some reason')
    }
}


const getCharNames = async () => {
    await requestCharacters();
    await requestNames();
        
    for (const n of names) {
        if (n === names[names.length - 1]) {
            process.stdout.write(n)
        } else {
                process.stdout.write(n + '\n');
        }
    }
}

getCharNames();
