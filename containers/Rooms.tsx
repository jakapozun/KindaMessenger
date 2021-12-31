import {useSockets} from "../context/socket.context";
import {useRef} from "react";
import EVENTS from "../config/events";
import classes from '../styles/Rooms.module.css';
import RoomList from "./RoomList";
import Messages from "./Messages";

const Rooms = () => {

    const {socket} = useSockets();
    const newRoomRef = useRef(null);

    const handleCreateRoom = () => {
        const roomName = newRoomRef.current.value || "";

        if (!String(roomName).trim()) {
            return;
        }

        socket.emit(EVENTS.CLIENT.CREATE_ROOM, {roomName});

        newRoomRef.current.value = "";
    }

    return <>
        <div className={classes.CreateRoom}>
            <div className={classes.RoomForm}>
                <h1 className={classes.Title}>Create new room</h1>
                <input type="text" placeholder={'Room name'} ref={newRoomRef}/>
                <button onClick={handleCreateRoom}>Create</button>
            </div>
        </div>
        <div className={classes.RoomListMessages}>
            <RoomList/>
            <Messages />
        </div>
    </>
}

export default Rooms;