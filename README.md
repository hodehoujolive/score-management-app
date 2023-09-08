# score-management-app
The main objective of this project is to develop a score management application for a sports tournament involving four teams: Alpha, Beta, Gamma, and Omega. The application should allow real-time tracking of scores and display a leaderboard.

## Project Overview 
You can see a small preview of the site here. Enjoy !!
https://drive.google.com/file/d/10LqbDhWbAjCb_4ppjhXdj41PwVxkqHfb/view?usp=sharing

## Built With
- Node Js
- Vue Js
- Mongo DB

## Features
### MUST

- [x] Design an intuitive and attractive user interface for the score management application.
- [x] Implement functionality to enter and record scores of matches between the Alpha, Beta, Gamma, and Omega teams.
- [x] Display an updated real-time leaderboard, showing the position of each team based on their score.
- [x] Allow users to view details of previous matches, including individual team scores and player information.
- [x] Ensure data security by implementing appropriate protection measures to prevent any manipulation or alteration of scores.

### SHOULD

- [ ] Integrate real-time notification features to inform users of new results or changes in the lea- derboard.
- [x] Allow users to share scores or match results on social media, promoting spectator engagement. 
- [ ] Add a prediction feature where users can predict match results and accumulate points based on the accuracy of their predictions.
- [ ] Integrate a team management system, allowing the addition or removal of teams, updating their information, and displaying their statistics.
- [ ] Provide a report generation feature to export match data, scores, and rankings in various for- mats, such as PDF or CSV.

### Prerequisites

- Ensure you have [Node.js and npm](https://nodejs.org/en/download) installed on your computer.
- Make sure you have [mongo DB](https://www.mongodb.com/docs/manual/administration/install-community/) installed on your computer
- A code editor (For example Visual Studio Code, Sublime Text etc.)
- Git installed on your local machine

### Installation

1. Clone the repository on your local machine:

   ```
   git clone https://github.com/hodehoujolive/score-management-app.git
   ```

2. Navigate to the api directory and use npm to install dependencies
    ```
    cd api/
    ```
   ```
   npm install
   ```
    Then rename the .env.example file that is locate in the /api directory to .env
3. Navigate to the frontend directory and use npm to install dependencies
   ```
   cd frontend/
   ```
   ```
   npm install 
   ```

### Usage

1. Use the followinsg commands to start the dev server
   ```
   cd api/
   ```
   ```
   npm run dev
   ```
    
   ```
   cd frontend/
   ```
   ```
   npm run dev
   ```
3. Once the node.js server and vue.js dev server are running, you can access your app by opening this link in your browser 
    http://localhost:3000/
### Note : Admin Credentials
       Email : admin@admin.com
       Password : Admin1234.
