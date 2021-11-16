# React Calendar

## About The Project

I created a Frontend Calendar application. The following tasks were implemented successfully:

- Ability to add "reminders" (max. 30 characters) for a day and time specified by the user. Also, include a city.
- Ability to edit reminders - including changing text, city, day and time.
- Added a weather service call from OpenWeather and get the weather forecast (e.g. Rain) for the date of the calendar reminder based on the city.
- Expand the calendar to support more than the current month or year.
- Properly handle overflow when multiple reminders appear on the same date.
- Unit tests

### Built With:

- [Javascript](https://www.javascript.com/) - An object-oriented computer programming language commonly used to create interactive effects within web browsers.
- [ReactJS](https://pt-br.reactjs.org/) - A JavaScript library for building user interfaces.
- [SASS](https://sass-lang.com/) - VSass is the most mature, stable, and powerful professional grade CSS extension language in the world.

<!-- USAGE EXAMPLES -->

## Usage

The project is deployed and can be accessed at https://ps-react-calendar.netlify.app/

<!-- GETTING STARTED -->

## Getting Started

<!-- PLACEHOLDER FOR PROJECT OVERVIEW -->

### Prerequisites

In order to run this project locally you will need to:

- Clone and install this repository - https://github.com/pedrovsiqueira/react-calendar

### Installation

1. Clone the repo

```sh
git clone https://github.com/pedrovsiqueira/react-calendar
```

2. Install YARN packages

```sh
yarn install
```

3. Rename .env.example to .env

4. Add the openweather api key on the REACT_APP_API_KEY .env

5. Run the app.

```sh
yarn start
```

6. Access the application through the following link afer doing the steps 1 - 4.

```sh
http://localhost:3000/calendar
```

### Tests:

Tests were done using jest and react-testing-library. To see the tests run the following commands:

1. Test results

```sh
yarn test
```

2. Test results using coverage

```sh
yarn test:coverage
```

<!-- CONTACT -->

## Contact

Pedro Siqueira - [email](mailto:pedro.v.siqueira@gmail.com) - [linkedin](https://www.linkedin.com/in/pedrovsiqueira/) - [portfolio](http://pedrosiqueira.com.br/)
