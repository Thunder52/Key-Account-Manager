import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Dashboard = () => {   
        const [restaurants, setRestaurants] = useState([]);
        const navigate=useNavigate();

        useEffect(() => {
            const fetchRestaurants = async () => {
                try {
                    const response = await axios.get('http://localhost:5000/api/leads');
                    setRestaurants(response.data);
                } catch (error) {
                    console.error('Error fetching restaurants:', error);
                }
            };
            
            fetchRestaurants();
        }, []);

        const hanleDelete= async(id)=>{
            console.log(id);
            try {
                const res=await axios.delete(`http://localhost:5000/api/leads/${id}`);
                alert(res.message);
            } catch (error) {
                console.log(error)
            }
        }
    return (
        <div className="container mx-auto p-4" >
            <h1 className="text-2xl font-bold mb-4">Restaurant Dashboard</h1>
            <div className="mb-4">
                <button onClick={() => navigate('/addLead')}  className="bg-blue-500 text-white px-4 py-2 rounded">Add More Restaurants</button>
            
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {restaurants.map((restaurant) => (
                    <div key={restaurant.id} className="bg-white shadow-md rounded p-4">
                        <h2 onClick={()=>navigate(`/lead/${restaurant.id}`)} className="text-xl font-semibold">{restaurant.name}</h2>
                        <p className="text-gray-600">{restaurant.address}</p>
                        <p className="text-gray-600">Lead Status: {restaurant.lead_status}</p>
                        <button onClick={()=>{hanleDelete(restaurant.id)}} className="bg-green-500 text-white px-4 py-2 rounded mt-2">Delete Restaurant</button>
                    </div>
                ))}
            </div> 
            <button onClick={() => navigate('/calls-today')} className="bg-yellow-500 text-white px-4 py-2 rounded mt-2">📞 View Today's Calls</button>          
        </div>
    );
};

export default Dashboard;