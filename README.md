1. Download mongodb compass

2. Install mongoose (ODM)

```bash
npm i mongoose
# or
yarn add mongoose
# or
pnpm i mongoose
```

3. Create .env and add your db connection string (add 127.0.0.0 instead of localhost)

```bash
MONGO_CONN_URL=`mongodb://127.0.0.1:27017/test`

```

4. Inside config create dbConnect.js Write following code inside dbConnect.js

```bash
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGO_CONN_URL;

if (!MONGODB_URI) {
  throw new Error('Please define your db connection string in environment');
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

5. Inside models create file userModel.js with following code

```bash
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;

```

6. Create route.js file inside app\api\users directory

```bash
import dbConnect from '@/app/config/dbConnect';
import { NextResponse } from 'next/server';

export async function GET(req) {
  try {
    await dbConnect();
    return NextResponse.json({
      message: 'Success',
    });
  } catch (err) {
    console.log(err);
  }
}
```

7. Visit URL http://localhost:3000/api/users to get response from MongoDB
