const { Console } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const ahPrices = './Data/ahPrices.json';
const itemsList = './Data/items.json';
const http = require('http');
const https = require('https');
const api_hostname = 'us.api.blizzard.com';
const request = require('request');


//Custom read/write methods
const readFile = (
    callback,
    returnJson = true,
    filePath = ahPrices,
    encoding = 'utf8') => {
    fs.readFile(filePath, encoding, (err, data) => {
      if (err) {
        throw err;
      }
      callback(returnJson ? JSON.parse(data) : data);
    });
  };

  const writeFile = (
    fileData,
    callback,
    filePath = ahPrices,
    encoding = 'utf8') => {
    fs.writeFile(filePath, fileData, encoding, err => {
      if (err) {
        throw err;
      }
      callback();
    });
  };


//Get single item price
router.get('/item/:id', (req, res) => {
    readFile(data => {

        const min =
        Math.min.apply(null,
        JSON.parse(data)
        .auctions
        .filter(auction => auction.item.id == req.params.id)
        .map(auction => auction.unit_price)
        )
        res.set('Access-Control-Allow-Origin', '*');
        res.send(`Lowest price for item ${req.params.id} is ${min / 1000}`);

    });
});

//Get single item data
router.get('/data/:id', (req, res) => {
    readFile(data => {

        const reqid = req.params.id;
        data = JSON.parse(data).auctions[reqid.toString()];

        res.send(data);
    }, true);
});

//Testing data structure
router.get('/test', (req, res) => {
    readFile(data => {

        res.send(JSON.parse(data)["1"]);

    }, true);
});

//Items
router.get('/items/online', (req,res)=> {
  getToken((token)=>{

    const options = {
      host: api_hostname,
      path: '/data/wow/search/item',
      namespace: 'static-us',
      locale:'en_US',
      orderby:'id',
      _page:1,
      access_token:token

    };

    const options2 = 'https://us.api.blizzard.com/data/wow/search/item?namespace=static-us&locale=en_US&orderby=id&_page=1&access_token=UStQwZiNOnENW6nHa4ZxM9Hlj30uPKXk1J';

    console.log("Ready to send request to blizzard API");
    console.log(options);
    var blizzard_req = https.get(options, function(blizzard_res) {
      console.log('STATUS: ' + blizzard_res.statusCode);
      console.log('HEADERS: ' + JSON.stringify(blizzard_res.headers));
    
      let data = '';

      // A chunk of data has been received.
      blizzard_res.on('data', (chunk) => {
        data += chunk;
      });
    
      // The whole response has been received. Print out the result.
      blizzard_res.on('end', () => {
        console.log("Items list recieved");
        //res.send("Done");
        res.send(data);
        //res.send(JSON.parse(data).results.map(item => JSON.parse(`{"id": ${item.data.id}, "name": "${item.data.name.en_US}"}`)));
      });
    
  
    }).on("error", (err) => {
      console.log("Error: " + err.message);
    });
  });
})

//Items
router.get('/items/local', (req,res)=> {
  
  readFile(data => {
    
    res.set('Access-Control-Allow-Origin', '*');

    res.send(data.results.map(item => JSON.parse(`{"id": ${item.data.id}, "name": "${item.data.name.en_US}"}`)));
    
  }, true, itemsList);

})

//Authentification with blizzard API
function getToken(callback){
  console.log("Getting token");
  readFile(
    (data)=>{
      if(data.expires_at < Date.now() - 180000){ //Arbitrary 3min to prevent token timing out during request
        console.log("EXPIRED");
        refreshToken(callback);
      }
      else{
        console.log(2);
        callback(data.access_token);
      } 
  },true,'credentials.json')
}

//Refresh_token
function refreshToken2(callback){

  var dataString = 'grant_type=client_credentials';

  const options1 = {
    host: 'us.battle.net',
    path: '/oauth/token',
    method: 'POST',
    body: dataString,
    grant_type:'client_credentials',
    auth: {
      'user': '66a771b9c48f44bdb9ce52ec95308f8c',
      'pass': 'ScBQqUgeFIAZjYRrBJfLRlqVuB4ZrS5j'
    }
  };

  const options2 = 'https://us.battle.net/oauth/token?grant_type=client_credentials&client_id=66a771b9c48f44bdb9ce52ec95308f8c&client_secret=ScBQqUgeFIAZjYRrBJfLRlqVuB4ZrS5j';

  console.log("Ready to send refresh oauth token");
  var blizzard_req = https.request(options1, function(blizzard_res) {
    console.log('STATUS: ' + blizzard_res.statusCode);
    console.log('HEADERS: ' + JSON.stringify(blizzard_res.headers));
  
    let data = '';

    // A chunk of data has been received.
    blizzard_res.on('data', (chunk) => {
      data += chunk;
    });
  
    // The whole response has been received.
    blizzard_res.on('end', () => {
      console.log("Token recieved");
      const new_credentials = {
        "access_token":JSON.parse(data).access_token,
        "expires_at":Date.now()+JSON.parse(data).expires_in*1000
      } 
      writeFile(
        JSON.stringify(new_credentials),
        ()=>{
          console.log("New token written");
        },
        'credentials.json')
        callback(JSON.parse(data).access_token);
    });
  
  }).on("error", (err) => {
    console.log("Error: " + err.message);
  });
  blizzard_req.end();


}

//Refresh_token
function refreshToken(callback){


  const options1 = {
    url: 'https://us.battle.net/oauth/token',
    method: 'POST',
    form: {
      'grant_type': 'client_credentials'
    },
    auth: {
      'user': '66a771b9c48f44bdb9ce52ec95308f8c',
      'pass': 'ScBQqUgeFIAZjYRrBJfLRlqVuB4ZrS5j'
    }
  };

  console.log("Ready to send refresh oauth token");
  var blizzard_req = request(options1, function(err, blizzard_res, body) {
    //console.log('STATUS: ' + blizzard_res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(blizzard_res.headers));
    console.log(body);
    console.log(err);
  
    // The whole response has been received.
    /*
    blizzard_res.on('end', () => {
      console.log("Token recieved");
      const new_credentials = {
        "access_token":JSON.parse(data).access_token,
        "expires_at":Date.now()+JSON.parse(data).expires_in*1000
      } 
      writeFile(
        JSON.stringify(new_credentials),
        ()=>{
          console.log("New token written");
        },
        'credentials.json')
        callback(JSON.parse(data).access_token);
    });*/
  
  })


}


module.exports = router;