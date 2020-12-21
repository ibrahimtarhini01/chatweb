// Protect routes
exports.protect = async (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ err: 'Not authorized to access this route' });
  } else {
    next();
  }
};
