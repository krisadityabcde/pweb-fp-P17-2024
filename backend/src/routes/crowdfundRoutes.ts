import { Router } from 'express';
import { db } from '../firebase';

// Definisikan tipe untuk Comment
interface Comment {
  id: string;
  message: string;
  user_name: string;
  timestamp: string;
}

const router = Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP' });
});

// Create a new crowdfund
router.post('/crowdfund', async (req, res) => {
  try {
    const {
      name,
      target,
      current_donation,
      favorite_crowdfund,
      image,
      status,
      isFavorited
    } = req.body;

    const newCrowdfund = {
      name,
      target,
      current_donation,
      favorite_crowdfund,
      image,
      status,
      isFavorited,
      comments: [], // Array komentar kosong saat baru dibuat
      user_id: "1", // Ganti sesuai dengan ID pengguna yang sesuai
      crowdfund_id: new Date().getTime().toString(), // ID unik untuk crowdfund
    };

    // Menambahkan crowdfund baru ke Firestore
    const crowdfundRef = await db.collection('crowdfunds').add(newCrowdfund);

    // Gabungkan id dari Firestore dengan newCrowdfund tanpa id
    res.status(201).json({ id: crowdfundRef.id, ...newCrowdfund });
  } catch (error) {
    console.error('Error creating crowdfund:', error);
    res.status(500).send('Error creating crowdfund');
  }
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

// Update a crowdfund
router.put('/crowdfund/:id', async (req, res) => {
  try {
    await db.collection('crowdfunds').doc(req.params.id).update(req.body);
    res.json({ id: req.params.id, ...req.body });
  } catch (error) {
    res.status(500).send('Error updating crowdfund');
  }
});

router.delete('/crowdfund/:crowdfundId/comments/:commentId', async (req, res) => {
  const { crowdfundId, commentId } = req.params;

  try {
    // Mendapatkan referensi dokumen crowdfund dari Firestore
    const crowdfundRef = db.collection('crowdfunds').doc(crowdfundId);
    const crowdfundDoc = await crowdfundRef.get();

    if (!crowdfundDoc.exists) {
      return res.status(404).send('Crowdfund not found');
    }

    const crowdfundData = crowdfundDoc.data();
    if (!crowdfundData || !Array.isArray(crowdfundData.comments)) {
      return res.status(400).send('Comments array is missing');
    }

    // Menghapus komentar berdasarkan commentId
    const updatedComments = crowdfundData.comments.filter((comment: any) => comment.id !== commentId);

    // Memperbarui dokumen crowdfund dengan daftar komentar yang sudah diperbarui
    await crowdfundRef.update({ comments: updatedComments });

    res.status(200).send('Comment deleted successfully');
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).send('Error deleting comment');
  }
});

// Delete crowdfund
router.delete('/crowdfund/:id', async (req, res) => {
  try {
    await db.collection('crowdfunds').doc(req.params.id).delete();
    res.status(200).send('Crowdfund deleted successfully');
  } catch (error) {
    console.error('Error deleting crowdfund:', error);
    res.status(500).send('Error deleting crowdfund');
  }
});

export default router;
