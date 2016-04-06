// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Possum', ['ionic', 'ngSanitize'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('PossumCtrl', function($scope, $http, $ionicModal) {
  BigNumber.config({ROUNDING_MODE: BigNumber.ROUND_HALF_UP})

  // Load data
  $http.get('js/variables.json').then(function(res){
    $scope.var = res.data;
  });

  $scope.data = {
    phys: {},
    op: {}
  };

  $scope.mortality = function() {
    // Ln R/1-R = -9.065 + (0.1692 x physiological score) + (0.1550 x operative severity score)
    var k = new BigNumber('-9.065');
    var physK = new BigNumber('0.1692');
    var phys = new BigNumber($scope.scoreSum().phys);
    var opK = new BigNumber('0.1550');
    var op = new BigNumber($scope.scoreSum().op);
    var score = k.plus(physK.times(phys)).plus(opK.times(op));
    var hundred = new BigNumber('100');
    var mort = (Math.exp(score) / (Math.exp(score) + 1) * hundred);
    return mort.toFixed(1);
  };

  $scope.prettyMortality = function() {
    // Check whether we've got complete data
    if (Object.keys($scope.data.phys).length < 12 || Object.keys($scope.data.op).length < 6) {
      return '<h1><i class="icon ion-more"></i></h1>';
    } else {
      return '<h1>' + $scope.mortality() + ' <small>%</small></h1>';
    }
  };

  $scope.visualRisk = function() {
    var mort = 100 - Math.round($scope.mortality());
    console.log(mort);
    var output = '';
    var i;
    var j;
    var k = 0;
    var iconAlive = '<div class="col"><i class="icon ion-ios-body alive"></i></div>';
    var iconDead = '<div class="col"><i class="icon ion-ios-body dead"></i></div>';
    for (i = 0; i < 10; i++) {
      var row = '<div class="row">';
      for (j = 0; j < 10; j++) {
        if (k < mort) {
          row += iconAlive;
        } else {
          row += iconDead;
        }
        k++
      }
      row += '</div>';
      output += row;
    }
    return output;
  };

  $scope.scoreSum = function() {
    var summed = {};
    summed.comp = false;
    var phys = 0;
    var op = 0;
    for (var key in $scope.data.phys) {
      phys += $scope.data.phys[key].value;
    };
    for (var key in $scope.data.op) {
      op += $scope.data.op[key].value;
    };
    summed.phys = phys;
    summed.op = op;
    return summed;
  };

  $ionicModal.fromTemplateUrl('about-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal
  })

  $scope.openModal = function() {
    $scope.modal.show()
  };

  $scope.closeModal = function() {
    $scope.modal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.modal.remove();
  });

  $ionicModal.fromTemplateUrl('person-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.personModal = modal
  })

  $scope.openPersonModal = function() {
    $scope.personModal.show()
  };

  $scope.closePersonModal = function() {
    $scope.personModal.hide();
  };

  $scope.$on('$destroy', function() {
    $scope.personModal.remove();
  });

})
