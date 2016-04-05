'use strict';

(function(){

class RecordController {
  constructor(Meal, Modal, Auth) {
    this.Meal = Meal;
    this.isAdmin = Auth.isAdmin;
    this.newRecord = {name: 'New Meal', calories: 100, date: new Date().toISOString()};
    this.toDate = new Date();
    this.fromDate = new Date(new Date().getFullYear().toString() + '-01-01');
     
    // Use the Record $resource to fetch all records
    if(this.isAdmin() === true) {
      this.records = Meal.query();
    }
    else {
      this.records = Meal.getUserRecords();
    }
    // Delete record
    this.delete = Modal.confirm.delete(record => {
      record.$remove();
      this.records.splice(this.records.indexOf(record), 1);
    });
    // Update record
    this.update = Modal.confirm.updateRecord(record => {
      record.$update();
      for(var index = 0; index < this.records.length; index++) {
        if(this.records[index]._id === record._id) {
          this.records[index].name = record.name;
          this.records[index].calories = record.calories;
          this.records[index].date = record.date;
          break;
        }
      }
    });
    // Add record
    this.add = Modal.confirm.updateRecord(record => {
      var recordCtrl = this;
      this.Meal.save(record, function(data) {
        recordCtrl.records.push(data);
      }, function(err) {
        return safeCb(callback)(err);
      });
    });
  }
  
  getDate(dateTime) {
    return new Date(dateTime).toDateString();
  }
  
  getLocalTime(dateTime) {
    return new Date(dateTime).toLocaleTimeString();
  }
  
  checkFilter(record) {
    var fromDate = new Date(this.fromDate);
    var toDate = new Date(this.toDate);
    var recordDate = new Date(record.date);
    if(recordDate > fromDate && recordDate < toDate) {
      return true;
    }
    return false;
  }
}

angular.module('testProjectApp.records')
  .controller('RecordController', RecordController);
  
})();
