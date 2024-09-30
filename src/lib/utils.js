const {default: mongoose} = require("mongoose");

const connection = {}

export const connectToDb = async () => {
    try {
        if (connection.isConnected) {
            console.log('Using existing connection');
            return;
        }
        const db = await mongoose.connect(process.env.MONGO);
        //update connection state
        connection.isConnected = db.connections[0].readyState;
        console.log('successful connection to db')
    } catch (error) {
        console.log('unsuccessful connection to db because : ',error)
        throw new Error(error)
    }
}