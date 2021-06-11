import { useMemo } from 'react';
import { useSelector } from './useSelector';

const useDataTable = () => {
  const data = useSelector(({ data }) => data);

  const headerUsers = useMemo(() => {
    return data.map(({ userId, userName, scores }) => {
      const score = scores.reduce((pre, cur) => {
        const addition = cur === null ? 0 : cur;
        return (pre as number) + addition;
      }, 0) as number;
      const scoreText = score > 0 ? `+${score}` : `${score}`;
      return { userId, userName, scoreText };
    });
  }, [data]);

  const scoreDatas = useMemo(() => {
    return [...Array(10)].map((v, index) => {
      return data.map(({ scores }) => {
        const score = scores[index];
        if (score === null) {
          return '-';
        }
        if (score < 0) {
          return `${score}`;
        }
        const sign = score > 0 ? '+' : '';
        return `${sign}${score}`;
      });
    });
  }, [data]);

  return { headerUsers, scoreDatas };
};

export { useDataTable };
