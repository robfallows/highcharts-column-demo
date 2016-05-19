Meteor.methods({
  fetchChartData: function() {
    const data = [
      {"_id":{"month":4,"year":2016},"count":3},
      {"_id":{"month":5,"year":2016},"count":4},
      {"_id":{"month":3,"year":2016},"count":1}
    ].map((doc) => {
      return [new Date(+doc._id.year, doc._id.month - 1).valueOf(), doc.count];
    }).sort((a,b) => {
      return a[0] - b[0];
    });
    console.log(data);
    return { data };
  }
});
