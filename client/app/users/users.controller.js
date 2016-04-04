'use strict';

(function(){

class UserController {
  constructor(User) {
    this.User = User;
    // Use the User $resource to fetch all users
    this.users = User.query();
  }
  
  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }
  
  add() {
    var userCtrl = this;
    this.submitted = true;
    this.User.save({
      name: 'Test',
      email: 'test@example.com',
      password: 'test'
    },function(data) {
      userCtrl.users = userCtrl.User.query();
    }, function(err) {
      return safeCb(callback)(err);
    });
  }
}

angular.module('testProjectApp.users')
  .controller('UserController', UserController);
  
})();
