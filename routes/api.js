import express from 'express';

const router = express.Router();

router.get('/health', (req, res) => {
    res.status(200).send('OK');
});

router.get('/version', (req, res) => {
    res.status(200).json({ version: '1.0.0' });
});

export default router;