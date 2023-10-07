# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## OverView
CryptoTracker is a web application that allows users to view a comprehensive list of cryptocurrencies along with relevant data. Users can also access detailed information about each cryptocurrency. This project utilizes the CoinGecko API to fetch cryptocurrency data. To address the API's time limit issue, React Query is implemented to provide caching and improve user experience.

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
1-Clone the repository: 

