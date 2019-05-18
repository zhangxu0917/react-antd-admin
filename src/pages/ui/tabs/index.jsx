import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Tabs, Card, message, Icon} from 'antd'

const TabPane = Tabs.TabPane

class ITabs extends Component {
	newTabIndex = 0

	handleChangeTab(key) {
		message.info(`您点击了页签${key}`)
	}

	componentWillMount() {
		const panes = [{
			title: 'Tab 1',
			content: 'Content of Tab Pane1',
			key: '1'
		}, {
			title: 'Tab 2',
			content: 'Content of Tab Pane2',
			key: '2'
		}, {
			title: 'Tab 3',
			content: 'Content of Tab Pane3',
			key: '3'
		}];

		this.setState({
			activeKey: panes[0].key,
			panes
		})
	}

	handleEdit (targetKey, action) {
		this[action](targetKey);
	}

	add () {
		const panes = this.state.panes;
		let newTabIndex = this.newTabIndex++
		const activeKey = `newTab${newTabIndex}`;
		panes.push({
			title: `New Tab ${newTabIndex}`,
			content: `Content of New Tab Pane ${newTabIndex}`,
			key: activeKey
		});
		this.setState({
			panes
		})
	}

	remove (targetKey) {
		let activeKey = this.state.activeKey
		let lastIndex;
		this.state.panes.forEach((pane, i) => {
			if (pane.key === targetKey) {
				lastIndex = i - 1;
			}
		});
		const panes = this.state.panes.filter(pane => pane.key != targetKey)
		if (lastIndex >= 0 && activeKey === targetKey) {
			activeKey = panes[lastIndex].key
		}
		this.setState({panes, activeKey})
	}

	handleChangeDynamicTabs (activeKey) {
		console.log(activeKey)
		this.setState({ activeKey });
	}

	render() {
		return (
			<div className={'page-ui page-ui-tabs'}>
				<Card title={"Tab页签"} className={'card-container'}>
					<Tabs defaultActiveKey={'1'} onChange={this.handleChangeTab.bind(this)}>
						<TabPane tab={'Tab 1'} key={'1'}>Content of Tab Pane1</TabPane>
						<TabPane tab={'Tab 2'} key={'2'}>Content of Tab Pane2</TabPane>
						<TabPane tab={'Tab 3'} key={'3'} disabled>Content of Tab Pane3</TabPane>
					</Tabs>
				</Card>

				<Card title={"带图标的Tab页签"} className={'card-container'}>
					<Tabs defaultActiveKey={'1'} onChange={this.handleChangeTab.bind(this)}>
						<TabPane tab={<span><Icon type={"plus"}/>Tab 1</span>} key={'1'}>Content of Tab Pane1</TabPane>
						<TabPane tab={<span><Icon type={"edit"}/>Tab 2</span>} key={'2'}>Content of Tab Pane2</TabPane>
						<TabPane tab={<span><Icon type={"delete"}/>Tab 3</span>} key={'3'}>Content of Tab Pane3</TabPane>
					</Tabs>
				</Card>

				<Card title={'动态Tab页签'} className={'card-container'}>
					<Tabs
						activeKey={this.state.activeKey}
						onChange={this.handleChangeDynamicTabs.bind(this)}
						onEdit={this.handleEdit.bind(this)}
						type={"editable-card"}
					>
						{
							this.state.panes.map(pane => {
								 return <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>
							})
						}
					</Tabs>
				</Card>
			</div>
		);
	}
}

ITabs.propTypes = {};

export default ITabs;
