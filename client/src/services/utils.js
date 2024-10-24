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

export {
	readableToStatus,
	status,
	statusToReadable
}