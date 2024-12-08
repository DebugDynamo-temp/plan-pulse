import { createContext, useState } from "react";

const TaskContext = createContext();

const TaskProvider = ({ children }) => {
	const tasks = {
	"Main": [
			{
				title: "One",
				description: "This is task 1",
				priority: 10,
				deadline: new Date(),
				status: "TO_DO"
			},
			{
				title: "Two",
				description: "<ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(153, 51, 255);\">list of things</strong></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(0, 138, 0);\">list of things</strong></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(230, 0, 0);\">list of things</strong></li></ol>",
				priority: 1,
				deadline: new Date(),
				status: "IN_PROGRESS"
			},
			{
				title: "Three",
				description: "This is task 3",
				priority: 5,
				deadline: new Date(),
				status: "TO_DO"
			},
			{
				title: "Four",
				description: "This is task 4",
				priority: 7,
				endTime: new Date(),
				deadline: new Date(),
				status: "DONE"
			}
		],
	"Group 1": [
		{
			title: "Create Presentation",
			description: "We need to make the presentation for our project",
			priority: 10,
			deadline: new Date(),
			status: "TO_DO"
		},
		{
			title: "Outline",
			description: "Create outline of project",
			priority: 7,
			endTime: new Date(),
			deadline: new Date(),
			status: "DONE"
		}
	],
	"Group 2": [
		{
			title: "Weekly sprint report",
			description: "This is a recurring task to describe what we've done for the past sprint",
			priority: 10,
			deadline: new Date(),
			status: "TO_DO"
		},
		{
			title: "Create user stories",
			description: "<ol><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(153, 51, 255);\">list of things</strong></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(0, 138, 0);\">list of things</strong></li><li data-list=\"bullet\"><span class=\"ql-ui\" contenteditable=\"false\"></span><strong style=\"color: rgb(230, 0, 0);\">list of things</strong></li></ol>",
			priority: 1,
			deadline: new Date(),
			status: "IN_PROGRESS"
		},
		{
			title: "Report",
			description: "Write the report",
			priority: 5,
			deadline: new Date(),
			status: "IN_REVIEW"
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