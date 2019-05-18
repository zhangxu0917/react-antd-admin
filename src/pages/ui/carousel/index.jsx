import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, Carousel} from 'antd';

class ICarousel extends Component {
	render() {
		return (
			<div className={'page-ui page-ui-carousel'}>
				<Card title={'文字背景轮播'} className={'card-container'}>
					<Carousel autoplay={true} effect={"fade"}>
						<div>
							<h3>1</h3>
						</div>
						<div>
							<h3>2</h3>
						</div>
						<div>
							<h3>3</h3>
						</div>
						<div>
							<h3>4</h3>
						</div>
					</Carousel>
				</Card>

				<Card title={'图片轮播'} className={'card-container'}>
					<Carousel autoplay={true} effect={"fade"} className={"slider-container"}>
						<div className={'img-container'}>
							<img src={'/carousel-img/carousel-1.jpg'} />
						</div>
						<div className={'img-container'}>
							<img src={'/carousel-img/carousel-2.jpg'} />
						</div>
						<div className={'img-container'}>
							<img src={'/carousel-img/carousel-3.jpg'} />
						</div>
					</Carousel>
				</Card>
			</div>
		);
	}
}

ICarousel.propTypes = {};

export default ICarousel;
