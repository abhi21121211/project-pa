#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting Project PA Publication Process...${NC}"

# Check if logged in to npm
echo "Checking npm login status..."
npm whoami > /dev/null 2>&1
if [ $? -ne 0 ]; then
    echo -e "${RED}You are not logged in to npm.${NC}"
    echo "Please log in now:"
    npm login
    if [ $? -ne 0 ]; then
        echo -e "${RED}Login failed. Exiting.${NC}"
        exit 1
    fi
else
    USER=$(npm whoami)
    echo -e "${GREEN}Logged in as: $USER${NC}"
fi

# Publish Runtime
echo -e "\n${GREEN}Publishing @abhi21121211/project-pa-runtime...${NC}"
cd packages/runtime
npm install
npm run build
npm publish --access public
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully published @abhi21121211/project-pa-runtime${NC}"
else
    echo -e "${RED}Failed to publish @abhi21121211/project-pa-runtime${NC}"
    exit 1
fi
cd ../..

# Publish CLI
echo -e "\n${GREEN}Publishing @abhi21121211/project-pa-cli...${NC}"
cd packages/cli
npm publish --access public
if [ $? -eq 0 ]; then
    echo -e "${GREEN}Successfully published @abhi21121211/project-pa-cli${NC}"
else
    echo -e "${RED}Failed to publish @abhi21121211/project-pa-cli${NC}"
    exit 1
fi
cd ../..

echo -e "\n${GREEN}All packages published successfully!${NC}"
