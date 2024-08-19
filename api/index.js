constBookings = require('./models/Booking.js'); 

app.post('/booking', async(req, res) => {
    const userData = await getuserDataFromReq(req);
    const {place, checkIn, checkOut, numberOfGuests, name,phone,price} = req.body;
    Booking.create({
        place, checkIn, checkOut, numberOfGuests, name,phone,price , user:userData.id,  
    }).then(( doc) => {
        if (err) throw err;
        res.json(doc);
    }).catch((err) => {
        throw err;
    });

    function getuserDataFromReq(req){
        return new Promise((resolve, reject) => {
            jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData)=> {
                if (err) throw err;
                resolve(userData);
            });
        });   
    } {/* grab this function to top of the doc */ }
    
    app.get('/booking', async(req,res)=> {
        const userData = await getuserDataFromReq(req);
        res.json(await Booking.find({user:userData.id}).populate('place'));
    });
    
});