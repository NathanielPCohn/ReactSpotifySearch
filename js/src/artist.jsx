class Artist extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		var artist = this.props.artist;
		
		return(
			<div className="artist">
				<div className="panel panel-info">
					<div className="panel-heading">
						<a target="_blank" href={artist.href} className="text-muted"><b>{artist.name}</b></a>
					</div>
					<div className="panel-body">
						<div className="col-sm-2" style={{}}>
							<a target="_blank" href={artist.href} className="thumbnail">
								<img className="img-responsive" style={{width: "100%"}} src={(artist.image) ? artist.image.url : "images/blank.png"} alt={artist.name} />
							</a>
						</div>
						<div className="col-sm-10">
								<div className="col-xs-12" style={{marginBottom: "10px"}}>
									<b>Popularity Rating:</b>&nbsp;&nbsp;&nbsp;
									<span className="label label-info" style={{fontSize:"10pt"}}>{artist.popularity}</span>
								</div>
								{(artist.genres.length > 0) ?
									<div className="col-xs-12">
										<b>Genres:</b>&nbsp;&nbsp;&nbsp;
										{artist.genres.map((genre, key) => <span key={key} className="badge badge-default badge-pill" style={{marginRight: "2px", marginBottom: "2px", fontSize: "10pt"}}>{genre}</span>)}
									</div>
								: null}
						</div>
					</div>
				</div>
			</div>
		);
	}
}