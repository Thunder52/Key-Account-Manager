import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Performance = () => {
    const [performance, setPerformance] = useState({});
    const { id } = useParams();

    useEffect(() => {
        const fetchPerformance = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/leads/${id}/performance`);
                setPerformance(response.data);
            } catch (error) {
                console.error('Error fetching performance data:', error.message);
            }
        };

        fetchPerformance();
    }, [id]);

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">📊 Lead Performance</h2>
            <div className="bg-white shadow-md rounded p-4">
                <p><strong>Lead ID:</strong> {performance.lead_id}</p>
                <p><strong>Total Orders:</strong> {performance.total_orders}</p>
                <p><strong>Total Calls:</strong> {performance.total_calls}</p>
            </div>
        </div>
    );
};

export default Performance;