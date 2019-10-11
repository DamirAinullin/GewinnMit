const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

let field = [
	[0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0, 0]
];

let players = null;
let currentPlayer = 1;

app.get('/', function(req, res) {
	res.send({
		field,
		currentPlayer
	});
});

app.get('/player', function(req, res) {
	res.send({ name: players[req.query.id] });
});

app.post('/players', function(req) {
	players = req.body.players;
});

app.post('/move', function(req, res) {
	const result = move(req.body.columnID);
	res.send({
		field,
		isGameOver: result.isGameOver,
		player: result.player
	});
	currentPlayer = currentPlayer === 1 ? 2 : 1;
});

app.post('/clear', function(req, res) {
	players = null;
	currentPlayer = 1;
	field = [
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0],
		[0, 0, 0, 0, 0, 0]
	];
});

app.listen(5000);

function move(columnID) {
	const index = field[columnID].indexOf(0);
	if (index === -1) {
		return;
	}
	field[columnID][index] = currentPlayer;

	const result = isGameOver(field, currentPlayer, columnID, index);
	return result;
}

function isGameOver(field, player, x, y) {
	if (check(player, field, x, y)) {
		return { isGameOver: true, player };
	}

	if (field.every(a => a.every(el => el !== 0))) {
		return { isGameOver: true };
	}
	return { isGameOver: false };
}

function count(player, field, x, y, dx, dy) {
	let count = 0;
	x += dx;
	y += dy;
	while (x >= 0 && x < field.length && y >= 0 && y < field[0].length && field[x][y] === player) {
		count++;
		x += dx;
		y += dy;
	}
	return count;
}

function check(player, field, x, y) {
	return (
		count(player, field, x, y, -1, 0) + 1 + count(player, field, x, y, 1, 0) >= 4 ||
		count(player, field, x, y, 0, -1) + 1 + count(player, field, x, y, 0, 1) >= 4 ||
		count(player, field, x, y, -1, -1) + 1 + count(player, field, x, y, 1, 1) >= 4 ||
		count(player, field, x, y, -1, 1) + 1 + count(player, field, x, y, 1, -1) >= 4
	);
}
