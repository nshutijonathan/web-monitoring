const fetch = require("node-fetch");
const models = require("../database/models");
const checkWebsiteStatus = async (website) => {
  try {
    const response = await fetch(website.url);
    return response.ok ? "online" : "offline";
  } catch (error) {
    return "offline";
  }
};

const updateWebsiteStatus = async () => {
  const websites = await models.Website.findAll();
  for (const website of websites) {
    const status = await checkWebsiteStatus(website);
    await website.update({ status });
  }
};

const startStatusCheckJob = () => {
  // Check every 5 minutes (300,000 ms)
  setInterval(updateWebsiteStatus, 300000);
};

module.exports = { startStatusCheckJob };
