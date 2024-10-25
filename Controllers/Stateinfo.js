const Stateinfo = require('../Models/stateinfo');
const apiResponse = require('../helper/apiResponse');

// Add new state information
exports.addStateinfo = async (req, res) => {
  try {
    const { statename, company_name, phone, location, address } = req.body;

    // Create new stateinfo record
    const stateinfoInstance = await Stateinfo.create({
      statename,
      company_name,
      phone,
      location,
      address,
      isActive: true,
      isDelete: false,
    });

    return apiResponse.successResponseWithData(res, 'Stateinfo record added successfully', stateinfoInstance);
  } catch (error) {
    console.error('Failed to add Stateinfo record', error);
    return apiResponse.ErrorResponse(res, 'Failed to add Stateinfo record');
  }
};

// Update state information
exports.updateStateinfo = async (req, res) => {
  try {
    const { id } = req.params;
    const { statename, company_name, phone, location, address } = req.body;

    // Find existing stateinfo record by ID
    const stateinfoInstance = await Stateinfo.findByPk(id);
    if (!stateinfoInstance) {
      return apiResponse.notFoundResponse(res, 'Stateinfo record not found');
    }

    // Update record
    stateinfoInstance.statename = statename;
    stateinfoInstance.company_name = company_name;
    stateinfoInstance.phone = phone;
    stateinfoInstance.location = location;
    stateinfoInstance.address = address;
    
    await stateinfoInstance.save();

    return apiResponse.successResponseWithData(res, 'Stateinfo record updated successfully', stateinfoInstance);
  } catch (error) {
    console.error('Failed to update Stateinfo record', error);
    return apiResponse.ErrorResponse(res, 'Failed to update Stateinfo record');
  }
};

// Get all state information
exports.getStateinfos = async (req, res) => {
  try {
    const stateinfos = await Stateinfo.findAll({ where: { isDelete: false } });

    return apiResponse.successResponseWithData(res, 'Stateinfo records retrieved successfully', stateinfos);
  } catch (error) {
    console.error('Failed to retrieve Stateinfo records', error);
    return apiResponse.ErrorResponse(res, 'Failed to retrieve Stateinfo records');
  }
};

// Toggle active status of state information
exports.toggleStateinfoStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const stateinfoInstance = await Stateinfo.findByPk(id);

    if (!stateinfoInstance) {
      return apiResponse.notFoundResponse(res, 'Stateinfo record not found');
    }

    // Toggle isActive status
    stateinfoInstance.isActive = !stateinfoInstance.isActive;
    await stateinfoInstance.save();

    return apiResponse.successResponseWithData(res, 'Stateinfo status updated successfully', stateinfoInstance);
  } catch (error) {
    console.error('Failed to toggle Stateinfo status', error);
    return apiResponse.ErrorResponse(res, 'Failed to toggle Stateinfo status');
  }
};

// Soft delete state information (toggle delete status)
exports.toggleStateinfoDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const stateinfoInstance = await Stateinfo.findByPk(id);

    if (!stateinfoInstance) {
      return apiResponse.notFoundResponse(res, 'Stateinfo record not found');
    }

    // Toggle isDelete status
    stateinfoInstance.isDelete = !stateinfoInstance.isDelete;
    await stateinfoInstance.save();

    return apiResponse.successResponseWithData(res, 'Stateinfo delete status updated successfully', stateinfoInstance);
  } catch (error) {
    console.error('Failed to toggle Stateinfo delete status', error);
    return apiResponse.ErrorResponse(res, 'Failed to toggle Stateinfo delete status');
  }
};
exports.getStateinfoByStatename = async (req, res) => {
  try {
    const { statename } = req.params;

    // Find state information by statename and isDelete status
    const stateinfo = await Stateinfo.findAll({
      where: {
        statename,
        isDelete: false
      }
    });

    if (!stateinfo) {
      return apiResponse.notFoundResponse(res, 'Stateinfo record not found');
    }

    return apiResponse.successResponseWithData(res, 'Stateinfo record retrieved successfully', stateinfo);
  } catch (error) {
    console.error('Failed to retrieve Stateinfo by statename', error);
    return apiResponse.ErrorResponse(res, 'Failed to retrieve Stateinfo by statename');
  }
};
