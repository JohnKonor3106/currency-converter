
# RateChart

[![GitHub release (latest by date including pre-releases)](https://img.shields.io/github/v/release/navendu-pottekkat/awesome-readme?include_prereleases)](https://img.shields.io/github/v/release/navendu-pottekkat/awesome-readme?include_prereleases)

This is a React-based web application designed for convenient currency conversion and tracking the dynamics of exchange rates over a specific period. The application allows users to switch between two main modes: instant currency conversion and viewing historical exchange rate data in the form of graphs and tables.

✨ Features

Currency Converter:
Quick conversion between two selected currencies.
Input field for the amount to convert.
Display of the conversion result.
Currency Rate Table:
Display of current exchange rates for all world currencies relative to a chosen base currency.
Indication of the date and time of the last rate update.
Option to select the base currency for the table.
Exchange Rate Dynamics Chart:
Visualization of the rise and fall of a selected currency pair's rate over a specific period (e.g., a weekly chart).
Enables tracking trends and rate fluctuations.
User-Friendly Interface:
Intuitive design based on react-bootstrap.
Switching between "Converter" and "Currency Rates" modes using tabs.
Loading indicators and error messages when working with the API.

🚀 Technologies Used

React: Primary framework for building the user interface.
JavaScript (ES6+): Programming language.
useImmerReducer: For efficient and safe management of global application state using immutable data.
Context API: For passing state and dispatcher functions deep into the component tree without the need for "prop drilling."
Axios: HTTP client for making asynchronous requests to external APIs.
react-bootstrap: A set of ready-made UI components based on Bootstrap for fast creation of a stylish and responsive interface.
recharts: Library for creating interactive charts (line, bar, etc.).
lodash (part of uniqueId): Utility library (used for generating unique keys).
TanStack Query (React Query): For powerful server state management, caching, synchronization, and background data updates. Ensures data freshness and enables cache persistence.
@tanstack/react-query-persist-client: Extension for TanStack Query, allowing the saving of query caches to the browser's localStorage for offline access and instant loading upon reopening the application.
Lazy Loading (with React.lazy and Suspense): Implemented lazy loading for the chart component, delaying the loading of its code and related libraries until it is actually needed, improving the initial application load time.

📊 Data Source APIs

ExchangeRate-API.com: Used to retrieve current exchange rates.
Alpha Vantage: Used to obtain historical exchange rate data for chart generation (specifically weekly data).

# Table of Contents

This is a table of contents for your project. It helps the reader navigate through the README quickly.
- [Project Title](#project-title)
- [Table of Contents](#table-of-contents)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)


# Installation
[(Back to top)](#table-of-contents)

🛠️ Installation and Setup

To run the project on your local computer, follow these steps:

1) Clone the repository: 


_____________________________________________________________________________________________
bash -> git clone https://github.com/new

cd [your project folder name]
___
2. Install dependencies:
______

bash -> npm install 

or

yarn install
___

3.  Configure API Keys:
___
The application requires API keys from ExchangeRate-API.com and Alpha Vantage.
Register on ExchangeRate-API.com and Alpha Vantage to obtain free API keys.
Create a .env file in the project’s root directory and add your keys as follows:
Code snippet

VITE_API_KEY_EXCHANGE_RATE=YOUR_EXCHANGE_RATE_API_KEY
VITE_API_KEY_ALPHA=YOUR_ALPHA_VANTAGE_KEY

(Note: The VITE_ prefix is used if you are using Vite as a bundler, which is common in modern React projects.)
____
4. Run the application:
Bash

npm run dev
or

yarn dev

The application will be available at http://localhost:5173/ (or another address displayed in the console).
___

