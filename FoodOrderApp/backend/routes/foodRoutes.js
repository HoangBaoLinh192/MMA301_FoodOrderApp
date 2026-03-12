const express = require('express');
const router = express.Router();
const { getFoods, createFood, updateFood, deleteFood } = require('../controllers/foodController');
const { protect, admin } = require('../middleware/authMiddleware');
const multer = require('multer');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/');
    },
    filename(req, file, cb) {
        // preserve original filename but make it unique
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

router.route('/')
    .get(getFoods)
    .post(protect, admin, upload.single('image'), createFood);

router.route('/:id')
    .put(protect, admin, upload.single('image'), updateFood)
    .delete(protect, admin, deleteFood);

module.exports = router;
