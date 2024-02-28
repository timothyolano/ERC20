const { ethers } = require("hardhat");

async function main() {
  const [owner] = await ethers.getSigners();
  const initialSupply = ethers.parseUnits("1000", 18);
  const myTokenContract = await await hre.ethers.deployContract("RealToken", [initialSupply, owner.address]);
  await myTokenContract.waitForDeployment();

  const ethAmount = ethers.parseUnits("100", 18);
  await myTokenContract.connect(owner).mint(owner.address, ethAmount);

  const ethAmountStake = ethers.parseUnits("10", 18);
  await myTokenContract.connect(owner).stake(ethAmountStake);

  const stakedBalance = await myTokenContract.getStake(owner.address);
  console.log("Staking successful. Staked balance of Addr1:", stakedBalance.toString());

  const balance = await myTokenContract.balanceOf(owner.address);
  console.log("Balance of Address:", balance.toString());
}

main().then(() => process.exit(0)).catch(error => {
  console.error(error);
  process.exit(1);
});