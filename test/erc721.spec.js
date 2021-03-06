
import chai from 'chai'
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const { expect, assert } = chai

var TestCoin = artifacts.require("TestCoin");

contract('Testing ERC721 contract', function(accounts) {

    let token;
    const name = "BlueCat";
    const symbol = "BCat"
	const num1 = 0;
	const num2 = 1000000000000000005;

    const account1 = accounts[1]
    const tokenId1 = 1111;
    //const tokenUri1 = "This is data for the token 1"; // Does not have to be unique

    const account2 = accounts[2]
    const tokenId2 = 2222;
    //const tokenUri2 = "This is data for the token 2"; // Does not have to be unique

    const account3 = accounts[3]

    it(' should be able to deploy and mint ERC721 token', async () => {
        token = await TestCoin.new(name, symbol)
        await token.testClaim(tokenId1, {from: accounts[1], value: 5})

        expect(await token.symbol()).to.equal(symbol)
        expect(await token.name()).to.equal(name)
    })

    it(' should be unique', async () => {
        const duplicateTokenID = token.testClaim(tokenId1, {from: accounts[2]}) //tokenId
        expect(duplicateTokenID).to.be.rejectedWith(/VM Exception while processing transaction: revert/)
    })

    it(' should allow creation of multiple unique tokens and manage ownership', async () => {
        const additionalToken = await token.testClaim(tokenId2,{from: accounts[2], value: 1000000000000000000}) //1 eth
        expect(Number(await token.totalSupply())).to.equal(2)

        //expect(await token.exists(tokenId1)).to.be.true
        //expect(await token.exists(tokenId2)).to.be.true
        //expect(await token.exists(9999)).to.be.false // Dummy tokenId

        expect(await token.ownerOf(tokenId1)).to.equal(account1)
        expect(await token.ownerOf(tokenId2)).to.equal(account2)
    })

    it(' should allow safe transfers', async () => {
        const unownedTokenId = token.safeTransferFrom(account2, account3, tokenId1, {from: accounts[2]}) // tokenId
        expect(unownedTokenId).to.be.rejectedWith(/VM Exception while processing transaction: revert/)

        const wrongOwner = token.safeTransferFrom(account1, account3, tokenId2, {from: accounts[1]}) // wrong owner
        expect(wrongOwner).to.be.rejectedWith(/VM Exception while processing transaction: revert/)

        // Noticed that the from gas param needs to be the token owners or it fails
        const wrongFromGas = token.safeTransferFrom(account2, account3, tokenId2, {from: accounts[1]}) // wrong owner
        expect(wrongFromGas).to.be.rejectedWith(/VM Exception while processing transaction: revert/)

        await token.safeTransferFrom(account2, account3, tokenId2, {from: accounts[2]})
        expect(await token.ownerOf(tokenId2)).to.equal(account3)
    })
	
	it(' should allow the owner to empty the bank', async() => {
		//const contractBalance = token.balancee().toString()
		
		expect(await token.balancee()).to.equal('1000000000000000005')
		//expect(contractBalance).to.equal(205)
		await token.withdrawBank({from: accounts[0]})
		expect(await token.balancee()).to.equal('0')

	})
})
