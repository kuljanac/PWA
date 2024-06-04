let socket;

export const connectWebSocket = () => {
  socket = new WebSocket('ws://localhost:5000');

  socket.onopen = () => {
    console.log('WebSocket connection established');
  };

  socket.onclose = () => {
    console.log('WebSocket connection closed');
  };

  socket.onerror = (error) => {
    console.log('WebSocket error', error);
  };
};

export const sendWebSocketMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    console.error('WebSocket is not open');
  }
};

export const subscribeToWebSocket = (callback) => {
  if (socket) {
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      callback(data);
    };
  }
};
