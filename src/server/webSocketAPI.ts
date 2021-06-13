import { EditScore, RegisterName } from '../webSocketType';
import { getData, register } from './api';
import { Scores } from './entity/Scores';
import { findOne, save } from './utility';

const editScore = async ({
  userId,
  battleIndex,
  score,
}: EditScore['payload']) => {
  const scoreData = await findOne(Scores, { userId, battleIndex });
  if (typeof scoreData !== 'undefined') {
    scoreData.score = score;
    await save(Scores, scoreData);
  }
  await save(Scores, { userId, battleIndex, score });
  return JSON.stringify(await getData());
};

const registerName = async ({ userName }: RegisterName['payload']) => {
  await register(userName);
  return JSON.stringify(await getData());
};

export { editScore, registerName };
