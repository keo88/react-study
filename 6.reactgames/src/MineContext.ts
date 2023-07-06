import React, { createContext } from 'react';
import { CellType, MineSearchAction } from './MineSearchModel';

export interface MineSearchContextType {
  tableData: CellType[][];
  dispatch: React.Dispatch<MineSearchAction>;
}

export const MineSearchContext = createContext<MineSearchContextType>({
  tableData: [],
  dispatch: () => {},
});
