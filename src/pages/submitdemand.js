import React, { Component } from 'react';//imrc
import Web3 from 'web3';
import { Result,Input, Button } from "antd";
import 'antd/dist/antd.css';

class Submitdemand extends Component {//cccs

    constructor(props) {
        super(props);
        this.state = { 
            _approverID: '0x0', 
            _piecenumber: 0,
            _pieceamount: 0,
            isSuccess: <div>
                    <label>批准人ID：</label>
                    <br/>
                    <Input type="text" onChange={(e)=>this.handlechange_approverID(e)}></Input>
                    <br/>
                    <br/>
                    <label>件号：</label>
                    <br/>
                    <Input type="text" onChange={(e)=>this.handlechange_piecenumber(e)}></Input>
                    <br/>
                    <br/>
                    <label>件数：</label>
                    <br/>
                    <Input type="text" onChange={(e)=>this.handlechange_pieceamount(e)}></Input>
                    <br/>
                    <br/>
                    <Button onClick={this.handleadd}>提交需求</Button>
                    <br/>
                    <br/>
                    <Button onClick={()=>{
                        this.props.history.push('/getDemandInfo')
                    }}>查看订单信息</Button>
                </div>//未成功为表单，成功为提示信息
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
                var abi = require("../contracts/Demand.json")//////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!
                console.log(abi);
                //定义合约地址
                var address = "0xA58d81D1Fe28dC161d256F6D6212fbC9825A93A2"
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
    //要获取文本框的值，要传event对象
    handlechange_approverID = (e) => {
        let val = e.target.value;
        console.log(val);
        this.setState({
            _approverID: val
        })
    }

    handlechange_piecenumber = (e) => {
        let val = e.target.value;
        this.setState({
            _piecenumber: val
        })
    }   
    handlechange_pieceamount = (e) => {
        let val = e.target.value
        this.setState({
            _pieceamount: val
        })
    }

    //这个函数里添加需求表单所需信息
    handleadd = async () => {
        const {_approverID, _piecenumber, _pieceamount} = this.state;
        // const ethereum = window.ethereum
        // //禁止自动刷新。metamask要求写的
        // ethereum.autoRefreshOnNetworkChange = false;

        // //第一次和Metamask进行连接
        // const accounts = await ethereum.enable()
        // console.log(accounts)

        // //初始化Provider
        // const provider = window['ethereum']
        // console.log(provider)
        //获取网络ID
        // console.log(provider.chainId)

        console.log("approverID:" + _approverID);
        console.log("piecenumber:" + _piecenumber);
        console.log("pieceamount:" + _pieceamount);
        window.myContract.methods.submitdemand(_approverID, _piecenumber, _pieceamount).send({
            from: window.defaultaccount
        }).on('transactionHash',(transactionHash)=>{
            console.log('transactionHash',transactionHash)
        })
        .on('confirmation',(confirmationNumber,receipt)=>{
            console.log({confirmationNumber: confirmationNumber,receipt:receipt})
        }).then(
            this.setState({//弹出成功提示页
                isSuccess: <div>
                <Result
                    status="success"
                    title="需求单成功提交！"
                    subTitle={"审批人ID：" + _approverID + "    件号：" + _piecenumber + "    需求量：" +  _pieceamount}
                    extra={[
                    <Button type="primary" key="console" onClick={()=>{
                        this.setState({
                                isSuccess: <div>
                                <div style={{padding: 0}} >
                                    <a href="#" onClick={()=>{//退回到上一页
                                        this.props.history.push('/demandmain')
                                    }}>
                                    <i className="fa fa-angle-double-left" aria-hidden="true" ></i>
                                    </a>
                                </div>
                                <Input type="text" onChange={(e)=>this.handlechange_approverID(e)}></Input>
                                <br/>
                                <br/>
                                <Input type="text" onChange={(e)=>this.handlechange_piecenumber(e)}></Input>
                                <br/>
                                <br/>
                                <Input type="text" onChange={(e)=>this.handlechange_pieceamount(e)}></Input>
                                <br/>
                                <br/>
                                <Button onClick={this.handleadd}>提交需求</Button>
                            </div>//点击返回按钮，又初始化为表单
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
            {this.state.isSuccess}
        </div>;
    }
}

export default Submitdemand;