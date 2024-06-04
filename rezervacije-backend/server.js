const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const nodemailer = require("nodemailer");
const sequelize = require("./config/database");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require('jsonwebtoken');
const User = require('./models/user'); // Ensure the user model is imported

require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/reservations", reservationRoutes);

sequelize.sync({ force: false }).then(() => {
  console.log("Database & tables created!");
}).catch(err => {
  console.error("Error connecting to the database:", err);
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendConfirmationEmail = (reservation) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: reservation.email,
    subject: 'Reservation Confirmation',
    text: `Your reservation for ${reservation.eventName} on ${reservation.date} is confirmed.`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('New client connected');

  ws.on('message', async (message) => {
    const data = JSON.parse(message);
    console.log('Received:', data);

    if (data.type === 'GET_EVENTS') {
      const events = await sequelize.models.Event.findAll();
      ws.send(JSON.stringify({ type: 'events', data: events }));
    } else if (data.type === 'GET_EVENT') {
      const event = await sequelize.models.Event.findByPk(data.eventId);
      ws.send(JSON.stringify({ type: 'event', event }));
    } else if (data.type === 'GET_RESERVATIONS') {
      const reservations = await sequelize.models.Reservation.findAll({ where: { eventId: data.eventId } });
      ws.send(JSON.stringify({ type: 'reservations', eventId: data.eventId, reservations }));
    } else if (data.type === 'CREATE_RESERVATION') {
      try {
        const reservation = await sequelize.models.Reservation.create(data.payload);
        ws.send(JSON.stringify({ type: 'reservation_created', data: reservation }));
        sendConfirmationEmail(reservation);
      } catch (error) {
        ws.send(JSON.stringify({ type: 'error', message: error.message }));
      }
    } else if (data.type === 'DELETE_RESERVATION') {
      try {
        await sequelize.models.Reservation.destroy({ where: { id: data.reservationId } });
        ws.send(JSON.stringify({ type: 'reservation_deleted', reservationId: data.reservationId }));
      } catch (error) {
        ws.send(JSON.stringify({ type: 'error', message: error.message })); 
      }
    } else if (data.type === 'CREATE_EVENT') {
      try {
        const event = await sequelize.models.Event.create(data.payload);
        ws.send(JSON.stringify({ type: 'event_created', data: event }));
      } catch (error) {
        ws.send(JSON.stringify({ type: 'error', message: error.message }));
      }
    } else if (data.type === 'checkRole') {
      try {
        const decoded = jwt.verify(data.token, process.env.JWT_SECRET);
        const user = await User.findByPk(decoded.id);
        if (user) {
          ws.send(JSON.stringify({ type: 'roleCheck', role: user.role }));
        }
      } catch (error) {
        ws.send(JSON.stringify({ type: 'error', message: 'Invalid token' }));
      }
    }
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
