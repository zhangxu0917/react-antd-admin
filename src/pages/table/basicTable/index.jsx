import React, {Component} from 'react';
import {Card, Table, Button, Modal} from 'antd'
import axios from '../../../axios/index'
import {hobby, status, sex} from '../../../config/appConfig'
import util from '../../../util/util'

class BasicTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			dynamicUserList: [],
			dynamicUserList02: [],
			selectedItem: {},
			selectedRowKeys: [],
			selectedRows: [],
			selectedRowCheckKeys: [],
			loading: false,
			loading02: false,
			pagination: {}
		};
		this.params = {
			page: 1
		}
	}


	componentDidMount() {
		this.getDynamicTableList();
		this.getDynamicTableList02()
	}

	getDynamicTableList() {
		this.setState({
			loading: true
		});
		axios.request({
			method: 'get',
			url: '/api/user'
		}).then(res => {
			this.setState({
				dynamicUserList: res.result,
				loading: false
			})
		}, err => {
			this.setState({
				loading: false
			})
		})
	}

	getDynamicTableList02() {
		let _this = this;
		this.setState({
			loading02: true
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
				dynamicUserList02: res.result,
				loading02: false,
				pagination: util.pagination(res, (current) => {
					_this.params.page = current;
					this.getDynamicTableList02()
				})
			})
		}, err => {
			this.setState({
				loading02: false
			})
		})
	}

	onRowClick(record, index) {
		let selectKey = [index];
		this.setState({
			selectedRowKeys: selectKey,
			selectedItem: record
		})
	}

	handleDelete() {
		let ids = this.state.selectedRows.map(item => item.id);

		Modal.confirm({
			title: '提示',
			content: `您确定要删除选中的数据么：${ids}`,
			onOk: () => {
				this.getDynamicTableList()
				this.setState({
					selectedRows: [],
					selectedRowCheckKeys: []
				})
			}
		})

	}

	render() {
		const basicColumns = [
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
				}
			},
			{
				title: '状态',
				dataIndex: 'status',
				key: 'status',
				render(state) {
					return status[state]
				}
			},
			{
				title: '爱好',
				dataIndex: 'hobby',
				key: 'hobby',
				render(state) {
					return state.map(item => {
						return hobby[item]
					}).join('，')
				}
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

		const UserList = [{
			id: 1,
			username: '张三',
			sex: 1,
			status: '1',
			hobby: ['1', '2', '4'],
			birthday: '2000-05-12',
			address: '北京市朝阳区酒仙桥路360大厦',
			time: '09:00'
		}, {
			id: 2,
			username: '李四',
			sex: 2,
			status: '1',
			hobby: ['1', '2', '4'],
			birthday: '2000-05-12',
			address: '北京市朝阳区酒仙桥路360大厦',
			time: '07:30'
		}, {
			id: 3,
			username: '王五',
			sex: 1,
			status: '2',
			hobby: ['1', '2',
				'4'],
			birthday: '2000-05-12',
			address: '北京市朝阳区酒仙桥路360大厦',
			time: '08:00'
		}];

		const rowSelection = {
			type: 'radio',
			selectedRowKeys: this.state.selectedRowKeys
		};

		const rowCheckSelection = {
			type: 'checkbox',
			selectedRowKeys: this.state.selectedRowCheckKeys,
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					selectedRowCheckKeys: selectedRowKeys,
					selectedRows
				})
			}
		};

		return (
			<div>
				<Card title={"基础表格"}>
					<Table dataSource={UserList} columns={basicColumns} pagination={false} rowKey={'id'}/>
				</Card>
				<Card title={"动态数据渲染表格-Mock"} style={{marginTop: 10}}>
					<Table columns={basicColumns} dataSource={this.state.dynamicUserList} rowKey={'id'}
					       loading={this.state.loading}/>
				</Card>
				<Card title={"Mock-单选"} style={{marginTop: 10}}>
					<Table
						rowKey={'id'}
						columns={basicColumns}
						loading={this.state.loading}
						dataSource={this.state.dynamicUserList}
						bordered
						pagination={false}
						rowSelection={rowSelection}
						onRow={(record, index) => {
							return {
								onClick: () => {
									this.onRowClick(record, index)
								}
							}
						}}
					/>
				</Card>
				<Card
					title={"Mock-多选"}
					style={{marginTop: 10}}
				>
					<div style={{marginBottom: 10}}>
						<Button
							type={"primary"}
							onClick={this.handleDelete.bind(this)}
						>删除</Button>
					</div>
					<Table
						rowKey={'id'}
						loading={this.state.loading}
						dataSource={this.state.dynamicUserList}
						columns={basicColumns}
						rowSelection={rowCheckSelection}
						bordered/>
				</Card>
				<Card
					title={"Mock-表格分页"}
					style={{marginTop: 10}}
				>
					<Table
						rowKey={'id'}
						loading={this.state.loading02}
						dataSource={this.state.dynamicUserList02}
						columns={basicColumns}
						pagination={this.state.pagination}
						bordered/>
				</Card>
			</div>
		);
	}
}

export default BasicTable;
