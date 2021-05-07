pragma solidity 0.5.16;

contract book{
    enum bookCondition {paying, paid_waitingforout, txing, stored}

    uint txpeople;
    uint totalprice;
    uint contractday;
    uint txoutday;
    uint bookcontractId;
    address bookingpeople;
    uint book_amount;
    uint[] piecenumberList;
    address[] bookingpeopleList;

    struct Materials {
        uint book_storage;
        bookCondition bookedMeterial;
        uint piecenumber;

        //history prices used to check, piecenumber-->prices
        mapping (uint=>uint[]) piecenumber_price;
    }

    //every piecenumber belongs to a struct
    mapping (uint=>Materials) piece_Materials;

    //bookcontractId-->Materials
    mapping (uint => Materials) relationship;

    //every people used to bought something people-->piecenumbers-->material
    mapping (address =>uint[]) what_peoplebought;
    //trigger
    event formulation (uint _contractday, uint _txoutday);
    
    constructor() public {
        // bookingpeople = msg.sender;
        // book_amount = amount;
        bookcontractId = 0;
        txoutday = 0;
        contractday = 0;

    }

    function addMaterial(uint _bookstorage, uint _piecenumber) public {
        piecenumberList.push(_piecenumber);
        Materials memory materials = Materials(_bookstorage, bookCondition.stored, _piecenumber); 
        piece_Materials[_piecenumber] = materials;
        piecenumberList.push(_piecenumber);
    }

    function booking(uint _piecenumber, uint amount, uint piece_price) public payable {
        require(amount <= piece_Materials[_piecenumber].book_storage);

        bookingpeople = msg.sender;
        book_amount = amount;

        bookcontractId++;
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

    /* booking information*/
    function getBookInfo(uint _bookcontractId) public view returns(uint, uint, uint, address, uint, uint) {
        Materials memory material =relationship[_bookcontractId];
        return (_bookcontractId,contractday,txoutday,bookingpeople,book_amount,material.piecenumber);
    }

    /*Material information*/
    function getMaterial(uint _piecenumber) public view returns(uint,bookCondition,uint) {
        Materials memory material = piece_Materials[_piecenumber];
        return (material.book_storage, material.bookedMeterial, material.piecenumber);
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

    function getbookCondition(uint _bookcontractId) public view returns (bookCondition) {
        return relationship[_bookcontractId].bookedMeterial;
    }

    function setdates(uint _contractday, uint _txoutday) public {
        contractday = _contractday;
        txoutday = _txoutday;

        emit formulation(_contractday, _txoutday);
    }

    function contractdates() public view returns (uint, uint) {
        return (contractday, txoutday);
    }
}