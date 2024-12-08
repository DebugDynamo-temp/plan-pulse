import { createContext, useState } from "react";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
	const tasks = {
	"Main": [
			{
				title: "One",
				description: "This is task 1",
				priority: 1,
				deadline: new Date(),
				status: "TO_DO",
				timeSpent: 5000,
				id: 1
			},
			{
				title: "Two",
				description: "<ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(153, 51, 255);\">list of things</strong></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(0, 138, 0);\">list of things</strong></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(230, 0, 0);\">list of things</strong></li></ol>",
				priority: 1,
				deadline: new Date(),
				status: "IN_PROGRESS",
				timeSpent: 5000,
				id: 2
			},
			{
				title: "Three",
				description: "This is task 3",
				priority: 5,
				deadline: new Date(),
				status: "TO_DO",
				timeSpent: 5000,
				id: 3
			},
			{
				title: "Four",
				description: "This is task 4",
				priority: 7,
				endTime: new Date(),
				deadline: new Date(),
				status: "DONE",
				timeSpent: 5000,
				id: 4
			}
		],
	"Group 1": [
		{
			title: "Create Presentation",
			description: "We need to make the presentation for our project",
			priority: 10,
			deadline: new Date(),
			status: "TO_DO",
			timeSpent: 5000,
			id: 5
		},
		{
			title: "Outline",
			description: "Create outline of project",
			priority: 7,
			endTime: new Date(),
			deadline: new Date(),
			status: "DONE",
			timeSpent: 5000,
			id: 6
		}
	],
	"Group 2": [
		{
			title: "Weekly sprint report",
			description: "This is a recurring task to describe what we've done for the past sprint",
			priority: 10,
			deadline: new Date(),
			status: "TO_DO",
			timeSpent: 5000,
			id: 7
		},
		{
			title: "Create user stories",
			description: "<ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(153, 51, 255);\">list of things</strong></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(0, 138, 0);\">list of things</strong></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(230, 0, 0);\">list of things</strong></li></ol>",
			priority: 1,
			deadline: new Date(),
			status: "IN_PROGRESS",
			timeSpent: 5000,
			id: 8
		},
		{
			title: "Report",
			description: "Write the report",
			priority: 5,
			deadline: new Date(),
			status: "IN_REVIEW",
			timeSpent: 5000,
			id: 9
		},
	]};

	return (
		<TaskContext.Provider value={{ tasks }}>
			{children}
		</TaskContext.Provider>
	)
}

export { TaskProvider };

export default TaskContext;