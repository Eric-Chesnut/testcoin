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
		_safeMint(_msgSender(), tokenId);
	}
}
