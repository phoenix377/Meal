'use strict';

(function(){

class RecordController {
  constructor(Meal, Modal, Auth) {
    this.Meal = Meal;
    this.isAdmin = Auth.isAdmin;
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
  }
  
  getDate(dateTime) {
    return new Date(dateTime).toDateString();
  }
  
  getLocalTime(dateTime) {
    return new Date(dateTime).toLocaleTimeString();
  }
  
  add() {
    var recordCtrl = this;
    this.submitted = true;
    this.Meal.save({
      name: "Test",
      calories: 100,
      date: new Date()
    }, function(data) {
      recordCtrl.records.push(data);
    }, function(err) {
      return safeCb(callback)(err);
    });
  }
}

angular.module('testProjectApp.records')
  .controller('RecordController', RecordController);
  
})();
