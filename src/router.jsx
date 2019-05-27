import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login/index'
import Register from './pages/register/index'
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
import Common from './Common'

class IRouter extends Component {
	render() {
		return (
				<Router>
					<Switch>
						<App>
							<Route path={'/login'} component={Login}/>
							<Route path={'/admin'} render={() =>
								<Admin>
									<Route path={"/admin/ui/buttons"} component={Buttons}/>
									<Route path={"/admin/ui/modals"} component={Modals}/>
									<Route path={"/admin/ui/loadings"} component={Loadings}/>
									<Route path={"/admin/ui/notification"} component={Notification}/>
									<Route path={"/admin/ui/messages"} component={Messages}/>
									<Route path={"/admin/ui/tabs"} component={Tabs}/>
									<Route path={"/admin/ui/gallery"} component={Gallery}/>
									<Route path={"/admin/ui/carousel"} component={Carousel}/>
									<Route path={"/admin/form/login"} component={Login}/>
									<Route path={"/admin/form/reg"} component={Register}/>
									<Route path={"/admin/table/basic"} component={BasicTable}/>
									<Route path={"/admin/table/high"} component={HighTable}/>
									<Route path={"/admin/city"} component={City}/>
									<Route path={"/admin/order"} component={OrderIndex}/>
									<Route path={"/admin/user"} component={UserIndex}/>
								</Admin>
							}/>
							<Route path={"/common"} render={() =>
								<Common>
									<Route path={"/common/order/:orderId"} component={OrderDetail} />
								</Common>
							}/>
						</App>
					</Switch>
				</Router>
		);
	}
}

export default IRouter;
