import { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LeadForm() {
    const [name,setName]=useState("");
    const [address,setAddress]=useState("");
    const [lead,setLead]=useState("");
    const navigate =useNavigate();

    const handleSubmit= async ()=>{
        try {
             await axios.post('http://localhost:5000/api/leads',{name,address,lead_status:lead});
            alert("Restaurant added successfully");
            navigate('/dashboard')
        } catch (error) {
            console.log(error);
        }
    }
    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add New Lead</h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2">
            <span className="text-gray-700">Restaurant Name</span>
            <input
            onChange={(e)=>{setName(e.target.value)}}
              type="text"
              value={name}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter restaurant name"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Restaurant Address</span>
            <input
            onChange={(e)=>{setAddress(e.target.value)}}
              type="text"
              value={address}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter restaurant Address"
            />
          </label>
          <label className="block mb-2">
            <span className="text-gray-700">Restaurant lead</span>
            <input
            onChange={(e)=>{setLead(e.target.value)}}
              type="text"
              value={lead}
              className="mt-1 block w-full p-2 border rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter restaurant lead"
            />
          </label>
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

export default LeadForm