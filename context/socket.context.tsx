import {io, Socket} from 'socket.io-client';
import {SOCKET_URL} from "../config/default";
import {createContext, useContext, useEffect, useState} from "react";
import EVENTS from "../config/events";

interface ContextType {
    socket: Socket;
    username?: string;
    setUsername: Function;
    roomId?: string;
    rooms: {};
    messages?: {message: string, time: string, username: string}[];
    setMessages: Function;
}

const socket = io(SOCKET_URL);

const SocketContext = createContext<ContextType>({socket,setUsername: () => false, rooms: {}, setMessages: () => false})

const SocketsProvider = (props: any) => {

    const [username, setUsername] = useState("");
    const [roomId, setRoomId] = useState("");
    const [rooms, setRooms] = useState({});
    const [messages, setMessages] = useState([]);

    socket.on(EVENTS.SERVER.ROOMS, (value) =>{
        setRooms(value);
    })

    socket.on(EVENTS.SERVER.JOINED_ROOM, (value) => {
        setRoomId(value);
        setMessages([]);
    })

    useEffect( () => {
        socket.on(EVENTS.SERVER.ROOM_MESSAGE, ({message, username, time}) => {
            if(!document.hasFocus()){
                document.title = 'New message';
            }
            setMessages((messages) => [...messages, {message, username, time}]);
        });
    }, [socket]);



    return <SocketContext.Provider value={{socket, username, setUsername, rooms, roomId, setMessages, messages}} {...props} />
}

export const useSockets = () => useContext(SocketContext);

export default SocketsProvider;

