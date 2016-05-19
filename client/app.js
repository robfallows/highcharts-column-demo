Template.showColChart.onCreated(function() {
  this.result = new ReactiveVar([]);
  this.ready = new ReactiveVar(false);
  Meteor.call('fetchChartData', (err, res) => {
    if (err) {
      console.log('It broke:', err);
    } else {
      this.result.set(res);
    }
  });
});

Template.showColChart.onRendered(function() {
  const colChart = $('#container');
  this.autorun(() => {
    if (!this.ready.get()) {
      colChart.highcharts({
        chart: {
          type: 'column',
        },
        title: {
          text: 'Monthly Users'
        },
        xAxis: {
          type: 'datetime',
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Users',
          },
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0,
          },
        },
      });
      this.ready.set(true);
    }
    try {
      if (this.ready.get()) {
        const data = this.result.get();
        if (data.length !== 0) {
          const chart = colChart.highcharts();
          chart.addSeries(data);
        }
      }
    } catch (err) {
      // Highcharts instance not set up - wait for next re-run
    }
  });
});

