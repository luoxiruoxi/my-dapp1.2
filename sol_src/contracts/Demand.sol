pragma solidity 0.5.16;

//demander, approver

contract Demand {
    enum manageCondition { Waiting, Pass }

    //noooooooooooooooo
    uint demandIndex;
    address[] approverList;
    mapping (address => bool) public authority;

    struct demandinfo{
        uint demandId;
        address demanderID;//from msg.sender
        uint submitdate;
        uint piecenumber;
        uint pieceamount;
        manageCondition conditions;//Waiting

        mapping(uint=>uint) piecenumber_amount;
    }

    /* every demand will have an approver, from which is a struct approver, demandId-->approverID*/
    mapping(uint=>address) willbe_approve;
    

    // /* every pieces of the materials which are demanded should have its quantity demanded*/
    // mapping(bytes32=>uint) public quantitydemanded;

    // /* every pieces of the materials which are demanded should belongs to a plane*/
    // mapping(bytes32=>uint) public piecenumber_planeIddddd;

    /* every demand can have its own demands with the demandinfo, from which you can get all of the information*/
    mapping(uint=>demandinfo) public info;

    /* every demander can submit demands more than once*/
    mapping(address=>demandinfo) public info_info;

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
        approverList.push(msg.sender);
    }

    /* If you're the demander, and you want to submit a demand, you should submit demand info, and approver */
    function submitdemand(address _approverID, uint _piecenumber, uint _pieceamount) demanderOnly(msg.sender) public payable {
        require(_approverID!=address(0x0));

        demandIndex++;
        demandinfo memory Demandinfo = demandinfo(demandIndex, msg.sender, now, _piecenumber, _pieceamount, manageCondition.Waiting);
        
        info[demandIndex] = Demandinfo;
        ///?????????????????????????????????????????????????????????????????????????????????????????//
        (info[demandIndex]).piecenumber_amount[_piecenumber] = Demandinfo.pieceamount;
        willbe_approve[demandIndex] = _approverID;
        info_info[msg.sender] = Demandinfo;
    }

    //now approver approve the demand but check its auth first, the msg.sender is a approver
    function approve(uint _demandIndex ) approverOnly(msg.sender) public payable returns (bool) {
        require(msg.sender == willbe_approve[_demandIndex]);
        info[_demandIndex].conditions = manageCondition.Pass;

        return true;
    }

    function getDemandInfo() public view returns(uint, address, uint, uint, uint, manageCondition){
        require((info_info[msg.sender]).demanderID!=address(0x0));
        
        return (info_info[msg.sender].demandId, info_info[msg.sender].demanderID, info_info[msg.sender].submitdate, info_info[msg.sender].piecenumber, info_info[msg.sender].pieceamount, info_info[msg.sender].conditions);
    }
}