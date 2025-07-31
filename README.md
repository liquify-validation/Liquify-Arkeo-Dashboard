# Arkeo Network Dashboard

A React-based dashboard providing real-time insights into **Arkeo Network data providers**. This tool helps visualize key metrics such as the number of providers, contracts, supported services/chains, and detailed provider information.

---

## Features

- **Network Overview**  
  View aggregate statistics like total providers, active contracts, and supported chains/services.

- **Provider Insights**  
  Access individual provider details, including supported services, contract status, and performance metrics.

- **Real-Time Data**  
  Pulls live data from our Arkeo backend for up-to-date insights.

- **Responsive UI**  
  Clean and modern interface built with React and TailwindCSS, optimized for both desktop and mobile.

---

## Tech Stack

- **Frontend**: React + Vite  
- **Styling**: TailwindCSS  
- **Data Fetching**: Liquify Arkeo API 

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git

# Navigate into the project
cd <repo-name>

# Install dependencies
npm install

# Run Locally
npm run dev

# Build for production
npm run build

# Environment Variables
Create a .env file in the root directory:
VITE_ARKEO_API_URL=<your-arkeo-api-endpoint>
```


