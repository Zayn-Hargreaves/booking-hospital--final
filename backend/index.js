import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./Routers/auth.js"
import userRouter from "./Routers/user.js"
import doctorRouter from "./Routers/doctor.js"
import reviewRouter from "./Routers/review.js"
import bookingRouter from "./Routers/booking.js"
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.get("/", (req, res) => {
    
    res.send("OK");
});
const corsOption = {
    origin:true
}
// Kết nối đến cơ sở dữ liệu MongoDB
mongoose.set('strictQuery', false)
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
        });
        console.log("Kết nối MongoDB thành công");
    } catch (error) {
        console.error("Lỗi kết nối MongoDB:", error);
        process.exit(1); // Thoát ứng dụng nếu không thể kết nối
    }
};

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.options('*', cors());
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/doctors', doctorRouter)
app.use('/api/v1/reviews', reviewRouter)
app.use('/api/v1/bookings', bookingRouter)

// Bắt đầu máy chủ và kết nối đến MongoDB
app.listen(port, () => {
    connectDB();
    console.log("Máy chủ đang chạy trên cổng " + port);
});
