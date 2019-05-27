import React, {Component} from 'react';
import {Card, Button, Modal, Table, Form, Input, Select, Radio, DatePicker} from 'antd'
import BaseForm from '../../components/baseForm/index'
import axios from '../../axios/index'
import {status, sex, hobby} from '../../config/appConfig'
import Util from '../../util/util'
import PropTypes from 'prop-types';


const FormItem = Form.Item;
const TestArea = Input.TextArea;
const RadioGroup = Radio.Group;
const Option = Select.Option;

class UserForm extends Component {
	constructor(props) {
		super(props);
		this.state = {}
	}

	getValue () {
		return this.props.form.getFieldsValue()
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
		return (
			<Form {...formItemLayout} layout={"horizontal"}>
				<FormItem label={"用户名"}>
					{
						getFieldDecorator("user_name", {
							rules: [{
								required: true,
								message: '请填写用户名'
							}]
						})(
							<Input placeholder={'请输入用户名'}/>
						)
					}
				</FormItem>
				<FormItem label={'电话号码'}>
					{
						getFieldDecorator('mobile', {
							rules: [
								{
									required: true,
									message: '请输入电话号码'
								}
							]
						})(
							<Input placeholder={'请输入联系电话'} />
						)
					}
				</FormItem>
				<FormItem label={'性别'}>
					{
						getFieldDecorator('sex', {
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
					}
				</FormItem>
				<FormItem label={'状态'}>
					{
						getFieldDecorator('status', {
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
					}
				</FormItem>
				<FormItem label={'生日'}>
					{
						getFieldDecorator('birthday', {
							rules: [{
								required: true,
								message: '请选择生日'
							}]
						})(
							<DatePicker showTime={false} format={'YYYY-MM-DD'} placeholder={'请选择日期'}/>
						)
					}
				</FormItem>
				<FormItem label={'联系地址'}>
					{
						getFieldDecorator('address', {
							rules: [{
								required: true,
								message: '请填写联系地址'
							}]
						})(
							<TestArea rows={3} placeholder={'请填写联系地址'}/>
						)
					}
				</FormItem>
			</Form>
		)
	}
}

const UserFormElement = Form.create({})(UserForm);

class User extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			loading: false,
			title: "",
			visible: false
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
				title: '创建员工'
			})
		} else if (type === 'EDIT') {

		} else if (type === 'DETAIL') {

		} else if (type === 'DELETE') {

		}
	}

	handleSubmit () {
		let form = this.myRef.current;
	}

	handleClose () {
		this.setState({
			visible: false
		})
	}

	render() {
		const columns = [{
			title: 'ID',
			dataIndex: 'id'
		}, {
			title: "用户名",
			dataIndex: "user_name"
		}, {
			title: "性别",
			dataIndex: "sex",
			render(state) {
				return sex[state]
			}
		}, {
			title: "状态",
			dataIndex: "status",
			render(state) {
				return status[state]
			}
		}, {
			title: "爱好",
			dataIndex: "hobby",
			render(state) {
				return hobby[state]
			}
		}, {
			title: "生日",
			dataIndex: "birthday"
		}, {
			title: "联系地址",
			dataIndex: "address"
		}, {
			title: "早起时间",
			dataIndex: "time"
		}];

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
						loading={this.state.loading}
						columns={columns}
						dataSource={this.state.list}
						pagination={false}
					/>
				</Card>
				<Modal
					title={this.state.title}
					visible={this.state.visible}
					onOk={this.handleSubmit.bind(this)}
					onCancel={this.handleClose.bind(this)}
				>
					<UserFormElement ref={this.myRef} />
				</Modal>
			</div>
		);
	}
}

User.propTypes = {};

export default User;
