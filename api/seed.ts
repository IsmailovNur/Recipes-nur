import mongoose from 'mongoose';
import config from './config';
import { User } from "./models/User";
import { randomUUID } from "node:crypto";
import { Recipe } from "./models/Recipe";
import { Comment } from "./models/Comment";

const run = async () => {
  await mongoose.connect(config.mongoDbUrl);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('recipes');
    await db.dropCollection('comments');

  } catch {
    console.log('Collection were not present, skipping drop!');
  }

  const [user1, user2] = await User.create([
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

  const [recipe1, recipe2, recipe3] = await Recipe.create([
    {
      author: user1._id,
      title: 'Паста Карбонара',
      recipe: '1. Отварить спагетти. 2. Обжарить бекон. 3. Смешать желтки с сыром и соусом.',
      image: 'images/no-image.svg',
    },
    {
      author: user1._id,
      title: 'Борщ',
      recipe: '1. Сварить мясной бульон. 2. Нарезать свеклу и капусту. 3. Тушить овощи и добавить в бульон.',
      image: 'images/no-image.svg',
    },
    {
      author: user2._id,
      title: 'Салат Цезарь',
      recipe: '1. Обжарить куриное филе. 2. Нарезать салат и сухарики. 3. Заправить соусом Цезарь.',
      image: 'images/no-image.svg',
    },
  ]);

  await Comment.create([
    {
      author: user1._id,
      recipe: recipe1._id,
      text: 'Мой фирменный рецепт карбонары!',
    },
    {
      author: user2._id,
      recipe: recipe2._id,
      text: 'Борщ классический, для всей семьи',
    },
    {
      author: user1._id,
      recipe: recipe3._id,
      text: 'Цезарь отличный сытный салат!',
    },
  ]);

  console.log('Fixtures populated!');
  await db.close();
};

run().catch(console.error);