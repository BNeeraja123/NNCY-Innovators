import { dbGet, dbAll, dbRun } from '../database.js';

// Get user notifications
const getNotifications = async (req, res) => {
  try {
    const userId = req.userId; // From auth middleware

    const notifications = await dbAll(
      `SELECT * FROM notifications WHERE userId = ? ORDER BY createdAt DESC LIMIT 50`,
      [userId]
    );

    res.json({ success: true, data: notifications });
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Mark notification as read
const markNotificationRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    await dbRun('UPDATE notifications SET read = 1 WHERE id = ?', [notificationId]);

    res.json({ success: true, message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error marking notification:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get unread count
const getUnreadCount = async (req, res) => {
  try {
    const userId = req.userId;

    const result = await dbGet(
      'SELECT COUNT(*) as count FROM notifications WHERE userId = ? AND read = 0',
      [userId]
    );

    res.json({ success: true, data: { unreadCount: result.count } });
  } catch (error) {
    console.error('Error getting unread count:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Upload gallery image
const uploadGalleryImage = async (req, res) => {
  try {
    const { eventId, title, type = 'memory', caption, imageUrl } = req.body;

    const result = await dbRun(
      `INSERT INTO gallery_images (eventId, image, title, type, caption)
       VALUES (?, ?, ?, ?, ?)`,
      [eventId, imageUrl, title, type, caption]
    );

    res.json({ success: true, data: { id: result.id } });
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get event gallery
const getEventGallery = async (req, res) => {
  try {
    const { eventId } = req.params;

    const images = await dbAll(
      'SELECT * FROM gallery_images WHERE eventId = ? ORDER BY uploadedAt DESC',
      [eventId]
    );

    res.json({ success: true, data: images });
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

// Delete gallery image
const deleteGalleryImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    await dbRun('DELETE FROM gallery_images WHERE id = ?', [imageId]);

    res.json({ success: true, message: 'Image deleted' });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};

export { getNotifications, markNotificationRead, getUnreadCount, uploadGalleryImage, getEventGallery, deleteGalleryImage };
