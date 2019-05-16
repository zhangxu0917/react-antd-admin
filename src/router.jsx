import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './pages/login/index'
import Admin from './Admin'
import Buttons from './pages/ui/buttons/index'
import Modals from './pages/ui/modals/index'
import Loadings from './pages/ui/loadings/index'
import Notification from './pages/ui/notification/index'
import Messages from './pages/ui/messages/index'
import Tabs from './pages/ui/tabs/index'
import Gallery from './pages/ui/gallery/index'
import Carousel from './pages/ui/carousel/index'

class IRouter extends Component {
	render() {
		return (
				<Router>
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
							</Admin>
						}/>
						<Router component={Login}></Router>
					</App>
				</Router>
		);
	}
}

export default IRouter;
