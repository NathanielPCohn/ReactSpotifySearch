class Error extends React.Component {
	constructor(props) {
		super(props)
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
		return(
			<div id="myModal" className="modal fade" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<button onClick={this.close} type="button" className="close" data-dismiss="modal">&times;</button>
							<h4 className="modal-title">Error</h4>
						</div>
						<div className="modal-body">
							<p>{this.props.message}</p>
						</div>
						<div className="modal-footer">
							<button onClick={this.close} type="button" className="btn btn-default" data-dismiss="modal">Close</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}