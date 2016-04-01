// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('Possum', ['ionic'])

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

.controller('PossumCtrl', function($scope, $ionicModal) {
  BigNumber.config({ROUNDING_MODE: BigNumber.ROUND_HALF_UP})

  $scope.mortality = function(physScore, opScore) {
      // Ln R/1-R = -9.065 + (0.1692 x physiological score) + (0.1550 x operative severity score)
      var k = new BigNumber('-9.065');
      var physK = new BigNumber('0.1692');
      var phys = new BigNumber(physScore);
      var opK = new BigNumber('0.1550');
      var op = new BigNumber(opScore);
      var scoreSum = k.plus(physK.times(phys)).plus(opK.times(op));
      var hundred = new BigNumber('100');
      var mort = (Math.exp(scoreSum) / (Math.exp(scoreSum) + 1) * hundred);
      return mort.toFixed(1);
    };

  $scope.physScore = function(age, cardiac, resp, ecg, hr, sbp, gcs, hb, wbc, ur, na, k) {
    return age.value + cardiac.value + resp.value + ecg.value + hr.value + sbp.value + gcs.value + hb.value + wbc.value + ur.value + na.value + k.value;
  };

  $scope.opScore = function(sev, procs, bld, soil, malig, urg) {
    return sev.value + procs.value + bld.value + soil.value + malig.value + urg.value;
  };

  $scope.age = 1;

  $scope.ageOpts = {
    name: 'Age',
    options: [{
      name: '≤ 60',
      value: 1
    }, {
      name: '61 – 70',
      value: 2
    }, {
      name: '≥ 71',
      value: 4
    }]
  };

  $scope.cardiacOpts = {
    name: 'Cardiac',
    options: [{
      name: 'No failure',
      value: 1
    }, {
      name: 'Diuretic, digoxin, antianginal, or antihypertensives',
      value: 2
    }, {
      name: 'Oedema, warfarin, or borderline cardiomegaly',
      value: 4
    }, {
      name: 'Raised JVP or cardiomegaly',
      value: 8
    }]
  };

  $scope.respOpts = {
    name: 'Respiratory',
    options: [{
      name: 'No dyspnoea',
      value: 1
    }, {
      name: 'Exertional dyspnoea',
      value: 2
    }, {
      name: 'Limiting dyspnoea (1 flight)',
      value: 4
    }, {
      name: 'Dyspnoea at rest (≥ 30/min)',
      value: 8
    }]
  };

  $scope.ecgOpts = {
    name: 'ECG',
    options: [{
      name: 'Normal',
      value: 1
    }, {
      name: 'AF (rate 60 – 90)',
      value: 4
    }, {
      name: 'Any other abnormality',
      value: 8
    }, ]
  };

  $scope.hrOpts = {
    name: 'Pulse',
    options: [{
      name: '≤ 39',
      value: 8
    }, {
      name: '40 – 49',
      value: 2
    }, {
      name: '50 – 80',
      value: 1
    }, {
      name: '81 – 100',
      value: 2
    }, {
      name: '101 – 120',
      value: 4
    }, {
      name: '≥ 121',
      value: 8
    }]
  };

  $scope.sbpOpts = {
    name: 'Systolic BP',
    options: [{
      name: '≤ 89',
      value: 8
    }, {
      name: '90 – 99',
      value: 4
    }, {
      name: '100 – 109',
      value: 2
    }, {
      name: '110 – 130',
      value: 1
    }, {
      name: '131 – 170',
      value: 2
    }, {
      name: '≥ 171',
      value: 4
    }]
  };

  $scope.gcsOpts = {
    name: 'GCS',
    options: [{
      name: '15',
      value: 1
    }, {
      name: '12 – 14',
      value: 2
    }, {
      name: '9 – 11',
      value: 4
    }, {
      name: '≤ 8',
      value: 8
    }]
  };

  $scope.hbOpts = {
    name: 'Haemoglobin (g/L)',
    options: [{
      name: '≤ 99',
      value: 8
    }, {
      name: '110 – 114',
      value: 4
    }, {
      name: '115 – 129',
      value: 2
    }, {
      name: '130 – 160',
      value: 1
    }, {
      name: '161 – 170',
      value: 2
    }, {
      name: '171 – 180',
      value: 4
    }, {
      name: '≥ 181',
      value: 8
    }]
  };

  $scope.wbcOpts = {
    name: 'WBC (x 10^12/L)',
    options: [{
      name: '≤ 3.0',
      value: 4
    }, {
      name: '3.1 – 4.0',
      value: 2
    }, {
      name: '4.0 – 10.0',
      value: 1
    }, {
      name: '10.1 – 20.0',
      value: 2
    }, {
      name: '≥ 20.1',
      value: 4
    }]
  };

  $scope.urOpts = {
    name: 'Urea (mmol/L)',
    options: [{
      name: '≤ 7.5',
      value: 1
    }, {
      name: '7.6 – 10.0',
      value: 2
    }, {
      name: '10.1 – 15.0',
      value: 4
    }, {
      name: '≥ 15.1',
      value: 8
    }]
  };

  $scope.naOpts = {
    name: 'Sodium (mmol/L)',
    options: [{
      name: '≥ 136',
      value: 1
    }, {
      name: '131 – 135',
      value: 2
    }, {
      name: '126 – 130',
      value: 4
    }, {
      name: '≤ 125',
      value: 8
    }]
  };

  $scope.kOpts = {
    name: 'Potassium (mmol/L)',
    options: [{
      name: '≤ 2.8',
      value: 8
    }, {
      name: '2.9 – 3.1',
      value: 4
    }, {
      name: '3.2 – 3.4',
      value: 2
    }, {
      name: '3.5 – 5.0',
      value: 1
    }, {
      name: '5.1 – 5.3',
      value: 2
    }, {
      name: '5.4 – 5.9',
      value: 4
    }, {
      name: '≥ 6.0',
      value: 8
    }]
  };

  $scope.sevOpts = {
    name: 'Operation Severity',
    options: [
      {name: 'Minor', value: 1},
      {name: 'Moderate', value: 2},
      {name: 'Major', value: 4},
      {name: 'Complex Major', value: 8}
    ]
  };

  $scope.procsOpts = {
    name: 'Number of Procedures',
    options: [
      {name: '1', value: 1},
      {name: '2', value: 4},
      {name: '> 2', value: 8}
    ]
  };

  $scope.bldOpts = {
    name: 'Predicted Blood Loss (mL)',
    options: [
      {name: '≤100', value: 1},
      {name: '101 – 500', value: 2},
      {name: '501 – 999', value: 4},
      {name: '≥ 1000', value: 8}
    ]
  };

  $scope.soilOpts = {
    name: 'Peritoneal Soiling',
    options: [
      {name: 'None', value: 1},
      {name: 'Minor (serous fluid)', value: 2},
      {name: 'Local pus', value: 4},
      {name: 'Free bowel content, pus or blood', value: 8}
    ]
  };

  $scope.maligOpts = {
    name: 'Malignancy',
    options: [
      {name: 'None', value: 1},
      {name: 'Primary only', value: 2},
      {name: 'Nodal metastases', value: 4},
      {name: 'Distant metastases', value: 8}
    ]
  };

  $scope.urgOpts = {
    name: 'Urgency',
    options: [
      {name: 'Elective', value: 1},
      {name: 'Urgent', value: 4},
      {name: 'Emergency', value: 8}
    ]
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

})
