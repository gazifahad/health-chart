
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux/es/exports';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Area,
  Bar,
  ComposedChart
} from "recharts";
import { fetchData, findUser } from "./chartSlice";
import { ResponsiveContainer } from "recharts";
const ChartView = () => {
  const [data,setData]=useState([]);
  const [inputText,setInputText]=useState('');
  const [details, setDetails] = useState([]);
  const [targetData,setTargetData]=useState([]);
  const [idealData,setIdealData]=useState([]);
  const [userData,setUserData]=useState({});
  const [convertedUserDetails,setConvertedUserDetails]=useState([]);
  const [convertedTargetData,setConvertedTargetData]=useState([]);
  const [combinedData,setCombinedData]=useState([]);
  const dispatch = useDispatch();
  useEffect(()=>{
    const fetch=async()=>{
      await dispatch(fetchData());
    }
    fetch();
    
    
  },[])

  const allData= useSelector(state=>state.users.usersData);
  
 
 

  const searchText = (e) => {
   setInputText(e.target.value);
  }
  const handleSearch=async()=>{
    
    const desiredData= allData.find(u=>u.Name===inputText);
     setTargetData(desiredData);
     
    
    
  }
 useEffect(()=>{

  setData(idealData);
  
 },[idealData])
  
 console.log(data);
 


  useEffect((userData)=>{
    setData(allData);
   
 
 
    
  },[userData])

  useEffect(()=>{
    
    const ideal= allData?.find(u=>u.Name==="Ideal");
   setIdealData(ideal);
  },[allData])
  
useEffect(()=>{
  const objectConvert=async()=>{
    const userDetails =await Object?.entries(idealData)?.map(u => {
      // console.log(u);
      return { name: u[0], value: u[1] }
    })
    setDetails(userDetails);
    setConvertedUserDetails(userDetails);

  }
  objectConvert();

},[data])

useEffect(()=>{
  const objectConvert=async()=>{
    const userDetails =await Object?.entries(targetData)?.map(u => {
      // console.log(u);
      return { name: u[0], value: u[1] }
    })
    // setDetails(userDetails);
    setConvertedTargetData(userDetails);

  }
  objectConvert();
},[targetData]);
useEffect(()=>{
  const mergedData=[...convertedUserDetails,...convertedTargetData];
   console.log(mergedData);
 
   
   const combined=[];
   const newArray=[];
   mergedData.map(object=>{
    
    const exist=combined?.find(newObject=>newObject.name===object.name);
    // console.log();
    if(exist){
    //  console.log({...exist,value2:object.value});
    //  console.log('in if');
      newArray.push({...exist,user_value:object.value})
    }
   else{
    combined.push(object)
    // console.log('in else');
  };
  
    });
    
   setDetails(newArray);
},[convertedTargetData])
console.log(details);
  return (
    <div style={{ width: "auto", height: "800px" }}>
      <Form className="d-flex mx-auto text-box w-50">
        <Form.Control onChange={searchText}
          type="search"
          placeholder="Search"
          className="me-2 "
          aria-label="Search"
        />
        <Button variant="outline-success" onClick={handleSearch}>Search</Button>
      </Form>
          {/* chart starts */}
          <ResponsiveContainer width="100%" height="100%">
        <ComposedChart
          layout="vertical"
          width={500}
          height={400}
          data={details}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Area dataKey="Name" fill="#8884d8" stroke="#8884d8" />
          
          <Bar dataKey="value" barSize={20} fill="red" />
          <Bar dataKey="user_value" barSize={20} fill="#413ea0" />
          
          <Line dataKey="user_value" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
{/* chart ends */}
  
      <div>

      </div>
    </div>
  );
};

export default ChartView;