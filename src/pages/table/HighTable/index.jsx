import React, {Component} from 'react';
import {Card, Table} from 'antd'
import axios from '../../../axios/index'
import {hobby, status, sex} from '../../../config/appConfig'

class HighTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
		this.params = {
			page: 1
		}
	}

	componentDidMount() {
		this.getDynamicTableList();
	}

	getDynamicTableList() {
		let _this = this;
		this.setState({
			loading0: true
		});
		axios.request({
			method: 'get',
			url: '/api/user_pagination',
			data: {
				params: {
					page: this.params.page
				}
			}
		}).then(res => {
			this.setState({
				dynamicUserList: res.result,
				loading: false,
			})
		}, err => {
			this.setState({
				loading: false
			})
		})
	}

	render() {
		const basicColumns01 = [
			{
				title: 'id',
				dataIndex: 'id',
				key: 'id',
				width: '5%'
			},
			{
				title: '用户名',
				dataIndex: 'username',
				key: 'username',
				width: '10%'
			},
			{
				title: '性别',
				dataIndex: 'sex',
				key: 'sex',
				render(state) {
					return sex[state]
				},
				width: '5%'

			},
			{
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				render(state) {
					return status[state]
				},
				width: '15%'
			},
			{
				title: '爱好',
				dataIndex: 'hobby',
				key: 'hobby',
				render(state) {
					return state.map(item => {
						return hobby[item]
					}).join('，')
				},
				width: '15%'
			},
			{
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday',
				width: '15%'
			},
			{
				title: '地址',
				dataIndex: 'address',
				key: 'address',
				width: '20%'
			},
			{
				title: '早起时间',
				dataIndex: 'time',
				key: 'time',
				width: '15%'
			}
		];

		const basicColumns02 = [
			{
				title: 'id',
				dataIndex: 'id',
				key: 'id',
				width: 60,
				fixed: 'left'
			}, {
				title: '用户名',
				dataIndex: 'username',
				key: 'username',
				width: 100,
				fixed: 'left'
			}, {
				title: '性别',
				dataIndex: 'sex',
				key: 'sex',
				render(state) {
					return sex[state]
				},
			}, {
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				render(state) {
					return status[state]
				},
			}, {
				title: '爱好',
				dataIndex: 'hobby',
				key: 'hobby',
				render(state) {
					return state.map(item => {
						return hobby[item]
					}).join('，')
				},
			}, {
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday',
			}, {
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday',
			}, {
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday',
			}, {
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday',
			}, {
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday',
			}, {
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday',
			}, {
				title: '地址',
				dataIndex: 'address',
				key: 'address',
				fixed: 'right',
				width: 240
			}, {
				title: '早起时间',
				dataIndex: 'time',
				key: 'time',
				fixed: 'right',
				width: 100
			}
		];

		return (
			<div className={"page-table"}>
				<Card title={'头部固定'}>
					<Table
						columns={basicColumns01}
						dataSource={this.state.dynamicUserList}
						loading={this.state.loading}
						pagination={false}
						scroll={{y: 240}}
						bordered={true}
					/>
				</Card>
				<Card title={"左侧固定"} style={{marginTop: 10}}>
					<Table
						columns={basicColumns02}
						dataSource={this.state.dynamicUserList}
						loading={this.state.loading}
						pagination={false}
						scroll={{x: '170%'}}
						bordered={true}
					/>
				</Card>
				<Card title={"排序"} style={{marginTop: 10}}>

				</Card>
				<Card title={"操作按钮"} style={{marginTop: 10}}>

				</Card>
			</div>
		);
	}
}

export default HighTable;
