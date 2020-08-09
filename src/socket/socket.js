import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5003";
const socket = socketIOClient(ENDPOINT);

export default socket