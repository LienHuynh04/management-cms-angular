import { Color, Label } from 'ng2-charts';
import { ChartOptions, ChartType } from 'chart.js';
import { SingleOrMultiDataSet } from 'ng2-charts/lib/base-chart.directive';
import { InjectionToken } from '@angular/core';

export interface ChartInterface {
  value: SingleOrMultiDataSet | any;
  label: Label[];
  type: ChartType;
  options: ChartOptions;
  color: Color[];
}
export interface OptionChartConfig {
  line: ChartOptions;
  pie: ChartOptions;
  [key: string]: ChartOptions;
}

export interface ColorChartConfig {
  line: Color[];
  pie: Color[];
  [key: string]: Color[];
}

export const OPTION_CHART = new InjectionToken<OptionChartConfig>('OptionsChart');
export const COLOR_CHART = new InjectionToken<ColorChartConfig>('ColorChart');
