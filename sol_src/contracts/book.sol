pragma solidity 0.5.16;

import "./receipt_book.sol";
//可维护性，Data segregation - 数据与逻辑相分离

contract book{
    uint[] piecenumberList;
    address[] bookingpeopleList;
    uint bookcontractId;

    enum bookCondition {paying, paid_waitingforout, txing, stored}

    constructor() public{
        bookcontractId = 0;
    }

    struct Materials {
        uint book_storage;
        bookCondition bookedMeterial;
        uint piecenumber;

        //history prices used to check, piecenumber-->prices
        mapping (uint => uint[]) piecenumber_price;
    }

    //bookcontractId-->receipt_book(the other contract)
    mapping (uint => address) contractId_receipt;
    //every piecenumber belongs to a struct
    mapping (uint => Materials) piece_Materials;

    //bookcontractId-->Materials
    mapping (uint => Materials) relationship;

    //every people used to bought something people-->piecenumbers-->material
    mapping (address =>uint[]) what_peoplebought;
    //trigger
    event formulation (uint _contractday, uint _txoutday);
    

    function addMaterial(uint _bookstorage, uint _piecenumber) public {
        piecenumberList.push(_piecenumber);
        Materials memory materials = Materials(_bookstorage, bookCondition.stored, _piecenumber); 
        piece_Materials[_piecenumber] = materials;
    }

    function booking(uint _piecenumber, uint amount, uint piece_price) public payable {
        //setting for piecenumber,amount,bookingpeople,totalprice,
        require(amount <= piece_Materials[_piecenumber].book_storage);
        
        bookcontractId++;
        //待实例化的合约地址
        address addrreceipt = address(new receipt_book());
        //合约地址与合约Id关联
        contractId_receipt[bookcontractId] = addrreceipt;
        //实例化receipt_book
        receipt_book areceipt = receipt_book(addrreceipt);

        areceipt.booking(amount,amount*piece_price,msg.sender);

        relationship[bookcontractId] = piece_Materials[_piecenumber];
        (piece_Materials[_piecenumber]).bookedMeterial = bookCondition.paying;
        (piece_Materials[_piecenumber]).piecenumber_price[_piecenumber].push(piece_price);//record historial prices
        bookingpeopleList.push(msg.sender);
        what_peoplebought[msg.sender].push(_piecenumber);
        updateStorage(_piecenumber, amount);
    }

    function updateStorage(uint _piecenumber,uint amount) public payable{
        require(amount <= piece_Materials[_piecenumber].book_storage);
        piece_Materials[_piecenumber].book_storage-=amount;
    }


    /*Material information*/
    function getMaterial(uint _piecenumber) public view returns(uint,uint,uint) {
        Materials memory material = piece_Materials[_piecenumber];
        return (material.book_storage, uint(material.bookedMeterial), material.piecenumber);
    }

    //check historial prices via piecenumber-->prices
    function checkhistorial_prices(uint _piecenumber) public view returns (uint[] memory){
        Materials storage m = piece_Materials[_piecenumber];
        
        return m.piecenumber_price[_piecenumber];
    }
    //check historial prices via people-->piecenumber-->material
    function checkpeoplebought(address _people) public view returns (uint[] memory) {
        return what_peoplebought[_people];
    }

    function getbookCondition(uint _bookcontractId) public view returns (uint) {
        return uint(relationship[_bookcontractId].bookedMeterial);
    }

    function setdates(uint _contractday, uint _txoutday, uint _bookcontractId) public {
        //与合约Id关联的合约地址
        address addrreceipt = contractId_receipt[_bookcontractId] ;
        //实例化receipt_book
        receipt_book areceipt = receipt_book(addrreceipt);
        areceipt.setdates(_contractday,_txoutday);
        emit formulation(_contractday, _txoutday);
    }

    function contractdates(uint _bookcontractId) public view returns (uint, uint) {
        //与合约Id关联的合约地址
        address addrreceipt = contractId_receipt[_bookcontractId] ;
        //实例化receipt_book
        receipt_book areceipt = receipt_book(addrreceipt);

        return areceipt.contractdates();
    }
    /* booking information*/
    function getBookInfo(uint _bookcontractId) public view returns(uint, uint, uint, address, uint, uint) {
        Materials memory material =relationship[_bookcontractId];
        //与合约Id关联的合约地址
        address addrreceipt = contractId_receipt[_bookcontractId] ;
        //实例化receipt_book
        receipt_book areceipt = receipt_book(addrreceipt);
        uint contractday;
        uint txoutday;
        address bookingpeople;
        uint book_amount;
        (contractday,txoutday,bookingpeople,book_amount) = areceipt.getBookInfo();
        return (_bookcontractId,contractday,txoutday,bookingpeople,book_amount,material.piecenumber);
    }
}