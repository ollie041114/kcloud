const Migrations = artifacts.require("Migrations");
const KCLOUD = artifacts.require("KCLOUD");
module.exports = function (deployer) {
  deployer.deploy(Migrations);
  deployer.deploy(KCLOUD);
};