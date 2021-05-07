import React, { Component } from 'react';//imrc
import Web3 from 'web3';
import { Table, Button, Input } from 'antd';
import 'antd/dist/antd.css';

let dataSource = [];
  
  const columns = [
    {
      title: '历史报价',
      dataIndex: 'history',
      key: 'history',
    },
  ];

class Checkhistorial_prices extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            _piecenumber:'0x'
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
                var address = "0x6Da44da53624c28109b4Dcb8Fe5E297aEEE625bf"
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

    search=()=>{
        const number = this.state._piecenumber

        window.myContract.methods.checkhistorial_prices(number).send({
            from:window.defaultaccount
        }).then((historial_prices)=>{
            //遍历数组
            historial_prices.map((item,index)=>{
                dataSource.push({key:{index},history:{item}})
            })
        })
    }

    render() {
        return <div>
            <label>件号：</label>
            <br/>
            <Input type='text' onChange={(e)=>{
                const piecenumber = e.target.value;
                this.setState({
                    _piecenumber:piecenumber
                })
            }} />
            <Button onClick={this.search}>查看</Button>
            <br/>
            <br/>
            <Table dataSource={dataSource} columns={columns} />;
        </div>;
    }
}

export default Checkhistorial_prices;