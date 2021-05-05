import React, { Component } from 'react';//imrc
import { message,Table, Input, Button, Space } from 'antd';
import Web3 from 'web3';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';

let data = [];
// const data = [
//   {
//     key: '1',
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//   },
//   {
//     key: '2',
//     name: 'Joe Black',
//     数据: 42,
//     address: 'London No. 1 Lake Park',
//   },
// ];
// 使用可搜索的列表组件SearchOutlined，要装react-highlight-words插件
// 使用的数据源数组为调用getDemandInfo获得的订单信息

class Approve extends Component {

  constructor(props) {
    super(props);
    this.state = { 
        demandId:0,
        demanderID:'0x',
        submitdate:0,
        piecenumber:0,
        pieceamount:0,
        conditions:1,
        searchText: '',
        searchedColumn: '',
        dataList:[],
        isapprove:<div></div>//在审批后isapprove成为一个列表，增加Table返回
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

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  handlechange = (event) => {//输入DemandId
    let demandid = event.target.value;
    // window.myContract.methods.approve(demandid).send({
    //     from: window.defaultaccount
    // })
    this.setState({
      demandId:demandid
    })
  }

  handleapprove = () => {//click
    window.myContract.methods.getDemandInfo().send({
        from: window.defaultaccount
    },(_demandId,_demanderID,_submitdate,_piecenumber,_pieceamount,_conditions)=>{
        //更新状态
        this.setState({
            demandId:_demandId,
            demanderID:_demanderID,
            submitdate:_submitdate,
            piecenumber:_piecenumber,
            pieceamount:_pieceamount,
            conditions:_conditions,
        })
        this.state.dataList.push({ key: '1',name: '需求单号',adata: _demandId, })
        this.state.dataList.push({ key: '2',name: '需求人ID',adata: _demanderID, })
        this.state.dataList.push({ key: '3',name: '提交需求单日期',adata: _submitdate, })
        this.state.dataList.push({ key: '4',name: '件号',adata: _piecenumber, })
        this.state.dataList.push({ key: '5',name: '需求量',adata: _pieceamount, })
        this.state.dataList.push({ key: '6',name: '状态',adata: _conditions, })
        console.log("demainId:" + _demandId)
        console.log("demanderID:" + _demanderID)
        console.log("submitdate:" + _submitdate)
        console.log("piecenumber:" + _piecenumber)
        console.log("pieceamount:" + _pieceamount)
        console.log("conditions:" + _conditions)

        data = this.state.dataList; //数据源接收
        const columns = [
          {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            width: '30%',
            ...this.getColumnSearchProps('name'),
          },
          {
            title: '数据',
            dataIndex: 'adata',
            key: 'adata',
            width: '20%',
            ...this.getColumnSearchProps('adata'),
          },
        ];
        
        this.setState({
          isapprove: <Table columns={columns} dataSource={data} />
        })//点击BUTTON进行审批，然后调用此函数改变isapprove
      })
      .once('sending', (payload) => {message.info('正在审批');})
      .on('confirmation', (confNumber, receipt, latestBlockHash)=>{
        console.log('%o %o %o', confNumber,receipt,latestBlockHash)
        message.success("审批成功")
      })
      // .once('sent', (payload) => {message.info('正在登记2');})
  }

  render() {
        return <div>

            <div>
              <br/>
              <label>需求单号：</label>
              <br/>
                <Input type="text" onChange={(e)=>this.handlechange(e)}/>
                <br/>
                <br/>
                <Button onClick={this.handleapprove}>确认审批</Button>
                <br/>
                <br/>
            </div>
            <div>
                {this.state.isapprove}
            </div>   
        </div>
    }
}


export default Approve;