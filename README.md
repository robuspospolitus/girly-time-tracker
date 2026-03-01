# Girly time tracker

Girly Time Tracker is a desktop time tracking application built with React, TypeScript, and Electron, designed to combine structured activity tracking with a customizable and visually engaging interface.

The project was developed as a practical exploration of desktop application architecture using modern frontend technologies. It focuses on state management, local data persistence, theming systems, and production build configuration within the Electron ecosystem.

This project is now completed and represents a finished learning milestone in building and packaging cross-platform desktop applications.

Although it is no longer under active development, feedback, suggestions, and issue reports are always welcome.

## Time tracking

The application allows users to track time within separate activity categories using four different input methods

- Manual Entry. Enter a specific number of hours and minutes spent on an activity.
- Time Range Input. Provide a start and end time (e.g., 15:30–19:20), and the app automatically calculates the duration.
- Stopwatch Mode. Start tracking, leave the app running during the activity, and stop it when finished.
- Timer Mode. Set a predefined duration for an activity. The timer ends automatically when the selected time is reached.

This flexibility allows users to adapt time tracking to different workflows and use cases (work, training, hobbies, etc.).

## Categories

Time entries are organized into separate categories.

Users can:
- Create and delete categories freely
- Decide whether to remove associated data when deleting a category
- Restore previously stored data by recreating a category with the same name

This approach keeps different activity types (e.g., strength training vs. cardio, work vs. personal projects) clearly separated.

## Data storing

All user data is stored locally on the user's computer.

- The application does not connect to any external servers
- No data is transmitted or collected
- All information is stored in a local JSON file

When the application launches, it automatically loads and synchronizes with the local file, allowing immediate access and modification of stored data.

This desktop-first approach ensures simplicity, privacy, and full user control over stored information.

## Themes

The app includes multiple customizable color themes, including both light and dark variants. The default theme is light orange. The selected theme is saved locally. The application automatically launches with the previously selected theme. The theming system was implemented to improve user experience and demonstrate UI state persistence.

## How to install?

### Download

You can download and install this app from [Releases page](https://github.com/robuspospolitus/girly-time-tracker/releases)

### Build

> [!NOTE]
> Before building the app it is recommended to check the `package.json` file to configure the desired installer

1. Open a terminal in the project directory.
3. Run:
```
npm install
npm run build
```
4. After the build process completes, navigate to the `dist` folder.
5. Extract the generated `GirlyTimeTracker 0.1.x.exe` file to your desired location.
6. Run the executable — no additional setup required.

The repository is not required after building the application.

## How to use?

1. Launch `GirlyTimeTracker 0.1.x.exe`.
2. Create a category from the Add Category page.
3. Start tracking time using your preferred tracking mode.

## Screenshots

![Screenshot of the main menu](/screenshots/menu.png?raw=true "Menu") ![Screenshot of the list page](/screenshots/list.png?raw=true "List") 
![Screenshot of the statistics page](/screenshots/statistics.png?raw=true "Statistics") ![Screenshot of the settings](/screenshots/settings.png?raw=true "Settings")

## THANK YOU

Thank you for checking out this project.
Feedback and suggestions are welcome.