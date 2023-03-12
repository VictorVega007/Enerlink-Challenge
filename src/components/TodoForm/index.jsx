import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodoAsync } from "../../redux/todoSlice";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles.css";

export const TodoForm = () => {
  const [value, setValue] = useState('');
	const dispatch = useDispatch();

	const onSubmit = (event) => {
		event.preventDefault();
		if (value) {
			dispatch(
				addTodoAsync({
					id: value.id,
					label: value,
          checked: false
				})
			);
		} else {
			toast.warning("Please provide a value task");
		};
	};

	return (
		<form onSubmit={onSubmit} className="form-inline mt-3 mb-3 todo-form-container">
			<input
				type='text'
				className='form-control mb-2 mr-sm-2'
				placeholder='Add todo...'
				value={value}
				onChange={(event) => setValue(event.target.value)}
			></input>

			<Button type='submit' className='btn btn-primary mb-2' variant="primary">
				Submit
			</Button>
		</form>
	);
}
