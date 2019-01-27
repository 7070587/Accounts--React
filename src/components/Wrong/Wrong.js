import React, { Component } from 'react';
import wrong from './404.png'

class Wrong extends Component {
	render() {
		return (<img src={wrong} alt="Loading..." className="w-50"/>
		);
	}
}

export default Wrong;
