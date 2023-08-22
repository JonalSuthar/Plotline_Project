const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://plotline:plotline@plotline.omkoud9.mongodb.net/plotdata?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connection Successful");
}).catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
});


//mongodb+srv://plotline:plotline@plotline.omkoud9.mongodb.net/?retryWrites=true&w=majority

//For compass
//mongodb+srv://plotline:plotline@plotline.omkoud9.mongodb.net/