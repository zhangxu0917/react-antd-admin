import JsonP from 'jsonp'
import axios from 'axios'
import {Modal} from 'antd'


export default class Axios {
	static jsonp(options) {
		return new Promise((resolve, reject) => {
			JsonP(options.url, {
				param: 'callback'
			}, function (err, response) {
				// TODO:
				if (response.status === 'success') {
					resolve(response)
				} else {
					reject(response.message())
				}
			})
		})
	}

	static request(options) {
		let loading;
		if (options.data && options.data.isShowLoading !== false) {
			loading = document.getElementById("ajaxLoading");
			loading.style.display = 'block'
		}
		const baseApi = 'https://www.easy-mock.com/mock/5cdfc6531446071259d0405e/react_antd_admin';

		return new Promise((resolve, reject) => {
			axios({
				url: options.url,
				method: options.method || 'get',
				baseURL: baseApi,
				timeout: 5000,
				param: (options.data && options.data.params) || ''
			}).then((response) => {
				if (response.status + '' === '200') {
					let res = response.data;
					if (res.data.code === '0') {
						resolve(res.data)
					} else {
						Modal.info({
							title: '提示',
							content: res.data.msg
						})
					}
				} else {
					reject(response.data);
				}
			})
		})
	}
}
