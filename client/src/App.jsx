import { useEffect } from "react";
import "./App.css";
import CustomSnackbar from "./Component/alert/SnakeBar";
import ConditionalRoutes from "./Routes/ConditionalRoutes";
import { io } from "socket.io-client";
const socket = io("http://localhost:8000/");

function App() {
  useEffect(() => {
    socket.emit("chat", "Hello server!");
  }, []);
  return (
    <>
      <ConditionalRoutes />
      <CustomSnackbar />
    </>
  );
}

export default App;
