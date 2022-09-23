import { InjectionToken } from '@angular/core';

export interface ColumnConfig {
  customer: ColumnInterface[];
  staff: ColumnInterface[];
  project: ColumnInterface[];
  customer_care: ColumnInterface[];
  role: ColumnInterface[];
  care: ColumnInterface[];

  [key: string]: ColumnInterface[];
}

export interface ColumnInterface {
  header: string;
  field: any;
  field_child?: string;
  style?: {
    width?: any;
  };
  thead?: boolean;
  slot?: string;
  rowspan?: number;
  colspan?: number;
  isAction?: boolean;
  hasLocked?: boolean;
  isLeft?: boolean;
  actions?: Action[];
}

interface Action {
  title?: string;
  router_link?: string;
  type?: string;
}

export const COLUMNS = new InjectionToken<ColumnConfig>('Columns');
