class App extends React.Component {
	constructor() {
		super();
		//set initial state
		this.state = {
			url: 'https://accounts.spotify.com/api/token',
			query: "", 
			artists: [], 
			loading: false, 
			genres: {},
			client_id: "",
			client_secret: ""
		};
		//bind component to methods
		this.getToken = this.getToken.bind(this);
		this.search = this.search.bind(this);
		this.spotifyQuery = this.spotifyQuery.bind(this);
		this.errorMessage = this.errorMessage.bind(this);
	}
	getToken() {
		var component = this;
		$.ajax({
			beforeSend: function(request) {
				request.setRequestHeader('Authorization', 'Basic ' + new Buffer(this.state.client_id + ':' + this.state.client_secret).toString('base64'));
			},
			url: component.state.url,
			type: "post",
			dataType: "json",
			success: function(resp) {
				console.log(resp);
			},
		});
	}
	spotifyQuery(query) {
		//if no query submitted, stop
		if (query == undefined || query == "") return;
		//create component reference and refresh state, set loading state
		var component = this;
		component.setState({ loading: true, artists: [], genres: {} });
		//request from API
		$.ajax({
			url: "http://localhost:8000/?query=" + query + "*",
			type: "get",
			dataType: "json",
			success: function (resp) {
				//if successful, check for artists obj, if items found, set state
				if (resp.success == 1 && resp.data.hasOwnProperty("artists") && resp.data.artists.length > 0) {
					component.setState({ artists: resp.data.artists, genres: resp.data.genres });
				} else {
					//if nothing found, render error message
					component.errorMessage("No search results found.");
				}
			},
			error: function (err) {
				//if error occers, render error message
				component.errorMessage("Sorry. An error has occurred.");
			},
			complete: function () {
				//whether request was successful or not, unset loading state
				component.setState({ loading: false });
			}
		});
	}
	errorMessage(msg) {
		//render error component on page
		ReactDOM.render(React.createElement(Error, { message: msg, close: this.closeError }), document.getElementById("errorModal"));
	}
	closeError() {
		//unmount error component
		ReactDOM.unmountComponentAtNode(document.getElementById("errorModal"));
	}
	search(query) {
		//set query and request Spotify search
		this.setState({ query: query });
		this.spotifyQuery(query);
	}
	render() {
		//set counter for genre label keys
		var genreLabelCount = 0;
		//if artists in component state, render in artist component
		if (this.state.artists.length > 0) {
			var artists = this.state.artists.map((artist, key) => React.createElement(Artist, { key: key, artist: artist }));
			//if loading, show loader gif
		} else if (this.state.loading) {
			var artists = React.createElement("img", { src: "images/loader.gif", style: { marginLeft: "auto", marginRight: "auto", display: "block" } });
		}

		return React.createElement(
			"div",
			null,
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "container-fluid" },
					React.createElement(
						"div",
						{ className: "col-xs-12" },
						React.createElement(Search, { search: this.search })
					)
				)
			),
			React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "container-fluid" },
					React.createElement(
						"div",
						{ className: "artists col-xs-12" },
						this.state.query != "" ? React.createElement(
							"p",
							null,
							React.createElement(
								"b",
								null,
								"Results for '" + this.state.query + "'"
							)
						) : null,
						artists
					)
				)
			),
			Object.keys(this.state.genres).length > 0 ? React.createElement(
				"div",
				{ className: "row" },
				React.createElement(
					"div",
					{ className: "container-fluid" },
					React.createElement(
						"div",
						{ className: "col-xs-12" },
						React.createElement(
							"h3",
							null,
							"Genres Found"
						),
						$.map(this.state.genres, (number, genre) => React.createElement(
							"span",
							{ key: genreLabelCount++, className: "label label-primary pull-left", style: { marginLeft: "2px", marginBottom: "2px", fontSize: "10pt" } },
							number > 1 ? genre + " " + number : genre
						))
					)
				)
			) : null,
			React.createElement("div", { style: { width: "100%", height: "40px" } })
		);
	}
};
//render App in div
ReactDOM.render(React.createElement(App, null), document.getElementById('musicSearch'));