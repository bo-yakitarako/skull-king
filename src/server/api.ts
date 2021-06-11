import { Users } from './entity/Users';
import { Scores } from './entity/Scores';
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
  const users = await find(Users, { order: { userId: 'ASC' } });
  const scores = await find(Scores);
  const data = users.map(({ userName, userId }) => {
    const userScores = scores.filter((score) => score.userId === userId);
    const fullScores = [...Array(10)].map((v, index) => {
      const battleScore = userScores.find(
        ({ battleIndex }) => battleIndex === index,
      );
      if (typeof battleScore === 'undefined') {
        return null;
      }
      return battleScore.score;
    });
    return {
      userId,
      userName,
      scores: fullScores,
    };
  });
  return data;
};

export { getUserIdFromName, register, getData };
