# aircare

## Prerequisites
Install Node/NPM [https://nodejs.org/en/](https://nodejs.org/en/)

Install yarn [https://classic.yarnpkg.com/lang/en/docs/install/](https://classic.yarnpkg.com/lang/en/docs/install/)

Install Docker [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)

## Getting started

### Clone the repository
  - Having installed above prerequisites, please clone our repository using Git. Front- and backend are contained in one GitHub repository, which can be found here. To clone the repository, open a Terminal on your computer and navigate to the desired location in your file system. Then run the following command:
- `git clone https://github.com/fneumeyer/aircare.git`


### Install the dependencies
  - To install all dependencies in the front- and backend, navigate to the root folder of the repository and run 
  - `yarn install`
  
### Start a MongoDB Server
  - Remain in the repository’s root and run the following command to start a MongoDB sever in a docker container:
  - `docker-compose up --detach`

### Build backend
  - If the backend types that are shared with the frontend change or have never been built, the following command needs to be run inside the backend project before starting the frontend (backend/lib folder should exist!):
  - `yarn compile`
  
### Run the app
  - To run both backend and frontend, simply run:
  - `yarn start`
  - A browser window opens, and you get redirected to the application’s login page. Congrats!
