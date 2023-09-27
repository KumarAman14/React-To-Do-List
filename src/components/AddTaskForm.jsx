const AddTaskForm = ({ newTask, setNewTask, addTask, resetTask }) => {
	return (
		<>
			{/* Add Task */}
			<div className="row">
				<div className="col">
					<input
						value={newTask}
						onChange={(e) => setNewTask(e.target.value)}
						className="form-control form-control-lg"
						placeholder="Enter Your Task Here ..."
					/>
				</div>
				<div className="col-auto">
					<button onClick={addTask} className="btn btn-lg btn-success">
						Add Task
					</button>
				</div>
				<div className="col-auto">
					<button onClick={resetTask} className="btn btn-lg btn-danger">
						Reset
					</button>
				</div>
			</div>
			<br />
		</>
	);
};

export default AddTaskForm;
