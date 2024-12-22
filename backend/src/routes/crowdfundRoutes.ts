import { Router } from 'express';
import { db } from '../firebase';

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'UP' });
  });

// Get all crowdfunds
router.get('/crowdfund', async (req, res) => {
  try {
    const snapshot = await db.collection('crowdfunds').get();
    const crowdfunds = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(crowdfunds);
  } catch (error) {
    res.status(500).send('Error getting crowdfunds');
  }
});

// Get a single crowdfund by ID
router.get('/crowdfund/:id', async (req, res) => {
  try {
    const doc = await db.collection('crowdfunds').doc(req.params.id).get();
    if (doc.exists) {
      res.json({ id: doc.id, ...doc.data() });
    } else {
      res.status(404).send('Crowdfund not found');
    }
  } catch (error) {
    res.status(500).send('Error getting crowdfund');
  }
});

//Update a crowdfund
router.put('/crowdfund/:id', async (req, res) => {
  try {
    await db.collection('crowdfunds').doc(req.params.id).update(req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).send('Error updating crowdfund');
  }
});

export default router;