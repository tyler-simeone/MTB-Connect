This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# MTB Connect
The goal of MTB Connect is to make it easier for mountain bikers to find new trails to ride and new friends to ride them with! Search for trails by zip-code, view the descriptions of different trails, and see whose ridden those trails recently so you can send them friend requests to connect for the next mountain bike adventure!

<!-- TABLE OF CONTENTS -->
## Table of Contents

* [About the Project](#about-the-project)
  * [Built With](#built-with)
* [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage](#usage)
* [Contact](#contact)
* [Acknowledgements](#acknowledgements)



<!-- ABOUT THE PROJECT -->
## About The Project

![MTB Connect Screen Shot](https://snipboard.io/2EYaI3.jpg)

### Built With
* [React.js](https://reactjs.org/)
* [Material UI](https://material-ui.com/)
* [Django REST Framework](https://www.django-rest-framework.org/)
* [Postman](https://www.postman.com/)

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

* npm
```sh
npm install npm@latest -g
```
* Python

### Installations & Setup

1. Clone down the Front-end repo
```sh
git clone https://github.com/tyler-simeone/MTB-Connect
```
2. In the project directory run `npm start`
3. Clone down the Back-end repo in a new terminal tab
```sh
git clone https://github.com/tyler-simeone/mtb-connect-api
```
4. Set up your virtual environment: `python -m venv mtbconnnectEnv`
5. Activate virtual environment: `source ./mtbconnnectEnv/bin/activate`
6. Move into the project directory that contains `requirements.txt`
7. Install dependencies `pip install -r requirements.txt`
8. Make and run migrations: `python manage.py makemigrations` and `python manage.py migrate`
9. If the app's tables are not in the database after running previous commands, run: `python manage.py makemigrations mtbconnectapi` and then `python manage.py migrate`
10. Load fixtures in this order: 
`python manage.py loaddata mtbconnectapi/fixtures/authuser.json`,
`python manage.py loaddata mtbconnectapi/fixtures/token.json`,
`python manage.py loaddata mtbconnectapi/fixtures/user.json`, 
`python manage.py loaddata mtbconnectapi/fixtures/trail.json`, `python manage.py loaddata mtbconnectapi/fixtures/trailuser.json`, `python manage.py loaddata mtbconnectapi/fixtures/friend.json`
11. Start the server: `python manage.py runserver`
12. Start exploring MTB Connect at the endpoint `localhost:3000/welcome` which will bring you to the welcome page where you can sign up!


<!-- USAGE EXAMPLES -->
## Usage

1. Register as a new user
2. Search for trails in 37067 or 37027 (or add new trails with new zip codes!)
3. View recent riders of existing trails and send them friend requests


<!-- CONTACT -->
## Contact

Tyler Simeone - [LinkedIn](www.linkedin.com/in/tylerpsimeone) - tyler.simeone@gmail.com

Project Link: [https://github.com/tyler-simeone/MTB-Connect](https://github.com/tyler-simeone/MTB-Connect)



<!-- ACKNOWLEDGEMENTS -->
## Acknowledgements
* [Best-README-Template](https://github.com/othneildrew/Best-README-Template)