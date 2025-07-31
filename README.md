# Girly time tracker

Girly Time Tracker is a simple and fun app for collecting and tracking time spent on specific activities. Recommended for everyday use, especially for activities like training, work, or hobbies. A pleasant alternative for those who don't use spreadsheets or are encouraged by the app's design.

This project is in development. New updates are constantly being released, introducing new content and improvements.

## Time tracking

The app counts a set of hours from a given category. You can easily add or remove hours as needed. Currently, the only format available for adding hours is entering hours and minutes spent on an activity. New hour counting options will be available soon.This app gathers your time by entering specific data (hours and minutes as for now). 

## Data storing

All data the user provides is saved on their personal computer. The application is not connected to any external server. It was intended to be quick, simple, and straightforward for my own use, so everything is saved to a JSON file. When the application is launched, it automatically launches its own personal server on port 5000 to allow for data changes and manipulation.

## Categories

Time can be entered into specific, separate categories. This way, hours spent on, for example, strength training and cardio are separated. These can be added or removed at will.

## Themes

The app offers a variety of color themes, allowing you to customize it to your taste. There are both light and dark themes. Currently, the primary theme is light orange. Soon, the theme will be saved individually, so you won't have to change it every time you launch the app.


## Future updates

### I plan to implement:

Statistics page

Timer

Another way of adding time (for example: from 16:30 to 17:20 = 0,83 hours)

Sounds

New logo

And more to come... (Imagination is the limit)


## How to use?
First open the terminal in the project directory.

Check if in main.js loadURL is commented. It can slip off my mind. Should look like this: 

`win.loadFile(path.join(__dirname, 'build', 'index.html'));`

`// win.loadURL('http://localhost:3000')`

Type `npm run build` and press enter. It can take a while

After it's done building, go to `dist` folder.

Open the `GirlyTimeTracker Setup 0.1.x.exe` file. 

It will download the app on your computer and make a shortcut on desktop. 

There is no need to keep the repository afterwards.

## THANK YOU!!

Stay tuned and remember to use glitter to your paperwork and documentation. <3