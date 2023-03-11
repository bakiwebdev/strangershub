// import { io } from "socket.io-client";

// // "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NEXT_PUBLIC_BASE_URL
//   ? process.env.NEXT_PUBLIC_BASE_URL
//   : "http://localhost:3000";

// export const socket = io(URL);

import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NEXT_PUBLIC_BASE_URL
  ? process.env.NEXT_PUBLIC_BASE_URL
  : "http://localhost:3000";

const socket = io(URL, {
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 10,
});

socket.on("connect", () => {
  console.log("Connected to socket.io server");
});

socket.on("disconnect", () => {
  console.log("Disconnected from socket.io server");
});

export default socket;
