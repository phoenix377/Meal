'use strict';

(function() {

function MealResource($resource) {
  return $resource('/api/meals/:id/:controller', {
    id: '@_id'
  }, {
    getUserRecords: {
      method: 'GET',
      params: {
        id: 'user',
        controller: 'userid'
      }
    }
    // changePassword: {
    //   method: 'PUT',
    //   params: {
    //     controller: 'password'
    //   }
    // },
    // get: {
    //   method: 'GET',
    //   params: {
    //     id: 'me'
    //   }
    // }
  });
}

angular.module('testProjectApp.meal')
  .factory('Meal', MealResource);
  
})();
