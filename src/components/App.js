import React from 'react';

import './carousel/carousel.less';
import Carousel from './carousel/Carousel';

import A from '../imgs/a.jpg';
import B from '../imgs/b.jpg';
import C from '../imgs/c.jpg';
import D from '../imgs/d.jpg';

const items = [
	{
		link: 'http://fex.baidu.com/',
		img: A
	},
	{
		link: 'http://old.75team.com/weekly/',
		img: B
	},
	{
		link: 'http://taobaofed.org/',
		img: C
	},
	{
		link: 'http://gold.xitu.io/welcome/',
		img: D
	}
];

const App = () => (
	<div>
		<h1>React Mobile Carousel</h1>
		<Carousel
			className="carousel-container"
			swipeOptions={{swiping: ()=>console.log('swiping'), transitionEnd: ()=> console.log('transitionEnd'), callback: ()=>console.log('callback')}}
			items={items}
		/>
	</div>
);

export default App;