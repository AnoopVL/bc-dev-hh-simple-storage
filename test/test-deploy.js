const { ethers } = require("hardhat");
/*const {
    isCallTrace,
} = require("hardhat/internal/hardhat-network/stack-traces/message-trace"); */
const { expect, assert } = require("chai");

/*describe("SimpleStorage", function () {
    let simplestorageFactory, SimpleStorage;
    beforeEach(async function () {
        const simplestorageFactory = await ethers.simplestorageFactory(
            "SimpleStorage"
        );
        const SimpleStorage = await simplestorageFactory.deploy();
    });
    it("Should start with a favourite number of 0 ", async function () {
        const currentValue = await SimpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(), expectedValue);
    });
});*/

describe("SimpleStorage", function () {
    let simpleStorage, simpleStorageFactory;

    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage");
        simpleStorage = await simpleStorageFactory.deploy();
    });

    it("Sould start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve();
        const expectedValue = "0";
        assert.equal(currentValue.toString(), expectedValue);
    });
    it("Should update when we call store", async function () {
        const expectedValue = "75";
        const transactionResponse = await simpleStorage.store(expectedValue);
        await transactionResponse.wait(1);
        const currentValue = await simpleStorage.retrieve();
        assert.equal(currentValue.toString(), expectedValue);
    });
});
