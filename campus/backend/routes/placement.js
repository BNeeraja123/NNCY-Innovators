import express from 'express';
import {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  getPlacedStudents,
  createPlacedStudent,
  updatePlacedStudent,
  deletePlacedStudent,
  getPlacementStats
} from './placementController.js';

const router = express.Router();

// Middleware to check if user is coordinator or admin
const isCoordinatorOrAdmin = (req, res, next) => {
  // This would be replaced with actual auth middleware that extracts user from token
  // For now, we'll assume the role is passed in the header or request
  const userRole = req.headers['x-user-role'] || 'student';
  
  if (userRole !== 'placement_coordinator' && userRole !== 'admin') {
    return res.status(403).json({ success: false, error: 'Unauthorized: Only coordinators can perform this action' });
  }
  
  next();
};

// Company routes
router.get('/companies', getCompanies);
router.get('/companies/:id', getCompanyById);
router.post('/companies', isCoordinatorOrAdmin, createCompany);
router.put('/companies/:id', isCoordinatorOrAdmin, updateCompany);
router.delete('/companies/:id', isCoordinatorOrAdmin, deleteCompany);

// Placed students routes
router.get('/students', getPlacedStudents);
router.post('/students', isCoordinatorOrAdmin, createPlacedStudent);
router.put('/students/:id', isCoordinatorOrAdmin, updatePlacedStudent);
router.delete('/students/:id', isCoordinatorOrAdmin, deletePlacedStudent);

// Statistics
router.get('/stats', getPlacementStats);

export default router;
