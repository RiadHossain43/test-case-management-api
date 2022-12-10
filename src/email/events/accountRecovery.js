module.exports = async (config) => {
  let template = await require("../../common/helper/template").createTemplate({
    view: "emailTemplates/accessControl/accountRecovery.ejs",
    templateOptions: config.payload,
  });
  return {
    subject: config.subject || "Account recovery link",
    template,
  };
};
