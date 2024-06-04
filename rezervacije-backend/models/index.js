const sequelize = require('../config/database');
const User = require('./user');
const Event = require('./event');
const Reservation = require('./reservation');

User.hasMany(Reservation, { foreignKey: 'userId' });
Reservation.belongsTo(User, { foreignKey: 'userId' });

Event.hasMany(Reservation, { foreignKey: 'eventId' });
Reservation.belongsTo(Event, { foreignKey: 'eventId' });

module.exports = {
  sequelize,
  User,
  Event,
  Reservation
};
