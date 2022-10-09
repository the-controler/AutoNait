var app = angular.module('plunker', []);

app.controller('MainCtrl', function($scope) {
  $scope.entities = [{
      name: 'one',
      checked: false
    }, {
      name: 'two',
      checked: false
    }
  ]

    $scope.updateSelection = function(position, entities) {
      angular.forEach(entities, function(subscription, index) {
        if (position != index) 
          subscription.checked = false;
      });
    }
  
});