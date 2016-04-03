'use strict';

(function(){

class RecordController {
  constructor(User) {
    // Use the Record $resource to fetch all users
    this.users = User.query();
  }
  
  delete(record) {
    record.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
}

angular.module('testProjectApp.records')
  .controller('RecordController', RecordController);
  
})();
