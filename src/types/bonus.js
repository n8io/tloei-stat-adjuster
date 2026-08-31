// 2026 scoring plan values. Every lineup spot is aimed at the same weekly
// benchmark; DL is trimmed and LB/DB gain bonuses ESPN cannot express.
const DL_AST = 6.8;
const DL_TKS = 22.4;

const LB_FRTD = 3.4;
const LB_INT = 1.8;
const LB_PD = 1.1;
const LB_FF = 1.1;
const LB_SK = 1.1;
const LB_FR = 0.7;
const LB_STF = 0.7;

const DB_INTTD = 12.3;
const DB_INT = 8.4;
const DB_PD = 5.2;
const DB_FF = 5.2;
const DB_SK = 5.2;
const DB_BLKK = 5.2;
const DB_TKS = 4.1;
const DB_FR = 3.1;
const DB_STF = 3.1;
const DB_TKA = 0.8;

// Declared but disabled (see stats/adjustments/index.js), unchanged for years.
const TE_REC = 10;
const TE_REC_YDS = 0.5;

export const Bonus = {
  DB_BLKK,
  DB_FF,
  DB_FR,
  DB_INT,
  DB_INTTD,
  DB_PD,
  DB_SK,
  DB_STF,
  DB_TKA,
  DB_TKS,
  DL_AST,
  DL_TKS,
  LB_FF,
  LB_FR,
  LB_FRTD,
  LB_INT,
  LB_PD,
  LB_SK,
  LB_STF,
  TE_REC,
  TE_REC_YDS,
};
