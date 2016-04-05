# Joel's Dublin Bus Website

This is a website to show information on the map about the Dublin Bus transport system.

You can try a working instance uploaded here: [http://joel-barba-dublin-bus.meteorapp.com/](http://joel-barba-dublin-bus.meteorapp.com/).

## Overview
<img height="500" src="https://raw.githubusercontent.com/joelbarba/DUB_BUS/master/sample.jpg"/>

## History
I started building the site without any framework, what was a really bad idea... (I know, I know.. sorry) </br>
However, I realized about this mistake soon enough, and I am rebuilding the site under Meteor framework.

## Structure
The site data is powered by a MongoDB database, and it manages the data structured in 2 basic collections:
* <strong>bus_stops</strong> : A list of all bus stops on the city.
* <strong>bus_tracks</strong> : A list of all the bus lines running across the city.

To keep a good performance and offer a fast user experience, I avoided joining these collections in real time.
As long as this is (or shoud be) a static data, there's a data replication between these collections so there's no need to join collections.



