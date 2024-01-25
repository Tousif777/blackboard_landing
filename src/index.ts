// app.ts
import express from 'express';
import dotenv from 'dotenv';
import userRoutes from './routers/UserRoute'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use the user routes
app.use('/users', userRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
