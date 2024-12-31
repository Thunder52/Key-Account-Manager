import express from 'express';
import db from '../Database/db.js';

const router = express.Router();

router.post('/leads/:id/interaction',async (req,res)=>{
    const {interaction_type,details}=req.body;
    const id=req.params.id;
    try {
        const result=await db.query('INSERT INTO interactions (lead_id,interaction_type,details) VALUES($1,$2,$3)',[id,interaction_type.toLowerCase(),details]);
        if(interaction_type.toLowerCase()==="call"){
            await db.query('UPDATE restaurants SET last_call_date=now() WHERE id=$1',[id]);
        }
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
});

router.get('/leads/:id/interaction',async (req,res)=>{
    const id=req.params.id;
    try {
        const result=await db.query('SELECT *FROM interactions WHERE lead_id=$1 ORDER BY interaction_date DESC',[id]);
        res.json(result.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
});

router.get('/leads/calls/today',async (req,res)=>{
    try {
        const result=await db.query(`  SELECT id, name, address, last_call_date, call_frequency
            FROM restaurants
            WHERE last_call_date IS NULL 
               OR NOW() > last_call_date + (call_frequency * interval '1 day')`
            )

            res.json(result.rows);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
});

router.get('/leads/:id/performance',async (req,res)=>{
    const id=req.params.id;
    try {
        const interactionCount = await db.query(
            'SELECT COUNT(*) FROM orders WHERE lead_id = $1 AND order_status = $2',
            [id, 'completed']
        );

        const callCount = await db.query(
            'SELECT COUNT(*) FROM interactions WHERE lead_id = $1 AND interaction_type = $2',
            [id, 'call']
        );
        const totalOrder=parseInt(interactionCount.rows[0].count,10);
        const totalCall=parseInt(callCount.rows[0].count,10);
        const performanceScore = (totalOrder * 2) + (totalCall * 1);
                await db.query(
            'UPDATE restaurants SET performance_score = $1 WHERE id = $2',
            [performanceScore, id]
        );
        res.json({
            lead_id: id,
            total_orders: interactionCount.rows[0].count,
            total_calls: callCount.rows[0].count
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
})

export default router;