'use strict';

(function(){

class RecordController {
  constructor(Meal) {
    // Use the Record $resource to fetch all records
    this.records = Meal.query();
  }
  
  delete(record) {
    record.$remove();
    this.records.splice(this.records.indexOf(record), 1);
  }
}

angular.module('testProjectApp.records')
  .controller('RecordController', RecordController);
  
})();
