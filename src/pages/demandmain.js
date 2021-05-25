import React, { Component } from 'react';//imrc
import Submitdemand from './submitdemand'
import Approve from './approve'
import {Link} from 'react-router-dom'
import Web3 from 'web3';
import { Row,Col,message, Card } from "antd";

import 'antd/dist/antd.css';

const { Meta } = Card;
// import '../css/style1.css'

class Demandmain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentcomponent:<div>
            <Row>
            <Col span={12}>
                <Card
                hoverable
                style={{ width: 360 }}
                cover={<h2>批准人登录</h2>}
                extra={<a href="#" onClick={this.approverRegist}>点击登录</a>}
                >
                <Meta title="批准人登录" description="登录以批准申请单" />
            </Card>
            </Col>
            
            <Col span={12}>
                <Card
                    hoverable
                    style={{ width: 360 }}
                    cover={<h2>申请人登录</h2>}
                    extra={<a href="#" onClick={this.demanderRegist}>点击登录</a>}
                    >
                    <Meta title="申请人登录" description="登录以申请" />
                </Card>
            </Col>
            </Row>
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
                var abi = require("../contracts/Demand.json")//////////////////////!!!!!!!!!!!!!!!!!!!!!!!!!
                console.log(abi);
                //定义合约地址
                var address = "0xA54cB527B044620c432f70D69D9Ec0DB6639168E"
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
    //https://web3js.readthedocs.io/en/v1.3.4/callbacks-promises-events.html监听交易事件给予message框
    //console.log()的输出格式https://blog.csdn.net/z591102/article/details/106946288/
    approverRegist = () => {
        window.myContract.methods.approverRegist().send({
            from: window.defaultaccount
        }).once('sending', (payload) => {message.info('正在登记');})
        // .once('sent', (payload) => {message.info('正在登记2');})
        .on('confirmation', (confNumber, receipt, latestBlockHash)=>{
            console.log('%o %o %o', confNumber,receipt,latestBlockHash)
            message.success("登记成功")
        })
        this.setState({
            currentcomponent:<Approve />
        })
    }

    demanderRegist = () => {
        window.myContract.methods.demanderRegist().send({
            from: window.defaultaccount
        }).once('sending', (payload) => {message.info('正在登记');})
        // .once('sent', (payload) => {message.info('正在登记2');})
        .on('confirmation', (confNumber, receipt, latestBlockHash)=>{
            console.log('%o %o %o', confNumber,receipt,latestBlockHash)
            message.success("登记成功")
        })
        this.setState({
            currentcomponent:<Submitdemand />
        })
    }

    // handleJumpa = () =>{
    //     //跳转到approve
    //     this.props.history.push('/approve')
    // }

    // handleJumpd = () =>{
    //     //跳转到submitdemand
    //     this.props.history.push('/submitdemand')
    // }

    render() {
        return this.state.currentcomponent;
    }
}

export default Demandmain;