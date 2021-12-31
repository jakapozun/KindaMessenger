import EVENTS from "../config/events";
import {useSockets} from "../context/socket.context";
import classes from '../styles/RoomList.module.css';

const RoomList = () => {

    const {socket, roomId, rooms} = useSockets();

    const handleJoinRoom = (key) => {
        if(key === roomId){
            return;
        }

        socket.emit(EVENTS.CLIENT.JOIN_ROOM, key);
    }

    return <div className={classes.RoomList}>
        <h3 className={classes.Title}>Room List</h3>
        {Object.keys(rooms).map( (key) => {
            return <div key={key}>
                <button onClick={() => handleJoinRoom(key)} disabled={key === roomId} className={classes.RoomButton}>{rooms[key].name}</button>
            </div>
        })}
    </div>
}

export default RoomList;