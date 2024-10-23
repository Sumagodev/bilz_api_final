const SocialContact = require("../Models/SocialContact");
const apiResponse = require("../helper/apiResponse");

exports.addSocialContact = async (req, res) => {
  try {
    const { instagram, facebook, email, whatsapp, linkedin,youtube,work,address} = req.body;
    const socialContact = await SocialContact.create({
      instagram,
      facebook,
      email,
      whatsapp,
      linkedin,
      youtube,
      work,
      address,
      isActive: true,
      isDelete: false,
    });
    return apiResponse.successResponseWithData(
      res,
      "Social contact added successfully",
      socialContact
    );
  } catch (error) {
    console.log("Add social contact failed", error);
    return apiResponse.ErrorResponse(res, "Add social contact failed");
  }
};

// exports.updateSocialContact = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const socialContact = await SocialContact.findByPk(id);
    
//     if (!socialContact) {
//       return apiResponse.notFoundResponse(res, "Social contact not found");
//     }

//     socialContact.instagram = instagram,
//     socialContact.facebook = facebook,
//     socialContact.email = email,
//     socialContact.whatsapp = whatsapp,
//     socialContact.linkedin = linkedin,
//     socialContact.youtube= youtube,
//     socialContact.work= work,
//     socialContact.address= address
//     await socialContact.save();
    
//     return apiResponse.successResponseWithData(
//       res,
//       "Social contact updated successfully",
//       socialContact
//     );
//   } catch (error) {
//     console.log("Update social contact failed", error);
//     return apiResponse.ErrorResponse(res, "Update social contact failed");
//   }
// };
exports.updateSocialContact = async (req, res) => {
  try {
    const { id } = req.params;
    const socialContact = await SocialContact.findByPk(id);
    
    if (!socialContact) {
      return apiResponse.notFoundResponse(res, "Social contact not found");
    }

    // Destructure the body to get the fields
    const { instagram, facebook, email, whatsapp, linkedin, youtube, work, address } = req.body;

    // Update the social contact fields
    socialContact.instagram = instagram;
    socialContact.facebook = facebook;
    socialContact.email = email;
    socialContact.whatsapp = whatsapp;
    socialContact.linkedin = linkedin;
    socialContact.youtube = youtube;
    socialContact.work = work;
    socialContact.address = address;

    await socialContact.save();
    
    return apiResponse.successResponseWithData(
      res,
      "Social contact updated successfully",
      socialContact
    );
  } catch (error) {
    console.log("Update social contact failed", error);
    return apiResponse.ErrorResponse(res, "Update social contact failed");
  }
};

exports.getSocialContact = async (req, res) => {
  try {
    const socialContacts = await SocialContact.findAll({
      where: { isDelete: false },
    });
    return apiResponse.successResponseWithData(
      res,
      "Social contacts retrieved successfully",
      socialContacts
    );
  } catch (error) {
    console.log("Get social contacts failed", error);
    return apiResponse.ErrorResponse(res, "Get social contacts failed");
  }
};

// Toggle isActive status
exports.isActiveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const socialContact = await SocialContact.findByPk(id);

    if (!socialContact) {
      return apiResponse.notFoundResponse(res, "Social contact not found");
    }

    socialContact.isActive = !socialContact.isActive;
    await socialContact.save();

    return apiResponse.successResponseWithData(
      res,
      "Social contact status updated successfully",
      socialContact
    );
  } catch (error) {
    console.log("Toggle social contact status failed", error);
    return apiResponse.ErrorResponse(res, "Toggle social contact status failed");
  }
};

// Toggle isDelete status
exports.isDeleteStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const socialContact = await SocialContact.findByPk(id);

    if (!socialContact) {
      return apiResponse.notFoundResponse(res, "Social contact not found");
    }

    socialContact.isDelete = !socialContact.isDelete;
    await socialContact.save();

    return apiResponse.successResponseWithData(
      res,
      "Social contact delete status updated successfully",
      socialContact
    );
  } catch (error) {
    console.log("Toggle social contact delete status failed", error);
    return apiResponse.ErrorResponse(res, "Toggle social contact delete status failed");
  }
};
