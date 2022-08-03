
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
  const [inputText,setInputText]=useState('');
  const [details, setDetails] = useState([
    { name: 'Sensitivity', value: 1.8 },
    { name: 'Vigilance', value: 0.6 },
    { name: 'Abstractedness', value: 2 },
    { name: 'Privateness', value: 3.9 },
    { name: 'Apprehension', value: 3.5 },
    { name: 'Openness to change', value: 3.3 },
  ]);
  const dispatch = useDispatch();




 

  const searchText = (e) => {
   setInputText(e.target.value);
  }
  const handleSearch=async()=>{
    console.log(inputText.toString().toLowerCase());
    await dispatch(fetchData(inputText.toString().toLowerCase()));
    // setDetails(userDetails)
  }
  const userData = useSelector(state => state.users.usersData);
  
  const userDetails = Object.entries(userData).map(u => {
    // console.log(u);
    return { name: u[0], value: u[1] }
  })
  useEffect((userData)=>{
    setDetails(userDetails)
    // console.log(details);
  },[userData])





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
          <Bar dataKey="value" barSize={20} fill="#413ea0" />
          <Bar dataKey="value" barSize={20} fill="red" />
          <Line dataKey="uv" stroke="#ff7300" />
        </ComposedChart>
      </ResponsiveContainer>
{/* chart ends */}
  
      <div>

      </div>
    </div>
  );
};

export default ChartView;