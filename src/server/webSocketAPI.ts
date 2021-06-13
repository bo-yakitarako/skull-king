import { EditScore, RegisterName } from '../webSocketType';
import { getData, register } from './api';
import { Scores } from './entity/Scores';
import { Users } from './entity/Users';
import { connect, findOne, save } from './utility';

const editScore = async ({
  userId,
  battleIndex,
  score,
}: EditScore['payload']) => {
  const scoreData = await findOne(Scores, { userId, battleIndex });
  if (typeof scoreData !== 'undefined') {
    scoreData.score = score;
    await save(Scores, scoreData);
  } else {
    await save(Scores, { userId, battleIndex, score });
  }
  return JSON.stringify(await getData());
};

const registerName = async ({ userName }: RegisterName['payload']) => {
  await register(userName);
  return JSON.stringify(await getData());
};

const resetScores = async () => {
  await connect(Scores, (repository) => repository.delete({}));
  return JSON.stringify(await getData());
};

const resetAll = async () => {
  await connect(Scores, (repository) => repository.delete({}));
  await connect(Users, (repository) => repository.delete({}));
  return '[]';
};

export { editScore, registerName, resetScores, resetAll };
