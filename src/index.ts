import express from 'express';
import dotenv from 'dotenv';

import teacherRoutes from './routers/TeacherRoute';
import studentRoutes from './routers/studentRoute';
import memberRoutes from './routers/memberRoute';
import jobApplicationRoutes from './routers/jobApplicationRoute';
import schoolRoutes from './routers/schoolRoute';
import donationRoutes from './routers/donationRoute';
import contactRoutes from './routers/contactRoute';
import subscriberRoutes from './routers/subscriberRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

const routes = [
    { path: '/api/teachers', router: teacherRoutes },
    { path: '/api/students', router: studentRoutes },
    { path: '/api/members', router: memberRoutes },
    { path: '/api/jobApplications', router: jobApplicationRoutes },
    { path: '/api/schools', router: schoolRoutes },
    { path: '/api/donations', router: donationRoutes },
    { path: '/api/contacts', router: contactRoutes },
    { path: '/api/subscribers', router: subscriberRoutes },
];

routes.forEach(({ path, router }) => app.use(path, router));

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
