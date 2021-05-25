pragma solidity 0.5.16;

contract receipt_book{

    uint txpeople;
    uint totalprice;
    uint contractday;
    uint txoutday;
    
    address bookingpeople;
    uint book_amount;

    constructor() public {
        txoutday = 0;
        contractday = 0;
    }

    function booking(uint amount, uint totalpiece_price,address bookmsgsender) public payable {
        
        totalprice = totalpiece_price;
        bookingpeople = bookmsgsender;
        book_amount = amount;
    }

    function getBookInfo() public view returns (uint, uint, address, uint) {
        return (contractday,txoutday,bookingpeople,book_amount);
    }

    function setdates(uint _contractday, uint _txoutday) public {
        contractday = _contractday;
        txoutday = _txoutday;
    }

    function contractdates() public view returns (uint, uint) {
        return (contractday, txoutday);
    }
}