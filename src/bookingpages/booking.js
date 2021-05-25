import React, { Component } from 'react';//imrc
import Web3 from 'web3';
import { Result,Input, Button } from "antd";
import 'antd/dist/antd.css';

class Booking extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            _piecenumber:0,
            _amount:0,
            _piece_price:0,
            issuccess:<div>
                <label>件号：</label>
                <Input onChange={(e)=>{this.handlechangenumber(e)}}></Input>
                <br/>
                <label>数量：</label>
                <Input onChange={(e)=>{this.handlechangeamount(e)}}></Input>
                <br/>
                <label>报价：</label>
                <Input onChange={(e)=>{this.handlechangeprice(e)}}></Input>
                <br/>
                <Button onClick={this.add}>提交</Button>
            </div>
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
                var abi = require("../contracts/book.json")
                console.log(abi);
                //定义合约地址
                var address = "0xd13827c27c102CFb12A226E3EA03C04c4042b2a7"
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

    handlechangenumber = (e) =>{
        let number = e.target.value

        this.setState({
            _piecenumber:number
        })
    }

    handlechangeamount = (e) =>{
        let number = e.target.value

        this.setState({
            _amount:number
        })
    }

    handlechangeprice = (e) =>{
        let price = e.target.value

        this.setState({
            _piece_price:price
        })
    }

    add = () =>{
        const number = this.state._piecenumber;
        const amount = this.state._amount;
        const price = this.state._piece_price;

        window.myContract.methods.booking(number,amount,price).send({
            from:window.defaultaccount
        }).on('transactionHash',(transactionHash)=>{
            console.log('transactionHash',transactionHash)
        }).then(
            this.setState({//弹出成功提示页
                isSuccess: <div>
                <Result
                    status="success"
                    title="订购单成功提交！"
                    subTitle={"件号：" + this.state._piecenumber + "    数量：" + this.state._amount + "    报价：" +  this.state._piece_price}
                    extra={[
                    <Button type="primary" key="console" onClick={()=>{
                        this.setState({
                            isSuccess: <div>
                                <label>件号：</label>
                                <Input onChange={(e)=>{this.handlechangenumber(e)}}></Input>
                                <br/>
                                <label>数量：</label>
                                <Input onChange={(e)=>{this.handlechangeamount(e)}}></Input>
                                <br/>
                                <label>报价：</label>
                                <Input onChange={(e)=>{this.handlechangeprice(e)}}></Input>
                                <br/>
                                <Button onClick={this.add}>提交</Button>
                            </div>//点击返回按钮，又为表单
                        })
                    }}>
                    返回
                    </Button>
                    ]}
                />
            </div>
            })
        )
    }

    render() {
        return <div>
            {this.state.issuccess}
        </div>;
    }
}

export default Booking;