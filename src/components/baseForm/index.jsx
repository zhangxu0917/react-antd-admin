import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Input, Form, Select, Button, Checkbox, Radio, DatePicker} from 'antd';
import Util from '../../util/util'

const FormItem = Form.Item;

class BaseForm extends Component {
	constructor(props) {
		super(props);
	}

	initFormList() {
		const { getFieldDecorator } = this.props.form;
		const formList = this.props.formList;
		let formItemList = [];

		if (formList && formList.length > 0) {
			formList.forEach((item, index) => {
				let label = item.label;
				let field = item.field;
				let initialValue = item.initialValue || '';
				let placeholder = item.placeholder || '';
				let width = item.width;
				let list = item.list || [];

				if (item.type === 'INPUT') {
					const INPUT = <FormItem label={label} key={field}>
						{
							getFieldDecorator([field], {
								initialValue
							})(
								<Input type={'text'} placeholder={placeholder} style={{width: width}}/>
							)
						}
					</FormItem>;
					formItemList.push(INPUT)
				} else if (item.type === 'DATE') {
					const DATE = <FormItem label={label} key={field}>
						{
							getFieldDecorator([field])(
								<DatePicker showTime={true} format={'YYYY-MM-DD hh:mm:ss'} placeholder={placeholder}/>
							)
						}
					</FormItem>;
					formItemList.push(DATE)
				} else if (item.type === 'DATERANGE') {
					const STARTTIME = <FormItem label={label} key={"start_time"}>
						{
							getFieldDecorator('start_time')(
								<DatePicker format={"YYYY-MM-DD"} placeholder={'请选择开始时间'}/>
							)
						}
					</FormItem>;
					const ENDTIME = <FormItem label={""} key={"end_time"}>
						{
							getFieldDecorator('end_time')(
								<DatePicker showTime={true} format={'YYYY-MM-DD hh:mm:ss'} placeholder={'请选择结束时间'}/>
							)
						}
					</FormItem>;
					formItemList.push(STARTTIME);
					formItemList.push(ENDTIME);
				} else if (item.type === 'SELECT') {
					const SELECT = <FormItem label={label} key={field}>
						{
					 		getFieldDecorator([field], {
					 		})(
					 			<Select
					 				style={{width}}
					 				placeholder={placeholder}
					 			>
					 				{
					 					Util.getOptionList(list)
					 				}
					 			</Select>
					 		)
					 	}
					</FormItem>;
					formItemList.push(SELECT)
				} else if (item.type === 'CHECKBOX') {
					const CHECKBOX = <FormItem label={label} key={field}>
						{
							getFieldDecorator([field], {
								valuePropName: 'checked',
								initialValue,
							})(
								<Checkbox>
									{label}
								</Checkbox>
							)
						}
					</FormItem>;
					formItemList.push(CHECKBOX)
				}
			})
		}
		return formItemList
	}

	handleResetForm () {
		this.props.form.resetFields()
	}

	handleSubmit () {
		let values = this.props.form.getFieldsValue();
		this.props.transData(values)
	}

	render() {
		return (
			<Form layout={"inline"} style={{marginBottom: 20}}>
				{ this.initFormList() }
				<FormItem>
					<Button type={"primary"} style={{margin: '0 20'}} onClick={this.handleSubmit.bind(this)}>查询</Button>
					<Button onClick={this.handleResetForm.bind(this)} style={{marginLeft: '15px'}}>重置</Button>
				</FormItem>
			</Form>
		);
	}
}

BaseForm.propTypes = {
	formList: PropTypes.array
};

export default Form.create({})(BaseForm);

