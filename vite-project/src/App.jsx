import { useEffect, useState } from "react";
// import Navbar from "./components/navbar/Navbar";


const api = "http://api.nobelprize.org/v1/prize.json";
const proxyUrl = 'https://api.allorigins.win/get?url=';

const App = () => {
  const [user, setUser] = useState([]);
  const [search, setSearch] = useState('');
  const fetchPrizes = async (url) => {
    try {
      const res = await fetch(proxyUrl + encodeURIComponent(url));
      const data = await res.json();
      const newData = JSON.parse(data.contents);
      const newData1 = newData.prizes;
      if (newData1.length > 0) {
        setUser(newData1);
      }
    }
    catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    fetchPrizes(api);
  }, [])

  return (
    <>
      <form >
        <input className="input-field" placeholder='Filter by Category or Year' onChange={(e) => setSearch(e.target.value)}></input>
      </form>
      <table className="center">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Year</th>
          </tr>
        </thead>
        <tbody>
          {
            user && user.filter((curUser) => {
              return search.toLowerCase() === ''
                ? user
                :
                (curUser.year.includes(search) || curUser.category.toLowerCase().includes(search))
            }).map((curUser) => {
              if (curUser.year >= 1900 && curUser.year <= 2018) {
                return (

                  curUser?.laureates?.length > 0 && curUser.laureates.map((laureate, index) => {

                    return (
                      <tr key={index}>
                        <th>{laureate.firstname} {laureate.surname}</th>
                        <th>{curUser.category}</th>
                        <th>{curUser.year}</th>
                      </tr>
                    )
                  }))
              }
            })
          }
        </tbody>
      </table>
    </>

  );
}

export default App;
