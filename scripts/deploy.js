const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();

  await upload.deployed();

  console.log("Library deployed to:", upload.address);
  const Authentication =await hre.ethers.getContractFactory("Authentication")
  const authentication=await Authentication.deploy();
  await authentication.deployed()
  console.log("Library deployed to:",authentication.address)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});