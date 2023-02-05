# Podcast-Playlist-Generator
single page application to create and manipulate a podcast playlist. 


Theres a few things that need to be addressed with this source code. 

1. Get requests

The code (as it stands) was a makeshift solution for me to avoid having to do any serverside coding. It's using a reverse proxy to avoid cors, but it's making all the requests to the rss feeds of the podcasts inside the DOM. This is causing the playlist to be created and loaded into the player before all the rss feeds can be added to the playlist. I'm considering redoing this in php to avoid this issue while also avoiding the creation of a node server.

2. Eligible podcasts

The only podcasts that should be in the final application are Harbinger Podcasts.

3. Design

The way this looks right now was just me trying to make a thing work as quickly as possible. The css is pretty janky as a result. 
