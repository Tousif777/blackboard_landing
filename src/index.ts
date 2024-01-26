// app.ts
import express from 'express';
import dotenv from 'dotenv';
import teacherRoutes from './routers/TeacherRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Use the teacher routes
app.use('/api/teachers', teacherRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
