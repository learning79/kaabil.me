import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './Landing/home';
import Dashboard from './Dashboard/dboard';

function App() {

  const [user, setUser] = useState(null);

	const getUser = async () => {
		try {
      console.log("hi")
      //https://kaabil-api.kaabil.me
      //http://localhost:3000
      //uncomment for production
			//const url = "https://www.kaabil.me/api/auth/login/sucess";
      const url = "http://localhost:3000/api/auth/login/sucess";
			const { data } = await axios.get(url);
      console.log("i am here")
      console.log("this is the data = ",data)
			setUser(data.user);
      console.log("i am here 23")
		} catch (err) {
		//	console.log(err);
    console.error("Error fetching user data:", err);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

  return (
    <Router>
      
      <Routes>
        <Route path="/" element={<Home />} />
      
        <Route path="/dashboard" element={ <Dashboard user={user} /> } />
       
      </Routes>
    </Router>
  );
}

export default App;
