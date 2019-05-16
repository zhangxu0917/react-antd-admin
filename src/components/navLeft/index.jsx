import React, {Component} from 'react';
import menuConfig from '../../config/menuConfig'
import {Menu} from 'antd'
import {NavLink} from 'react-router-dom'

const SubMenu = Menu.SubMenu

export default class NavLeft extends Component {
	constructor (props) {
		super(props)
		this.state = {
			menuTreeNode: null
		}
	}

	componentWillMount() {
		const menuTreeNode = this.renderMenu(menuConfig)
		this.setState({
			menuTreeNode
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
				<Menu style={{ width: 200 }} theme="dark" mode="vertical">
					{this.state.menuTreeNode}
				</Menu>
			</div>
		);
	}
}

NavLeft.propTypes = {};
