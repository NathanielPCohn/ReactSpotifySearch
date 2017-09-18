<?php 

header('Access-Control-Allow-Origin: *');

// Set response object
$response = new stdClass();
$response->success = 0;
$response->data = array();

// No query provided, exit
if (empty($_GET['query'])) {
	$response->message = 'Must provide search query';
	echo json_encode($response);
	exit;
}

// Set URL and response object
$query = $_GET['query'];
$query = str_replace(' ', '+', $query);
$query = str_replace('%20', '+', $query);
$url = 'https://api.spotify.com/v1/search?type=artist&limit=50&q=' . $query;


// Set and execute CURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$server_output = curl_exec($ch);
curl_close($ch);
die(print_r($server_output));
// Get artist data
$artists = json_decode($server_output)->artists->items;

// If no artists found, exit
if (empty($artists)) {
	$response->success = 1;
	$response->message = "No artists found";
	echo json_encode($response);
	exit;
}

// Set data, get relevant fields
$response->data = new stdClass();
$response->data->artists = array();

foreach ($artists as $artist) {
	$item = new stdClass();
	$item->name = $artist->name;
	$item->genres = $artist->genres;
	$item->popularity = $artist->popularity;
	$item->image = (!empty($artist->images)) ? $artist->images[count($artist->images)-1] : NULL;

	// If artist image exists, get first
	if (!empty($artist->images)) {
		$item->image = $artist->images[0];
	}

	if (!empty($artist->external_urls->spotify)) {
		$item->href = $artist->external_urls->spotify;
	}
	//add artist data to response
	array_push($response->data->artists, $item);
}

// First, sort artists alphabetically
usort($response->data->artists, function($a, $b) {
	return strcmp($a->name, $b->name);
});

// Second, sort artists by popularity
usort($response->data->artists, function($a, $b) {
	if ($a->popularity == $b->popularity) {
		return 0;
	}

	return ($a->popularity < $b->popularity) ? 1 : -1;
});

//add genres to array
$genres = array();
foreach ($response->data->artists as $artist) {
	if (!empty($artist->genres)) {
		foreach ($artist->genres as $genre) {
			array_push($genres, $genre);
		}
	}
}

//add unique genres to array with count of occurrences
$genresWithCount = array();
foreach ($genres as $genre) {
	if (!array_key_exists($genre, $genresWithCount)) {
		$genresWithCount[$genre] = 1;
	} else {
		$genresWithCount[$genre]++;
	}
}
//add genre data to response
$response->data->genres = $genresWithCount;

// Print response
$response->success = 1;
$response->message = count($response->data->artists) . " artists found";
echo json_encode($response);

?>