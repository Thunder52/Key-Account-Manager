import express from 'express';
import db from '../Database/db.js';


const router = express.Router();

router.post('/leads/:id/orders', async (req, res) => {
    const { id } = req.params;
    const { order_amount, order_status, details } = req.body;

    try {
        const result = await db.query(
            'INSERT INTO orders (lead_id, order_amount, order_status, details) VALUES ($1, $2, $3, $4) RETURNING *',
            [id, order_amount, order_status, details]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error placing order:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.get('/leads/:id/orders', async (req, res) => {
    const { id } = req.params;

    try {
        const result = await db.query(
            'SELECT * FROM orders WHERE lead_id = $1 ORDER BY order_date DESC',
            [id]
        );
        res.json(result.rows);
    } catch (error) {
        console.error('Error fetching orders:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.patch('/orders/:orderId', async (req, res) => {
    const { orderId } = req.params;
    const { order_status } = req.body;

    try {
        const result = await db.query(
            'UPDATE orders SET order_status = $1 WHERE id = $2 RETURNING *',
            [order_status.toLowerCase(), orderId]
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error updating order:', error.message);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/orders/:id',async (req, res) => {
    const { id } = req.params;
    try {
        await db.query('DELETE FROM orders WHERE id = $1', [id]);
        res.json({ message: 'Order deleted successfully' });
    } catch (error) {
        console.error('Error deleting order:', error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;