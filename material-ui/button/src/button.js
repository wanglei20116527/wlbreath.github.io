import React from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';

import CircleRipple from './circle-ripple';

class Button extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			uuid: 0,
			ripples: []
		};
	}

	_handleClick(e){
		let uuid = this.state.uuid;
		let ripples = this.state.ripples;
		
		let style = this._getCircleRippleStyle(e);

		let newRipple = (
			<CircleRipple key={uuid} {...style} onAnimationEnd={ e=>{ this._removeRipple(newRipple); } }/>
		);

		ripples.push(newRipple);
		this.setState({
			uuid: ++uuid,
			ripples: ripples
		});
	}

	_removeRipple(ripple){
		let ripples = this.state.ripples;

		for(let i=0, len=ripples.length; i < len; ++i){
			if(ripple === ripples[i]){
 				ripples.splice(i, 1);
				break;
			}
		}

		this.setState({
			ripples: ripples
		});
	}

	_getCircleRippleStyle(e){
		let el = ReactDOM.findDOMNode(this);
		let rect = el.getBoundingClientRect();

		return {
			top: e.pageY - (rect.top + window.scrollY),
			left: e.pageX - (rect.left + window.scrollX)
		};
	}	

	render(){
		let buttonStyle = Object.assign({
			position: 'relative',
			display: 'block',
			background: '#ffffff',
			outline: 'none',
			border: 'none',
			padding: '0 16px',
			height: '36px',
			lineHeight: '36px',
			textAlign: "center",
			cursor: "pointer",
			overflow: 'hidden',
			fontSize: '14px',
			boxShadow: '0 0 6px rgba(0, 0, 0, .3)'

		}, this.props.style || {});

		let labelStyle = {
			position: 'relative',
			background: 'transparent'
		};

		let transitionGroupStyle = {
			display: 'block',
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%'
		};

		return (
			<button style={buttonStyle} 
					onClick={ (e) => { this._handleClick(e); } }>
				
				<ReactTransitionGroup style={transitionGroupStyle}>
					{this.state.ripples}
				</ReactTransitionGroup>
				
				<span style={labelStyle}>{this.props.label}</span>
			
			</button>
		);
	}
}

Button.defaultProps = {
	label: ""
};

Button.propTypes = {
	label: React.PropTypes.string,
	style: React.PropTypes.object
};

export default Button;

