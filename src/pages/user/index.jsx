import React, {Component} from 'react';
import {
	Card,
	Button,
	Modal,
	Table,
	Form,
	Input,
	Select,
	Radio,
	DatePicker,
	message
} from 'antd'
import BaseForm from '../../components/baseForm/index'
import axios from '../../axios/index'
import {status, sex, hobby} from '../../config/appConfig'
import PropTypes from 'prop-types';
import moment from 'moment'

const FormItem = Form.Item;
const TestArea = Input.TextArea;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class UserForm extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	handleClose () {
		this.props.handleClose();
	}

	handleSubmit () {
		this.props.handleSubmit();
	}

	render() {
		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 5 },
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 12 },
			},
		};

		const {getFieldDecorator} = this.props.form;
		const operateType = this.props.type;
		const selectedItem = this.props.selectedItem;

		return (
			<Form {...formItemLayout} layout={"horizontal"}>
				<FormItem label={"用户名"}>
					{
						operateType === 'detail' ? (
							<span>{selectedItem && selectedItem.user_name ? selectedItem.user_name : ''}</span>
						) : (
							getFieldDecorator("user_name", {
								initialValue: selectedItem && selectedItem.user_name ? selectedItem.user_name : '',
								rules: [{
									required: true,
									message: '请填写用户名'
								}]
							})(
								<Input placeholder={'请输入用户名'}/>
							)
						)
					}
				</FormItem>
				<FormItem label={'电话号码'}>
					{
						operateType === 'detail' ? (
							<span>{selectedItem && selectedItem.mobilephone ? selectedItem.mobilephone : ''}</span>
						) : (
							getFieldDecorator('mobile', {
								initialValue: selectedItem && selectedItem.mobilephone ? selectedItem.mobilephone : '',
								rules: [
									{
										required: true,
										message: '请输入电话号码'
									}
								]
							})(
								<Input placeholder={'请输入联系电话'} />
							)
						)
					}
				</FormItem>
				<FormItem label={'性别'}>
					{
						operateType === 'detail' ? (
							<span>{selectedItem && selectedItem.sex ? sex[selectedItem.sex + ''] : ''}</span>
						) : (
							getFieldDecorator('sex', {
								initialValue: selectedItem && selectedItem.sex ? selectedItem.sex + '' : '',
								rules: [{
									required: true,
									message: '请选择性别'
								}]
							})(
								<RadioGroup>
									{
										Object.keys(sex).map(item => {
											return {
												id: item,
												name: sex[item]
											}
										}).map((item, index) => {
											return <Radio value={item.id} key={index}>{item.name}</Radio>
										})
									}
								</RadioGroup>
							)
						)
					}
				</FormItem>
				<FormItem label={'状态'}>
					{
						operateType === 'detail' ? (
							<span>{selectedItem && selectedItem.status ? status[selectedItem.status + ''] : ''}</span>
						) : (
							getFieldDecorator('status', {
								initialValue: selectedItem && selectedItem.status ? selectedItem.status + '' : '',
								rules: [{
									required: true,
									message: '请选择状态'
								}]
							})(
								<Select placeholder={'请选择状态'}>
									{
										Object.keys(status).map(item => {
											return {
												id: item,
												name: status[item]
											}
										}).map((item => {
											return (
												<Option value={item.id} key={item.id}>{item.name}</Option>
											)
										}))
									}
								</Select>
							)
						)
					}
				</FormItem>
				<FormItem label={'生日'}>
					{
						operateType === 'detail' ? (
							<span>{selectedItem && selectedItem.birthday ? moment(selectedItem.birthday).format("YYYY-MM-DD") : ''}</span>
						) : (
							getFieldDecorator('birthday', {
								initialValue: selectedItem && selectedItem.birthday ? moment(selectedItem.birthday) : moment(),
								rules: [{
									required: true,
									message: '请选择生日'
								}]
							})(
								<DatePicker showTime={false} format={'YYYY-MM-DD'} placeholder={'请选择日期'}/>
							)
						)
					}
				</FormItem>
				<FormItem label={'联系地址'}>
					{
						operateType === 'detail' ? (
							<span>{selectedItem && selectedItem.address ? selectedItem.address : ''}</span>
						) : (
							getFieldDecorator('address', {
								initialValue: selectedItem && selectedItem.address ? selectedItem.address : '',
								rules: [{
									required: true,
									message: '请填写联系地址'
								}]
							})(
								<TestArea rows={3} placeholder={'请填写联系地址'}/>
							)
						)
					}
				</FormItem>
				<FormItem label={''} style={{width: '100%'}} wrapperCol={{span:24}}>
					{
						operateType === 'detail' ? (
							<Button type={"default"} style={{float: "right"}} onClick={this.handleClose.bind(this)}>关闭</Button>
						) : (
							<div>
								<Button
									type={"primary"}
									style={{float: 'right', marginLeft: 10}}
									onClick={this.handleSubmit.bind(this)}
								>提交</Button>
								<Button
									type={"default"}
									style={{float: 'right'}}
									onClick={this.handleClose.bind(this)}
								>取消</Button>
							</div>
						)
					}
				</FormItem>
			</Form>
		)
	}
}

UserForm.propTypes = {
	selectedItem: PropTypes.object,
	type: PropTypes.string,
	handleClose: PropTypes.func,
	handleSubmit: PropTypes.func
}

