import express from 'express';
import db from '../Database/db.js';

const router = express.Router();

router.post('/leads', async (req, res) => {
    const {name,address,lead_status}=req.body;
    
    try {
        const result=await db.query('INSERT INTO restaurants(name,address,lead_status) VALUES($1,$2,$3)',[name,address,lead_status]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
    
});

router.get('/leads', async (req, res) => {
    try {
         const data=await db.query('SELECT * FROM restaurants');
         res.json(data.rows);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

router.get('/leads/:id', async (req, res) => {
    const id=req.params.id;
    try {
        const data=await db.query('SELECT * FROM restaurants WHERE id=$1',[id]);
        res.json(data.rows[0]);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

router.put('/leads/:id',async (req,res)=>{
    const id=req.params.id;
    const {name,address,lead_status}=req.body;
    try {
        const result=await db.query('UPDATE restaurants SET name=$1,address=$2,lead_status=$3 WHERE id=$4 RETURNING *',[name,address,lead_status,id]);
        res.json(result.rows[0]);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:error.message});
    }
})

router.delete('/leads/:id', async (req, res) => {
    const {id}=req.params;
    try {
        await db.query('DELETE FROM restaurants WHERE id=$1',[id]);
        res.json({message:'Restaurant Deleted'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

export default router;