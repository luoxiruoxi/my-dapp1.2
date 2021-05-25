import React, { Component } from 'react';//imrc
import Web3 from 'web3';
import { Drawer, List, Divider, Col, Row } from "antd";
import 'antd/dist/antd.css';

const DescriptionItem = ({ title, content }) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

class GetDemandInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            demandId:0,
            demanderID:'0x',
            submitdate:0,
            piecenumber:0,
            pieceamount:0,
            conditions:1,
            visible: false
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

        //第一次加载时预加载数据，设置state
        this.handleadd();
    }

    showDrawer = () => {
        this.setState({
        visible: true,
        });
    };

    onClose = () => {
        this.setState({
        visible: false,
        });
    };

    handleadd = () => {
        window.myContract.methods.getDemandInfo().send({
            from: window.defaultaccount
        }).then((_demandId,_demanderID,_submitdate,_piecenumber,_pieceamount,_conditions)=>{
            //更新状态
            this.setState({
                demandId:_demandId,
                demanderID:_demanderID,
                submitdate:_submitdate,
                piecenumber:_piecenumber,
                pieceamount:_pieceamount,
                conditions:_conditions,
                visible: false
            })
            console.log("demainId:" + _demandId)
            console.log("demanderID:" + _demanderID)
            console.log("submitdate:" + _submitdate)
            console.log("piecenumber:" + _piecenumber)
            console.log("pieceamount:" + _pieceamount)
            console.log("conditions:" + _conditions)
        })
    }

  render() {
      //使用抽屉组件
    return <div>
          <div>
            <List
            dataSource={[
                {demandId:this.state.demandId},
                {demanderID:this.state.demanderID},
                {submitdate:this.state.submitdate},
                {piecenumber:this.state.piecenumber},
                {pieceamount:this.state.pieceamount},
                {conditions:this.state.conditions}
            ]}
            bordered
            renderItem={item => (
                <List.Item
                key={item.id}
                actions={[
                    <a onClick={this.showDrawer} key={`a-${item.id}`}>
                    查看详情
                    </a>,
                ]}
                >
                <List.Item.Meta
                    // avatar={
                    //   <Avatar src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png" />
                    // }
                    title={item.demandId}
                    description={"提交日：" + this.submitdate}
                />
                </List.Item>
            )}
            />
          </div>
          <div>
            <Drawer
            width={640}
            placement="right"
            closable={false}
            onClose={this.onClose}
            visible={this.state.visible}
            >
            <p className="site-description-item-profile-p" style={{ marginBottom: 24 }}>
                {"需求  " + this.state.demandId + "    的详细信息"}
            </p>
            <p className="site-description-item-profile-p">基本信息</p>
            <Row>
                <Col span={12}>
                <DescriptionItem title="需求单号：" content={this.state.demandId} />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                <DescriptionItem title="需求人ID：" content={this.state.demanderID} />
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                <DescriptionItem title="件号：" content={this.state.piecenumber} />
                </Col>
                <Col span={12}>
                <DescriptionItem title="件数" content={this.state.pieceamount} />
                </Col>
            </Row>

            <Divider />
            <p className="site-description-item-profile-p">日期与状态</p>
            <Row>
                <Col span={12}>
                <DescriptionItem title="递交日期" content={this.state.submitdate} />
                </Col>
                <Col span={12}>
                <DescriptionItem title="状态" content={this.state.conditions} />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                <DescriptionItem 
                title="简介：" 
                content="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" />
                </Col>
            </Row>
            </Drawer>

          </div>
      </div>;
  }
}
export default GetDemandInfo;