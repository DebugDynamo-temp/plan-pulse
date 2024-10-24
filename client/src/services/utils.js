function formatStatus(str){
	let obj = {
		'TO_DO': 'To Do',
		'IN_PROGRESS': 'In Progress',
		'IN_REVIEW': 'In Review',
		'DONE': 'Done',
	}

	return obj[str];
}

export {
	formatStatus
}