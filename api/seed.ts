import mongoose from 'mongoose';
import config from './config';
import { User } from "./models/User";
import { randomUUID } from "node:crypto";

const run = async () => {
  await mongoose.connect(config.mongoDbUrl);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('recipes');

  } catch {
    console.log('Collection were not present, skipping drop!');
  }

  await User.create([
    {
      username: 'nur',
      password: '1234',
      displayName: "Nurmuha",
      token: randomUUID(),
    },
    {
      username: 'test',
      password: '1234',
      displayName: "John Doe",
      token: randomUUID(),
    },
  ]);

  console.log('Fixtures populated!');
  await db.close();
};

run().catch(console.error);