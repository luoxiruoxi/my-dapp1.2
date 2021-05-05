import React from 'react';
import { BrowserRouter as Router,Route,Switch } from "react-router-dom";
import App from './App';
import Demandmain from './pages/demandmain';
import GetDemandInfo from './pages/getDemandInfo';
import Submitdemand from './pages/submitdemand';
import Approve from './pages/approve';
import Bookmain from './bookingpages/bookmain'
import Introduce from './pages/introduce'

export default function IRouter() {
    // 路由   和   /* 子路由 */path是访问路径，component加载组件，App当作根组件,Switch只匹配第一个Router，/满足了就不再匹配login，要用exact精准匹配才能停止
    return <Router>
        <Switch>
            <Route exact path="/" component={App}></Route>
            <Route exact path="/demandmain" component={Demandmain}></Route>
            <Route exact path="/bookmain" component={Bookmain}></Route>
            <Route exact path="/introduce" component={Introduce}></Route>
            <Route exact path="/getDemandInfo" component={GetDemandInfo}></Route>
            <Route exact path="/submitdemand" component={Submitdemand}></Route>
            <Route exact path="/approve" component={Approve}></Route>
        </Switch>    
    </Router>
    
}