# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)


# 🚀 PathFinder - AI Job Recommendation System

This project is a full-stack AI-based Job Recommendation System that suggests the most relevant job roles based on user skills and experience.

It uses:
- 🔹 React (Frontend)
- 🔹 FastAPI (Backend)
- 🔹 TF-IDF + KNN (Machine Learning Model)

---

# 📁 Project Structure

Pathfinder/
│
├── Backend/
│ ├── main.py # FastAPI server
│ ├── model.py # ML model (TF-IDF + KNN)
│ ├── utils.py # Helper functions
│ ├── requirements.txt # Backend dependencies
│
├── Dataset/
│ └── job_dataset_modified.csv # Dataset
│
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── components/
│ │ │ ├── JobForm.js
│ │ │ ├── ResultCard.js
│ │ │
│ │ ├── pages/
│ │ │ └── Home.js
│ │ │
│ │ ├── api.js
│ │ ├── App.js
│ │ ├── index.js
│ │
│ ├── package.json
│
└── README.md


---

# ⚙️ Backend Setup (FastAPI)

### 📌 Step 1: Navigate to Backend
```bash
cd Backend
📌 Step 2: Install dependencies
pip install -r requirements.txt
📌 Step 3: Run the server
uvicorn main:app --reload
📌 Backend runs at:
http://127.0.0.1:8000
📌 API Endpoint:
POST /recommend
📌 Test API:

Open in browser:

http://127.0.0.1:8000/docs
💻 Frontend Setup (React)
📌 Step 1: Navigate to frontend
cd frontend
📌 Step 2: Install dependencies
npm install
📌 Step 3: Run React app
npm start
📌 Frontend runs at:
http://localhost:3000