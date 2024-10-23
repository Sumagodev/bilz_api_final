const HeaderContact = require("../Models/HeaderContact");
const apiResponse = require("../helper/apiResponse");

exports.addHeaderContact = async (req, res) => {
  try {
    const { title, description } = req.body;
    const headerContact = await HeaderContact.create({
      title,
      description,
      isActive: true,
      isDelete: false,
    });
    return apiResponse.successResponseWithData(
      res,
      "Header contact added successfully",
      headerContact
    );
  } catch (error) {
    console.log("Add header contact failed", error);
    return apiResponse.ErrorResponse(res, "Add header contact failed");
  }
};

exports.updateHeaderContact = async (req, res) => {
  try {
    console.log("req.body",req.body.title);
    
    const { id } = req.params;
    const headerContact = await HeaderContact.findByPk(id);
    
    if (!headerContact) {
      return apiResponse.notFoundResponse(res, "Header contact not found");
    }

    headerContact.title = req.body.title; // Hardcoded values for testing
    headerContact.description = req.body.description;
    await headerContact.save();
    
    return apiResponse.successResponseWithData(
      res,
      "Header contact updated successfully",
      headerContact
    );
  } catch (error) {
    console.log("Update header contact failed", error);
    return apiResponse.ErrorResponse(res, "Update header contact failed");
  }
};


exports.getHeaderContact = async (req, res) => {
  try {
    const headerContacts = await HeaderContact.findAll({
      where: { isDelete: false },
    });
    return apiResponse.successResponseWithData(
      res,
      "Header contacts retrieved successfully",
      headerContacts
    );
  } catch (error) {
    console.log("Get header contacts failed", error);
    return apiResponse.ErrorResponse(res, "Get header contacts failed");
  }
};

// isActive api
exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const headerContact = await HeaderContact.findByPk(id);

    if (!headerContact) {
      return apiResponse.notFoundResponse(res, "Header contact not found");
    }

    // Toggle the isActive status
    headerContact.isActive = !headerContact.isActive;
    await headerContact.save();

    return apiResponse.successResponseWithData(
      res,
      "Header contact status updated successfully",
      headerContact
    );
  } catch (error) {
    console.log("Toggle header contact status failed", error);
    return apiResponse.ErrorResponse(
      res,
      "Toggle header contact status failed"
    );
  }
};

// New method to toggle isDelete
exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const headerContact = await HeaderContact.findByPk(id);

    if (!headerContact) {
      return apiResponse.notFoundResponse(res, "Header contact not found");
    }

    // Toggle the isDelete status
    headerContact.isDelete = !headerContact.isDelete;
    await headerContact.save();

    return apiResponse.successResponseWithData(
      res,
      "Header contact delete status updated successfully",
      headerContact
    );
  } catch (error) {
    console.log("Toggle header contact delete status failed", error);
    return apiResponse.ErrorResponse(
      res,
      "Toggle header contact delete status failed"
    );
  }
};
