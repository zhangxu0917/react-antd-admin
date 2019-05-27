import React from 'react';
import {Select} from 'antd'

const Option = Select.Option;
export default {
	formatDate(time) {
		if (time) {
			let date = new Date(time);
			return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
		}
		return ''
	},
	pagination(data, callback) {
		return {
			current: data.page,
			pageSize: data.page_size,
			total: data.total,
			defaultCurrent: 1,
			showTatal: () => {
				return `共${data.result.total}条`
			},
			showQuickJumper: true,
			onChange: (current) => {
				callback(current)
			},
		}
	},
	getOptionList(data) {
		if (!data) {
			return []
		}
		let options = [<Option value={""} key={"all_key"}>全部</Option>];
		data.forEach((item, index) => {
			options.push(<Option value={item.id} key={item.name}>{item.name}</Option>)
		});
		return options
	}
}
