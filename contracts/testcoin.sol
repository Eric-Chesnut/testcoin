// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TestCoin is ERC721Enumerable, ReentrancyGuard, Ownable {
	 constructor (string memory _name, string memory _symbol) public ERC721(_name, _symbol) Ownable()
    {
    }
	
}
