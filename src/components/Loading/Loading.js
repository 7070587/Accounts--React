import React, { Component } from 'react';
import loading from './loading.gif'

class Loading extends Component {
	render() {
		return (<img src={loading} alt="Loading..." className="w-50"/>
		);
	}
}

export default Loading;
