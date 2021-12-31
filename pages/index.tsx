import {useSockets} from "../context/socket.context";
import Rooms from "../containers/Rooms";
import Container from "../containers/Container";
import Login from "../containers/Login";

const Home = () => {

    const {username} = useSockets();

    return (
        <Container>
            <h1>Messenger Demo</h1>
            {!username && <Login />}
            {username && <Rooms/>}
        </Container>
    )
}

export default Home;
