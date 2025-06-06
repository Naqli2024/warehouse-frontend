import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import packedbubble from 'highcharts/modules/packed-bubble';

// Initialize the packed bubble module
packedbubble(Highcharts);

const PackedBubbleChart = () => {
  const options = {
    chart: {
      type: 'packedbubble',
      height: '400px',
    },
    title: {
      text: null,
    },
    tooltip: {
      pointFormat: '{point.name}: <b>{point.value}%</b>',
    },
    plotOptions: {
      packedbubble: {
        minSize: '30%',
        maxSize: '120%',
        zMin: 0,
        zMax: 100,
        layoutAlgorithm: {
          gravitationalConstant: 0.05,
          splitSeries: false,
        },
        dataLabels: {
          enabled: true,
          format: '{point.value}%',
          style: {
            color: 'white',
            textOutline: 'none',
            fontWeight: 'bold',
          },
        },
      },
    },
    series: [
      {
        name: 'Data',
        data: [
          { name: 'Large', value: 95 },
          { name: 'Small', value: 5 },
        ],
        colorByPoint: true,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default PackedBubbleChart;
