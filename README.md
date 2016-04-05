# Joel's Dublin Bus Website

This is a website to show information on the map about the Dublin Bus transport system.

You can try a working instance uploaded here: [http://joel-barba-dublin-bus.meteorapp.com/](http://joel-barba-dublin-bus.meteorapp.com/).

## Overview

<img height="500" src="https://a15a2bedd6a34f0c8f449ab290b0e977974ecc54.googledrive.com/secure/ALrMiJggO1XRLYKFhQPK6F7F9ZdZoWXhMwnJprijr6Uouz3I3u6JF1QOxxVa3sUjytOGztSiwKXuyN0RNddipwpbXgh10nJ7a9RRLi8rsm-e6Y5u6rs26yU6975T_n67UTaF3EQbZPWKJ8UWivFNErjyg2W1V1PUHsbU_qAGW5aEcb7GX9mxKwx0E6x0uwJD4QZ7ptfOkj_kuoyZMsj05BCCruNU4jRRe0ZGgB3G1PsdBcDlfGcS7MWXu1V4Yd0VHNUIMu8lhTwaM8Quf5nbfZcJ0LxPY3nFa8yo1stPWR2zNIGK9PBNrllrdACvua4g8N0uMmIEy3YkX2c4z449ZXGI7OXtrSducEHcKW3E6wj2vv4z_wZcnaFSLW2Ou0PCI7kGVWmUPz7uI2swEFXp2ezDoFSgy7ezWWJjFB5c5kXyKIgjM-akea47rTK2b_5gRupqOZP-GwRhxe4p3K3xUE_Vs1cTh2sxG1IqjRdxCkjBYLFtfXzkj3kmqfIl3ym5dRRGbv3AZrXQ7d995xZxb94FHmMNPd0hXWb8eN8Ovv183dC-bmOKO6MRVtBwApZHJkxWSgqi2f67/host/0B2K0-wLbBOcyRW4xT2VLSVU5RDA"/>

## History
I started building the site without any framework, what was a really bad idea... (I know, I know.. sorry) </br>
However, I realized about this mistake soon enough, and I am rebuilding the site under Meteor framework.

## Structure
The site data is powered by a MongoDB database, and it manages the data structured in 2 basic collections:
* <strong>bus_stops</strong> : A list of all bus stops on the city.
* <strong>bus_tracks</strong> : A list of all the bus lines running across the city.

To keep a good performance and offer a fast user experience, I avoided joining these collections in real time.
As long as this is (or shoud be) a static data, there's a data replication between these collections so there's no need to join collections.



