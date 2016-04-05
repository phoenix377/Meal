'use strict';

(function(){

class UserController {
  constructor(User, Modal) {
    this.User = User;
    this.newUser = {name: 'Test User', email: 'test@example.com'};
    // Use the User $resource to fetch all users
    this.users = User.query();
    // Delete user function
    this.delete = Modal.confirm.delete(user => {
      user.$remove();
      this.users.splice(this.users.indexOf(user), 1);
    });
    // Update user information
    this.update = Modal.confirm.updateUser(user => {
      user.$update();
      for(var index = 0; index < this.users.length; index++) {
        if(this.users[index]._id === user._id) {
          this.users[index].name = user.name;
          this.users[index].email = user.email;
          break;
        }
      }
    });
    // Add new user
    this.add = Modal.confirm.updateUser(user => {
      var userCtrl = this;
      this.User.save(user, function(data) {
        userCtrl.users = userCtrl.User.query();
      }, function(err) {
        return safeCb(callback)(err);
      });
    });
  }
    
  // add() {
  //   var userCtrl = this;
  //   this.submitted = true;
  //   this.User.save({
  //     name: 'Test',
  //     email: 'test@example.com',
  //     password: 'test'
  //   },function(data) {
  //     userCtrl.users = userCtrl.User.query();
  //   }, function(err) {
  //     return safeCb(callback)(err);
  //   });
  // }
}

angular.module('testProjectApp.users')
  .controller('UserController', UserController);
  
})();
