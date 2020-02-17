import { CountUp } from './countUp.min.js';

window.onload = function() {
	let statsArray = [];
	let statsValues = [15, 180, 1560.87, 75954.9];
	let x = 1;

	for (let i of statsValues) {
		console.log(i);
		statsArray.push(new CountUp('stat' + x + 'l', i));
		statsArray.push(new CountUp('stat' + x + 's', i));
		x++;
	}

	statsArray.forEach(CountUp => CountUp.start());
};
