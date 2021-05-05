import React, { Component } from 'react';//imrc
import Web3 from 'web3';

import { Table, Button, Input } from 'antd';
import 'antd/dist/antd.css';

let dataSource = [];
  
const columns = [
    {
      title: '项',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '具体',
      dataIndex: 'data',
      key: 'data',
    },
];

class GetBookInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            _bookcontractId:0,
         };
    }

    async componentDidMount() {
        //组件加载后
        //判断页面是否安装Metamask
        if (typeof window.ethereum !== 'undefined') {
            const ethereum = window.ethereum
            //禁止自动刷新。metamask要求写的
            ethereum.autoRefreshOnNetworkChange = false;

            try{
                //第一次和Metamask进行连接
                const accounts = await ethereum.enable()
                console.log(accounts)

                //初始化Provider
                const provider = window['ethereum']
                console.log(provider)
                //获取网络ID
                console.log(provider.chainId)
                //实例化web3
                const web3 = new Web3(provider)
                console.log(web3);
                //导入abi文件
                var abi = require("../contracts/book.json")//////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!
                console.log(abi);
                //定义合约地址
                var address = "0xBEA320d104F19Ba504EFacaaa1c951Bb7726bbdb"
                // var address = "0xDD12fCd81a628b7BaB8e34C36Fbc72Cf927Ae43D"
                //实例化合约,全局变量
                window.myContract = new web3.eth.Contract(abi.abi, address);
                console.log(window.myContract)
                window.defaultaccount = accounts[0].toLowerCase()
                console.log(window.defaultaccount)
                
                //捕获换网络和换账户的事件
                ethereum.on('accountsChanged',(accounts)=>{
                    console.log("账户变化" + accounts)
                })
                ethereum.on('chainChanged',(chainId)=>{
                    console.log("链变化" + chainId)
                    
                })

            }catch (e){

            }
        } else {
            console.log('没有metamask')
        }
    }

    search =()=> {
        const bookcontractId = this.state._bookcontractId

        window.myContract.methods.getBookInfo(bookcontractId).send({
            from:window.defaultaccount
        }).then((bookcontractId,contractday,txoutday,bookingpeople,book_amount,piecenumber)=>{
            dataSource.push({key:1,name:'订单号',data:bookcontractId})
            dataSource.push({key:2,name:'合约日期',data:contractday})
            dataSource.push({key:3,name:'交易日期',data:txoutday})
            dataSource.push({key:4,name:'订购人',data:bookingpeople})
            dataSource.push({key:5,name:'数量',data:book_amount})
            dataSource.push({key:6,name:'件号',data:piecenumber})
        })


    }

    render() {
        return <div>
            <label>订单号：</label>
            <Input onChange={(e)=>{
                this.setState({
                    _bookcontractId:e.target.value
                })
            }} />
            <Button onClick={this.search}>查看</Button>
            <Table dataSource={dataSource} columns={columns} />;
        </div>;
    }
}

export default GetBookInfo;