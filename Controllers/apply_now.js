const Office = require('../Models/apply_now');
const apiResponse = require('../helper/apiResponse');

exports.addOffice = async (req, res) => {
  try {
    const { name, position, phone, email,msg } = req.body;
    const img = req.file ? req.file.path : null;

    const office = await Office.create({ img, name, position, phone, email,msg, isActive: true, isDelete: false });
    return apiResponse.successResponseWithData(res, 'Apply now added successfully', office);
  } catch (error) {
    console.error('Apply now  failed', error);
    return apiResponse.ErrorResponse(res, 'Add Apply now failed');
  }
};                                                       

exports.updateOffice = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, position, phone, email,msg } = req.body;
    const img = req.file ? req.file.path : null;

    const office = await Office.findByPk(id);
    if (!office) {
      return apiResponse.notFoundResponse(res, 'Apply now not found');
    }

    office.name = name;
    office.position = position;
    office.phone = phone;
    office.email = email;
    office.msg=msg;
    office.img = img || office.img;
    await office.save();

    return apiResponse.successResponseWithData(res, 'Apply now updated successfully', office);
  } catch (error) {
    console.error('Update Apply now failed', error);
    return apiResponse.ErrorResponse(res, 'Update Apply now failed');
  }
};

exports.getOffices = async (req, res) => {
  try {
    const offices = await Office.findAll({ where: { isDelete: false } });

    const baseUrl = `${req.protocol}://${req.get('host')}/`;
    const officesWithBaseUrl = offices.map(office => {
      return {
        ...office.toJSON(),
        img: office.img ? baseUrl + office.img.replace(/\\/g, '/') : null
      };
    });

    return apiResponse.successResponseWithData(res, 'Apply now retrieved successfully', officesWithBaseUrl);
  } catch (error) {
    console.error('Get Apply now failed', error);
    return apiResponse.ErrorResponse(res, 'Get Apply now failed');
  }
};

exports.toggleOfficeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const office = await Office.findByPk(id);

    if (!office) {
      return apiResponse.notFoundResponse(res, 'Apply now not found');
    }

    office.isActive = !office.isActive;
    await office.save();

    return apiResponse.successResponseWithData(res, 'Apply now status updated successfully', office);
  } catch (error) {
    console.error('Toggle Apply now status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Apply now status failed');
  }
};

exports.toggleOfficeDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const office = await Office.findByPk(id);

    if (!office) {
      return apiResponse.notFoundResponse(res, 'Apply now not found');
    }

    office.isDelete = !office.isDelete;
    await office.save();

    return apiResponse.successResponseWithData(res, 'Apply now delete status updated successfully', office);
  } catch (error) {
    console.error('Toggle Apply now delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Apply now delete status failed');
  }
};
