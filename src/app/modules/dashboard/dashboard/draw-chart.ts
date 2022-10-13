import { DashboardEnum } from '../../../core/enums';
import { ChartInterface } from '../../../core/interfaces';
import { ChartOptions, ChartType } from 'chart.js';

export function drawChart(data: any, options: any, color: any, type: ChartType, isEnum = false): ChartInterface {
  return {
    value: getValues(data?.detail),
    label: getNamebyKeys(data?.detail, isEnum ? DashboardEnum : ''),
    type: type,
    options: {...options},
    color: color
  };
}

function getValues(value: any) {
  return Object.values(value);
}

function getNamebyKeys(label: any, enumLabel?: any) {
  return Object.keys(label).map((la: string) => {
    return enumLabel ? enumLabel[la] : la;
  });
}
