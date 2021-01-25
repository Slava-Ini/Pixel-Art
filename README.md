# Pixel-Art

>   Open source web-site project with modest functionality for drawing and sharing simple pixel art images.

## Table of Contents

- [Demo](#demo)
- [General info](#general-info)
- [Technologies](#technologies)
- [Scope of functionalities](#scope-of-functionalities)
- [Project status](#project-status)
- [Aknowledgements](#aknowledgements)
- [License](#license)

### Demo
**Project is not yet compatible with mobile devices, make sure to run it on laptop/desktop widescreen.**
>[pixelartdraw.com](https://pixelartdraw.com)

### General Info

  This project was created as a part of practicing JacaScript and, in particular React.js library.
Project made in form of web-site with simplistic user interface and offers functionality for 
creating 16x16 to 64x64 pixel images using drawing tools and controls, as well as sharing images
via the project API and checking out other users' works.

### Technologies

* React.js 16.14
* React libraries: 
  * React-Dom 16.14
  * React-Elastic-carousel 0.11
  * React-Redux 7.2
  * React-Router 5.2
  * React-Router-dom 5.2
  * React-Scroll-up 1.3
  * React-Select 3.1
  * React-Tooltip 4.2
  * Redux 4.0
  * Redux-Thunk 2.3
  * Styled-Components 5.2
  * Firebase 7.24
  * Framer-Motion 2.9
  * Axios 0.20
  
> Redux is used as a state management library, Firebase is used as a NoSQL DB and API endpoints.
> Each React code piece only uses hooks and functional components.
> Drawing functions, canvas layout and display system made solely using native JavaScript features including ES6 standarts.
> All the styling (except the App.css and index.css) is done using Styled Components. Animations are generally done using Framer-Motion.

### Scope of functionalities

Current project is made in a form of website. It has 5 main pages:
- Home page:
  - Gives a general introduction for the user together with info on how to work with all the functionality
  - Has links to creator's social network accounts and email
- Editor contains of 4 main pannels:
  - Tool panel to the left gives the main drawing functionality.
  - Control panel to the right contains elements of managing the canvas and ready image 
  - Canvas in the center of the screen displays the canvas itselft
  - Bottom panel contains canvas sizing options, color palette and current scale display
- Gallery:
  - Has a search by user name, picture name, category and size
  - Has quick size and category filters as well as the sorting by the number of likes and creation time
  - Vast space is taken by Gallery layout containing pictures uploaded by users, each picture has
    information about it's creator, creation time, size, number of likes, zoom in option. If the number 
    of picture's likes is greater then any other picture will be labeled with colored dots and medal
    for "The best in category/size/of all" 
- Log in:
  - Contains a panel with a simple functionality of login and registration
- Profile only appears on screen when user is logged in:
  - Displays user avatar, name, email. Name and avatar are customizable
  - Section My Posts displays all the user posts with basic unformation and delete option
  
### Project status

Current status is raw release, it still contains some minor bugs, which can slightly effect user experience.
Vast majority of bugs will be fixed in the future along with the new functionality to be added.

### Aknowledgements

This project was inspired by the 3rd edition of "Eloquent JavaScript" book written by Marijn Haverbeke, 
in particular by the Chapter 19 
https://eloquentjavascript.net/19_paint.html 

### License

MIT
