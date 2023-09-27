import { useEffect, useState } from "react";
import AddTaskForm from "./components/AddTaskForm.jsx";
import UpdateForm from "./components/UpdateForm.jsx";
import ToDo from "./components/ToDo.jsx";

import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";

function App() {
	const getlocalItems = () => {
		let list = localStorage.getItem("lists");
		console.log(list);

		if (list) {
			return JSON.parse(localStorage.getItem("lists"));
		} else {
			return [];
		}
	};
	// Tasks (ToDo List) State
	const [toDo, setToDo] = useState(getlocalItems());

	// Temp State
	const [newTask, setNewTask] = useState("");
	const [updateData, setUpdateData] = useState("");

	// Add task
	///////////////////////////
	const addTask = () => {
		if (newTask) {
			let num = toDo.length + 1;
			let newEntry = { id: num, title: newTask, status: false };
			setToDo([...toDo, newEntry]);
			setNewTask("");
		}
	};

	// Delete task
	///////////////////////////
	const deleteTask = (id) => {
		let newTasks = toDo.filter((task) => task.id !== id);
		setToDo(newTasks);
	};

	// Reset task
	///////////////////////////
	const resetTask = () => {
		setToDo([]);
	};

	// Mark task as done or completed
	///////////////////////////
	const markDone = (id) => {
		let newTask = toDo.map((task) => {
			if (task.id === id) {
				return { ...task, status: !task.status };
			}
			return task;
		});
		setToDo(newTask);
	};

	// Cancel update
	///////////////////////////
	const cancelUpdate = () => {
		setUpdateData("");
	};

	// Change task for update
	///////////////////////////
	const changeTask = (e) => {
		let newEntry = {
			id: updateData.id,
			title: e.target.value,
			status: updateData.status ? true : false,
		};
		setUpdateData(newEntry);
	};

	// Update task
	///////////////////////////
	const updateTask = () => {
		let filterRecords = [...toDo].filter((task) => task.id !== updateData.id);
		let updatedObject = [...filterRecords, updateData];
		setToDo(updatedObject);
		setUpdateData("");
	};

	useEffect(() => {
		localStorage.setItem("lists", JSON.stringify(toDo));
	}, [toDo]);

	return (
		<div className="container App">
			<br />
			<br />
			<br />
			<br />
			<h1>To Do List App</h1>
			<br />
			<br />

			{updateData && updateData ? (
				<UpdateForm
					updateData={updateData}
					changeTask={changeTask}
					updateTask={updateTask}
					cancelUpdate={cancelUpdate}
				/>
			) : (
				<AddTaskForm
					newTask={newTask}
					setNewTask={setNewTask}
					addTask={addTask}
					resetTask={resetTask}
				/>
			)}

			{/* Display ToDos */}

			{toDo && toDo.length ? "" : "No Tasks..."}

			<ToDo
				toDo={toDo}
				markDone={markDone}
				setUpdateData={setUpdateData}
				deleteTask={deleteTask}
			/>
		</div>
	);
}

export default App;
