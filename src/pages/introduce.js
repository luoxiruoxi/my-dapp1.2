import React, { Component } from 'react';//imrc

import { Typography, Divider } from 'antd';

const { Title, Paragraph, Text, Link } = Typography;

class Introduce extends Component {
    constructor(props) {
        super(props);
        this.state = {  };
    }
    render() {
        return <div>
            <Typography>
            <Title>介绍</Title>
            <Title level={2}>基于区块链的航材管理系统</Title>
            <Paragraph>
                可用于管理航材需求，航材入库，航材订单，查看各项历史信息
            </Paragraph>
            <Paragraph>
            <Text strong>
                不可篡改，去中心，更安全更方便
            </Text>.
            </Paragraph>

            <Divider />

            <Title level={2}>使用技术介绍</Title>
            <Paragraph>
            本系统用以太坊区块链存储数据，用React框架开发前端页面，用组件库 antd设计UI。
            </Paragraph>
            <Paragraph>
            <ul>
                <li>
                <Text strong>Ethereum区块链</Text>
                <p>以太坊是支持加密货币，ETH和数以千计去中心化APP的社区技术</p>
                </li>
                <li>
                <Text strong>truffle</Text>
                <p>是使用以太坊虚拟机（EVM）的世界一流的开发环境，用于区块链的测试框架和资产管道，旨在简化开发人员的生活。</p>
                </li>
                <li>
                <Text strong>Ganache CLI测试环境（Ganache的命令行(command-line)版本）</Text>
                <p>Ganache CLI是以太坊开发工具Truffle套件的一部分，使用ethereumjs来模拟完整的客户端行为，使开发以太坊应用程序更快，更轻松，更安全。</p>
                </li>
                <li>
                <Text strong>React框架</Text>
                <p>用于建立用户接口的JS库</p>
                </li>
                <li>
                <Text strong>antd</Text>
                <p>antd 是基于 Ant Design 设计体系的 React UI 组件库，主要用于研发企业级中后台产品。</p>
                </li>
            </ul>
            </Paragraph>

            <Divider />
            <Title level={2}>使用API和官方文档</Title>
            <Paragraph>
                下列文档在开发时提供了帮助
            </Paragraph>
            <Paragraph>
            <ul>
                <li>
                <Link href="https://www.trufflesuite.com/docs/truffle/overview" target="_blank">
                <Text strong>truffle</Text> OVERVIEW
                </Link>
                </li>
                <li>
                <Link href="https://www.trufflesuite.com/docs/ganache/overview" target="_blank">
                <Text strong>Ganache</Text> OVERVIEW
                </Link>
                </li>
                <li>
                <Link href="https://web3js.readthedocs.io/en/v1.3.4/" target="_blank">
                <Text strong>web3.js</Text> is a collection of libraries that allow you to interact with a local or remote ethereum node using HTTP, IPC or WebSocket. 
                </Link>
                </li>
                <li>
                <Link href="https://eth.wiki/json-rpc/API#eth_call" target="_blank">
                <Text strong>JSON RPC</Text> is a stateless, light-weight remote procedure call (RPC) protocol. Primarily this specification defines several data structures and the rules around their processing. It is transport agnostic in that the concepts can be used within the same process, over sockets, over HTTP, or in many various message passing environments. It uses JSON (RFC 4627) as data format.
                </Link>
                </li>
                <li>
                <Link href="https://docs.metamask.io/guide/" target="_blank">
                <Text strong>MetaMask’s </Text>Developer Documentation
                </Link>
                </li>
                <li>
                <Link href="http://cw.hubwiz.com/card/c/metamask-api/1/2/1/" target="_blank">
                <Text strong>MetaMask </Text>中文
                </Link>
                </li>
                <li>
                <Link href="https://reactjs.org/docs/getting-started.html" target="_blank">
                <Text strong>React</Text> A JavaScript library for building user interfaces
                </Link>
                </li>
                <li>
                <Link href="https://ant.design/docs/react/introduce-cn" target="_blank">
                <Text strong>antd </Text>是基于 Ant Design 设计体系的 React UI 组件库
                </Link>
                </li>
            </ul>
        </Paragraph>

        </Typography>
        </div>            
;
    }
}

export default Introduce;