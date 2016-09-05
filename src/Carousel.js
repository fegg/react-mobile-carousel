import React, { Component, PropTypes } from 'react';
import Swipe from './swipe';

const style = {
    container: {
        overflow: 'hidden',
        visibility: 'hidden',
        position: 'relative'
    },

    wrapper: {
        overflow: 'hidden',
        position: 'relative'
    },

    child: {
        float: 'left',
        width: '100%',
        position: 'relative',
        transitionProperty: 'transform'
    }
};

class Carousel extends Component {
    static propTypes = {
        swipeOptions: PropTypes.shape({
            startSlide: PropTypes.number,
            duration: PropTypes.number, // transition duration
            easing: PropTypes.string,
            interval: PropTypes.number,
            dots: PropTypes.bool,
            autoPlay: PropTypes.bool,
            continuous: PropTypes.bool,
            disableScroll: PropTypes.bool,
            stopPropagation: PropTypes.bool,
            swiping: PropTypes.func,
            callback: PropTypes.func,
            transitionEnd: PropTypes.func
        }),
        className: PropTypes.string,
        items: PropTypes.array
    };

    static defaultProps = {
        swipeOptions: {},
        items: [],
        className: ''
    };

    componentDidMount() {
        const { swipeOptions } = this.props;
        this.swipe = Swipe(this.refs.container, swipeOptions);
    }

    componentWillUnmount() {
        this.swipe.kill();
        this.swipe = void 0;
    }

    next() {
        this.swipe.next();
    }

    prev() {
        this.swipe.prev();
    }

    slide(...args) {
        this.swipe.slide(...args);
    }

    getPos() {
        return this.swipe.getPos();
    }

    getNumSlides() {
        return this.swipe.getNumSlides();
    }

    renderItems() {
        const items = this.props.items;
        return items.map(item => {
            return (
                <div className="slide-item" style= {style.child} key={item.link}>
                    <a className="link" href={item.link || ''}>
                        <img src={item.img || ''} />
                    </a>
                </div>
            );
        })
    }

    render() {
        const { className, children } = this.props;
        return (
            <div ref="container" className={`react-swipe-container ${className}`} style={style.container}>
                <div style={style.wrapper} className="wrapper">
                    {this.renderItems()}
                </div>
            </div>
        );
    }
}

export default Carousel;
