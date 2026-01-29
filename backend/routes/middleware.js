// Authentication middleware
export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1] || req.headers.authorization;

  if (!token) {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }

  try {
    // For demo: extract user ID from token (format: "token-{userId}" or "demo-token-{email}")
    if (token.startsWith('demo-token-')) {
      req.userId = 999; // Demo user ID
      req.userEmail = token.replace('demo-token-', '');
    } else {
      const userId = token.replace('token-', '');
      req.userId = parseInt(userId) || 999;
    }
    next();
  } catch (error) {
    res.status(401).json({ success: false, error: 'Invalid token' });
  }
};

// Role-based middleware
export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    // Check if user has required role
    // This would be expanded with actual role checking from database
    if (roles.includes(req.userRole)) {
      next();
    } else {
      res.status(403).json({ success: false, error: 'Forbidden' });
    }
  };
};
