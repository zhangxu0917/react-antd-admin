import React, {Component} from 'react';
import {
	Card,
	Button,
	Table,
	Badge,
	Modal,
	Form,
	Input,
	Select,
	message,
	Tree,
	Transfer,
} from 'antd';
import axios from '../../axios/index'
import menuData from '../../config/menuConfig'

const FormItem = Form.Item;
const Option = Select.Option;
const {TreeNode} = Tree;

class Permission extends Component {
	constructor(prop) {
		super(prop);
		this.state = {
			loading: false,
			roleList: [],
			selectedItem: null,
			createRoleModalVisible: false,
			isPermissionVisible: false,
			isUserVisible: false,
			menuInfo: [],
			pagination: {
				total: undefined,
				current: 1,
				pageSize: 10,
				onChange: () => {
					this.requestList()
				}
			}
		}
	}

	componentWillMount() {
		this.requestList()
	}

	requestList() {
		this.setState({
			loading: true
		});
		axios.request({
			method: 'get',
			url: '/role/list',
		}).then(res => {
			if (res && res.result.length > 0) {
				this.setState({
					roleList: res.result,
					loading: false,
					pagination: {
						total: res.total,
						pageSize: res.page_size
					},
					selectedRowKeys: []
				})
			}
		})
	}

	onRowClick(record) {
		let selectKey = [record.id];
		this.setState({
			selectedRowKeys: selectKey,
			selectedItem: record
		})
	}

	// FIXME: 打开创建角色弹框
	handleCreateRole() {
		this.setState({
			createRoleModalVisible: true
		})
	}

	// FIXME: 创建角色提交
	handleRoleSubmit() {
		let data = this.roleForm.props.form.getFieldsValue();
		axios.request({
			url: '/role/create',
			method: 'post',
			data: {
				params: data
			}
		}).then(res => {
			if (res.code === '0') {
				this.setState({
					createRoleModalVisible: false
				});
				this.requestList()
			}
		}, err => {
			message.error(err.msg || '操作失败')
		})
	}

	handlePermEdit() {
		let item = this.state.selectedItem;
		if (!item) {
			message.warning('请选择角色');
			return
		}
		this.setState({
			isPermissionVisible: true,
			detailInfo: item,
			menuInfo: item.menus
		})
	}

	handlePermEditSubmit() {
		let data = this.premForm.props.form.getFieldsValue();
		data.role_id = this.state.selectedItem.id;
		data.menus = this.state.menuInfo;
		axios.request({
			url: ' ',
			method: 'put',
			data: {
				params: {
					...data
				}
			}
		}).then(res => {
			if (res && res.code === '0') {
				this.setState({
					isPermissionVisible: false
				});
				this.requestList()
			}
		}, err => {
			message.error(err.msg || '操作失败');
		})

	}

	// 用户授权
	handleUserAuth() {
		let item = this.state.selectedItem;
		if (!item) {
			message.warning('请选择角色');
			return
		}
		this.getRoleUserList(item.id)
	}

	getRoleUserList(id) {
		let item = this.state.selectedItem;
		axios.request({
			url: '/role/user_list',
			method: 'get',
			data: {
				params: {
					id
				}
			}
		}).then(res => {
			this.setState({
				isUserVisible: true,
				detailInfo: item
			});
			this.getAuthUserList(res.result)
		})
	}

	// TODO: 筛选目标用户
	getAuthUserList(dataSource) {
		let mockData = [];
		let targetKeys = [];
		if (dataSource && dataSource.length > 0) {
			targetKeys = dataSource.filter(item => {
				return item.status === 1
			}).map(item => {
				return item.user_id + ''
			});
			mockData = dataSource.map(item => {
				return {
					key: item.user_id + '',
					title: item.user_name,
					status: item.status
				}
			});
			this.setState({
				mockData,
				targetKeys
			});
		}
	}

