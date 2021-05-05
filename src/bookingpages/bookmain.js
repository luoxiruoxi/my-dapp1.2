import React, { Component } from 'react';//imrc
import { Menu } from 'antd';
import Web3 from 'web3';
import 'antd/dist/antd.css';
import Addmaterial from './addMaterial'
import Booking from './booking'
import GetBookInfo from './getBookInfo'
import GetMaterial from './getMaterial'
import Checkhistorial_prices from './checkhistorial_prices'
import Checkpeoplebought from './checkpeoplebought'
import GetbookCondition from './getbookCondition'
import Setdates from './setdates'

const { SubMenu } = Menu;
let selectedComponent = <div></div>
//构建一个对象数组，可以按照key找到需要渲染的组件
const key_Component = [
    {
        key:1,
        name:'addmaterial', 
        component: <Addmaterial />
    },
    {
        key:2,
        name:'booking', 
        component: <Booking />
    },
    {
        key:3,
        name:'getBookInfo',
        component:<GetBookInfo />
    },
    {
        key:4,
        name:'getMaterial',
        component:<GetMaterial />
    },
    {
        key:5,
        name:'checkhistorial_prices',
        component:<Checkhistorial_prices />
    },
    {
        key:6,
        name:'checkpeoplebought',
        component:<Checkpeoplebought />
    },
    {
        key:7,
        name:'getbookCondition',
        component:<GetbookCondition />
    },
    {
        key:8,
        name:'setdates',
        component:<Setdates />
    },
    // {
    //     name:'contractdates',
    //     component:<Contractdates />
    // }
];

//在上面的对象数组中，查找在菜单中被选中的组件，条件渲染
function AllComponent(props) {
    const theselected = props.selected
    console.log('theselected:' + theselected)
    selectedComponent = key_Component.map((item)=>{
        if (item.name== theselected) {
            console.log('item' + item)
            console.log('name' + item.name)
            console.log('component' + item.component)
            return item.component;
        }
    })
    console.log('selectedComponent:' + selectedComponent);
    console.log('selectedComponent.component:' + selectedComponent.component)
    return <div>
        {selectedComponent}
    </div>;
}
//决定使用菜单栏

class Bookmain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            current: "addmaterial",
        };
    }

    handleClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };

    render() {
        //最下面的div在导航栏下显示不同页面
        const { current } = this.state;

        console.log('current:'+ current)
        return <div>

            <div>
                <Menu onClick={this.handleClick} selectedKeys={[current]} mode="horizontal">
                <Menu.Item key="addmaterial">添加航材</Menu.Item>
                <Menu.Item key="booking">订购</Menu.Item>
                <SubMenu key="SubMenu" title="查看信息">
                <Menu.ItemGroup title="查看订单信息">
                    <Menu.Item key="getBookInfo">购买信息</Menu.Item>
                    <Menu.Item key="getbookCondition">订单状态</Menu.Item>
                </Menu.ItemGroup>
                <Menu.ItemGroup title="航材信息">
                    <Menu.Item key="getMaterial">获取航材信息</Menu.Item>
                    <Menu.Item key="checkhistorial_prices">历史报价</Menu.Item>
                </Menu.ItemGroup>
                </SubMenu>
                <SubMenu key="SubMenu2" title="其它">
                    <Menu.Item key="checkpeoplebought">查看历史购买信息</Menu.Item>
                    <Menu.Item key="setdates">设置日期</Menu.Item>
                </SubMenu>
            </Menu>
            </div>
{/* 此处进行条件渲染 */}
            <div>
                <AllComponent selected={current} />
            </div>
        </div>;
    }
}

export default Bookmain;