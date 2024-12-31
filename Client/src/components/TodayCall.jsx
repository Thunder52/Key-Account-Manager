import axios from 'axios';
import { useEffect, useState } from 'react';

const TodayCalls = () => {
    const [leads, setLeads] = useState([]);

    useEffect(() => {
        const fetchTodayCalls = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/leads/calls/today');
                setLeads(response.data);
                console.log(leads);
            } catch (error) {
                console.error('Error fetching today’s calls:', error.message);
            }
        };

        fetchTodayCalls();
    }, []);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">📞 Leads Requiring Calls Today</h2>
            {leads.length > 0 ? (
                <ul className="bg-white shadow-md rounded p-4">
                    {leads.map((lead) => (
                        <div key={lead.id}>
                        <li  className="border-b py-2">
                            <strong>Name:</strong> {lead.name} <br />
                            <strong>Address:</strong> {lead.address} <br />
                            <strong>Last Call Date:</strong> {lead.last_call_date || 'Never'} <br />
                            <strong>Call Frequency (Days):</strong> {lead.call_frequency}
                        </li>
                        <button>Call completed</button>
                        </div> 
                    ))}
                </ul>
            ) : (
                <p>No leads requiring calls today.</p>
            )}
        </div>
    );
};

export default TodayCalls;