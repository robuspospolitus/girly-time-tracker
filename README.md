# Girly time tracker

Girly Time Tracker is a simple and fun app for collecting an
d tracking time spent on specific activities. Recommended for everyday use, especially for activities like training, work, or hobbies. A pleasant alternative for those who don't use spreadsheets or are encouraged by the app's design.

This project is in development. New updates are constantly being released, introducing new content and improvements.

## Time tracking

The app counts a set of hours from a given category. You can easily add or remove hours as needed. There are four formats available for adding hours. 

The first one is entering specific hours and minutes spent on the activity. 

The second option is to input a time period (for example from 15:30 to 19:20).

The third option is to use a stopwatch. Just leave the app open while you do your stuff and press stop when you finish.

The fourth option is timer. Similar concept to stopwatch except you decide how much time you want to spend on an activity at the beginning and you don't have to manually stop for it to end.

## Data storing

All data the user provides is saved on their personal computer. The application is not connected to any external server. It was intended to be quick, simple, and straightforward for my own use, so everything is saved to a JSON file. When the application is launched, it automatically launches its own personal server on port 5000 to allow for data changes and manipulation.

## Categories

Time can be entered into specific, separate categories. This way, hours spent on, for example, strength training and cardio are separated. These can be added or removed at will. You have the choice to delete the data upon deleting the category or leave them saved. To retrieve them just add the category of the same name as the one deleted.

## Themes

The app offers a variety of color themes, allowing you to customize it to your taste. There are both light and dark themes. Currently, the primary theme is light orange. The application stores your chosen theme so it can launch the app with your chosen theme already set


## Future updates

### I plan to implement:

Sounds

Error boundary

Notifications


## How to install?

First open the terminal in the project directory.

Type `npm install` and then `npm run build` and press enter. It can take a while

After it's done building, go to `dist` folder.

Just extract the `GirlyTimeTracker 0.1.x.exe` file wherever you'd like and that's it!

There is no need to keep the repository afterwards.

Download options soon...

## How to use?

Open `GirlyTimeTracker 0.1.x.exe`.

First you need to add a category by clicking 'Add a category' in the main menu.

After doing that you are ready to track time!

## THANK YOU!!

Stay tuned and remember to use glitter to your paperwork and documentation. <3