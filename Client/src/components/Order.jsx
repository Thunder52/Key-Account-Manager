import {useEffect, useState} from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Order = () => {

    const [orders, setOrders] = useState([]);
    const [orderAmount, setOrderAmount] = useState('');
    const [orderDetails, setOrderDetails] = useState('');
    const [orderStatus,setOrderStatus]=useState('');
    const {id}=useParams();

    useEffect(() => {
        const fetchOrder= async ()=>{
            try {
                const resp=await axios.get(`http://localhost:5000/api/leads/${id}/orders`);
                setOrders(resp.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchOrder();
    }, [id])
    

    const handlePlaceOrder = async () => {
        try {
            const response = await axios.post(`http://localhost:5000/api/leads/${id}/orders`, {
                order_amount: orderAmount,
                order_status: 'Pending',
                details: orderDetails,
            });
            setOrders([...orders, response.data]);
            setOrderAmount('');
            setOrderDetails('');
            alert('Order placed successfully!');
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };

    const handleDeleteOrder=async (id)=>{
        try {
            const res=await axios.delete(`http://localhost:5000/api/orders/${id}`);
            alert(res.data.message);
        } catch (error) {
            console.log(error);
        }
    }
    const handleUpdateOrderStatus=async (id)=>{
        try {
            await axios.patch(`http://localhost:5000/api/orders/${id}`,{
                order_status:orderStatus
            });
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <div className='container'>
                    {/* 🛒 Orders Section */}
                    <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
                <h2 className="text-2xl font-bold text-orange-700 mb-4">Orders</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Order Amount"
                        value={orderAmount}
                        onChange={(e) => setOrderAmount(e.target.value)}
                        className="p-2 border rounded mr-2"
                    />
                    <input
                        type="text"
                        placeholder="Order Details"
                        value={orderDetails}
                        onChange={(e) => setOrderDetails(e.target.value)}
                        className="p-2 border rounded mr-2"
                    />
                    <button
                        onClick={handlePlaceOrder}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Place Order
                    </button>
                </div>
                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.id} className="bg-gray-50 p-4 border rounded-lg shadow-sm mb-2">
                            <p><strong>Order ID:</strong> {order.id}</p>
                            <p><strong>Amount:</strong> ₹{order.order_amount}</p>
                            <p><strong>Status:</strong> {order.order_status}</p>
                            <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
                            <p><strong>Details:</strong> {order.details}</p>
                            <input
                                    type="text"
                                    placeholder="Update Status"
                                    value={orderStatus}
                                    onChange={(e) => setOrderStatus(e.target.value)}
                                    className="p-2 border rounded mr-2"
                                />

                            <button onClick={() => handleUpdateOrderStatus(order.id)} className="bg-green-500 text-white px-2 py-1 rounded">
                                    Update Status
                                </button>
                                <button onClick={() => handleDeleteOrder(order.id)} className="bg-red-500 text-white px-2 py-1 rounded ml-2">
                                    Delete
                                </button>
                        </div>
                    ))
                ) : (
                    <p>No orders placed yet.</p>
                )}
            </div>
    </div>
  )
}

export default Order