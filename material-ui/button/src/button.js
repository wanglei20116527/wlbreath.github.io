import React from 'react';
import ReactDOM from 'react-dom';
import ReactTransitionGroup from 'react-addons-transition-group';

import CircleRipple from './circle-ripple';

const DefaultButtonStyle = {
	position: 'relative',
	display: 'inline-block',
	padding: '0 16px',
	height: '36px',
	lineHeight: '36px',
	overflow: 'hidden',
	fontSize: '14px',
	outline: 'none',
	border: 0,
	cursor: 'pointer',
	textAlign: 'center',
	background: '#ffffff',
	boxShadow: '0 0 6px 0 #C3B7B7',
};

const DefaultTransitionGroupStyle= {
	display: 'block',
	position: 'absolute',
	top: 0,
	left: 0,
	width: '100%',	
	height: '100%',
};

const DefaultLabelStyle = {
	position: 'relative',
	background: 'transparent',
};

let uuid = 0;

class Button extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			ripples: []
		};

		[
			'_handleClick',
			'_removeRipple',
			'_getCircleRipplePosition',
			'_getBtnStyle',
			'_getTransitonGroupStyle',
			'_getLabelStyle',

		].forEach(func => {
			this[func] = this[func].bind(this);
		});
	}

	_handleClick(e){
		this.props.onClick && this.props.onClick(e);
		let ripples = this.state.ripples;
		
		let position = this._getCircleRipplePosition(e);

		let newRipple = (
			<CircleRipple 
			   key={uuid++} 
			   {...position} 
			   onAnimationEnd={ () =>{ this._removeRipple(newRipple); } } />
		);

		ripples.push(newRipple);
		this.setState({
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

	_getCircleRipplePosition(e){
		let el = ReactDOM.findDOMNode(this);
		let rect = el.getBoundingClientRect();

		return {
			top: e.pageY - (rect.top + window.scrollY),
			left: e.pageX - (rect.left + window.scrollX)
		};
	}

	_getBtnStyle(){
		return Object.assign({}, DefaultButtonStyle, this.props.style);
	}

	_getTransitonGroupStyle(){
		return Object.assign({}, DefaultTransitionGroupStyle);
	}	

	_getLabelStyle(){
		return Object.assign({}, DefaultLabelStyle, this.props.labelStyle);
	}

	render(){
		let {
			className,

		} = this.props;

		return (
			<button
			   className={className}
			   style={this._getBtnStyle()}
			   onClick={ this._handleClick }>
				
			   <ReactTransitionGroup 
			      style={this._getTransitonGroupStyle()}>
			      {this.state.ripples}
			   </ReactTransitionGroup>
				
			   <span
			      style={this._getLabelStyle()}>
			      {this.props.label || ''}
			   </span>
			
			</button>
		);
	}
}

Button.defaultProps = {
	label: "",
	style: {},
	labelStyle: {},
};

Button.propTypes = {
	label: React.PropTypes.string,
	onClick: React.PropTypes.func,
	style: React.PropTypes.object,
	labelStyle: React.PropTypes.object,
};

export default Button;

