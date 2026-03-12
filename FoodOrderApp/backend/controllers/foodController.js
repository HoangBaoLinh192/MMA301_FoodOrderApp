const Food = require('../models/Food');

// @desc    Get all foods
// @route   GET /api/foods
// @access  Public
const getFoods = async (req, res) => {
    try {
        const foods = await Food.find({});
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a food
// @route   POST /api/foods
// @access  Private/Admin
const createFood = async (req, res) => {
    try {
        const { name, price, description } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : '';

        const food = new Food({
            name,
            price,
            image,
            description,
        });

        const createdFood = await food.save();
        res.status(201).json(createdFood);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update a food
// @route   PUT /api/foods/:id
// @access  Private/Admin
const updateFood = async (req, res) => {
    try {
        const { name, price, description } = req.body;

        const food = await Food.findById(req.params.id);

        if (food) {
            food.name = name || food.name;
            food.price = price || food.price;
            food.description = description || food.description;
            if (req.file) {
                food.image = `/uploads/${req.file.filename}`;
            }

            const updatedFood = await food.save();
            res.json(updatedFood);
        } else {
            res.status(404).json({ message: 'Food not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete a food
// @route   DELETE /api/foods/:id
// @access  Private/Admin
const deleteFood = async (req, res) => {
    try {
        const food = await Food.findById(req.params.id);

        if (food) {
            await food.deleteOne();
            res.json({ message: 'Food removed' });
        } else {
            res.status(404).json({ message: 'Food not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getFoods,
    createFood,
    updateFood,
    deleteFood
};
