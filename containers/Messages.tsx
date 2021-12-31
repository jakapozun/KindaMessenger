import {useSockets} from "../context/socket.context";
import {useEffect, useRef} from "react";
import EVENTS from "../config/events";
import classes from '../styles/Messages.module.css';

const Messages = () => {

    const {socket, messages, roomId, username, setMessages} = useSockets();
    const newMessageRef = useRef(null);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    }, [messages])

    const handleSendMessage = () => {
        const message = newMessageRef.current.value;
        if (!String(message).trim()) return;

        socket.emit(EVENTS.CLIENT.SEND_ROOM_MESSAGE, {roomId, message, username});

        const date = new Date();

        setMessages([...messages, {
            username: "You",
            message,
            time: `${date.getHours()}:${date.getMinutes()}`
        }]);

        newMessageRef.current.value = "";
    }

    if (!roomId) {
        return <div/>;
    }

    return <div className={classes.Messages}>
        <div className={classes.MessagesWindow}>
            {messages?.map((msg, index) => <div key={index} className={classes.SingleMessage}>
                <span className={classes.AuthorTime}>{msg.username} - {msg.time}</span>
                <span className={classes.MessageContent}>{msg.message}</span>
                <div ref={messagesEndRef}/>
            </div>)}
        </div>

        <div className={classes.SendMessage}>
            <textarea rows={1} placeholder={"Type some message..."} ref={newMessageRef} className={classes.Textarea}/>
            <button onClick={handleSendMessage} className={classes.Send}>Send</button>
        </div>
    </div>
}

export default Messages;