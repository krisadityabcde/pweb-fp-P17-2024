import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import crowdfundRoutes from './routes/crowdfundRoutes';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Use crowdfund routes
app.use('/api', crowdfundRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});