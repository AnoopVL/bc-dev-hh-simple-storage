const { ethers, run, network } = require("hardhat");

async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    );
    console.log("Deploying contract !! Please Wait !!");
    const simpleStorage = await SimpleStorageFactory.deploy();
    await simpleStorage.deployed();
    console.log("This contract is deployed to : " + simpleStorage.address);
    //console.log("The gas required is :" + simpleStorage.);
    if (network.config.chainID === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("Waiting for block txes...");
        await simpleStorage.deployTransaction.wait(6);
        //here we wait 6 blocks as it requires some time to complete the transaction
        await verify(simpleStorage.address, []);
    }

    //Now we interact with the contract
    const currentValue = await simpleStorage.retrieve();
    console.log("The current value is : " + currentValue);
    //Updating the current value
    const transactionResponse = await simpleStorage.store(75);
    await transactionResponse.wait(1);
    const updatedValue = await simpleStorage.retrieve();
    console.log("Updated value is : " + updatedValue);
}

async function verify(contractAddress, args) {
    console.log("Verifying contract !!");
    try {
        await run("verify : verify", {
            address: contractAddress,
            constructorArguments: args,
        });
    } catch (e) {
        if (e.message.toLowerCase().include("already verified")) {
            console.log("Already verifed !! ");
        } else {
            console.log(e);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
