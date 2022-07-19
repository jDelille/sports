const express = require('express');
const axios = require('axios');
const cors = require('cors');

// set up express server
const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(
	cors({
		origin: ['http://localhost:3000'],
		credentials: true,
	})
);

// Scoreboard api ~ ESPN
app.get('/scoreboard', async (req, res) => {
	const response = await axios.get(
		'https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/scoreboard'
	);
	const scoreboard = response.data;
	res.status(200).send(scoreboard);
});

// Schedule api ~ ESPN
app.get('/schedule/:startDate/:endDate', async (req, res) => {
	// send startDate and endDate as parameters
	const startDate = req.params.startDate;
	const endDate = req.params.endDate;
	const response = await axios.get(
		`https://bdfed.stitch.mlbinfra.com/bdfed/transform-mlb-schedule?stitch_env=prod&sortTemplate=5&sportId=1&startDate=${startDate}&endDate=${endDate}&gameType=E&&gameType=S&&gameType=R&&gameType=F&&gameType=D&&gameType=L&&gameType=W&&gameType=A&language=en&leagueId=104&&leagueId=103&contextTeamId=`
	);
	const schedule = response.data;
	res.status(200).send(schedule);
});

app.listen(PORT, () =>
	console.log(`Hello Master Bweem, the server is running on ${PORT}.`)
);
