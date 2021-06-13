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

type WebSocketType = EditScore | RegisterName;

export { EditScore, RegisterName, WebSocketType };
