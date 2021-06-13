import { useMemo } from 'react';
import { useSelector } from './useSelector';

const useScoreEdit = () => {
  const scores = useSelector(
    ({ user, data }) => data.find(({ userId }) => userId === user.id)?.scores,
  );

  const canAddScore = useMemo(() => {
    if (typeof scores === 'undefined') {
      return false;
    }
    return scores.some((value) => value === null);
  }, [scores]);

  return { canAddScore };
};

export { useScoreEdit };
