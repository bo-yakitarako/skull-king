import { useMemo } from 'react';
import { useShallowEqualSelector } from './useShallowEqualSelector';

const useOwnData = () => {
  const { ownId, data, editIndex } = useShallowEqualSelector(
    ({ user, data, editIndex }) => ({
      ownId: user.id,
      editIndex,
      data,
    }),
  );

  const ownScores = useMemo(() => {
    return data.find(({ userId }) => userId === ownId)?.scores;
  }, [ownId, data]);

  const battleIndex = useMemo(() => {
    if (typeof ownScores === 'undefined') {
      return 0;
    }
    if (editIndex > 0) {
      return editIndex;
    }
    const reversed = [...ownScores].reverse();
    const lastBattleIndexFromLast = reversed.findIndex(
      (value) => value !== null,
    );
    if (lastBattleIndexFromLast < 0) {
      return 0;
    }
    return ownScores.length - lastBattleIndexFromLast;
  }, [ownScores, editIndex]);

  return { ownScores, battleIndex };
};

export { useOwnData };
