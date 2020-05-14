pragma solidity 0.6.0;

contract Auction {
mapping (address => uint) Bids;
   address currentLeader;
   uint highestBid;

//faire un log des offres
function bidsRegistery () payable public{
    Bids[msg.sender]+=msg.value; //s'il veut rajouter de l'argent sur une offre précédente
    require(Bids[msg.sender]>highestBid); //il ne devient en tête que si le ciumul de ses offres dépasse le highest bid
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
