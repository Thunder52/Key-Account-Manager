import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Performance from './Performance';
import Order from './Order';

const LeadDetail = () => {
    const [leads, setLeads] = useState({});
    const [contacts, setContacts] = useState([]);
    const [interactions, setInteractions] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();

    // Fetch Lead, Contacts, Interactions, and Orders
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [leadRes, contactRes, interactionRes] = await Promise.all([
                    axios.get(`http://localhost:5000/api/leads/${id}`),
                    axios.get(`http://localhost:5000/api/leads/${id}/contact`),
                    axios.get(`http://localhost:5000/api/leads/${id}/interaction`),
                ]);

                setLeads(leadRes.data);
                setContacts(contactRes.data);
                setInteractions(interactionRes.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, [id]);

    // Place a New Order

    return (
        <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
            {/* 📝 Lead Details */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-blue-700 mb-4">Lead Details</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                        <p className="text-lg"><strong>Name:</strong> {leads.name}</p>
                        <p className="text-lg"><strong>Address:</strong> {leads.address}</p>
                        <p className="text-lg"><strong>Status:</strong> {leads.lead_status}</p>
                    </div>
                    <div>
                        <p className="text-lg"><strong>Call Frequency:</strong> {leads.call_frequency}</p>
                        <p className="text-lg"><strong>Performance Score:</strong> {leads.performance_score}</p>
                        <p className="text-lg"><strong>Created At:</strong> {new Date(leads.created_at).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>

            {/* 📇 Contacts Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-green-700 mb-4">Contacts</h2>
                {contacts.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {contacts.map((contact) => (
                            <div key={contact.id} className="bg-gray-50 p-4 border rounded-lg shadow-sm">
                                <p><strong>Name:</strong> {contact.name}</p>
                                <p><strong>Email:</strong> {contact.email}</p>
                                <p><strong>Phone:</strong> {contact.phone}</p>
                                <p><strong>Role:</strong> {contact.role}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>No contacts available. Add one below!</p>
                )}
                <button
                    onClick={() => navigate(`/addContact/${id}`)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 mt-4 rounded"
                >
                    Add Contact
                </button>
            </div>

            <Order />
            {/* 🗂️ Interactions Section */}
            <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-purple-700 mb-4">Interactions</h2>
                {interactions.length > 0 ? (
                    <ul className="space-y-4">
                        {interactions.map((interaction) => (
                            <li key={interaction.id} className="bg-gray-50 p-4 border rounded-lg shadow-sm">
                                <p><strong>Type:</strong> {interaction.interaction_type}</p>
                                <p><strong>Details:</strong> {interaction.details}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No interactions recorded yet. Add one below!</p>
                )}
                <button
                    onClick={() => navigate(`/interaction/${id}`)}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 mt-4 rounded"
                >
                    Add Interaction
                </button>
            </div>

            <Performance />

            {/* 🔙 Navigation */}
            <div className="flex justify-end space-x-4 mt-4">
                <button
                    onClick={() => navigate('/')}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
                >
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};

export default LeadDetail;
