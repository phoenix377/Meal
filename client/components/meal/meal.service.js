'use strict';

(function() {

function MealResource($resource) {
  return $resource('/api/meals/:id', {
    id: '@_id'
  }, {
    getUserRecords: {
      method: 'GET',
      params: {
        id: 'user'
      },
      isArray: true
    }
  });
}

angular.module('testProjectApp.meal')
  .factory('Meal', MealResource);
  
})();
