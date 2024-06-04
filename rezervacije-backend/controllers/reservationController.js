const { Reservation } = require('../models');
const excel = require('exceljs');

exports.createReservation = async (req, res) => {
  const { eventId, tableNumber, numberOfGuests, email, lastName, userId } = req.body;
  try {
    const reservation = await Reservation.create({
      eventId,
      tableNumber,
      numberOfGuests,
      email,
      lastName,
      userId
    });
    res.status(201).json(reservation);
  } catch (error) {
    console.error('Error creating reservation:', error);
    res.status(500).json({ message: 'Error creating reservation' });
  }
};

exports.getReservationsByEvent = async (req, res) => {
  const { eventId } = req.params;
  try {
    const reservations = await Reservation.findAll({ where: { eventId } });
    res.json(reservations);
  } catch (error) {
    console.error('Error fetching reservations:', error);
    res.status(500).send('Error fetching reservations');
  }
};

exports.exportReservations = async (req, res) => {
  const { eventId } = req.params;
  try {
    const reservations = await Reservation.findAll({ where: { eventId } });

    const workbook = new excel.Workbook();
    const worksheet = workbook.addWorksheet('Reservations');

    worksheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'User ID', key: 'userId', width: 10 },
      { header: 'Event ID', key: 'eventId', width: 10 },
      { header: 'Table Number', key: 'tableNumber', width: 15 },
      { header: 'Number of Guests', key: 'numberOfGuests', width: 20 },
      { header: 'Email', key: 'email', width: 30 },
      { header: 'Last Name', key: 'lastName', width: 20 }
    ];

    reservations.forEach((reservation) => {
      worksheet.addRow(reservation.dataValues);
    });

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=reservations-${eventId}.xlsx`
    );

    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (error) {
    console.error('Error exporting reservations:', error);
    res.status(500).send('Error exporting reservations');
  }
};

exports.deleteReservation = async (req, res) => {
  const { id } = req.params;
  try {
    await Reservation.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting reservation:', error);
    res.status(500).send('Error deleting reservation');
  }
};
