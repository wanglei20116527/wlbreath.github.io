import React from "react";
import ReactDOM from "react-dom";

class CircleRipple extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			style: {
				position: "absolute",
				width: "100%",
				height: "100%",
				top: 0,
				left: 0,
				borderRadius: "50%",
				transform: "scale(0)",
				background: "rgba(0, 0, 0, .5)"
			}
		};

		this._timeoutId;
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
		let style = window.getComputedStyle(ReactDOM.findDOMNode(this), null);
		
		let radius = Math.max(parseInt(style.width), parseInt(style.height)) * 2;

		style = Object.assign({}, this.state.style, {
			width: `${radius}px`,
			height: `${radius}px`,
			top: `${this.props.top - radius / 2}px`,
			left: `${this.props.left - radius / 2}px`,
			background: this.props.background,
			transition: `transform ${this.props.duration}s ease-out, opacity ${this.props.duration}s ease-out`,
			transform: "scale(1)",
			opacity: 0
		});

		this.setState({style: style});
	}

	render(){
		return (
			<span style={this.state.style}></span>
		);
	}
}

CircleRipple.defaultProps = {
	top: 0,
	left: 0,
	duration: 0.5,
	background: "#ABA6A6"
};

CircleRipple.propTypes = {
	top: React.PropTypes.number,
	left: React.PropTypes.number,
	background: React.PropTypes.string,

	duration: React.PropTypes.number,
	onAnimationEnd: React.PropTypes.func
};

export default CircleRipple;