class Error extends React.Component {
	constructor(props) {
		super(props);
		this.close = this.close.bind(this);
	}
	componentDidMount() {
		//display modal for error message
		$("#myModal").modal();
	}
	close() {
		//send close request to parent component
		this.props.close();
	}
	render() {
		return React.createElement(
			"div",
			{ id: "myModal", className: "modal fade", role: "dialog" },
			React.createElement(
				"div",
				{ className: "modal-dialog" },
				React.createElement(
					"div",
					{ className: "modal-content" },
					React.createElement(
						"div",
						{ className: "modal-header" },
						React.createElement(
							"button",
							{ onClick: this.close, type: "button", className: "close", "data-dismiss": "modal" },
							"\xD7"
						),
						React.createElement(
							"h4",
							{ className: "modal-title" },
							"Error"
						)
					),
					React.createElement(
						"div",
						{ className: "modal-body" },
						React.createElement(
							"p",
							null,
							this.props.message
						)
					),
					React.createElement(
						"div",
						{ className: "modal-footer" },
						React.createElement(
							"button",
							{ onClick: this.close, type: "button", className: "btn btn-default", "data-dismiss": "modal" },
							"Close"
						)
					)
				)
			)
		);
	}
}