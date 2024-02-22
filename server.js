const { Client } = require("ssh2"); // SSH client library

// Configuration
const config = {
  remoteHost: "", // Your server's hostname or IP address
  remotePort: 80, // Remote port (e.g., 80 for HTTP)
  localHost: "localhost", // Local address (usually localhost)
  localPort: 3000, // Local port where your app is running
};

// Create an SSH client
const conn = new Client();

conn.on("ready", () => {
  console.log("SSH connection ready");

  // Request port forwarding from the remote server
  conn.forwardIn(config.remoteHost, config.remotePort, (err, port) => {
    if (err) throw err;
    console.log(`Forwarding HTTP traffic from ${config.remoteHost}:${port}`);
  });
});

// Connect to your server (replace with your own server details)
conn.connect({
  host: "yourserver.com", // Your server's SSH hostname or IP address
  username: "yourusername", // Your SSH username
  tryKeyboard: true, // Enable keyboard-interactive authentication
});

console.log(`Server-side SSH tunnel established. Clients can use the following command:`);
console.log(`ssh -R 80:${config.localHost}:${config.localPort} yourserver.com`);
