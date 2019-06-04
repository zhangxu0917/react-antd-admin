import React, {Component} from 'react';
import menuConfig from '../../config/menuConfig'
import {Menu} from 'antd'
import {NavLink} from 'react-router-dom'
import { connect } from 'react-redux'
import { switchMenu } from '../../redux/action'
const SubMenu = Menu.SubMenu;

class NavLeft extends Component {
	constructor (props) {
		super(props);
		this.state = {
			menuTreeNode: null,
			currentKey: ''
		}
	}

	componentWillMount() {
		let currentKey = window.location.pathname;
		this.setState({
			currentKey
		});

		const menuTreeNode = this.renderMenu(menuConfig);
		this.setState({
			menuTreeNode
		})
	}

	handleClick ({item, key}) {
		const { dispatch } = this.props;
		console.log(dispatch);
		dispatch(switchMenu(item.props.title));
		this.setState({
			currentKey: key
		})
	}

	// TODO: 菜单渲染
	renderMenu (data) {
		return data.map((item) => {
			if (item.children) {
				return (
					<SubMenu title={item.title} key={item.key}>
						{this.renderMenu(item.children)}
					</SubMenu>
				)
			}
			return <Menu.Item title={item.title} key={item.key}>
				<NavLink to={item.key}>{item.title}</NavLink>
			</Menu.Item>
		})
	}

	render() {
		return (
			<div>
				<section className="logo-container">
					<img src="/assets/logo-ant.svg" alt=""/>
					<h1>React MS</h1>
				</section>
				<Menu
					style={{ width: 200 }}
		      theme="dark"
					mode="vertical"
					onClick={this.handleClick.bind(this)}
					selectedKeys={[this.state.currentKey]}
				>
					{this.state.menuTreeNode}
				</Menu>
			</div>
		);
	}
}

NavLeft.propTypes = {};

export default connect()(NavLeft)
