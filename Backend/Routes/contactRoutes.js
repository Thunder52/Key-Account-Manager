import express from 'express';
import db from '../Database/db.js';

const router = express.Router();
router.get("/leads/:id/contact", async(req,res)=>{
    const id=req.params.id;
    try {
        const result=await db.query('SELECT * FROM contacts WHERE restaurant_id=$1',[id]);
        res.json(result.rows);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

router.post('/leads/:id/contacts',async(req,res)=>{
    const id=req.params.id;
    const {name,role,phone,email}=req.body;
    try {
        const result=await db.query('INSERT INTO contacts(restaurant_id,name,role,phone,email) VALUES($1,$2,$3,$4,$5)',[id,name,role,phone,email]);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

router.delete('/leads/:id/contacts', async (req, res) => {
    const {id}=req.params;
    try {
        await db.query('DELETE FROM contacts WHERE restaurant_id=$1',[id]);
        res.json({message:'Contacts Deleted'});
    } catch (error) {
        res.status(500).json({error:error.message});
    }
});

export default router;