import React, { Component } from 'react';//imrc
import Web3 from 'web3';
import { Space, DatePicker, Result,Input, Button } from "antd";
import 'antd/dist/antd.css';

class Setdates extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            _contractday:'0',
            _txoutday:'0'
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

    onChangeOne=(value, dateString)=>{
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);
        this.setdates({
            _contractday:dateString
        })
      }
      
    onOkOne=(value)=>{
        console.log('onOk: ', value);
    }

    onChangeTwo=(value, dateString)=>{
        console.log('Selected Time: ', value);
        console.log('Formatted Selected Time: ', dateString);

        this.setdates({
            _txoutday:dateString
        })
      }
      
    onOkTwo=(value)=>{
        console.log('onOk: ', value);
    }

    onClickset=()=>{
        window.myContract.methods.setdates(this.state._contractday, this.state._txoutday).send({
            from: window.defaultaccount
        })
    }

    render() {
        return <div>
            <div>
            <Space direction="vertical" size={12}>
                <label>订单生成日</label>
                <DatePicker showTime onChange={this.onChangeOne} onOk={this.onOkOne} />
                <label>运输日</label>
                <DatePicker showTime onChange={this.onChangeTwo} onOk={this.onOkTwo} />
            </Space>
            </div>
            <div>
                <Button onClick={this.onClickset}>确认</Button>
            </div>
        
        </div>;
    }
}

export default Setdates;