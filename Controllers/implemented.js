const Infrastructure = require('../Models/implemented');
const apiResponse = require('../helper/apiResponse');

exports.addInfrastructure = async (req, res) => {
  try {
    const { title, desc } = req.body;
    const img = req.file ? req.file.path : null;

    const infrastructure = await Infrastructure.create({ img, title, desc, isActive: true, isDelete: false });
    return apiResponse.successResponseWithData(res, 'Exhibition added successfully', infrastructure);
  } catch (error) {
    console.error('Add Exhibition failed', error);
    return apiResponse.ErrorResponse(res, 'Add Exhibition failed');
  }
};

exports.updateInfrastructure = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, desc } = req.body;
    const img = req.file ? req.file.path : null;

    const infrastructure = await Infrastructure.findByPk(id);
    if (!infrastructure) {
      return apiResponse.notFoundResponse(res, 'Exhibition not found');
    }

    infrastructure.img = img || infrastructure.img;
    infrastructure.title = title;
    infrastructure.desc = desc;
    await infrastructure.save();

    return apiResponse.successResponseWithData(res, 'Exhibition updated successfully', infrastructure);
  } catch (error) {
    console.error('Update Exhibition failed', error);
    return apiResponse.ErrorResponse(res, 'Update Exhibition failed');
  }
};

exports.getInfrastructure = async (req, res) => {
  try {
    const infrastructure = await Infrastructure.findAll({ where: { isDelete: false } });
    
    // Base URL for images
    const baseUrl = `${req.protocol}://${req.get('host')}/`; // Adjust according to your setup
    console.log("baseUrl....", baseUrl);
    const infrastructureWithBaseUrl = infrastructure.map(infrastructure => {
      console.log("Exhibition.img", infrastructure.img);
      return {
        ...infrastructure.toJSON(), // Convert Sequelize instance to plain object
        img: infrastructure.img ? baseUrl + infrastructure.img.replace(/\\/g, '/') : null 
      };
    });

    return apiResponse.successResponseWithData(res, 'Exhibition retrieved successfully', infrastructureWithBaseUrl);
  } catch (error) {
    console.error('Get Exhibition failed', error);
    return apiResponse.ErrorResponse(res, 'Get Exhibition failed');
  }
};

exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const infrastructure = await Infrastructure.findByPk(id);

    if (!infrastructure) {
      return apiResponse.notFoundResponse(res, 'Exhibition not found');
    }

    infrastructure.isActive = !infrastructure.isActive;
    await infrastructure.save();

    return apiResponse.successResponseWithData(res, 'Exhibition status updated successfully', infrastructure);
  } catch (error) {
    console.error('Toggle Exhibition status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Exhibition status failed');
  }
};

exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const infrastructure = await Infrastructure.findByPk(id);

    if (!infrastructure) {
      return apiResponse.notFoundResponse(res, 'Exhibition not found');
    }

    infrastructure.isDelete = !infrastructure.isDelete;
    await infrastructure.save();

    return apiResponse.successResponseWithData(res, 'Exhibition delete status updated successfully', infrastructure);
  } catch (error) {
    console.error('Toggle Exhibition delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Exhibition delete status failed');
  }
};
