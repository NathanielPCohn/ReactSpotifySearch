class Search extends React.Component{
	constructor(props) {
		super(props)
		this.state = {search: ""};
		this.handleChange = this.handleChange.bind(this);
		this.handleNonQuery = this.handleNonQuery.bind(this);
		this.submit = this.submit.bind(this);
	}
	handleChange(e) {
		//get search value, set state
		this.setState({search: e.target.value});
	}
	handleNonQuery() {
		//render error component
		ReactDOM.render(<Error message={"You must submit a search query"} close={this.closeError}/>, document.getElementById("errorModal"));
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
		return (
			<form onSubmit={this.submit}>
				<div className="form-group">
					<div className="input-group">
						<input onChange={this.handleChange} type="text" className="form-control" placeholder="Enter band or artist name"/>
						<div className="input-group-btn">
							<button type="submit" className="btn btn-primary">Search</button>
						</div>
					</div>
				</div>
			</form>
		);
	}
};