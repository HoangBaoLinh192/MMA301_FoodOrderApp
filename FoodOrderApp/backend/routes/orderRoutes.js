const express = require('express');
const router = express.Router();
const { addOrderItems, getUserOrders, getOrders, deleteOrder } = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .post(protect, addOrderItems)
    .get(protect, admin, getOrders);

router.route('/user/:id')
    .get(protect, getUserOrders);

router.route('/:id')
    .delete(protect, deleteOrder);

module.exports = router;
