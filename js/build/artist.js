class Artist extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		var artist = this.props.artist;

		return React.createElement(
			"div",
			{ className: "artist" },
			React.createElement(
				"div",
				{ className: "panel panel-info" },
				React.createElement(
					"div",
					{ className: "panel-heading" },
					React.createElement(
						"a",
						{ target: "_blank", href: artist.href, className: "text-muted" },
						React.createElement(
							"b",
							null,
							artist.name
						)
					)
				),
				React.createElement(
					"div",
					{ className: "panel-body" },
					React.createElement(
						"div",
						{ className: "col-sm-2", style: {} },
						React.createElement(
							"a",
							{ target: "_blank", href: artist.href, className: "thumbnail" },
							React.createElement("img", { className: "img-responsive", style: { width: "100%" }, src: artist.image ? artist.image.url : "images/blank.png", alt: artist.name })
						)
					),
					React.createElement(
						"div",
						{ className: "col-sm-10" },
						React.createElement(
							"div",
							{ className: "col-xs-12", style: { marginBottom: "10px" } },
							React.createElement(
								"b",
								null,
								"Popularity Rating:"
							),
							"\xA0\xA0\xA0",
							React.createElement(
								"span",
								{ className: "label label-info", style: { fontSize: "10pt" } },
								artist.popularity
							)
						),
						artist.genres.length > 0 ? React.createElement(
							"div",
							{ className: "col-xs-12" },
							React.createElement(
								"b",
								null,
								"Genres:"
							),
							"\xA0\xA0\xA0",
							artist.genres.map((genre, key) => React.createElement(
								"span",
								{ key: key, className: "badge badge-default badge-pill", style: { marginRight: "2px", marginBottom: "2px", fontSize: "10pt" } },
								genre
							))
						) : null
					)
				)
			)
		);
	}
}