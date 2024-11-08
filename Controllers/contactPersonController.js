const ContactPerson = require('../Models/ContactPerson');
const apiResponse = require('../helper/apiResponse');

// exports.addContactPerson = async (req, res) => {
//   try {
//     const { company, solution, person_name, surname, phone, street, zip, place, land, msg, email } = req.body;
//     const img = req.file.path;

//     const contactPerson = await ContactPerson.create({ company, solution, person_name, surname, phone, street, zip, place, land, msg, img, email, isActive: true, isDelete: false });
//     return apiResponse.successResponseWithData(res, 'Contact person added successfully', contactPerson);
//   } catch (error) {
//     console.error('Add contact person failed', error);
//     return apiResponse.ErrorResponse(res, 'Add contact person failed');
//   }
// };
exports.addContactPerson = async (req, res) => {
  try {
    const { company, solution, person_name, surname, phone, street, zip, place, land, msg, email } = req.body;

    if (!req.file) {
      return apiResponse.ErrorResponse(res, "Image is required");
    }

    const img = req.file.path;

    const carrousal = await ContactPerson.create({
      company, solution, person_name, surname, phone, street, zip, place, land, msg, img, email, isActive: true, isDelete: false
    });

    return apiResponse.successResponseWithData(
      res,
      "Carrousal added successfully",
      carrousal
    );
  } catch (error) {
    console.error("Add carrousal failed", error);
    return apiResponse.ErrorResponse(res, "Add carrousal failed");
  }
};
exports.updateContactPerson = async (req, res) => {
  try {
    const { id } = req.params;
    const { company, solution, person_name, surname, phone, street, zip, place, land, msg, email, } = req.body;
    if (!req.file) {
      return apiResponse.ErrorResponse(res, "Image is required");
    }

    const img = req.file.path;

    const contactPerson = await ContactPerson.findByPk(id);
    if (!contactPerson) {
      return apiResponse.notFoundResponse(res, 'Contact person not found');
    }

    contactPerson.company = company;
    contactPerson.solution = solution;
    contactPerson.person_name = person_name;
    contactPerson.surname = surname;
    contactPerson.phone = phone;
    contactPerson.street = street;
    contactPerson.zip = zip;
    contactPerson.place = place;
    contactPerson.land = land;
    contactPerson.msg = msg;
    contactPerson.email = email;
    contactPerson.img = img || contactPerson.img;
    await contactPerson.save();

    return apiResponse.successResponseWithData(res, 'Contact person updated successfully', contactPerson);
  } catch (error) {
    console.error('Update contact person failed', error);
    return apiResponse.ErrorResponse(res, 'Update contact person failed');
  }
};

exports.getContactPersons = async (req, res) => {
  try {
    const contactPersons = await ContactPerson.findAll({ where: { isDelete: false } });

    const baseUrl = `${req.protocol}://${req.get('host')}/`;
    const contactPersonsWithBaseUrl = contactPersons.map(person => {
      return {
        ...person.toJSON(),
        img: person.img ? baseUrl + person.img.replace(/\\/g, '/') : null
      };
    });

    return apiResponse.successResponseWithData(res, 'Contact persons retrieved successfully', contactPersonsWithBaseUrl);
  } catch (error) {
    console.error('Get contact persons failed', error);
    return apiResponse.ErrorResponse(res, 'Get contact persons failed');
  }
};

exports.toggleContactPersonStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const contactPerson = await ContactPerson.findByPk(id);

    if (!contactPerson) {
      return apiResponse.notFoundResponse(res, 'Contact person not found');
    }

    contactPerson.isActive = !contactPerson.isActive;
    await contactPerson.save();

    return apiResponse.successResponseWithData(res, 'Contact person status updated successfully', contactPerson);
  } catch (error) {
    console.error('Toggle contact person status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle contact person status failed');
  }
};

exports.toggleContactPersonDelete = async (req, res) => {
  try {
    const { id } = req.params;
    const contactPerson = await ContactPerson.findByPk(id);

    if (!contactPerson) {
      return apiResponse.notFoundResponse(res, 'Contact person not found');
    }

    contactPerson.isDelete = !contactPerson.isDelete;
    await contactPerson.save();

    return apiResponse.successResponseWithData(res, 'Contact person delete status updated successfully', contactPerson);
  } catch (error) {
    console.error('Toggle contact person delete status failed', error);
    return apiResponse.ErrorResponse(res, 'Toggle contact person delete status failed');
  }
};
