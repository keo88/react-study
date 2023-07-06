import React, { createContext } from 'react';
import { MineSearchAction } from './MineSearchModel';

export interface MineSearchContextType {
  tableData: string[][];
  dispatch: React.Dispatch<MineSearchAction>;
}

export const MineSearchContext = createContext<MineSearchContextType>({
  tableData: [],
  dispatch: () => {},
});
