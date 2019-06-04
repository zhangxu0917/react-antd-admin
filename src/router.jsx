import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import App from './App'
import Login from './pages/login/index'
import Register from './pages/register/index'
import Home from './pages/home/index'
import Admin from './Admin'
import Buttons from './pages/ui/buttons/index'
import Modals from './pages/ui/modals/index'
import Loadings from './pages/ui/loadings/index'
import Notification from './pages/ui/notification/index'
import Messages from './pages/ui/messages/index'
import Tabs from './pages/ui/tabs/index'
import Gallery from './pages/ui/gallery/index'
import Carousel from './pages/ui/carousel/index'
import BasicTable from './pages/table/basicTable/index'
import HighTable from './pages/table/HighTable/index'
import City from './pages/city/index'
import OrderIndex from './pages/order/index/index'
import OrderDetail from './pages/order/detail/index'
import UserIndex from './pages/user/index'
import MapIndex from './pages/map/index'
import Common from './Common'
import Bar from './pages/echart/bar/index'
import Pie from './pages/echart/pie/index'
import Line from './pages/echart/line/index'
import Rich from './pages/rich/index'
import Permission from './pages/permission/index'

class IRouter extends Component {
	render() {
		return (
				<Router>
					<App>
						<Switch>
							<Route path={'/login'} component={Login}/>
							<Route path={"/common"} render={() =>
								<Common>
									<Route path={"/common/order/:orderId"} exact component={OrderDetail} />
								</Common>
							}/>
							<Route path={'/'} render={() =>
								<Admin>
									<Switch>
										<Route path={"/home"} component={Home}/>
										<Route path={"/ui/buttons"} component={Buttons}/>
										<Route path={"/ui/modals"} component={Modals}/>
										<Route path={"/ui/loadings"} component={Loadings}/>
										<Route path={"/ui/notification"} component={Notification}/>
										<Route path={"/ui/messages"} component={Messages}/>
										<Route path={"/ui/tabs"} component={Tabs}/>
										<Route path={"/ui/gallery"} component={Gallery}/>
										<Route path={"/ui/carousel"} component={Carousel}/>
										<Route path={"/form/login"} component={Login}/>
										<Route path={"/form/reg"} component={Register}/>
										<Route path={"/table/basic"} component={BasicTable}/>
										<Route path={"/table/high"} component={HighTable}/>
										<Route path={"/city"} component={City}/>
										<Route path={"/order"} component={OrderIndex}/>
										<Route path={"/user"} component={UserIndex}/>
										<Route path={"/bikeMap"} component={MapIndex}/>
										<Route path={"/charts/bar"} component={Bar}/>
										<Route path={"/charts/pie"} component={Pie}/>
										<Route path={"/charts/line"} component={Line}/>
										<Route path={"/rich"} component={Rich}/>
										<Route path={"/permission"} component={Permission}/>
										<Redirect to={"/home"}/>
									</Switch>
								</Admin>
							}/>
						</Switch>
					</App>
				</Router>
		);
	}
}

export default IRouter;
