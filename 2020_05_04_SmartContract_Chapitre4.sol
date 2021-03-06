pragma solidity ^0.6.0;

import "github.com/OpenZeppelin/openzeppelin-solidity/contracts/math/SafeMath.sol";

contract Credibilite {
  
   using SafeMath for uint256;
  
   mapping (address => uint256) public cred;
   bytes32[] private devoirs;

function produireHash (string memory url) pure public returns (bytes32) {
   return keccak256(bytes(url));
}

function  transfer(address destinataire, uint256 valeur) public {
 require(cred[destinataire]>0);
 require(cred[msg.sender] > valeur);
    cred[msg.sender].sub(valeur);
    cred[destinataire].sub(valeur);
}

function remettre(bytes32 dev)  public returns(uint){
    devoirs.push(dev);
    return devoirs.length;
}

}
