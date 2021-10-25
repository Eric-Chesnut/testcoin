// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestCoin is ERC721Enumerable, ReentrancyGuard, Ownable {
	

	constructor (string memory _name, string memory _symbol) ERC721(_name, _symbol) Ownable()
    {
		
    }
	
	
	function testClaim(uint256 tokenId) public payable nonReentrant {
		require(msg.value > 1);
		///deposit(msg.value);
		
		///owner.transfer(msg.value);
		_safeMint(_msgSender(), tokenId);
	}
	
	function withdrawBank() public payable onlyOwner {
		//payable(msg.sender).transfer(this.balance);
		
		//this.withdraw();
		payable(owner()).transfer(address(this).balance);

	}
	
	function balancee() public view returns(string memory) {
		uint256 amount = address(this).balance;
		
		return toString(amount);
	}
	
	function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }
	
	function getrandom(uint256 tokenId, string memory keyPrefix) internal view returns (uint256) {
        uint256 rand = random(string(abi.encodePacked(keyPrefix, toString(tokenId))));
		return rand;
		}
		
		
		//MIT license
	function toString(uint256 value) internal pure returns (string memory) {
       
        if (value == 0) {
            return "0";
        }
        uint256 temp = value;
        uint256 digits;
        while (temp != 0) {
            digits++;
            temp /= 10;
        }
        bytes memory buffer = new bytes(digits);
        while (value != 0) {
            digits -= 1;
            buffer[digits] = bytes1(uint8(48 + uint256(value % 10)));
            value /= 10;
        }
        return string(buffer);
    }
	
}
