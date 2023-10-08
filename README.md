# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## OverView
CryptoSignal is a web application that allows users to view a comprehensive list of cryptocurrencies along with relevant data. Users can also access detailed information about each cryptocurrency. This project utilizes the CoinGecko API to fetch cryptocurrency data. To address the API's time limit issue, React Query is implemented to provide caching and improve user experience.

## Deployment
This appl is deployed to Vercel and available to check here : https://nimo-crypto-signals.vercel.app/

 ## Features
Cryptocurrency Table:
Display a list of cryptocurrencies.
Show relevant data such as name, symbol, current price, market cap, and 24-hour price changes.
Pagination for easy navigation through the cryptocurrency list.
Cryptocurrency Detail Page:
View detailed information about a selected cryptocurrency.
Information includes market data, historical price charts, and more.
Caching with React Query:
Cache cryptocurrency data to eliminate time limit issues when fetching data from the CoinGecko API.
Improved performance and user experience on subsequent visits

## Installation
 1- Clone the Repositiory : git clone https://github.com/maryamyasaei/nimo-crypto-signals.git
 
 2- Navigate to the project directory : cd local address of the directory which you saved the project files
 
 3- Install dependencies : yarn install
 
 4- Create a .env file in the project root and add your CoinGecko API key 
 
 5- Start the development server : yarn start
 
 6- Start running tests : yarn test
 
 7- Open your web browser and access the app at http://localhost:3000.

## Usage
Upon opening the app, you'll be presented with a list of cryptocurrencies in a table format.
Click on a cryptocurrency to access its detailed information on a separate page.
Enjoy a seamless experience thanks to the data caching feature provided by React Query.


## Acknowledgments
CoinGecko for providing the cryptocurrency data API.
The React Query team for creating an efficient caching solution.


