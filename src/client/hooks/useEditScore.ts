import { useCallback, useMemo, useState } from 'react';
import { useOwnData } from './useOwnData';
import { useSelector } from './useSelector';
import { useWebSocket } from './useWebSocket';

const useEditScore = () => {
  const { battleIndex, ownScores } = useOwnData();
  const [score, setScore] = useState(
    (ownScores && ownScores[battleIndex]) || 0,
  );

  const userId = useSelector(({ user }) => user.id);
  const { sendMessage } = useWebSocket();

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

  const post = useCallback(() => {
    sendMessage({
      type: 'EDIT_SCORE',
      payload: {
        userId,
        battleIndex,
        score,
      },
    });
  }, [score, battleIndex, userId, sendMessage]);

  return { scoreText, edit, post };
};

export { useEditScore };
