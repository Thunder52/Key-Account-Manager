import axios from "axios";
import {  useState } from "react";
import { useParams } from 'react-router-dom';

const Intersection = () => {
    const [type,setType]=useState('');
    const [detail,setDetail]=useState('');

    const { id } = useParams();

    const handleSubmit= async(e)=>{
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/leads/${id}/interaction`,{
                interaction_type: type,
                details: detail
            });
            setType('');
            setDetail('');
            alert("Interaction created successfully!");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add Contact for Restaurant ID: {id}</h1>
            <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow-md">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Interaction Type</label>
                    <input 
                        type="text" 
                        name="type" 
                        placeholder="Interaction type" 
                        value={type} 
                        onChange={(e)=>{setType(e.target.value)}} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Interaction Detail</label>
                    <input 
                        type="text" 
                        name="detail" 
                        placeholder="Interaction detail" 
                        value={detail} 
                        onChange={(e)=>{setDetail(e.target.value)}} 
                        className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add Contact
                </button>
            </form>
        </div>
    )
}

export default Intersection