	handleUserSubmit() {
		let data = {};
		data.user_ids = this.state.targetKeys;
		data.role_id = this.state.selectedItem.id;

		axios.request({
			method: 'post',
			url: '/role/user_role_edit',
			data: {
				params: {
					...data
				}
			}
		}).then(res => {
			if (res && res.code === '0') {
				this.setState({
					isUserVisible: false
				});
				message.success('操作成功');
				this.requestList()
			}
		}, err => {
			message.error(err.msg || '操作失败');
		})
	}

	render() {
		const columns = [
			{
				title: '角色ID',
				dataIndex: 'id',
				key: 'id',
			},
			{
				title: '角色名称',
				dataIndex: 'role_name',
				key: 'role_name',
			},
			{
				title: '创建时间',
				dataIndex: 'create_time',
				key: 'create_time',
			},
			{
				title: '使用状态',
				dataIndex: 'status',
				key: 'status',
				render: (state) => {
					if (parseInt(state) === 0) {
						return <Badge status="warning" text={'已禁用'}/>
					} else {
						return <Badge status="success" text={'已启用'}/>
					}
				}
			},
			{
				title: '授权时间',
				dataIndex: 'authorize_time',
				key: 'authorize_time',
			},
			{
				title: '授权人',
				dataIndex: 'authorize_user_name',
				key: 'authorize_user_name',
			}
		];

		const rowSelection = {
			type: 'radio',
			selectedRowKeys: this.state.selectedRowKeys,
			onChange: (selectedRowKeys, selectedRows) => {
				this.setState({
					selectedRowCheckKeys: selectedRowKeys,
					selectedRows
				})
			}
		};

		return (
			<div>
				<Card>
					<Button type={"primary"} onClick={this.handleCreateRole.bind(this)}>创建角色</Button>
					<Button
						type={"primary"}
						style={{marginLeft: 10}}
						onClick={this.handlePermEdit.bind(this)}
					>设置权限</Button>
					<Button
						type={"primary"}
						style={{marginLeft: 10}}
						onClick={this.handleUserAuth.bind(this)}
					>用户授权</Button>
				</Card>
				<Card style={{marginTop: 10}}>
					<Table columns={columns} dataSource={this.state.roleList} pagination={this.state.pagination}
					       rowSelection={rowSelection} bordered rowKey={"id"} onRow={(record, index) => {
						return {
							onClick: () => {
								this.onRowClick(record, index)
							}
						}
					}}/>
				</Card>
				<Modal
					title={"创建角色"}
					visible={this.state.createRoleModalVisible}
					onOk={this.handleRoleSubmit.bind(this)}
					onCancel={() => {
						this.setState({
							createRoleModalVisible: false
						});
						this.roleForm.props.form.resetFields()
					}}
				>
					<RoleForm wrappedComponentRef={(inst) => {
						this.roleForm = inst
					}}/>
				</Modal>
				<Modal
					title={"设置权限"}
					visible={this.state.isPermissionVisible}
					width={600}
					onOk={this.handlePermEditSubmit.bind(this)}
					onCancel={() => {
						this.setState({
							isPermissionVisible: false
						})
					}}
				>
					<PermEditForm
						wrappedComponentRef={(inst) => {
							this.premForm = inst
						}}
						detailInfo={this.state.detailInfo}
						menuInfo={this.state.menuInfo}
						patchMenuInfo={(checkedKeys) => {
							this.setState({
								menuInfo: checkedKeys
							})
						}}
					/>
				</Modal>
				<Modal
					visible={this.state.isUserVisible}
					title={"用户授权"}
					width={800}
					onOk={this.handleUserSubmit.bind(this)}
					onCancel={() => {
						this.setState({
							isUserVisible: false
						})
					}}
				>
					<RoleAuthForm
						wrappedComponentRef={(inst) => this.userAuthForm = inst}
						detailInfo={this.state.detailInfo}
						targetKeys={this.state.targetKeys}
						mockData={this.state.mockData}
						patchUserInfo={(targetKeys) => {
							this.setState({
								targetKeys
							})
						}}
					/>
				</Modal>
			</div>
		);
	}
}

