This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

## Viewing data

To view full app with data, after running `npm start` open a new tab in the terminal and `cd` into the `api` directory, then run: `json-server -p 5002 -w database.json`

## Using the app

If the user isn't logged in they will be brought to the register page, where they can either log in or register a new account. Once logged-in, the user can navigate the three pages on the site. 

The main page is the 'Trails' tab where users can search for trails based on zip-codes. Right now the only zip-codes that will return trail data are 37067 and 37027. 

A user can create a new trail by clicking 'Add a Trail' on the 'Trails' tab. Once they do this they will see that trail when searching the zip code matching the trail the user just created. A user can also edit and delete a trail they created with the respective 'edit' and 'delete' buttons when viewing their trail. The user should not see these buttons on trails they did not create.

A user can also add other riders as friends, and once the request is accepted, the user will see that friend on their 'Friends' page. To see this feature, the user can either open the database.json file in a code editor and grab another pseudo-user's email and add that user as friend, and then work between those two users. Or the user can add Luke Skywalker as a friend and then use this psuedo-user's email: 'luke@gmail.com' which will allow them to log in as Luke Skywalker and accept the friend request there. 

When finished running the app, use `control + c` to close the running JSON server, and use that same command to close the npm server.







### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
