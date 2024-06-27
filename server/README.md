## Getting Started

### Prerequisites

- Node.js
- Docker

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```
2. Install backend dependencies:
   ```bash
   npm install
   ```

### Using Docker

1. Start the backend and Redis using Docker Compose:
   ```bash
   docker-compose up
   ```

### Without Docker

1. Start Redis locally.
2. Start the backend:
   ```bash
   npm run start
   ```

### Environment Variables

The following environment variables can be configured in the .env file:

    PORT: The port on which the backend server will run.
    TICK_INTERVAL: The interval in milliseconds for sensor data updates.
    SAFE_AREA_SIZE: The size of the safe area cube around the initial sensor positions.
    SENSOR_POSITION_MIN: The minimum initial position value for sensors.
    SENSOR_POSITION_MAX: The maximum initial position value for sensors.
    WATER_SPEED_MIN: The minimum water speed value.
    WATER_SPEED_MAX: The maximum water speed value.
    WATER_TEMPERATURE_MIN: The minimum water temperature value.
    WATER_TEMPERATURE_MAX: The maximum water temperature value.
