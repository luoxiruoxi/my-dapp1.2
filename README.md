# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## 英文部分为react脚手架默认文件，
## 为了启动项目，你需要作出以下准备

node_modules 文件夹太大，而且文件数太多，上传太耗时，所以没有拷贝也没有传到github上。。node_modules是存放你在package.json中指定的依赖的外部库和框架的文件，其内容已经存储在其他服务器上，下载package.json，运行npm install就会自动把node_modules文件夹建立起来，和你自己的node_modules文件夹里面的内容一模一样。

### git clone https://github.com/ethereum/go-ethereum.git
从github上clone

### apt-get install Ethereum
计算机上有以太坊客户端geth或其他语言版本

### npm install web3@0.20.1 solc ganache-cli
安装编译环境solc(此处使用solc@0.8.1)
安装web3库(此处使用web3@0.20.1)
安装Ganache或Ganache-CLI或其他以太坊测试环境或可启动的私链或公链（如Rinkeby等）(此处使用ganache-cli@6.12.2)

### npm install -g truffle
安装更高效的开发框架truffle

### truffle compile
### truffle migtrate
编译和部署合约，记住智能合约地址，运行复制

## 启动项目

### 进入项目文件夹，npm install 
安装node_module等依赖文件夹

### npm start
启动项目

### ganache-cli
启动ganache测试环境，并记下助记词

### 项目启动后。Metamask连接，使用助记词导入账户，连接React app

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
