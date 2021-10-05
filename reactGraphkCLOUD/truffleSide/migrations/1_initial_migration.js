const Migrations = artifacts.require("Migrations");
const KCLOUD = artifacts.require("kcloud");
module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(KCLOUD);
};
