import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origins: ["http://localhost:3000"] } });

app.get("/", (req, res) => {
	res.send("<h1>socket and express js</h1>");
});

io.on("connection", (socket) => {
	console.log("user connected");

	socket.on("disconnect", () => {
		console.log("user disconnected");
	});

	socket.on("myCustomEvent", (msg) => {
		console.log("message from client (myCustomEvent): ", msg);

		io.emit("broadcast", `server: ${msg}`);
	});
});

server.listen(3001, () => {
	console.log("Listening on *: 3001");
});
