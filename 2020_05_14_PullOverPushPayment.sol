pragma solidity 0.6.0;

contract Auction {
mapping (address => uint) Bids;
   address currentLeader;
   uint highestBid;
   
function bidsRegistery () payable public{
    Bids[msg.sender]+=msg.value;
    require(Bids[msg.sender]>highestBid);
    currentLeader=msg.sender;
    highestBid=Bids[msg.sender];
}

function pullBids (uint _bidAmount) payable public {
    require(msg.sender != currentLeader, "You're the current leader, you can't withdraw your bid !");
    require(_bidAmount <=Bids[msg.sender], "Come on, you know you didn't bid that much, don't be greedy !");
    Bids[msg.sender]-=_bidAmount;
    msg.sender.transfer(_bidAmount);
}
}
