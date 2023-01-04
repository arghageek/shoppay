import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
const connection = {};

async function connectDb() {
  if (connection.isConnected) {
    console.log('Already connected to database');
    return;
  }

  if (mongoose.connections.length > 0) {
    connection.isConnected = mongoose.connections[0].readyState; // if connected then readyState value is 1
    if (connection.isConnected === 1) {
      console.log('Use previous connection to connect to database');
      return;
    }
    await mongoose.disconnect();
  }

  const db = await mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('New connection to database');
  connection.isConnected = db.connections[0].readyState;
}

async function disconnectDb() {
  if (connection.isConnected) {
    if (process.env.NODE_ENV === 'production') {
      await mongoose.disconnect();
      connection.isConnected = false;
    } else {
      console.log('In development mode, so not disconnecting from database');
    }
  }
}

const db = { connectDb, disconnectDb };
export default db;
