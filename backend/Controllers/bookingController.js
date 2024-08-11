import User from "../models/UserSchema.js"
import Doctor from "../models/DoctorSchema.js"
import Booking from "../models/BookingSchema.js"
import Stripe from 'stripe'

export const getCheckoutSession = async(req, res) =>{
    try {
        const doctor = await Doctor.findById(req.params.doctorId)
        const user = await User.findById(req.userId)
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        console.log(user)
        const session = await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            success_url:`http://localhost:5173/checkout-success`,
            cancel_url:`${req.protocol}://${req.get('host')}/doctors/${doctor._id}`,
            customer_email:user?.email ? user.email : '',
            client_reference_id:req.params.doctorId,
            line_items:[
                {
                    price_data:{
                        currency:"vnd",
                        unit_amount:doctor.ticketPrice,
                        product_data:{
                            name: doctor.name,
                            description: doctor?.bio ? doctor.bio : " ",
                            images:[doctor.photo]
                        }
                    },
                    quantity:1
                }
            ]
        })
        const booking = new Booking({
            doctor:doctor._id,
            user:user._id,
            ticketPrice:doctor.ticketPrice,
            session:session.id
        })
        console.log(booking)
        await booking.save()
        doctor.appointments.push(booking._id);
        await doctor.save();
        res.status(200).json({success:true, message:"Thanh toán thành công", session})
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false , message:"Thanh toán lỗi"})
    }
}