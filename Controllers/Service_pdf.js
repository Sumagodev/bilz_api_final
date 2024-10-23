const NewsEvent = require('../Models/Service_pdf');
const apiResponse = require('../helper/apiResponse');
const { validationResult } = require('express-validator');

exports.addNewsEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { title } = req.body;
   
    const pdf = req.files['pdf'] ? req.files['pdf'][0].path : null;

    const newsEvent = await NewsEvent.create({
      
      pdf,
      title,
      
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(
      res,
      'News event added successfully',
      newsEvent
    );
  } catch (error) {
    console.error('Add news event failed', error);
    return apiResponse.ErrorResponse(res, 'Add news event failed');
  }
};

exports.updateNewsEvent = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return apiResponse.ErrorResponse(res, errors.array().map(err => err.msg).join(', '));
  }

  try {
    const { id } = req.params;
    const { title } = req.body;
   
    const pdf = req.files['pdf'] ? req.files['pdf'][0].path : null;

    const newsEvent = await NewsEvent.findByPk(id);
    if (!newsEvent) {
      return apiResponse.notFoundResponse(res, 'News event not found');
    }

    
    newsEvent.pdf = pdf || newsEvent.pdf;
    newsEvent.title = title;
 
    await newsEvent.save();

    return apiResponse.successResponseWithData(
      res,
      'News event updated successfully',
      newsEvent
    );
  } catch (error) {
    console.error('Update news event failed', error);
    return apiResponse.ErrorResponse(res, 'Update news event failed');
  }
};

exports.getNewsEvents = async (req, res) => {
  try {
    const newsEvents = await NewsEvent.findAll({ where: { isDelete: false } });

    const baseUrl = `${req.protocol}://${req.get('host')}/`;
    const newsEventsWithBaseUrl = newsEvents.map(event => ({
      ...event.toJSON(),
      
      pdf: event.pdf ? baseUrl + event.pdf.replace(/\\/g, '/') : null,
    }));

    return apiResponse.successResponseWithData(
      res,
      'News events retrieved successfully',
      newsEventsWithBaseUrl
    );
  } catch (error) {
    console.error('Get news events failed', error);
    return apiResponse.ErrorResponse(res, 'Get news events failed');
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const newsEvent = await NewsEvent.findByPk(id);

    if (!newsEvent) {
      return apiResponse.notFoundResponse(res, 'News event not found');
    }

    newsEvent.isActive = !newsEvent.isActive;
    await newsEvent.save();

    return apiResponse.successResponseWithData(
      res,
      'News event active status updated successfully',
      newsEvent
    );
  } catch (error) {
    console.error('Toggle news event active status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle news event active status failed');
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const newsEvent = await NewsEvent.findByPk(id);

    if (!newsEvent) {
      return apiResponse.notFoundResponse(res, 'News event not found');
    }

    newsEvent.isDelete = !newsEvent.isDelete;
    await newsEvent.save();

    return apiResponse.successResponseWithData(
      res,
      'News event delete status updated successfully',
      newsEvent
    );
  } catch (error) {
    console.error('Toggle news event delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle news event delete status failed');
  }
};