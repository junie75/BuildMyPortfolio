#!/bin/bash

# Navigate to the React project directory
cd C:/Users/ejere/OneDrive/Documents/StMU/stmuSpring2024/PythonDataAnalytics/Project/BuildMyPortfolio

# Build the React application
npm run build

# Copy the build files to the Flask project's static directory, force overwrite
cp -rf dist/* ../flask_server/static/

echo "Deployment complete."
