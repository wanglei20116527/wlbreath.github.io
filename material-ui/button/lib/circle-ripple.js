"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DefaultStyle = {
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
	transitionProperty: 'transform, opacity'
};

var CircleRipple = function (_React$Component) {
	_inherits(CircleRipple, _React$Component);

	function CircleRipple(props) {
		_classCallCheck(this, CircleRipple);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CircleRipple).call(this, props));

		_this.state = {
			style: DefaultStyle
		};

		_this._timeoutId;

		['_startAnimation'].forEach(function (func) {
			_this[func] = _this[func].bind(_this);
		});
		return _this;
	}

	_createClass(CircleRipple, [{
		key: "componentWillAppear",
		value: function componentWillAppear(callback) {
			setTimeout(callback, 0);
		}
	}, {
		key: "componentWillEnter",
		value: function componentWillEnter(callback) {
			setTimeout(callback, 0);
		}
	}, {
		key: "componentDidAppear",
		value: function componentDidAppear() {
			this._startAnimation();
		}
	}, {
		key: "componentDidEnter",
		value: function componentDidEnter() {
			this._startAnimation();
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			if (this.props.onAnimationEnd) {
				this._timeoutId = setTimeout(this.props.onAnimationEnd, this.props.duration * 1000);
			}
		}
	}, {
		key: "componentWillMount",
		value: function componentWillMount() {
			if (this._timeoutId !== null && this._timeoutId !== void 0) {
				clearTimeout(this._timeoutId);
				delete this._timeoutId;
			}
		}
	}, {
		key: "_startAnimation",
		value: function _startAnimation() {
			var thisEl = _reactDom2.default.findDOMNode(this);
			var parentEl = thisEl.parentElement || thisEl.parentNode;

			var parentStyle = window.getComputedStyle(parentEl, null);

			var radius = Math.max(parseInt(parentStyle.width), parseInt(parentStyle.height)) * 2;

			var style = Object.assign({}, DefaultStyle, {
				opacity: 0,
				width: radius + "px",
				height: radius + "px",
				top: this.props.top + "px",
				left: this.props.left + "px",
				transitionDuration: this.props.duration + "s",
				transform: "translate(-50%, -50%) scale(1)"
			});

			this.setState({ style: style });
		}
	}, {
		key: "render",
		value: function render() {
			return _react2.default.createElement("span", { style: this.state.style });
		}
	}]);

	return CircleRipple;
}(_react2.default.Component);

CircleRipple.defaultProps = {
	top: 0,
	left: 0,
	duration: 0.5,
	style: DefaultStyle
};

CircleRipple.propTypes = {
	top: _react2.default.PropTypes.number,
	left: _react2.default.PropTypes.number,
	style: _react2.default.PropTypes.object,

	duration: _react2.default.PropTypes.number,
	onAnimationEnd: _react2.default.PropTypes.func
};

exports.default = CircleRipple;