import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import style from "./CreateUser.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function CreateUser() {
	const [username, setUsername] = useState<string>("");

	const handleCreateUser = () => {
		axios
			.post<{ message: string }>("http://localhost:5000/user/create", { username })
			.then((response) => {
				console.log(response.data);
				toast.success(response.data.message, {
					theme: "colored",
				});
			})
			.catch((error) => {
				console.error("Error creating user:", error);
				toast.error("Failed to create user.", {
					theme: "colored",
				});
			});
	};

	return (
		<React.Fragment>
			<h2>Create User</h2>

			<input
				type="text"
				placeholder="Enter username"
				value={username}
				onChange={(e) => setUsername(e.target.value)}
			/>

			<div className={style["link-button"]} onClick={handleCreateUser}>
				Create User
			</div>
			<div className={style["link-button"]}>
				<Link to="/">Home</Link>
			</div>
			<ToastContainer />
		</React.Fragment>
	);
}

export default CreateUser;
