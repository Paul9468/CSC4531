const express = require('express');
const router = express.Router();

var recipesList = [
	[
		{
			name: 'Rec1',
			components: [
				{
					id: 171315,
					name: 'Nightshade',
					_name: 'Nightshade',
					purchase_price: 20,
					sell_price: 5,
					count: 3,
				},
				{
					id: 168589,
					name: 'Marrowroot',
					_name: 'Marrowroot',
					purchase_price: 20,
					sell_price: 5,
					count: 4,
				},
				{
					id: 168586,
					name: 'Rising Glory',
					_name: 'Rising Glory',
					purchase_price: 50,
					sell_price: 1,
					count: 4,
				},
				{
					id: 170554,
					name: "Vigil's Torch",
					_name: 'Vigil&#39;s Torch',
					purchase_price: 20,
					sell_price: 5,
					count: 4,
				},
				{
					id: 168583,
					name: 'Widowbloom',
					_name: 'Widowbloom',
					purchase_price: 20,
					sell_price: 5,
					count: 4,
				},
			],
			products: [
				{
					id: 171276,
					name: 'Spectral Flask of Power',
					_name: 'Spectral Flask of Power',
					purchase_price: 10000,
					sell_price: 2500,
					count: 1,
				},
			],
			price: 0,
			cost: 0,
			profit: -6,
			id: 7205167160,
		},
		{
			name: 'Rec2',
			components: [
				{
					id: 169701,
					name: 'Death Blossom',
					_name: 'Death Blossom',
					purchase_price: 20,
					sell_price: 5,
					count: 2,
				},
			],
			products: [
				{
					id: 171286,
					name: "Embalmer's Oil",
					_name: 'Embalmer&#39;s Oil',
					purchase_price: 10000,
					sell_price: 2500,
					count: 1,
				},
			],
			price: -1,
			cost: -1,
			profit: -1,
			id: 7205456541,
		},
	],
];
var userList = ['default'];

router.get('/get/:username', (req, res) => {
	console.log(`Sending recipes to user: ${req.params.username}`);

	res.status(200).json(recipesList[userList.indexOf(req.params.username)]);
});

router.post('/post/:username', (req, res) => {
	console.log(`Posting new recipe from user: ${req.params.username}`);

	var userID = userList.indexOf(req.params.username);
	if (userID == -1) {
		userList.push(req.params.username);
		recipesList.push([req.body]);
	} else {
		recipesList[userList.indexOf(req.params.username)].push(req.body);
	}
	res.status(200).send(`Recipe successfully posted to ${req.params.username}'s database`);
});

router.get('/delete/:username/:id', (req, res) => {
	console.log(`Deleting recipe of user: ${req.params.username} with id: ${req.params.id}`);

	recipesList[userList.indexOf(req.params.username)] = recipesList[userList.indexOf(req.params.username)].filter(
		(recipe) => recipe.id != req.params.id
	);

	res.status(200).send('Recipe successfully deleted');
});

module.exports = router;
