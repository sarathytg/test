//angular.module('hCueLogin', ['ionic','ngCordova','ion-autocomplete','ui.router'])
angular.module('hCueLogin', ['ionic', 'services', 'controllers', 'ui.router','ngAutocomplete'])
 .run(function ($ionicPlatform) {
     $ionicPlatform.ready(function () {
         // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
         // for form inputs)
         if (window.cordova && window.cordova.plugins.Keyboard) {
             cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
         }
         if (window.StatusBar) {
             // org.apache.cordova.statusbar required
             StatusBar.styleDefault();
         }
     });
 })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
          .state('login', {
              cache: false,
              url: "/login",
              templateUrl: "templates/login.html"
          })
           
           .state('forgotpass', {
               cache: false,
               url: "/forgotpass",
               templateUrl: "templates/forgotpasword.html",
               controller :"hCueForgotpasswordController"
           }).state('register-1', {
              cache: false,
              url: "/register-1",
              templateUrl: "templates/register-1.html",
              controller :"hCueRegisterController"
          }).state('register-2', {
              cache: false,
              url: "/register-2",
              templateUrl: "templates/register-2.html",
              controller: "hCueRegisterController"
          })
          .state('register-3', {
              cache: false,
              url: "/register-3",
              templateUrl: "templates/register-3.html" ,
              controller :"hCueRegisterController"

          }).state('register-4', {
              cache: false,
              url: "/register-4",
              templateUrl: "templates/register-4.html",
              controller: "hCueRegisterController"

          }).state('register-5', {
              cache: false,
              url: "/register-5",
              templateUrl: "templates/register-5.html",
              controller: "hCueRegisterController"
          })
            .state('app', {
              url: "/app",
              abstract: true,
              templateUrl: "templates/menu.html"
           //   controller: 'hCueLeadController'
            })
             .state('app.changepass', {
                 cache: false,
                 url: "/changepass",
                 views: {
                     'menuContent': {
                         templateUrl: "templates/changepassword.html",
                         controller: "hCueChangepasswordController"
                     }
                 }
                 
             })
            .state('app.lead', {
                cache: false,
                url: "/lead",
                views: {
                    'menuContent': {
                        templateUrl: "templates/leads.html",
                        controller: "hCueLeadController"
                    }
                }
            })
            .state('app.profile', {
                cache: false,
                url: "/profile",
                views: {
                    'menuContent': {
                        templateUrl: "templates/about.html",
                        controller: "hCueProfileController"
                    }
                }
            })
            .state('app.stats', {
                cache: false,
                url: "/stats",
                views: {
                    'menuContent': {
                        templateUrl: "templates/stats.html" 
                    }
                }
            })
            .state('app.editprofile', {
                cache: false,
                url: "/editprofile",
                views: {
                    'menuContent': {
                        templateUrl: "templates/editprofile.html",
                        controller: "hCueProfileEditDetailController"
                    }
                }
            })
            .state('app.editprofileabout', {
                cache: false,
                url: "/editprofileabout",
                views: {
                    'menuContent': {
                        templateUrl: "templates/editprofileabout.html",
                        controller: "hCueProfileEditAboutController"
                    }
                }
            })
           /* .state('app.profiledelivery', {
                cache: false,
                url: "/profiledelivery",
                views: {
                    'menuContent': {
                        templateUrl: "templates/profile-delivery.html",
                        controller: "hCueProfileController"
                    }
                }
            })*/
             .state('app.editprofiledelivery', {
                 cache: false,
                 url: "/editprofiledelivery",
                 views: {
                     'menuContent': {
                         templateUrl: "templates/editprofile-delivery.html",
                         controller: "hCueProfileEditDeliveryController"
                     }
                 }
             }).state('app.editprofilehours', {
                 cache: false,
                 url: "/editprofilehours",
                 views: {
                     'menuContent': {
                         templateUrl: "templates/editprofile-hours.html",
                         controller: "hCueProfileEditBusinessHoursController"
                     }
                 }
             })
           /* .state('app.profilehr', {
                cache: false,
                url: "/profilehr",
                views: {
                    'menuContent': {
                        templateUrl: "templates/profile-hours.html",
                        controller: "hCueProfileController"
                    }
                }  
             // templateUrl: "templates/leads.html", 
                // controller: "hCueLeadController"
            }) */
            .state('app.leaddetail-1', {
                cache: false,
                url: "/leaddetail-1",
                views: {
                    'menuContent': {
                        templateUrl: "templates/pharmacy-lead-detail-page-1.html",
                        controller: "hCueLeadItemController"
                    }
                }
            })
            .state('app.acceptedleaddetails-1', {
                cache: false,
                url: "/acceptedleaddetails-1",
                views: {
                    'menuContent': {
                        templateUrl: "templates/pharmacy-acceptedlead-detail-page-1.html",
                        controller: "hCueActiveLeadItemController"
                    }
                }
            })
        .state('app.mapview', {
            cache: false,
            url: "/mapview",
            views: {
                'menuContent': {
                    templateUrl: "templates/mapview.html",
                    controller: "MapCtrl"
                }
            }
        })
        ;
  $urlRouterProvider.otherwise('/login');
})
.constant('hcueServiceUrl', {
    'readLookup': 'http://hcuedev-doc.elasticbeanstalk.com/doctors/readLookup',
    'pharmaLogin': 'http://hcuedev-plt.elasticbeanstalk.com/platformPartners/validate/PharmaLogin',
    'pharmaSignup': ' http://hcuedev-plt.elasticbeanstalk.com/platformPartners/addPharma',
    'pharmaSignupUpdate': 'http://hcuedev-plt.elasticbeanstalk.com/platformPartners/updatePharma',
    
    'pharmaAddSchedule': 'http://hcuedev-plt.elasticbeanstalk.com/platformPartners/addPharmaAppointments',
    'pharmaLeads': 'http://hcuedev-plt.elasticbeanstalk.com/platformPartners/getPharmaLeads',
    'updatePrescription' : 'http://hcuedev-pat.elasticbeanstalk.com/patientCase/updatePatientCasePrescriptionStatus'
})
/*
$scope.disableTap = function(){
    container = document.getElementsByClassName('pac-container');
    // disable ionic data tab
    angular.element(container).attr('data-tap-disabled', 'true');
    // leave input field if google-address-entry is selected
    angular.element(container).on("click", function(){
        document.getElementById('your_input_id').blur();
    });
  }
  */
