const EnquirySheet = require('../Models/EnquirySheet');
const apiResponse = require('../helper/apiResponse');

exports.addEnquirySheet = async (req, res) => {
  try {
    const { company, designation, business, phoneno, contact_person, email_id, machine_type, machine_manufacturer, machine_weight, 
      machine_tool_weight, mounting_position, mounting_hole_diameter, mounting_foot, speed_of_machine, machine_stokes, machine_feed_rate} = req.body;
  

    const enquiry = await EnquirySheet.create({ company, designation, business, phoneno, contact_person, email_id, machine_type, machine_manufacturer, machine_weight, 
      machine_tool_weight, mounting_position, mounting_hole_diameter, mounting_foot, speed_of_machine, machine_stokes, machine_feed_rate,  isActive: true, isDelete: false });
    return apiResponse.successResponseWithData(res, 'Enquiry Sheet added successfully', enquiry);
  } catch (error) {
    console.error('Enquiry Sheet failed', error);
    return apiResponse.ErrorResponse(res, 'Add Enquiry Sheet failed');
  }
};                                                       

exports.getEnquirySheet = async (req, res) => {
  try {
    const enquiry = await EnquirySheet.findAll({ where: { isDelete: false } });
    return apiResponse.successResponseWithData(res, 'Enquiry Sheet retrieved successfully', enquiry);
  } catch (error) {
    console.error('Get Enquiry Sheet failed', error);
    return apiResponse.ErrorResponse(res, 'Get Enquiry Sheet failed');
  }
};

exports.DeleteEnquirySheet = async (req, res) => {
  try {
    const { id } = req.params;
    const enquiry = await EnquirySheet.findByPk(id);

    if (!enquiry) {
      return apiResponse.notFoundResponse(res, 'Enquiry Sheet not found');
    }

    enquiry.isDelete = !enquiry.isDelete;
    await enquiry.save();

    return apiResponse.successResponseWithData(res, 'Enquiry Sheet delete status updated successfully', enquiry);
  } catch (error) {
    console.error('Toggle Enquiry Sheet delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle Enquiry Sheet delete status failed');
  }
};
