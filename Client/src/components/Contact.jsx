import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const AddContact = () => {
    const { id } = useParams();
    const [contact, setContact] = useState({
        name: '',
        role: '',
        email: '',
        phone: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContact((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:5000/api/leads/${id}/contacts`, contact);
            alert('Contact added successfully!');
        } catch (error) {
            console.error('Error adding contact:', error.message);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Add Contact for Restaurant ID: {id}</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input 
                    type="text" 
                    name="name" 
                    placeholder="Contact Name" 
                    value={contact.name} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded"
                />
                <input 
                    type="text" 
                    name="role" 
                    placeholder="Role" 
                    value={contact.role} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded"
                />
                <input 
                    type="email" 
                    name="email" 
                    placeholder="Email" 
                    value={contact.email} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded"
                />
                <input 
                    type="text" 
                    name="phone" 
                    placeholder="Phone" 
                    value={contact.phone} 
                    onChange={handleChange} 
                    className="w-full p-2 border rounded"
                />
                <button 
                    type="submit" 
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Add Contact
                </button>
            </form>
        </div>
    );
};

export default AddContact;