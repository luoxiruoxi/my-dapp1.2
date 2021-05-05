import React, { Component } from 'react';//imrc
import ReactDOM from 'react-dom'
import {Link} from 'react-router-dom'
import IRouter from './router'
import { Space } from 'antd';
import 'antd/dist/antd.css';
import Demandmain from './pages/demandmain'
import Introduce from './pages/introduce'
import Bookmain from './bookingpages/bookmain'
// import './css/style.css'

import { Layout, Menu, Breadcrumb } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            currentkey:"0",
            current: <div></div>,
        };
    }

    handleClick=(e)=>{
        this.setState({
            currentkey:e.key
        })
        if (e.key=="1") {
            this.setState({
                current:<div>
                    <Demandmain />
                </div>
            })
        } else if(e.key=="2") {
            this.setState({
                current:<div>
                    <Introduce />
                </div>
            })
        } else if(e.key=="3") {
            this.setState({
                current:<div>
                    <Bookmain />
                </div>
            })
        }
    }

    render() {
        const { currentkey } = this.state.currentkey;
        return <div>
            <Layout className="layout">
                <Header>
                <div className="logo" />
                <Menu onClick={this.handleClick} selectedKeys={[currentkey]} theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
                    <Menu.Item key="1" >
                        <i className="fas fa-plane-arrival">需求</i>
                        </Menu.Item>
                    <Menu.Item key="2" >
                        <i className="fab fa-ethereum">介绍</i>
                        </Menu.Item>
                    <Menu.Item key="3" >
                        <i className="fas fa-map">订单</i>
                        </Menu.Item>
                </Menu>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    {this.state.current}
                {/* <Breadcrumb style={{ margin: '16px 0' }}>
                    <Breadcrumb.Item></Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content">
                <div className="services-section">
                <div className="inner-width">
                    <h1 className="section-title">航材管理</h1>
                    <div className="border"></div>
                    <div className="services-container">

                            <div className="service-box">
                                <a href="#" style={{ color: 'rgb(124, 124, 124)'}}>
                                <div className="service-icon" >
                                <Link to="/demandmain">
                                    <i className="fas fa-plane-arrival"></i>
                                </Link>
                                </div>
                                </a>
                                <div className="service-title">需求管理</div>
                            </div>
                        
                            <div className="service-box">
                                <a href="#" style={{color: 'rgb(124, 124, 124)'}}>
                                    <div className="service-icon">
                                    <Link to="/introduce">
                                    <i className="fab fa-ethereum"></i>
                                    </Link>
                                    </div>
                                </a>
                                <div className="service-title">介绍</div>
                            </div>
                        

                            <div className="service-box">
                                <a href="#" style={{color: 'rgb(124, 124, 124)'}}>
                                    <div className="service-icon">
                                <Link to="/bookmain">
                                        <i className="fas fa-map"></i>
                                </Link>
                                    </div>
                                </a>
                                <div className="service-title">订单管理</div>
                            </div>
                    </div>
                </div>
            </div>
                </div> */}
                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>   
        </div>;
    }
}
export default App;