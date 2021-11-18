# Koala Canvas App

This is a small web-app which allows users to arrange sticky notes on a canvas.

Live [demo](https://koala-canvas.herokuapp.com/)

# Features

* Add, edit and delete sticky notes that can be drag and dropped anywhere on the screen
* Set the text contained in a sticky note either at creation or after
* Sticky notes have color and it can be changed either at creation or after
* Clear the canvas of all sticky notes
* Drawing: ability to draw and erase anywhere on the canvas
* Images: ability to upload images to the canvas. Double click and image to delete it
* Persistence: the state of the board is saved when it is modified and it is restored it when the user opens the site again

# To install this project

This guide assumes you have git, node.js and npm installed.

1. Clone the project to your device by opening a command line and run "git clone https://github.com/pepe16694/koala-canvas.git"
2. Navigate to the project folder with this command "cd koala-canvas"
3. Run "npm install"
4. Run "npm start"
5. Enjoy the app when the browser opens or at http://localhost:3000

# Known bugs

* Images are not properly saved when closing the tab
* The page breaks when the window is too small, like on a mobile device. The components get their size reduced compared to the full window size