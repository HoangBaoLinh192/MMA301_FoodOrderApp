const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Food = require('./models/Food');
const Order = require('./models/Order');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const importData = async () => {
    try {
        await User.deleteMany();
        await Food.deleteMany();
        await Order.deleteMany();

        const createdAdmin = await User.create({
            username: 'Admin',
            email: 'admin@foodapp.com',
            password: 'admin',
            role: 'admin'
        });

        const createdUser = await User.create({
            username: 'User',
            email: 'user@foodapp.com',
            password: 'user',
            role: 'user'
        });

        const sampleFoods = [
            {
                name: 'Phở Bò Truyền Thống',
                price: 45000,
                image: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=500&auto=format&fit=crop',
                description: 'Tô phở bò nóng hổi với nước dùng thanh ngọt, thịt nạm mềm và rau thơm tươi mát.'
            },
            {
                name: 'Bánh Mì Thịt Nướng',
                price: 25000,
                image: 'https://images.unsplash.com/photo-1548943487-a2e4e43b4859?w=500&auto=format&fit=crop',
                description: 'Bánh mì giòn rụm kẹp thịt nướng than hoa, patê béo ngậy và rau dưa chua chua ngọt.'
            },
            {
                name: 'Bún Bò Huế Chả Cua',
                price: 55000,
                image: 'https://images.unsplash.com/photo-1635834857700-1120ee4fd995?w=500&auto=format&fit=crop',
                description: 'Bún bò mang hương vị đặc trưng xứ Huế, cay nồng đậm đà kèm chả cua thơm ngon.'
            }
        ];

        await Food.insertMany(sampleFoods);

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

importData();
