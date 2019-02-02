import React, { Component } from 'react';
import { Segment, Button, Icon } from 'semantic-ui-react';

class File extends Component {
	render() {
		return (
			<Segment
				clearing
				color={
					this.props.stat === 1
						? 'green'
						: this.props.stat === 2
						? 'red'
						: 'yellow'
				}
			>
				<span className="ui left floated">{this.props.data.name}</span>
				<Button
					negative
					size="tiny"
					floated="right"
					className="button-fix"
					onClick={() => this.props.onDelete(this.props.data)}
				>
					<Icon name="remove" />
				</Button>
			</Segment>
		);
	}
}

export default File;
