const Office = require('../Models/feedback');
const apiResponse = require('../helper/apiResponse');

exports.addOffice = async (req, res) => {
  try {
    const { name, company_name, phone, email,msg } = req.body;
  

    const office = await Office.create({  name, company_name, phone, email,msg, isActive: true, isDelete: false });
    return apiResponse.successResponseWithData(res, 'Feedback added successfully', office);
  } catch (error) {
    console.error('Feedback  failed', error);
    return apiResponse.ErrorResponse(res, 'Add Feedback failed');
  }
};                                                       

exports.updateOffice = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, company_name, phone, email,msg } = req.body;
 

    const office = await Office.findByPk(id);
    if (!office) {
      return apiResponse.notFoundResponse(res, 'Feedback not found');
    }

    office.name = name;
    office.company_name = company_name;
    office.phone = phone;
    office.email = email;
    office.msg=msg;
   
    await office.save();

    return apiResponse.successResponseWithData(res, 'Feedback updated successfully', office);
  } catch (error) {
    console.error('Update Feedback failed', error);
    return apiResponse.ErrorResponse(res, 'Update Feedback failed');
  }
};

exports.getOffices = async (req, res) => {6
  try {
    const offices = await Office.findAll({ where: { isDelete: false } });

    // const baseUrl = `${req.protocol}://${req.get('host')}/`;
    // const officesWithBaseUrl = offices.map(office => {
    //   return {
    //     ...office.toJSON(),
    //     img: office.img ? baseUrl + office.img.replace(/\\/g, '/') : null
    //   };
    // });

    return apiResponse.successResponseWithData(res, 'Feedback retrieved successfully', offices);
  } catch (error) {
    console.error('Get Feedback failed', error);
    return apiResponse.ErrorResponse(res, 'Get Feedback failed');
  }
};

exports.toggleOfficeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const office = await Office.findByPk(id);

    if (!office) {
      return apiResponse.notFoundResponse(res, 'Feedback not found');
    }

    office.isActive = !office.isActive;
    await office.save();

    return apiResponse.successResponseWithData(res, 'Feedback status updated successfully', office);
  } catch (error) {
    console.error('Toggle Feedback status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Feedback status failed');
  }
};

exports.toggleOfficeDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const office = await Office.findByPk(id);

    if (!office) {
      return apiResponse.notFoundResponse(res, 'Feedback not found');
    }

    office.isDelete = !office.isDelete;
    await office.save();

    return apiResponse.successResponseWithData(res, 'Feedback delete status updated successfully', office);
  } catch (error) {
    console.error('Toggle Feedback delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Feedback delete status failed');
  }
};
