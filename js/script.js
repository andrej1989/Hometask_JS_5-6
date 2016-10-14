
var timer = {
	msec: 0,
	sec: 0,
	minute: 0,
	hours: 0,
	timerInt: NaN,
	splCount: 0,

	startTime: function() {
		timer.timerInt = setInterval(timer.count, 4);
		start.style.display = "none";
		pause.style.display = "inline-block";
		spl.disabled = false;
	},

	count: function () {
	 	timer.msec += 4;

	 	if (timer.msec > 999) {
	 		timer.sec ++ ;
	 		timer.msec %= 1000;
	 	}

	 	if (timer.sec > 59) {
	 		timer.minute ++ ;
	 		timer.sec = 0;
	 	}

	 	if (timer.minute > 59) {
	 		timer.hours ++ ;
	 		timer.minute = 0;
	 	}	 

	 	timer.printTime();
	 	
	},

	pauseTime: function () {
		if (timer.timerInt != NaN) {
			clearInterval(timer.timerInt);
		}
		pause.style.display = "none";
		start.style.display = "inline-block";

		timer.printStatus(1);
		spl.disabled = true;
	},

	clearTime: function () {
		timer.pauseTime();
		timer.msec = 0;
		timer.sec = 0;
		timer.minute = 0;
		timer.hours = 0;
		timer.printTime();
		stat.innerHTML = '';
		timer.splCount = 0;
	},

	printTime: function () {

		var second, msecond, minute, hours;

		if (timer.msec < 10) {
	 		msecond = '00' + String(timer.msec);
	 	} else if (timer.msec < 100) {
	 		msecond = '0' + String(timer.msec);
	 	} else {
	 		msecond = String(timer.msec);
	 	}

	 	if (timer.sec < 10) {
	 		second = '0' + String(timer.sec);
	 	} else {
	 		second = String(timer.sec);
	 	}

	 	if (timer.minute < 10) {
	 		minute = '0' + String(timer.minute);
	 	} else {
	 		minute = String(timer.minute);
	 	}

	 	if (timer.hours < 10) {
	 		hours = '0' + String(timer.hours);
	 	} else {
	 		hours = String(timer.hours);
	 	}

	 	times.value = hours + ':' + minute + ':' + second + '.' + msecond;
	 	// console.log(hours + ':' + minute + ':' + second + ':' + msecond);
	},

	printStatus: function (st) {
		timer.splCount ++ ;
		if (timer.msec == 0 && timer.sec == 0 && timer.minute == 0 && timer.hours == 0) {
			// statement
		} else {
			if (st === 1) {
				var p = document.createElement('p');  // создать новый тег style
		        p.innerHTML = timer.splCount + ' Pause: ' + times.value;
				stat.appendChild(p);
			} else {
				var p = document.createElement('p');  // создать новый тег style
		        p.innerHTML = timer.splCount + ' Split:&nbsp;&nbsp;&nbsp; ' + times.value;
				stat.appendChild(p);
				console.log(timer.timerInt);
			}
			
		}
		
	}
}

spl.disabled = true;

pause.style.display = "none";

start.addEventListener("click", timer.startTime);

pause.addEventListener("click", timer.pauseTime);

spl.addEventListener("click", timer.printStatus);

clear.addEventListener("click", timer.clearTime);