// controllers/eventController.js
const Event = require('../Models/further');
const apiResponse = require('../helper/apiResponse');
const { validationResult } = require('express-validator');

exports.addEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { name } = req.body;
    const img = req.file ? req.file.path : null;

    const event = await Event.create({
      name,
      img,
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(
      res,
      'Solution added successfully',
      event
    );
  } catch (error) {
    console.error('Add Solution failed', error);
    return apiResponse.ErrorResponse(res, 'Add Solution failed');
  }
};

exports.updateEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { id } = req.params;
    const { name } = req.body;
    const img = req.file ? req.file.path : null;

    const event = await Event.findByPk(id);
    if (!event) {
      return apiResponse.notFoundResponse(res, 'Solution not found');
    }

    event.img = img || event.img;
    event.name = name;
    await event.save();

    return apiResponse.successResponseWithData(
      res,
      'Solution updated successfully',
      event
    );
  } catch (error) {
    console.error('Update Solution failed', error);
    return apiResponse.ErrorResponse(res, 'Update Solution failed');
  }
};

exports.getEvents = async (req, res) => {
  try {
    const events = await Event.findAll({ where: { isDelete: false } });

    const baseUrl = `${req.protocol}://${req.get('host')}/`;
    const eventsWithBaseUrl = events.map(event => ({
      ...event.toJSON(),
      img: event.img ? baseUrl + event.img.replace(/\\/g, '/') : null,
    }));

    return apiResponse.successResponseWithData(
      res,
      'Solution retrieved successfully',
      eventsWithBaseUrl
    );
  } catch (error) {
    console.error('Get Solution failed', error);
    return apiResponse.ErrorResponse(res, 'Get Solution failed');
  }
};

exports.isActiveStatusEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) {
      return apiResponse.notFoundResponse(res, 'Solution not found');
    }

    event.isActive = !event.isActive;
    await event.save();

    return apiResponse.successResponseWithData(
      res,
      'Solution active status updated successfully',
      event
    );
  } catch (error) {
    console.error('Toggle Solution active status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Solution active status failed');
  }
};

exports.isDeleteStatusEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findByPk(id);

    if (!event) {
      return apiResponse.notFoundResponse(res, 'Solution not found');
    }

    event.isDelete = !event.isDelete;
    await event.save();

    return apiResponse.successResponseWithData(
      res,
      'Solution delete status updated successfully',
      event
    );
  } catch (error) {
    console.error('Toggle Solution delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Solution delete status failed');
  }
};