.directive('disableTap', function ($timeout) {
        return {
            link: function () {
                $timeout(function () {
                    // Find google places div
                    _.findIndex(angular.element(document.querySelectorAll('.pac-container')), function (container) {
                        // disable ionic data tab
                        container.setAttribute('data-tap-disabled', 'true');
                        // leave input field if google-address-entry is selected
                        container.onclick = function () {
                            document.getElementById('autocomplete').blur();
                        };
                    });
                }, 500);
            }
        };
    })
 .directive('flippy', function () {
     return {
         restrict: 'EA',
         link: function ($scope, $elem, $attrs) {

             var options = {
                 flipDuration: ($attrs.flipDuration) ? $attrs.flipDuration : 400,
                 timingFunction: 'ease-in-out',
             };

             // setting flip options
             angular.forEach(['flippy-front', 'flippy-back'], function (name) {
                 var el = $elem.find(name);
                 if (el.length == 1) {
                     angular.forEach(['', '-ms-', '-webkit-'], function (prefix) {
                         angular.element(el[0]).css(prefix + 'transition', 'all ' + options.flipDuration / 1000 + 's ' + options.timingFunction);
                     });
                 }
             });

             /**
              * behaviour for flipping effect.
              */
             $scope.flip = function () {

                 $elem.toggleClass('flipped');

                  
                 $scope.showpast = !$scope.showpast;
                 if (!$scope.showpast) {
                     $scope.caption = "View on Map";
                 }
                 else {
                     $scope.caption = "View on details";
                 }
             }

         }
     };
 })