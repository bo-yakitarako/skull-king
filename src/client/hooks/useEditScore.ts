import { useCallback, useMemo, useState } from 'react';

const useEditScore = () => {
  const [score, setScore] = useState(0);

  const sign = useMemo(() => {
    return score > 0 ? '+' : '';
  }, [score]);
  const scoreText = useMemo(() => `${sign}${score}`, [sign, score]);

  const edit = useCallback(
    (amount: number) => () => {
      setScore((prev) => prev + amount);
    },
    [],
  );

  return { scoreText, edit };
};

export { useEditScore };
