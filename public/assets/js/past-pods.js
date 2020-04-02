import { CountUp } from './countUp.min.js';

window.onload = function() {
	let statsArray = [];
	let statsValues = [15.4, 180, 1560.87, 636.7, 10.1, 235, 547.81, 75, 6.75, 335, 300, 238.72];
	let x = 1;

	for (let i of statsValues) {
		console.log(i);
		statsArray.push(new CountUp('stat' + x + 'l', i));
		statsArray.push(new CountUp('stat' + x + 's', i));
		x++;
	}

	statsArray.forEach(CountUp => CountUp.start());
};
