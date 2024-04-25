import jwt from "jsonwebtoken";
import Doctor from "../models/DoctorSchema.js";
import User from "../models/UserSchema.js";

export const authenticate = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization;
    if (!authToken || !authToken.startsWith('Bearer ')) {
      return res.status(401).json({ success: false, message: "Không có mã thông báo, truy cập bị từ chối!" });
    }
    
    const token = authToken.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = decoded.id;
    req.role = decoded.role;
    next(); // Chuyển tiếp cho middleware tiếp theo nếu mã thông báo hợp lệ
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ success: false, message: "Mã thông báo đã hết hạn!" });
    }
    return res.status(401).json({ success: false, message: "Truy cập bị từ chối do mã thông báo không hợp lệ!" });
  }
};

export const restrict = (roles) => async (req, res, next) => {
  const userId = req.userId;
  try {
    let user;
    const patient = await User.findById(userId);
    const doctor = await Doctor.findById(userId);
    if (patient) {
      user = patient;
    } else if (doctor) {
      user = doctor;
    } else {
      return res.status(404).json({ success: false, message: "Không tìm thấy người dùng" });
    }

    if (!roles.includes(user.role)) {
      return res.status(401).json({ success: false, message: "Bạn không được ủy quyền để thực hiện hành động này" });
    }
    console.log("khong phai loi o restrict")
    next(); // Cho phép tiếp tục đến middleware hoặc controller tiếp theo
  } catch (error) {
    console.error("Lỗi trong quá trình xác thực người dùng:", error);
    return res.status(500).json({ success: false, message: "Đã xảy ra lỗi trong quá trình xác thực người dùng" });
  }
};
