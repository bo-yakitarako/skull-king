import { Scores } from './entity/Scores';
import { Users } from './entity/Users';
import { find, findOne, save } from './utility';

const getUserIdFromName = async (userName: string) => {
  const user = await findOne(Users, { userName });
  return user?.userId || null;
};

const register = async (userName: string) => {
  const existedUserId = await getUserIdFromName(userName);
  if (existedUserId !== null) {
    return existedUserId;
  }
  await save(Users, { userName });
  const insertedUser = (await find(Users, { order: { userId: 'DESC' } }))[0];
  return insertedUser.userId;
};

const getData = async () => {
  const users = await find(Users);
  const data = await Promise.all(
    users.map(async ({ userId, userName }) => {
      const scores = (
        await find(Scores, {
          select: ['score'],
          where: { userId },
          order: { battleIndex: 'ASC' },
        })
      ).map(({ score }) => score);
      return { userName, scores };
    }),
  );
  return data;
};

export { getUserIdFromName, register, getData };
