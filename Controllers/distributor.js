const Office = require('../Models/distributer');
const apiResponse = require('../helper/apiResponse');

exports.addOffice = async (req, res) => {
  try {
    const { name, company_name, phone, email,msg } = req.body;
  

    const office = await Office.create({  name, company_name, phone, email,msg, isActive: true, isDelete: false });
    return apiResponse.successResponseWithData(res, 'Distributer added successfully', office);
  } catch (error) {
    console.error('Distributer  failed', error);
    return apiResponse.ErrorResponse(res, 'Add Distributer failed');
  }
};                                                       

exports.updateOffice = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, company_name, phone, email,msg } = req.body;
 

    const office = await Office.findByPk(id);
    if (!office) {
      return apiResponse.notFoundResponse(res, 'Distributer not found');
    }

    office.name = name;
    office.company_name = company_name;
    office.phone = phone;
    office.email = email;
    office.msg=msg;
   
    await office.save();

    return apiResponse.successResponseWithData(res, 'Distributer updated successfully', office);
  } catch (error) {
    console.error('Update Distributer failed', error);
    return apiResponse.ErrorResponse(res, 'Update Distributer failed');
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

    return apiResponse.successResponseWithData(res, 'Distributer retrieved successfully', offices);
  } catch (error) {
    console.error('Get Distributer failed', error);
    return apiResponse.ErrorResponse(res, 'Get Distributer failed');
  }
};

exports.toggleOfficeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const office = await Office.findByPk(id);

    if (!office) {
      return apiResponse.notFoundResponse(res, 'Distributer not found');
    }

    office.isActive = !office.isActive;
    await office.save();

    return apiResponse.successResponseWithData(res, 'Distributer status updated successfully', office);
  } catch (error) {
    console.error('Toggle Distributer status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Distributer status failed');
  }
};

exports.toggleOfficeDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const office = await Office.findByPk(id);

    if (!office) {
      return apiResponse.notFoundResponse(res, 'Distributer not found');
    }

    office.isDelete = !office.isDelete;
    await office.save();

    return apiResponse.successResponseWithData(res, 'Distributer delete status updated successfully', office);
  } catch (error) {
    console.error('Toggle Distributer delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Distributer delete status failed');
  }
};
