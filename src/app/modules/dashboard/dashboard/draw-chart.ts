import { ChartType } from 'chart.js';
import { ResultEnum } from '../../../core/enums';
import { ChartInterface } from '../../../core/interfaces';

export function drawChart(data: any, options: any, color: any, type: ChartType, isEnum = false): ChartInterface {
  return {
    value: getValues(data?.detail),
    label: getNamebyKeys(data?.detail, isEnum ? ResultEnum : ''),
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
