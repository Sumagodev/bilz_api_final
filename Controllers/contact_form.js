const Office = require('../Models/contact_form');
const apiResponse = require('../helper/apiResponse');

exports.addOffice = async (req, res) => {
  try {
    const { name, company_name, phone, email,msg } = req.body;
  

    const office = await Office.create({  name, company_name, phone, email,msg, isActive: true, isDelete: false });
    return apiResponse.successResponseWithData(res, 'Contact form added successfully', office);
  } catch (error) {
    console.error('Contact form  failed', error);
    return apiResponse.ErrorResponse(res, 'Add Contact form failed');
  }
};                                                       

exports.updateOffice = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, company_name, phone, email,msg } = req.body;
 

    const office = await Office.findByPk(id);
    if (!office) {
      return apiResponse.notFoundResponse(res, 'Contact form not found');
    }

    office.name = name;
    office.company_name = company_name;
    office.phone = phone;
    office.email = email;
    office.msg=msg;
   
    await office.save();

    return apiResponse.successResponseWithData(res, 'Contact form updated successfully', office);
  } catch (error) {
    console.error('Update Contact form failed', error);
    return apiResponse.ErrorResponse(res, 'Update Contact form failed');
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

    return apiResponse.successResponseWithData(res, 'Contact form retrieved successfully', offices);
  } catch (error) {
    console.error('Get Contact form failed', error);
    return apiResponse.ErrorResponse(res, 'Get Contact form failed');
  }
};

exports.toggleOfficeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const office = await Office.findByPk(id);

    if (!office) {
      return apiResponse.notFoundResponse(res, 'Contact form not found');
    }

    office.isActive = !office.isActive;
    await office.save();

    return apiResponse.successResponseWithData(res, 'Contact form status updated successfully', office);
  } catch (error) {
    console.error('Toggle Contact form status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Contact form status failed');
  }
};

exports.toggleOfficeDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const office = await Office.findByPk(id);

    if (!office) {
      return apiResponse.notFoundResponse(res, 'Contact form not found');
    }

    office.isDelete = !office.isDelete;
    await office.save();

    return apiResponse.successResponseWithData(res, 'Contact form delete status updated successfully', office);
  } catch (error) {
    console.error('Toggle Contact form delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Contact form delete status failed');
  }
};
