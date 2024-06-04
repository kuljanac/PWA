const Event = require('../models/event');

exports.createEvent = async (req, res) => {
  try {
    const event = await Event.create(req.body);
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
    res.status(200).json(events);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getEvent = async (req, res) => {
  try {
    const event = await Event.findByPk(req.params.id);
    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteEvent = async (req, res) => {
  try {
    await Event.destroy({ where: { id: req.params.id } });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
