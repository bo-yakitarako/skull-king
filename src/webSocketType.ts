type EditScore = {
  type: 'EDIT_SCORE';
  payload: {
    userId: number;
    battleIndex: number;
    score: number;
  };
};

type RegisterName = {
  type: 'REGISTER_NAME';
  payload: {
    userName: string;
  };
};

type ResetScores = {
  type: 'RESET_SCORES';
};

type ResetAll = {
  type: 'RESET_ALL';
};

type WebSocketType = EditScore | RegisterName | ResetScores | ResetAll;

export { EditScore, RegisterName, ResetScores, ResetAll, WebSocketType };
