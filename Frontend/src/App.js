import React, {useEffect, useState} from 'react';
import InputMovForm from './components/inputMovForm'
import SingleMov from './components/singleMov'
import MovementsBtns from './components/movementsBtns';
import Header from './components/header';
import Axios from 'axios'
import './styles.css'

function App() {
  // const [loadingUserData, setLoadingUserData] = useState(false);
  // const [user, setUser] = useState([]);

  // useEffect(() => {
  //     const loadPost = async () => {

  //         // Till the data is fetch using API 
  //         // the Loading page will show.
  //         setLoadingUserData(true);

  //         // Await make wait until that 
  //         // promise settles and return its reult
  //         const response = await Axios.get("http://localhost:4000/movements/1");


  //         // After fetching data stored it in posts state.
  //         setPosts(response.data);

  //         //Debugging           
  //         // console.log(posts);
  //         //Debugging  
  //         // Closed the loading page
  //         setLoading(false);
  //     }

  //     // Call the function
  //     loadPost();
  // }, []);

  const [loadingMovData, setLoadingMovData] = useState(false);
  const [movements, setMovements] = useState([]);
  
  useEffect(() => {
    const loadMovements = async () => {
  
      // Till the data is fetch using API 
      // the Loading page will show.
      setLoadingMovData(true);

      // Await make wait until that 
      // promise settles and return its reult
      const response = await Axios.get("http://localhost:4000/movements/all/1");


      // After fetching data stored it in posts state.
      setMovements(response.data);

      //Debugging           
      // console.log(posts);
      //Debugging  
      // Closed the loading page
      setLoadingMovData(false);
    }
    // Call the function
    loadMovements();
  }, []); // this parameter is empty because it's value will never change, therefore, useeffect will only execute once

  // console.log(movements);


  return (
    <div className="App">
      <section className = "Section">
        <div className = "SectionMain">
          <Header 
            movements = {movements}
          />
          <div className = "ContentContainer">
            <InputMovForm />
            <div className = "MovementsContainer">
              <MovementsBtns />
              <div className = "Movements">
                {movements.map((mov) => 
                  <SingleMov
                  amount = {mov.amount}
                  category = {mov.category}
                  creation_date= {mov.creation_date}
                  idMov = {mov.id}
                  key = {mov.id}
                  loading = {loadingMovData}
                  reason ={mov.reason}
                  />  
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
