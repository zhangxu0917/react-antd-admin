import React, {Component} from 'react';
import {Card, Table, Badge, Modal, message, Button} from 'antd'
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

	handleChangeTable(pagination, filters, sorter) {
		console.log(sorter)
		this.setState({
			sortOrder: sorter.order
		})
	}

	componentDidMount() {
		this.getDynamicTableList();
	}

	getDynamicTableList() {
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

	// FIXME: 删除操作
	handleDelete (e, item) {
		e.preventDefault();
		let id = item.id;
		Modal.confirm({
			title: '提示',
			content: '您确定要删除当前数据么？',
			onOk: () => {
				message.success('操作成功');
				this.getDynamicTableList()
			}
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
				key: 'birthday1',
			}, {
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday2',
			}, {
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday3',
			}, {
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday4',
			}, {
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday5',
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

		const basicColumns03 = [
			{
				title: 'id',
				dataIndex: 'id',
				key: 'id',
			},
			{
				title: '用户名',
				dataIndex: 'username',
				key: 'username',
			},
			{
				title: '性别',
				dataIndex: 'sex',
				key: 'sex',
				render(state) {
					return sex[state]
				},
			},
			{
				title: '年龄',
				dataIndex: 'age',
				key: 'age',
				sorter: (a, b) => {
					return a.age - b.age
				},
				sortOrder: this.state.sortOrder
			},
			{
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				render(state) {
					return status[state]
				},
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
			},
			{
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday',
			},
			{
				title: '地址',
				dataIndex: 'address',
				key: 'address',
			},
			{
				title: '早起时间',
				dataIndex: 'time',
				key: 'time',
			}
		];

		const basicColumns04 = [
			{
				title: 'id',
				dataIndex: 'id',
				key: 'id',
			},
			{
				title: '用户名',
				dataIndex: 'username',
				key: 'username',
			},
			{
				title: '性别',
				dataIndex: 'sex',
				key: 'sex',
				render(state) {
					return sex[state]
				},
			},
			{
				title: '年龄',
				dataIndex: 'age',
				key: 'age',
			},
			{
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				render(state) {
					const config = {
						'1': <Badge status={"success"} text={"成功"}/>,
						'2': <Badge status={"error"} text={"报错"}/>,
						'3': <Badge status={"default"} text={"正常"}/>,
						'4': <Badge status={"processing"} text={"进行中"}/>,
						'5': <Badge status={"warning"} text={"警告"}/>
					}
					return config[state]
				},
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
			},
			{
				title: '生日',
				dataIndex: 'birthday',
				key: 'birthday',
			},
			{
				title: '地址',
				dataIndex: 'address',
				key: 'address',
			},
			{
				title: '早起时间',
				dataIndex: 'time',
				key: 'time',
			},
			{
				title: '操作',
				render: (text, item) => {
					return <Button type={'link'} size={'small'} onClick={(e) => {this.handleDelete(e, item)}}>删除</Button>
				}
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
						rowKey={'id'}
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
						rowKey={'id'}
					/>
				</Card>
				<Card title={"排序"} style={{marginTop: 10}}>
					<Table
						rowKey={'id'}
						columns={basicColumns03}
						dataSource={this.state.dynamicUserList}
						loading={this.state.loading}
						pagination={false}
						bordered={true}
						onChange={this.handleChangeTable.bind(this)}
					/>
				</Card>
				<Card title={"操作按钮"} style={{marginTop: 10}}>
					<Table
						rowKey={'id'}
						columns={basicColumns04}
						dataSource={this.state.dynamicUserList}
						loading={this.state.loading}
						pagination={false}
						bordered={true}
					/>
				</Card>
			</div>
		);
	}
}

export default HighTable;
