In your terminal, navigate to the FullStackTest/api directory and run the following command:

php -S localhost:8000 index.php

To test, add a search query to the URL 'http://localhost:8000/?query=[YOUR SEARCH QUERY]*' and paste it into your browser. Even if no results from Spotify are found, you should see a response in a JSON string.