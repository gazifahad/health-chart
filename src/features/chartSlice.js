import { createSlice,createAsyncThunk, } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchData=createAsyncThunk('data/fetchData',async(info)=>{
    const res=await axios.get('testResults.json');
   const desiredData= res.data.find(u=>u.Name===info);
   console.log(desiredData);
    return desiredData;
})
export const chartSlice=createSlice({
    name:'data',
    initialState:{
        isLoading:false,
        usersData:{},
        error:null
    },
    reducers:{
        userData: (state,action)=>{
            state.count=state.count + action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchData.pending,state=>{
                state.isLoading=true;
            })
            builder.addCase(fetchData.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.usersData=action.payload;
                state.error=12;
              });
              builder.addCase(fetchData.rejected,(state,action)=>{
                state.isLoading=false;
                state.usersData=[];
                state.error=action.error;
              });
            }
        }
)

export default chartSlice.reducer;