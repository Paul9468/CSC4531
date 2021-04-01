const express = require('express');
const router = express.Router();
const fs = require('fs');
const request = require('request');

const ahPrices = './Data/ahPrices.json';

var askingToken = false;
var askingTokenCallbacks = [];
var askingAhData = false;
var askingAhDataCallbacks = [];

//#region Custom read/write methods
const readFile = (callback, returnJson = true, filePath = ahPrices, encoding = 'utf8') => {
	fs.readFile(filePath, encoding, (err, data) => {
		if (err) {
			throw err;
		}
		callback(returnJson ? JSON.parse(data) : data);
	});
};

const writeFile = (fileData, callback, filePath = ahPrices, encoding = 'utf8') => {
	fs.writeFile(filePath, fileData, encoding, (err) => {
		if (err) {
			throw err;
		}
		callback();
	});
};
//#endregion

//Get single item price
router.get('/item/:id', (req, res) => {
	readFile(
		(data) => {
			callback = () => {
				const id = parseInt(req.params.id);
				const min = Math.min.apply(
					null,
					data.auctions.filter((auction) => auction.item.id == id).map((auction) => auction.unit_price)
				);
				res.set('Access-Control-Allow-Origin', '*');
				res.status(200).json(min / 10000);
			};
			if (data.pullTime - Date.now() < 3600000) {
				callback();
			} else {
				getApiAhData(callback);
			}
		},
		true,
		ahPrices
	);
});


// Request the Auction house data from Blizzard API
getApiAhData = (callback) => {
	askingAhDataCallbacks.push(callback);
	if (!askingAhData) {
		askingAhData = true;
		getToken((token) => {

			var options = {
				'method': 'GET',
				'url': 'https://eu.api.blizzard.com/data/wow/connected-realm/1302/auctions?namespace=dynamic-eu&locale=en_US',
				'headers': {
				  'Authorization': 'Bearer USosu3CweJZsW7hnabWKHXEVuf4LMdgkI3'
				}
			  };

			console.log('Ready to send request to blizzard API');

			request(options, function (error, response) {
				if (error) throw new Error(error);

				console.log('AH Data recieved');
				var data = JSON.parse(response.body);
				data.pullTime = Date.now();
				writeFile(JSON.stringify(data), () => {
					while (askingAhDataCallbacks.length > 0) {
						askingAhDataCallbacks.pop()();
					}
					askingAhData = false;
				});
			});
		});
	}
};

//Authentification with blizzard API
function getToken(callback) {
	console.log('Getting token');
	readFile(
		(data) => {
			if (data.expires_at > Date.now() + 180000) {
				//Arbitrary 3min to prevent token timing out during request
				console.log('Saved token is valid');
				callback(data.access_token);
			} else {
				console.log('Saved token is invalid');
				refreshToken(callback);
			}
		},
		true,
		'credentials.json'
	);
}

//Refresh_token
function refreshToken(callback) {
	askingTokenCallbacks.push(callback);

	if (!askingToken) {
		askingToken = true;

		const options1 = {
			url: 'https://us.battle.net/oauth/token',
			method: 'POST',
			form: {
				grant_type: 'client_credentials',
			},
			auth: {
				user: '66a771b9c48f44bdb9ce52ec95308f8c',
				pass: 'ScBQqUgeFIAZjYRrBJfLRlqVuB4ZrS5j',
			},
		};

		console.log('Ready to send refresh oauth token');
		request(options1, function (err, blizzard_res, body) {
			//console.log('STATUS: ' + blizzard_res.statusCode);
			//console.log('HEADERS: ' + JSON.stringify(blizzard_res.headers));
			console.log('statusCode:', blizzard_res && blizzard_res.statusCode);
			if (err) {
				console.error(err);
			}

			// Save the received token
			console.log('Token recieved');
			const new_credentials = {
				access_token: JSON.parse(body).access_token,
				expires_at: Date.now() + JSON.parse(body).expires_in * 1000,
			};
			writeFile(
				JSON.stringify(new_credentials),
				() => {
					console.log('New token written');
				},
				'credentials.json'
			);
			while (askingTokenCallbacks.length > 0) {
				askingTokenCallbacks.pop()(JSON.parse(body).access_token);
			}
			askingToken = false;
		});
	}
}

module.exports = router;
