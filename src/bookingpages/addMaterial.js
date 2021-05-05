import React, { Component } from 'react';//imrc
import Web3 from 'web3';
import { message,Input, Button } from "antd";
import 'antd/dist/antd.css';

class Addmaterial extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            book_storage:0,
            piecenumber:0
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

    handleAddstorge = (e) =>{
        let storage = e.target.value

        this.setState({
            book_storage:storage
        })
    }

    handleAddnumber = (e) =>{
        let number = e.target.value

        this.setState({
            piecenumber:number
        })
    }

    clickaddmaterial = () =>{
        const number = this.state.piecenumber;
        const storge = this.state.book_storage;

        console.log('state:' + number)
        console.log('state:' + storge)
        console.log('state:' + this.state.piecenumber)

        window.myContract.methods.addMaterial(storge,number).send({
            from:window.defaultaccount
        }).on('transactionHash',(transactionHash)=>{
            console.log('transactionHash',transactionHash)
            message.success('添加成功');
        })
    }

    render() {
        return <div>
            <div>
                <h1>航材入库</h1>
                <div>
                    <label>库存量：</label>
                    <Input onChange={this.handleAddstorge} />
                </div>

                <div>
                    <label>件号：</label>
                    <Input onChange={this.handleAddnumber} />
                </div>
                <div>
                    <Button onClick={this.clickaddmaterial}>添加航材</Button>
                </div>
            </div>

        </div>;
    }
}

export default Addmaterial;