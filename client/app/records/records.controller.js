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
    // Delete record function    
    this.delete = Modal.confirm.delete(record => {
      record.$remove();
      this.records.splice(this.records.indexOf(record), 1);
    });
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
