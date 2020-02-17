import { CountUp } from './countUp.min.js';

window.onload = function() {
	let statsArray = [];
	let statsValues = [15.4, 180, 1560.87, 30968.37, 10.1, 235, 547.81, 24984.74, 6.75, 335, 300, 45000];
	let x = 1;

	for (let i of statsValues) {
		console.log(i);
		statsArray.push(new CountUp('stat' + x + 'l', i));
		statsArray.push(new CountUp('stat' + x + 's', i));
		x++;
	}

	statsArray.forEach(CountUp => CountUp.start());
};
