pragma solidity 0.5.16;

import "./receipt_Demand.sol";
//demander, approver
//此处设定一人仅保留最近一次申请的记录
contract Demand {
    enum manageCondition { Waiting, Pass }

    //noooooooooooooooo
    uint demandIndex;
    address[] approverList;
    address[] demanderList;

    //(approver and demanderID)-->their authority
    mapping (address => bool) public authority;    

    /* demandId(demandIndex)-->Demand*/
    mapping(uint=>address) public contractId_receipt;

    /* every demander can submit demands more than once*/
    // mapping(address=>demandinfo) public info_info;
    //  demander-->demandId
    mapping(address=>uint) demandwhat;

    modifier demanderOnly(address addr) {
        require(authority[addr] == false);
        _;
    }

    modifier approverOnly(address addr) {
        require(authority[addr] == true);
        _;
    }

    constructor() public {
        demandIndex = 0;
    }

    function approverRegist() public payable {
        authority[msg.sender] = true;
        approverList.push(msg.sender);
    }

    function demanderRegist() public payable {
        authority[msg.sender] = false;
        demanderList.push(msg.sender);
    }

    /* If you're the demander, and you want to submit a demand */
    function submitdemand(address _approverID, uint _piecenumber, uint _pieceamount) demanderOnly(msg.sender) public payable {
        require(_approverID!=address(0x0));
        demandIndex++;

        address addrreceipt = address(new receipt_Demand());
        //合约地址与合约Id关联
        contractId_receipt[demandIndex] = addrreceipt;
        //实例化receipt_book
        receipt_Demand areceipt = receipt_Demand(addrreceipt);

        return areceipt.submitdemand(_approverID, _piecenumber, _pieceamount, demandIndex, msg.sender);
    }

    //now approver approve the demand but check its auth first, the msg.sender is a approver
    function approve(uint _demandIndex ) approverOnly(msg.sender) public payable returns (bool) {

        address receiptaddr = contractId_receipt[_demandIndex];
        receipt_Demand areceipt = receipt_Demand(receiptaddr);
        return areceipt.approve(_demandIndex);
    }

    function getDemandInfo() public view returns(uint, address, uint, uint, uint, uint){

        // require((info_info[msg.sender]).demanderID!=address(0x0));
        uint receiptId = demandwhat[msg.sender];
        address receiptaddr = contractId_receipt[receiptId];
        receipt_Demand areceipt = receipt_Demand(receiptaddr);

        return areceipt.getDemandInfo();       
        // return (info_info[msg.sender].demandId, info_info[msg.sender].demanderID, info_info[msg.sender].submitdate, info_info[msg.sender].piecenumber, info_info[msg.sender].pieceamount, info_info[msg.sender].conditions);
    }
}