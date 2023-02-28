const { configure, getLogger } = require("log4js");
const path = require("path");

configure({
  appenders: {
    out: { type: "stdout" },
    multi: {
      type: "multiFile",
      base: "logs/",
      property: "categoryName",
      extension: ".log",
      compress: true,
    },
  },
  categories: {
    default: {
      appenders: ["out"],
      level: "info",
    },
    app: {
      appenders: ["multi"],
      level: "debug",
    },
  },
});

const logger = getLogger("app");
const fileNanme = async (filename) => {
  const currentfilename = path.basename(filename);
  return currentfilename;
};
module.exports = {
  logger,
  fileNanme,
};