const UserFormElement = Form.create({})(UserForm);

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			loading: false,
			title: "",
			visible: false,
			selectedRowKeys: [],
			selectedItem: null,
			operateType: '',
		};
		this.formList = [{
			type: 'INPUT',
			field: 'user_name',
			label: '用户名',
			placeholder: '请输入用户名',
		}, {
			type: 'INPUT',
			field: 'mobile',
			label: '用户手机号',
			placeholder: '请输入手机号'
		}, {
			type: 'DATE',
			field: 'date',
			label: '入职日期',
			placeholder: '请输入入职日期'
		}];
		this.baseForm = null;
		this.params = {
			page: 1,
			page_size: 10
		};
		this.myRef = React.createRef();
	}

	componentWillMount() {
		this.requestList()
	}

	requestList(data) {
		let searchParams = data || {};

		this.setState({
			loading: true
		});

		axios.request({
			method: 'get',
			url: '/user/list',
			data: {
				params: {
					page: this.params.page,
					page_size: this.params.page_size,
					user_name: searchParams.user_name,
					mobile: searchParams.mobile,
					date: searchParams.date
				}
			}
		}).then(res => {
			if (res.code === '0') {
				this.setState({
					loading: false,
					list: res.result
				})
			}
		}, err => {
			Modal.error({
				title: '提示',
				msg: err.msg || '数据加载失败'
			});
			this.setState({
				loading: false,
				list: []
			})
		})
	}

	handleOperate (type) {
		if (type === "CREATE") {
			this.setState({
				visible: true,
				title: '创建员工',
				operateType: 'create',
				selectedRowKeys: [],
				selectedItem: null
			})
		} else if (type === 'EDIT') {
			this.setState({
				visible: true,
				title: '编辑员工'
			})
		} else if (type === 'DETAIL') {
			this.setState({
				visible: true,
				title: '查看员工',
				operateType: 'detail'
			})
		} else if (type === 'DELETE') {
			if (this.state.selectedItem && this.state.selectedItem.id) {
				Modal.confirm({
					title: '提示',
					content: '您确定要删除当前选中的员工么。',
					onOk: () => {
						axios.request({
							method: 'delete',
							url: '/user/delete',
							data: {
								id: this.state.selectedItem.id
							}
						}).then(res => {
							if (res.code === '0') {
								message.success('操作成功');
								this.requestList()
							} else {
								message.error(res.msg || '操作失败')
							}
						})
					},
					onCancel: () => {}
				})
			} else {
				message.warn('当前没有选中任何用户');
			}
		}
	}

	handleSubmit () {
		let form = this.myRef.current;
		form.validateFieldsAndScroll((err, values) => {
			if (!err) {
				let method = this.state.selectedItem && this.state.selectedItem.id > 0 ? 'put' : 'post';
				let url = this.state.selectedItem && this.state.selectedItem.id > 0 ? '/user/edit' : '/user/create';
				axios.request({method, url}).then(res => {
					if (res.code === '0') {
						this.setState({
							visible: false
						});
						this.requestList();
						message.success(res.msg || '操作成功');
					} else {
						this.setState({
							visible: false
						});
						message.error(res.msg || '操作失败');
					}
				})
			}
		});
	}

	handleClose () {
		let form = this.myRef.current;
		form.resetFields();
		this.setState({
			visible: false,
			operateType: '',
		});
	}

	onRowClick(record, index) {
		let selectKey = [index];
		this.setState({
			selectedRowKeys: [record.id],
			selectedItem: record
		})
	}

	render() {
		const columns = [{
			title: 'ID',
			key: 'id',
			dataIndex: 'id',
		}, {
			title: "用户名",
			key: 'user_name',
			dataIndex: "user_name"
		}, {
			title: "性别",
			key: 'sex',
			dataIndex: "sex",
			render(state) {
				return sex[state]
			}
		}, {
			title: "状态",
			key: 'status',
			dataIndex: "status",
			render(state) {
				return status[state]
			}
		}, {
			title: "爱好",
			key: 'hobby',
			dataIndex: "hobby",
			render(state) {
				return hobby[state]
			}
		}, {
			title: "生日",
			key: 'birthday',
			dataIndex: "birthday"
		}, {
			title: "联系地址",
			key: 'address',
			dataIndex: "address"
		}, {
			title: "早起时间",
			key: 'time',
			dataIndex: "time"
		}];

		const rowSelection = {
			type: 'radio',
			selectedRowKeys: this.state.selectedRowKeys
		};

		return (
			<div>
				<Card>
					<BaseForm
						formList={this.formList}
						wrappedComponentRef={(inst) => {
							this.baseForm = inst
						}}
						transData={this.requestList.bind(this)}
					/>
				</Card>
				<Card style={{marginTop: 10}}>
					<Button type={"primary"} onClick={this.handleOperate.bind(this, 'CREATE')}>创建员工</Button>
					<Button style={{marginLeft: 10}} type={"primary"} onClick={this.handleOperate.bind(this, 'EDIT')}>编辑员工</Button>
					<Button style={{marginLeft: 10}} type={"primary"} onClick={this.handleOperate.bind(this, 'DETAIL')}>员工详情</Button>
					<Button style={{marginLeft: 10}} type={"primary"} onClick={this.handleOperate.bind(this, 'DELETE')}>删除员工</Button>

				</Card>
				<Card style={{marginTop: 10}}>
					<Table
						rowKey={'id'}
						loading={this.state.loading}
						columns={columns}
						dataSource={this.state.list}
						pagination={false}
						bordered
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
				<Modal
					title={this.state.title}
					visible={this.state.visible}
					footer={false}
					onCancel={this.handleClose.bind(this)}
				>
					<UserFormElement
						ref={this.myRef}
						selectedItem={this.state.selectedItem}
						type={this.state.operateType}
						handleClose={this.handleClose.bind(this)}
						handleSubmit={this.handleSubmit.bind(this)}
					/>
				</Modal>
			</div>
		);
	}
}

User.propTypes = {};

export default User;
