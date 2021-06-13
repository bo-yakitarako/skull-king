import { useMemo } from 'react';
import { useSelector } from './useSelector';

const useCanAddScore = () => {
  const scores = useSelector(
    ({ user, data }) => data.find(({ userId }) => userId === user.id)?.scores,
  );

  return useMemo(() => {
    if (typeof scores === 'undefined') {
      return false;
    }
    return scores.some((value) => value === null);
  }, [scores]);
};

export { useCanAddScore };
