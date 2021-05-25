# 启动航材管理系统

## 为了启动项目，你需要作出以下准备

node_modules 文件夹太大，而且文件数太多，上传太耗时，所以没有拷贝也没有传到github上。。node_modules是存放你在package.json中指定的依赖的外部库和框架的文件，其内容已经存储在其他服务器上，下载package.json，运行npm install就会自动把node_modules文件夹建立起来，和你自己的node_modules文件夹里面的内容一模一样。

### git clone https://github.com/ethereum/go-ethereum.git
从github上clone

### 运行环境为Ubuntu 20.04，您可以从Microsoft Store上搜索Ubuntu或自行下载，运行在虚拟机中

### apt-get install Ethereum
计算机上有以太坊客户端geth或其他语言版本

### npm install web3@0.20.1 solc ganache-cli
安装编译环境solc(此处使用solc@0.8.1)
安装web3库(此处使用web3@0.20.1)
搭建并配置以太坊私链
安装Ganache或Ganache-CLI或其他以太坊测试环境或也可以使用可启动的私链或公链（如Rinkeby等）(此处使用ganache-cli@6.12.2)

### npm install -g truffle
安装更高效的开发框架truffle

### truffle compile
编译合约
### truffle migtrate
部署合约，复制智能合约地址（contract address），复制到相应page文件夹的地址中

## 启动项目

### 进入项目文件夹，npm install 
安装node_module等依赖文件夹

### npm start
进入项目文件夹启动项目

### ganache-cli
启动ganache测试环境，并记下助记词

### 项目启动后。Metamask连接，使用助记词导入账户，连接React app

