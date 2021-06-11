import { useMemo } from 'react';
import { useSelector } from './useSelector';

type User = {
  userId: number;
  userName: string;
  score: number;
};

const useRanking = () => {
  const data = useSelector(({ data }) => data);

  const users = useMemo(() => {
    return data
      .map(({ userId, userName, scores }) => {
        const score = scores.reduce((pre, cur) => {
          const addition = cur === null ? 0 : cur;
          return (pre as number) + addition;
        }, 0) as number;
        return { userId, userName, score };
      })
      .sort((a, b) => b.score - a.score);
  }, [data]);

  return adoptRank(users);
};

export { useRanking };

const adoptRank = (users: User[]) => {
  let rank = 1;
  return users.map((user, index) => {
    const scoreText = user.score > 0 ? `+${user.score}` : `${user.score}`;
    if (index === 0 || user.score === users[index - 1].score) {
      return { ...user, rank, scoreText };
    }
    rank = index + 1;
    return { ...user, rank, scoreText };
  });
};
