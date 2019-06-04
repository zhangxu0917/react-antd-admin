import React, {Component} from 'react';
import {Card, Button, Modal} from 'antd';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html'
// import PropTypes from 'prop-types';

class MyComponent extends Component {
	constructor (props) {
		super(props);
		this.state = {
			editorState: '',
			contentState: '',
			showModal: false
		}
	}

	handleClearContent () {
	}

	handleGetContent () {
		this.setState({
			showModal: true
		})
	}

	onEditorStateChange (editorState) {
		this.setState({
			editorState
		})
	}

	onContentStateChange (contentState) {
		console.log(contentState);
		this.setState({
			contentState
		})
	}

	handleCloseModal () {
		this.setState({
			showModal: false
		})
	}

	render() {
		return (
			<div>
				<Card>
					<Button type={"primary"} onClick={this.handleClearContent.bind(this)}>清空内容</Button>
					<Button type={"primary"} onClick={this.handleGetContent.bind(this)} style={{marginLeft: 10}}>获取HTML文本</Button>
				</Card>
				<Card title={"富文本编辑器"}>
					<Editor
						editorState={this.state.editorState}
						onContentStateChange={this.onContentStateChange.bind(this)}
						onEditorStateChange={this.onEditorStateChange.bind(this)}
					/>
				</Card>
				<Modal
					title={'富文本'}
					footer={null}
					visible={this.state.showModal}
					onCancel={this.handleCloseModal.bind(this)}
				>
					<div>{draftToHtml(this.state.contentState)}</div>
				</Modal>
			</div>
		);
	}
}

// MyComponent.propTypes = {};

export default MyComponent;
