import React, {Component} from 'react';
import {Card, Row, Col, Modal} from "antd";

class Gallery extends Component {
	constructor (props) {
		super(props)
		this.state = {
			currentImg: '',
			visible: false
		}
	}

	componentWillMount() {
		let photoList = []
		let itemList = []
		for (let i = 0; i <= 25; i++) {
			if ((i === 5) || (i > 5 && (i - 1) % 4 === 0)) {
				if (itemList.length > 0) {
					photoList.push(itemList)
				}
				itemList = []
			}
			itemList.push(`${i + 1}.png`)
		}

		this.setState({
			photoList
		});
	}

	openModel (imgSrc) {
		this.setState({
			currentImg: imgSrc,
			visible: true
		})
	}

	render() {
		const photoList = this.state.photoList.map((list, index) => {
			return (
				list.map((item, itemIndex) => {
					return (
						<Card key={`${index}-${itemIndex}`}
							style={{marginBottom: 10}}
							cover={<img src={`/gallery/${item}`} onClick={this.openModel.bind(this, `/gallery/${item}`)}/>}
						>
							<Card.Meta
								title={'Gallery'}
								description={'Gallery Content'}
							/>
						</Card>
					)
				})
			)
		});

		return (
			<div className={'page-ui page-ui-gallery'}>
				<Row gutter={10}>
					<Col md={4}>
						{photoList[0]}
					</Col>
					<Col md={4}>
						{photoList[1]}
					</Col>
					<Col md={4}>
						{photoList[2]}
					</Col>
					<Col md={4}>
						{photoList[3]}
					</Col>
					<Col md={4}>
						{photoList[4]}
					</Col>
					<Col md={4}>
						{photoList[5]}
					</Col>
				</Row>
				<Modal
					title={'图片画廊'}
					visible={this.state.visible}
					onCancel={() => {
					this.setState({
						visible: false
					})
				}}
					footer={null}>
					<img src={this.state.currentImg} width={'100%'}/>
				</Modal>
			</div>
		);
	}
}

export default Gallery;
