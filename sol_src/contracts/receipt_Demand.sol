pragma solidity 0.5.16;
//需求单
//demander, approver

contract receipt_Demand {
    enum manageCondition { Waiting, Pass }

    uint demandId;
    address demanderID;//from msg.sender
    uint submitdate;//提交日期
    uint piecenumber;//件号
    uint pieceamount;//数量
    manageCondition conditions;//Waiting

    /* every demand will have an approver, from which is a struct approver, demandId-->approverID*/
    mapping(uint=>address) willbe_approve;

    constructor() public {
        demanderID = address(0x0);
        demandId = 0;
        submitdate = 0;
        pieceamount = 0;
        piecenumber = 0;
        conditions = manageCondition.Waiting;
    }

    /* If you're the demander, and you want to submit a demand, you should submit demand info, and approver */
    function submitdemand(address _approverID, uint _piecenumber, uint _pieceamount, uint _demandIndex, address addr) public payable {
        require(_approverID!=address(0x0));
        
        demandId = _demandIndex;
        demanderID = addr;
        piecenumber = _piecenumber;
        pieceamount = _pieceamount;
        willbe_approve[_demandIndex] = _approverID;
        submitdate = now;
    }

    //now approver approve the demand but check its auth first, the msg.sender is a approver
    function approve(uint _demandIndex ) public payable returns (bool) {
        require(msg.sender == willbe_approve[_demandIndex]);
        conditions = manageCondition.Pass;

        return true;
    }

    function getDemandInfo() public view returns(uint, address, uint, uint, uint, uint){
        require(demanderID!=address(0x0));
        
        return (demandId, demanderID, submitdate, piecenumber, pieceamount, uint(conditions));
    }
}