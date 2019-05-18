import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, Form, Input, Button, Icon, Checkbox, message} from 'antd'

const FormItem = Form.Item;

class Login extends Component {
	handleLogin () {
		const FormValue = this.props.form.getFieldsValue()
		this.props.form.validateFieldsAndScroll((error, values) => {
			if (!error) {
				message.success('登录成功')
				console.log(FormValue)
			} else {
				console.log(error)
			}
		})
	}

	render() {
		const {getFieldDecorator} = this.props.form;
		return (
			<div>
				<Card title={"登录行内表单"} className={'card-container'}>
					<Form layout={"inline"}>
						<FormItem>
							<Input placeholder={'请输入用户名'}/>
						</FormItem>
						<FormItem>
							<Input placeholder={'请输入密码'}/>
						</FormItem>
						<FormItem>
							<Button type={"primary"}>登录</Button>
						</FormItem>
					</Form>
				</Card>

				<Card title={"登录水平表单"} style={{marginTop: 10}} className={'card-container'}>
					<Form style={{width: '400px'}}>
						<FormItem>
							{
								getFieldDecorator('username', {
									rules: [
										{ required: true, message: '请输入用户名' },
										{ pattern: /^[a-z,A-Z]+[\w]+$/, message: '用户名格式不正确' },
										{ min: 6, max: 16, message: '用户名长度不正确'}
									]
								})(
									<Input
										prefix={<Icon type={'user'} style={{color: 'rgba(0,0,0,0.25'}} />}
										placeholder={"Username"}/>
								)
							}
						</FormItem>
						<FormItem>
							{
								getFieldDecorator('password', {
									rules: [
										{ required: true, message: '请输入密码' },
										{ min: 6, max: 16, message: '密码长度不正确'}
									]
								})(
									<Input
										type={"password"}
										prefix={<Icon type={'lock'} style={{color: 'rgba(0,0,0,0.25'}} />}
										placeholder={"Password"}
									/>
								)
							}
						</FormItem>
						<FormItem>
							{
								getFieldDecorator('remember', {
									valuePropName: 'checked',
									initialValue: true
								})(
									<Checkbox>Remember Me</Checkbox>
								)
							}
							<a href="#">Forget Password</a>
						</FormItem>
						<FormItem>
							<Button type={"primary"} onClick={this.handleLogin.bind(this)}>登录</Button>
						</FormItem>
					</Form>
				</Card>
			</div>
		);
	}
}

Login.propTypes = {};

export default Form.create({})(Login);
