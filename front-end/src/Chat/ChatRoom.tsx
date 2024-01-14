import React, { useEffect, useState } from "react";
import axios from "axios";
import { Chat, Channel, ChannelHeader, ChannelList, MessageInput, Thread, Window } from "stream-chat-react";
import { MessageList } from "stream-chat-react";
import "stream-chat-react/dist/css/index.css";
import { StreamChat } from "stream-chat";
import { Link } from "react-router-dom";
import style from "./ChatRoom.module.css";

interface User {
	id: string;
	created_at: string;
	// Add other properties as needed
}

interface ChannelResponse {
	channel: any; // Update with the actual type of your channel
}

function ChatRoom() {
	const [users, setUsers] = useState<User[]>([]);
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [channel, setChannel] = useState<any>(null); // Update with the actual type of your channel
	const [client, setClient] = useState<StreamChat | null>(null);

	const chatClient = new StreamChat("96b4wwxf5psu");

	useEffect(() => {
		axios
			.get("http://localhost:5000/user/get-user-list")
			.then((response) => {
				console.log(response.data);
				setUsers(response.data.users);
			})
			.catch((error) => {
				console.error("Error creating channel:", error);
			});
	}, []);

	const handleCreateChannel = () => {
		axios
			.post("http://localhost:5000/channel/create", { users: selectedUsers })
			.then((response) => {
				setClient(chatClient);
				setChannel(response.data.channel);
			})
			.catch((error) => {
				console.error("Error creating channel:", error);
			});
	};

	return (
		<React.Fragment>
			<h2>Chat Room</h2>
			<div>
				<h3>Select Users</h3>
				<ul className={style["user-list-box"]}>
					{users.length &&
						users.map((user: User) => (
							<li key={user.created_at} className={style["user-list"]}>
								<label>
									<input
										type="checkbox"
										value={user.id}
										onChange={(e) => setSelectedUsers([...selectedUsers, e.target.value])}
									/>
									{user.id}
								</label>
							</li>
						))}
				</ul>
			</div>
			<div className={style["link-button"]} onClick={handleCreateChannel}>
				Create Channel
			</div>
			<div className={style["link-button"]}>
				<Link to="/">Home</Link>
			</div>
			{channel && (
				<Chat client={client as StreamChat}>
					<Channel channel={channel}>
						<Window>
							<ChannelHeader />
							<MessageList />
							<MessageInput />
						</Window>
						<Thread />
					</Channel>
					<ChannelList />
				</Chat>
			)}
		</React.Fragment>
	);
}

export default ChatRoom;
