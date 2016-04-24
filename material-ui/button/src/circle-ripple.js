import React from "react";
import ReactDOM from "react-dom";

const DefaultStyle = {
	position: "absolute",
	width: "100%",
	height: "100%",
	top: 0,
	left: 0,
	opacity: 1,
	borderRadius: "50%",
	background: "#ABA6A6",
	transform: "translate(-50%, -50%) scale(0)",
	transitionTimingFunction: 'ease-out',
	transitionDuration: '0.5s',
	transitionProperty: 'transform, opacity',
};

class CircleRipple extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			style: DefaultStyle,
		};

		this._timeoutId;

		[
			'_startAnimation',

		].forEach(func=>{
			this[func] = this[func].bind(this);
		});
	}

	componentWillAppear(callback){
		setTimeout(callback, 0);
	}

	componentWillEnter(callback) {
		setTimeout(callback, 0);
	}

	componentDidAppear(){
		this._startAnimation();
	}

	componentDidEnter(){
		this._startAnimation();
	}

	componentDidMount(){
		if(this.props.onAnimationEnd){
			this._timeoutId = setTimeout(this.props.onAnimationEnd, this.props.duration * 1000);
		}
	}

	componentWillMount(){
		if(this._timeoutId !== null && this._timeoutId !== void 0){
			clearTimeout(this._timeoutId);
			delete this._timeoutId;
		}
	}

	_startAnimation(){
		const thisEl   = ReactDOM.findDOMNode(this);
		const parentEl = thisEl.parentElement || thisEl.parentNode;

		let parentStyle = window.getComputedStyle(parentEl, null);
		
		let radius = Math.max(parseInt(parentStyle.width), parseInt(parentStyle.height)) * 2;

		let style = Object.assign({}, DefaultStyle, {
			opacity: 0,
			width: `${radius}px`,
			height: `${radius}px`,
			top: `${this.props.top}px`,
			left: `${this.props.left}px`,
			transitionDuration: `${this.props.duration}s`,
			transform: "translate(-50%, -50%) scale(1)",
		});

		this.setState({style: style});
	}

	render(){		
		return (
			<span style ={this.state.style}></span>
		);
	}
}

CircleRipple.defaultProps = {
	top: 0,
	left: 0,
	duration: 0.5,
	style: DefaultStyle,
};

CircleRipple.propTypes = {
	top: React.PropTypes.number,
	left: React.PropTypes.number,
	style: React.PropTypes.object,

	duration: React.PropTypes.number,
	onAnimationEnd: React.PropTypes.func
};

export default CircleRipple;