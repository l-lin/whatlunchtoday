# What Lunch Today

> Me: What should we eat for lunch today?

> Colleague 1: Dunno

> Colleague 2: Whatever

> 10 minutes pass and we still don't know what to eat...

This application will **SAVE** you 10 minutes a day (at least for indecisive people like me)!
`What Lunch Today` is a collaborative application that will choose your lunch for you and your friends/colleagues.

## How to use

Go to the [application](http://whatlunchtoday.herokuapp.com), then

* set your name
* choose the group you wish to eat with
* vote for the meal you wish to eat for lunch
    * each member of the group have 5 votes each day to select the meal they want to eat
    * the meal that has the most votes is obviously the meal you will eat for lunch

That's it! Not complicated! (maybe too simple...)

# About this project

I started this project because we were always idling in the cold street in order to choose where to eat...
Since I wanted to test out [MeteorJS](http://www.meteor.com) and [Foundation](http://foundation.zurb.com), this project was the perfect "guinea pigs"!

This project is build with:

* [MeteorJS](http://www.meteor.com)
* [Foundation](http://foundation.zurb.com)
* [jQuery](http://jquery.com)
* [Iron router](https://github.com/EventedMind/iron-router)
* [Iron router progress](https://github.com/Multiply/iron-router-progress)
* [Font awesome](http://fortawesome.github.io/Font-Awesome)

If you have any suggestion, feel free to submit a request. I don't bite, I promise!

# Getting involved

If you wish to contribute for this project, I am using [Git Flow](https://github.com/nvie/gitflow) for versioning workflow.

## Getting started

You will need to install [Meteor](http://www.meteor.com) and [Meteorite](https://github.com/oortcloud/meteorite/).
Then to install the project:

```
$ git clone https://github.com/l-lin/whatlunchtoday.git
$ cd whatlunchtoday
$ mrt install
$ meteor reset
$ meteor
```

Access to [http://localhost:3000](http://localhost:3000)

## Commands list
`What lunch today` comes with console tool, which helps on creating views, routes and so on (wlt.bat for windows users):

```
./wlt # Lists all possible commands 
```

## Folder structure

```
client/ 				# Client folder
    compatibility/      # Libraries which create a global variable
    config/             # Configuration files (on the client)
	lib/                # Library files that get executed first
    routes/             # All routes(*)
    startup/            # Javascript files on Meteor.startup()
    stylesheets         # STYLUS files
    subscriptions/      # Collection subscriptions(*)
    modules/            # Meant for components, such as form and more(*)
	views/			    # Contains all views(*)
	    common/         # General purpose html templates
model/  				# Model files, for each Meteor.Collection(*)
private/                # Private files
public/                 # Public files
server/					# Server folder
    lib/                # Server side library folder
    publications/       # Collection publications(*)
    startup/            # On server startup
tests/					# Test files, can be run with laika
wlt						# Command line tool
wlt.bat  				# Command line tool for windows
```

(*) = the command line tool creates files in these folders

## Data model

The data model is quite simple and straightforward:

| GroupList |
| :-------: |
| name      |
| groupName |

| RestoList |
| :-------: |
| name      |
| groupName |

| UserList  |
| :-------: |
| name      |
| groupName |


| VoteList  |
| :-------: |
| userName  |
| groupName |
| restoName |
| date      |
## Why did I not use Meteor User management

Simply because I wanted the users to use this application fairly easily without the burden to subscribe to any service.

# License

[MIT Licence](http://en.wikipedia.org/wiki/MIT_License)
