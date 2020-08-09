import socketIOClient from "socket.io-client";
const ENDPOINT = "https://userdeptassignment-be.herokuapp.com/";
const socket = socketIOClient(ENDPOINT);

export default socket