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

type Init = {
  type: 'INITIALIZE';
};

type WebSocketType = EditScore | RegisterName | ResetScores | ResetAll | Init;

export { EditScore, RegisterName, ResetScores, ResetAll, WebSocketType };
