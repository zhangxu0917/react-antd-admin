import React, {Component} from 'react';
import PropTypes from 'prop-types';
import moment from 'moment'
import {
	Form,
	Card,
	Row,
	Icon,
	Col,
	Button,
	Input,
	InputNumber,
	Radio,
	Checkbox,
	Switch,
	Select,
	DatePicker,
	TimePicker,
	Upload,
	message
} from 'antd'

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const Textarea = Input.TextArea;

class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			imageUrl: '',
			loading: false
		}
	}

	getBase64(img, callback) {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	}

	handleChange(info) {
		if (info.file.status === 'uploading') {
			this.setState({loading: true});
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			this.getBase64(info.file.originFileObj, imageUrl =>
				this.setState({
					imageUrl,
					loading: false,
				}),
			);
		}
	}

	beforeUpload(file) {
		const isJPG = file.type === 'image/jpeg';
		if (!isJPG) {
			message.error('You can only upload JPG file!');
		}
		const isLt2M = file.size / 1024 / 1024 < 2;
		if (!isLt2M) {
			message.error('Image must smaller than 2MB!');
		}
		return isJPG && isLt2M;
	}

	handleSubmit() {
		this.props.form.validateFieldsAndScroll((err, value) => {
			if (!err) {
				console.log(value)
			}
		})

	}

	render() {
		const {getFieldDecorator} = this.props.form;
		const formItemLayout = {
			labelCol: {
				xs: {span: 24},
				sm: {span: 6},
			},
			wrapperCol: {
				xs: {span: 24},
				sm: {span: 18},
			}
		};
		const tailFormItemLayout = {
			wrapperCol: {
				xs: {
					span: 24,
					offset: 0,
				},
				sm: {
					span: 18,
					offset: 6,
				},
			},
		};

		const uploadButton = (
			<div>
				<Icon type={this.state.loading ? 'loading' : 'plus'}/>
				<div className="ant-upload-text">Upload</div>
			</div>
		);

		const validateConfirmPassword = (rule, value, callback) => {
			const {getFieldValue} = this.props.form;
			if (value && value !== getFieldValue('password')) {
				callback('两次输入不一致')
			}
			callback()
		};

		return (
			<div className={"page-form"}>
				<Card title={"注册表单"}>
					<Row>
						<Col span={14}>
							<Form {...formItemLayout}>
								<FormItem label={'用户名'}>
									{
										getFieldDecorator('username', {
											initialValue: '',
											rules: [
												{required: true, message: '用户名不得为空'},
												{pattern: /^[a-z,A-Z]+\w+$/, message: '用户名格式不正确'},
												{min: 6, max: 16, message: '用户名长度不正确'}
											]
										})(
											<Input
												placeholder={'请输入用户名'}
												prefix={<Icon type="user" style={{color: "rgba(0,0,0,0.25)"}}/>}
											/>
										)
									}
								</FormItem>
								<FormItem label={'密码'}>
									{
										getFieldDecorator('password', {
											initialValue: '',
											rules: [
												{required: true, message: '密码不得为空'}
											]
										})(
											<Input
												type={"password"}
												prefix={<Icon type={"lock"} style={{color: "rgba(0,0,0,0.25)"}}/>}
											/>
										)
									}
								</FormItem>
								<FormItem label={'确认密码'}>
									{
										getFieldDecorator('confirmPassword', {
											initialValue: '',
											rules: [
												{required: true, message: '确认密码不得为空'},
												{validator: validateConfirmPassword}
											]
										})(
											<Input
												type={"password"}
												prefix={<Icon type={"lock"} style={{color: "rgba(0,0,0,0.25)"}}/>}
											/>
										)
									}
								</FormItem>
								<FormItem label={'性别'}>
									{
										getFieldDecorator("sex", {
											initialValue: 1
										})(
											<RadioGroup>
												<Radio value={1}>男</Radio>
												<Radio value={2}>女</Radio>
											</RadioGroup>
										)
									}
								</FormItem>
								<FormItem label={'年龄'}>
									{
										getFieldDecorator('age', {
											initialValue: 0
										})(
											<InputNumber min={0} max={130}
											/>
										)
									}
								</FormItem>
								<FormItem label={'当前状态'}>
									{
										getFieldDecorator('status', {
											initialValue: 1
										})(
											<Select>
												<Option value={1}>风华浪子</Option>
												<Option value={2}>北大才子</Option>
												<Option value={3}>文艺青年</Option>
												<Option value={4}>IT达人</Option>
												<Option value={5}>数码狂人</Option>
											</Select>
										)
									}
								</FormItem>
								<FormItem label={'爱好'}>
									{
										getFieldDecorator('hobby', {})(
											<Select mode={"multiple"}>
												<Option value={1}>摄影</Option>
												<Option value={2}>绘画</Option>
												<Option value={3}>游泳</Option>
												<Option value={4}>马拉松</Option>
												<Option value={5}>街舞</Option>
												<Option value={6}>Rap</Option>
												<Option value={7}>篮球</Option>
												<Option value={8}>电玩</Option>
												<Option value={9}>电影</Option>
											</Select>
										)
									}
								</FormItem>
								<FormItem label={'是否已婚'}>
									{
										getFieldDecorator('isMarried', {
											valuePropName: 'checked',
											initialValue: true
										})(
											<Switch/>
										)
									}
								</FormItem>
								<FormItem label={'生日'}>
									{
										getFieldDecorator('birthday', {
											initialValue: moment()
										})(
											<DatePicker
												showTime={true}
												format={'YYYY-MM-DD hh:mm:ss'}
											/>
										)
									}
								</FormItem>
								<FormItem label={'联系地址'}>
									{
										getFieldDecorator('address', {
											initialValue: '北京市朝阳区酒仙桥路360大厦'
										})(
											<Textarea autosize={{
												minRows: 3,
												maxRows: 6
											}}/>
										)
									}
								</FormItem>
								<FormItem label={'早起时间'}>
									{
										getFieldDecorator('getUpTime', {
											initialValue: moment()
										})(
											<TimePicker/>
										)
									}
								</FormItem>
								<FormItem label={'头像'}>
									{
										getFieldDecorator("avator", {})(
											<Upload
												listType="picture-card"
												className="avatar-uploader"
												showUploadList={false}
												beforeUpload={this.beforeUpload.bind(this)}
												onChange={this.handleChange.bind(this)}
												action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
											>
												{this.state.imageUrl ? <img src={this.state.imageUrl} alt="avatar" width={120}/> : uploadButton}
											</Upload>
										)
									}
								</FormItem>
								<FormItem {...tailFormItemLayout}>
									{
										getFieldDecorator('agree', {
											valuePropName: 'checked',
											initialValue: true
										})(
											<Checkbox>
												<span>我已阅读并同意</span>
												<a href="#">用户协议</a>
											</Checkbox>
										)
									}
								</FormItem>
								<FormItem {...tailFormItemLayout}>
									<Button type={"primary"} onClick={this.handleSubmit.bind(this)}>注册</Button>
								</FormItem>
							</Form>
						</Col>
					</Row>


				</Card>
			</div>
		);
	}
}


Register.propTypes = {};

export default Form.create({})(Register);

