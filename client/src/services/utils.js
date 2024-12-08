const status = ["TO_DO", "IN_PROGRESS", "IN_REVIEW", "DONE"];

function statusToReadable(str){
	let obj = {
		'TO_DO': 'To Do',
		'IN_PROGRESS': 'In Progress',
		'IN_REVIEW': 'In Review',
		'DONE': 'Done',
	}

	return obj[str];
}

function readableToStatus(str){
	let obj = {
		'To Do': 'TO_DO',
		'In Progress': 'IN_PROGRESS',
		'In Review': 'IN_REVIEW',
		'Done': 'DONE',
	}

	return obj[str];
}

function getDayOfWeek(day){
	const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	return days[day];
}

function getMonth(month){
	const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	return months[month];
}

export {
	getDayOfWeek,
	getMonth,
	readableToStatus,
	status,
	statusToReadable
}