# Data Stories using San Jose's open data

## Table of contents

  * [Table of contents](#table-of-contents)
  * [Overview](#overview)
  * [Run locally](#run-locally)
  * [Create a Dashboard](#create-a-dashboard)
  
## Overview
Simple dashboards using San Jose's open data.   Inspired by Chicago's Open City group - http://howsbusinesschicago.org/

Want to help?  Join us at one of our meetups: http://www.meetup.com/Code-for-San-Jose/

We'd love your feedback.  File an issue: https://github.com/codeforsanjose/dashboards/issues

## Run Locally

```bash
git clone https://github.com/codeforsanjose/dashboards.git
cd dashboards

Start a local web server (e.g - https://www.npmjs.com/package/http-server
http-server

Open browser and navigate to the url
localhost:8080
```
## Create a Dashboard

Clone the repo.  (see above to [run locally](#run-locally))

### Dependencies
All dependencies are reference through CDN
* [Bootstraup](http://getbootstrap.com) - HTML and CSS layouts
  * [JQuery](https://jquery.com/) - JQuery
* [NVD3](http://nvd3.org/index.html) - NVD3 - Reusable chart components using D3
  * [D3](https://d3js.org/) - D3 - Data Driven Documents
* [Google Maps](https://developers.google.com/maps/) - Google Maps API
* 
### Directory Structure

```bash
dashboards
│   README.md
│   file001.txt    
│
└───folder1
    │   file011.txt
    │   file012.txt
    │
    ├───subfolder1
    │   │   file111.txt
    │   │   file112.txt
    │   │   ...
    │
    └───folder2
    │   file021.txt
    │   file022.txt
```
