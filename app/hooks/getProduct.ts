import * as React from 'react';
import axios, { AxiosResponse } from 'axios';

const url = 'https://app4me4u.herokuapp.com/api/product/619e6fd140d15287ffe42aca'

export default function getProduct() {
    //const [data, setData] = React.useState({});
   // const [isLoaded, setIsLoaded] = React.useState(false);
    //const [error, setError] = React.useState(null);
    var response
    
    async function fetchData () {
      console.log("fetch data")
      response = await axios.get(url)
        /*.then(function (response:AxiosResponse) {
          //setIsLoaded(true);
          isLoaded = true;
          //setData(response.data);
          data = response.data
          console.log(response.data.name + " desde hook")
        })
        .catch(function(error){
          //setError(error);
          err = error
        });*/
        console.log(response.data.name + " get")
      }
  
    //React.useEffect(()=> {
      fetchData();
     // }, [])
      
    /*React.useEffect(() => {
      setData({name: 'pepe'})
      setIsLoaded(true)
      setError(null)
    }, [])*/
      
    console.log(response.data.name + " get")
    return response
  }