# Thomas Monfre CS52 Lab 5 :floppy_disk:

## What I Did
For this assignment, I built the database and server required for the live blog hosted at [tmonfre-blog.surge.sh](https://tmonfre-blog.surge.sh). This web server provides endpoints for creating posts, fetching posts, and deleting posts. The app is hosted on Heroku with the following endpoint [https://cs52-tmonfre-lab5.herokuapp.com/api/](https://cs52-tmonfre-lab5.herokuapp.com/api/).

## What Worked / Didn't Work
I started out by building the infrastructure of the server, and connecting the various components together. This included creating a router, building a basic `GET` route, pointing the server to the router (prefixed with `/api`), then having the route send some basic text. Once I had this in place, I then built the database schema for a post (model) and built a controller to handle interaction with the database. This included a function to create a post object, update a post object, and delete a post object. I then imported the controller into the router, and had everything set up. Once I had this in place, I then built the rest of the web server. I wrote each endpoint and tested each locally with my lab 4 page.

I had some problems with the view post page of the blog not updating after hitting the update post endpoint. I realized that the `update` function that mongoose supports returns an object saying the document was updated, not the document itself. I was just sending this document to the frontend when a post was updated, which of course didn't contain the information necessary for viewing the post, forcing the user to have to refresh. Once I realized this, I nested some promises on the web server. Once the post is updated in the database, we fetch that post, then send it to the user. If there is an error at any point in that process, we send a 500 error.

## Extra Credit

### Tags as an array
Post tags are stored in an array in the database, rather than just a string.

### Comments
A user can leave comments on any post. Comments are stored in an Array for each Post object. Comments have a string representing the text and a timestamp representing when the post was created. Users can also delete comments.

![screenshot](comments.png)