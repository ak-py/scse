var app = angular.module('SCSEConsole', []);
app.controller('consoleController', function ($scope, $http) {
  $http.get('/api/events')
    .then(function success(response) {
      $scope.events = response.data.events;
    }, function failure() {
      // TODO Show error
    });

  $scope.removeEvent = function (index) {
    $scope.events.splice(index, 1);
  };

  $scope.addEvent = function () {
    $scope.events.push({
      title: '',
      description: '',
      imgUrl: ''
    });
  };

  $scope.submit = function () {
    console.log('submitting', $scope.events, 'with key ' + $scope.key);
  }
});