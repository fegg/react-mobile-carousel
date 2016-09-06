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
        transitionProperty: 'transform'
    }
};

function Items (props) {
  return props.items.map(item => {
    return (
      <div className="carousel-item" key={item.link}>
        <a className="link" href={item.link || ''}>
          <img className="img" src={item.img || ''} />
        </a>
      </div>
    );
  });
}

class Carousel extends Component {
    static propTypes = {
        swipeOptions: PropTypes.shape({
            startSlide: PropTypes.number,
            speed: PropTypes.number, // transition duration
            easing: PropTypes.string, // transition time function
            interval: PropTypes.number, // time for swipe to next picture
            dots: PropTypes.bool, // if show dots ? true -> show, false -> not, default = true
            autoPlay: PropTypes.bool, // true -> auto swipe, default = true
            continuous: PropTypes.bool, // true -> continuous swipe, default = true
            disableScroll: PropTypes.bool,
            stopPropagation: PropTypes.bool,
            swiping: PropTypes.func, // function when swiping
            callback: PropTypes.func, // function for swipe to next picture
            transitionEnd: PropTypes.func  // function for transition end. valid or invalid swipe
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

    render() {
        const { className, children } = this.props;
        const items = Items(this.props);
        return (
            <div ref="container" className={`react-swipe-container ${className}`}>
                <div className="wrapper">
                    {items}
                </div>
            </div>
        );
    }
}

export default Carousel;
