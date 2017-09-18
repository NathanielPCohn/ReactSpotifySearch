class Search extends React.Component {
	constructor(props) {
		super(props);
		this.state = { search: "" };
		this.handleChange = this.handleChange.bind(this);
		this.handleNonQuery = this.handleNonQuery.bind(this);
		this.submit = this.submit.bind(this);
	}
	handleChange(e) {
		//get search value, set state
		this.setState({ search: e.target.value });
	}
	handleNonQuery() {
		//render error component
		ReactDOM.render(React.createElement(Error, { message: "You must submit a search query", close: this.closeError }), document.getElementById("errorModal"));
	}
	closeError() {
		//unmount error component
		ReactDOM.unmountComponentAtNode(document.getElementById("errorModal"));
	}
	submit(e) {
		e.preventDefault();
		//if search query submitted, send query to parent component through props
		if (this.state.search != "") {
			this.props.search(this.state.search);
			//if nothing submitted, show error message
		} else {
			this.handleNonQuery();
		}
	}
	render() {
		return React.createElement(
			"form",
			{ onSubmit: this.submit },
			React.createElement(
				"div",
				{ className: "form-group" },
				React.createElement(
					"div",
					{ className: "input-group" },
					React.createElement("input", { onChange: this.handleChange, type: "text", className: "form-control", placeholder: "Enter band or artist name" }),
					React.createElement(
						"div",
						{ className: "input-group-btn" },
						React.createElement(
							"button",
							{ type: "submit", className: "btn btn-primary" },
							"Search"
						)
					)
				)
			)
		);
	}
};