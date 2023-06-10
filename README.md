1. download mongodb compass

2. npm install mongoose

3. Create config and models directory

Add MongoDb Path in next.config.js

```bash
const nextConfig = {
  env: {
    MONGODB_URI: 'mongodb',
  },
};

```

Inside config create dbConnect.js Write following code inside dbConnect.js

```bash
   import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default dbConnect;

```

Inside Models create file user.js with following code

```bash
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = mongoose.models.Users || mongoose.model('User', userSchema);

export default User;

```

Inside src\pages\api create a directory user

Inside user directory create index.js with following code

```bash
import dbConnect from '../../../../config/dbConnect';
import User from '../../../../models/User';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const user = await User.find({}).sort({ _id: -1 });
        res.status(200).json({ success: true, data: user });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
};

```

Insert some documents inside MongoDB

10 Visit URL http://localhost:3000/api/user to get user list as API from MongoDB

This is a Next.js project bootstrapped with create-next-app.
