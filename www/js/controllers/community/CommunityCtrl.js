angular.module('starter.controllers')
  .controller('CommunityCtrl', function ($scope, Discussions, TokenHandler, $http, $state, $ionicPopup, $rootScope, $ionicModal, $storageServices, $ionicTabsDelegate) {

    $scope.goForward = function () {
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1) {
        $ionicTabsDelegate.select(selected + 1);
      }
    };

    $scope.goBack = function () {
      var selected = $ionicTabsDelegate.selectedIndex();
      if (selected != -1 && selected != 0) {
        $ionicTabsDelegate.select(selected - 1);
      }
    };

    Discussions.all().$promise.then(function (response) {
      $scope.topics = response.data;
      $scope.included = response.included;
    });
    $scope.doRefresh = function () {
      Discussions.all().$promise.then(function (response) {
        $scope.topics = response.data;
        $scope.included = response.included;
      }).finally(function () {
        $scope.$broadcast('scroll.refreshComplete');
      })
    };

    if($rootScope.userId) {
      $scope.isLogin = true;
    }
  });
