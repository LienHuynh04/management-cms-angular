import { ColorChartConfig, OptionChartConfig } from '../core/interfaces';

export const OptionsChart: OptionChartConfig = {
  line: {
    responsive: true,
    aspectRatio: 1.5,
  },
  pie: {
    responsive: true,
    aspectRatio: 1.5,
  }
};

export const ColorChart: ColorChartConfig = {
  line: [
    {
      backgroundColor: 'rgba(78, 115, 223, 0.05)',
      borderColor: 'rgba(78, 115, 223, 1)',
      pointRadius: 3
    }
  ],
  pie: [
    {
      backgroundColor: [
        '#4e73df',
        '#1cc88a',
        '#8336cc',
        '#cc6336',
        '#c2cc36',
        '#36b9cc',
        '#d56069'
      ],
      hoverBackgroundColor: ['#2e59d9', '#17a673', '#2c9faf'],
      hoverBorderColor: 'rgba(234, 236, 244, 1)',
    }
  ]
};
