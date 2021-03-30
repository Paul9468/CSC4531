const express = require('express');
const router = express.Router();
const { Client } = require('pg');


const client = new Client({
    user: 'paul',
    host: 'localhost',
    database: 'paul',
    password:'CSC4531',
    port: 5432,
});



router.get('/items', (req, res) => {

    console.log("Trying to reach items DB");

    client
    .connect()
    .catch(err => console.log(err));

    const query =`
    SELECT id,name,purchase_price,sell_price FROM items;
    `;

    //SQL
    client
    .query(query)
    .then(data => {

        console.log('Succesfully retrieved items DB')

        res.set('Access-Control-Allow-Origin', '*');
        
        itemList = data.rows.map(item =>
            JSON.parse(`{
                "id": ${item.id},
                "name": "${item.name.en_US.replace(/"/g, '&#34;')}",
                "_name": "${item.name.en_US.replace(/'/g, '&#39;').replace(/"/g, '&#34;')}",
                "purchase_price": ${item.purchase_price}, 
                "sell_price": ${item.sell_price}
                }`)
        );
        res.status(200).json(itemList);



    })
    .catch(err => {
        console.error(err);
    })
    .finally(() => {
        //client.end();
    });


});

module.exports = router;