class RoleForm extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	render() {
		const formItemLayout = {
			labelCol: {
				md: 4
			},
			wrapperCol: {
				md: 20
			}
		};

		let {getFieldDecorator} = this.props.form;

		return (
			<div>
				<Form>
					<FormItem label={'角色名称'} {...formItemLayout}>
						{
							getFieldDecorator('role_name')(
								<Input type={"text"} placeholder={"请输入角色名称"}/>
							)
						}
					</FormItem>
					<FormItem label={'状态'} {...formItemLayout}>
						{
							getFieldDecorator('state')(
								<Select>
									<Option value={0}>停用</Option>
									<Option value={1}>启用</Option>
								</Select>
							)
						}
					</FormItem>
				</Form>
			</div>
		)
	}
}

RoleForm = Form.create({})(RoleForm);
Permission.propTypes = {};

class PermEditForm extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	onCheck(checkedKeys) {
		this.props.patchMenuInfo(checkedKeys)
	}

	renderTreeNodes(data) {
		return data.map(item => {
			if (item.children) {
				return <TreeNode title={item.title} key={item.key}>
					{this.renderTreeNodes(item.children)}
				</TreeNode>
			} else {
				return <TreeNode title={item.title} key={item.key}/>
			}
		})
	}

	render() {
		const formItemLayout = {
			labelCol: {
				md: 4
			},
			wrapperCol: {
				md: 20
			}
		};
		const detailInfo = this.props.detailInfo;
		const menuInfo = this.props.menuInfo;
		const {getFieldDecorator} = this.props.form;

		return (
			<Form layout={"horizontal"}>
				<FormItem label={"角色名称"} {...formItemLayout}>
					<Input disabled placeholder={detailInfo['role_name']}/>
				</FormItem>
				<FormItem label={"状态"} {...formItemLayout}>
					{
						getFieldDecorator('status', {
							initialValue: detailInfo.status
						})(
							<Select>
								<Option value={0}>停用</Option>
								<Option value={1}>启用</Option>
							</Select>
						)
					}
				</FormItem>
				<Tree
					checkable
					defaultExpandAll
					checkedKeys={menuInfo}
					onCheck={(checkedKeys) => {
						this.onCheck(checkedKeys)
					}}
				>
					<TreeNode
						title={'平台权限'}
						key={'platform_all'}
					>
						{this.renderTreeNodes(menuData)}
					</TreeNode>
				</Tree>
			</Form>
		)
	}
}

PermEditForm = Form.create({})(PermEditForm);

class RoleAuthForm extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	filterOption(inputValue, option) {
		return option.title.indexOf(inputValue) > -1
	}

	handleChange (targetKeys) {
		this.props.patchUserInfo(targetKeys)
	}

	render() {
		const {getFieldDecorator} = this.props.form;
		const formItemLayout = {
			labelCol: {
				md: 4
			},
			wrapperCol: {
				md: 20
			}
		};
		return (
			<Form>
				<FormItem label={'角色名称'} {...formItemLayout}>
					{
						getFieldDecorator('role_name')(
							<Input type={"text"} disabled placeholder={this.props.detailInfo['role_name']}/>
						)
					}
				</FormItem>
				<FormItem label={'选择用户'} {...formItemLayout}>
						<Transfer
							titles={['待选用户', '已选用户']}
							dataSource={this.props.mockData}
							showSearch={true}
							locale={{
								searchPlaceholder: "请输入用户名"
							}}
							onChange={this.handleChange.bind(this)}
							targetKeys={this.props.targetKeys}
							render={item => item.title}
							filterOption={this.filterOption.bind(this)}
						/>
				</FormItem>
			</Form>
		)
	}
}

RoleAuthForm = Form.create({})(RoleAuthForm);

export default Permission;
