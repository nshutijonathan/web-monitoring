const models = require("../database/models/");
const statusCode = require("../helpers/constants");
const { isURL } = require("validator");

const getWebsites = async (req, res) => {
  const date = new Date();
  const humanReadable = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  try {
    const websitesList = await models.Website.findAll({
      attributes: ["id", "name", "url", "status", "createdAt", "updatedAt"],
    });

    return res.status(statusCode.statusCode.OK).json({
      message: "Websites fetched successfully",
      status: 200,
      data: websitesList,
      total: websitesList.length,
      lastChecked: humanReadable,
    });
  } catch (error) {
    console.error("Error fetching websites:", error);
    return res.status(500).json({
      message: "Error fetching websites",
      status: 500,
      error: error.message,
    });
  }
};
const getSingleWebsite = async (req, res) => {
  const { id } = req.params;
  const website = await models.Website.findOne({
    where: { id },
  });
  try {
    if (website) {
      return res.status(statusCode.statusCode.OK).json({
        message: `Website with id ${req.params.id} fetched successfully`,
        status: 200,
        data: website,
      });
    } else {
      return res.status(statusCode.statusCode.NOT_FOUND).json({
        message: `Website with id ${req.params.id} not found`,
      });
    }
  } catch (error) {
    return error.message;
  }
};
const addWebsite = async (req, res) => {
  const { name, url } = req.body;
  const status = "unknown";

  if (!name || !url) {
    return res.status(400).json({ error: "Name and URL are required." });
  }

  try {
    const isExisting = await models.Website.findOne({
      where: {
        [models.Sequelize.Op.or]: [{ name }, { url }],
      },
    });

    if (isExisting) {
      return res
        .status(409)
        .json({ error: "Website name or URL already exists." });
    }

    if (!isURL(url)) {
      return res.status(400).json({ error: "Invalid URL format." });
    }

    const website = await models.Website.create({ ...req.body, status });

    return res.status(statusCode.statusCode.CREATED).json({
      message: "Website successfully created!",
      website,
    });
  } catch (error) {
    return error.message;
  }
};

const deleteWebsite = async (req, res) => {
  try {
    const { id } = req.params;
    const singleWebsite = await models.Website.findOne({
      where: { id },
    });
    console.log("singleWebsite", singleWebsite);
    if (singleWebsite) {
      await singleWebsite.destroy();
      return res.status(statusCode.statusCode.OK).json({
        status: statusCode.statusCode.OK,
        message: `Website with id ${req.params.id} deleted successfully`,
      });
    }
    return res.status(statusCode.statusCode.NOT_FOUND).json({
      status: statusCode.statusCode.NOT_FOUND,
      message: `Website with id ${req.params.id} is not found `,
    });
  } catch (error) {
    return error.message;
  }
};
module.exports = { getWebsites, getSingleWebsite, addWebsite, deleteWebsite };
