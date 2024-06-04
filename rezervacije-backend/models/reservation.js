const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');
const Event = require('./event');

const Reservation = sequelize.define('Reservation', {
  tableNumber: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  numberOfGuests: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  eventId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 3 
  }
}, {
  timestamps: true 
});

User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Event.hasMany(Reservation, { foreignKey: 'eventId' });
Reservation.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = Reservation;
