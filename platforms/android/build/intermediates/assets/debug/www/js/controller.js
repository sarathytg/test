angular.module('controllers', [])


.controller('hCueLoginController', function ($scope, $http, $ionicModal, $ionicLoading, $location, $ionicSideMenuDelegate, hcueServiceUrl, hcuePharmaService, $state) {

    $scope.userdspflag = false;
    $scope.nopswdflag = false;
    $scope.pswddspflag = false;

    $scope.useremailidmodel = "enter your email id";
    $scope.passwordmodel = "";

    $scope.loginclick = function (useremailidmodel, passwordmodel) {

        $scope.userdspflag = false;
        $scope.nopswdflag = false;
        $scope.pswddspflag = false;
         
        if (useremailidmodel == "" || useremailidmodel == "enter your email id") {
            $scope.userdspflag = true;
            return;
        }
        if (passwordmodel == "") {
            $scope.nopswdflag = true;
            return;
        }
        $ionicLoading.show({
            //duration: 30000,
            noBackdrop: true,
            template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>' // '<ion-spinner icon="crescent" class="spinner spinner-crescent" style="background-color:white"><svg viewBox="0 0 64 64"><g><circle stroke-width="4" stroke-dasharray="128" stroke-dashoffset="82" r="26" cx="32" cy="32" fill="none" transform="rotate(243.761 32 32)"><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></circle></g></svg></ion-spinner>' // '<p class="item-icon-left">Loading stuff...<ion-spinner icon="lines"/></p>' 

        });
        //// Make http Post call

        $http.post(hcueServiceUrl.pharmaLogin, { "pharmaLoginID": useremailidmodel, "pharmaPassword": passwordmodel })
        .success(function (data) {

            if (data.PharmaDetails == null || data == "Invalid User Name / Password") {
                $scope.pswddspflag = true;
                return;
            }
            else {
                
                if (data.PharmaDetails != null) {
                    var pharmadtl = data.PharmaDetails;
                    var address = data.PharmaAddress;
                    var pharmaconsulthrs = data.PharmaConsultation;
                    hcuePharmaService.addPharmaLoginDetails(pharmadtl.PharmaID, pharmadtl.EmailAddress, '', '');
                    hcuePharmaService.addPharmaDetails(pharmadtl.PharmaName, pharmadtl.MobileNumber, pharmadtl.WebSite, pharmadtl.TINNumber, address.Address1, address.Address2,address.Latitude,address.Longitude);  //register details page 2
                    hcuePharmaService.addAboutPharmaDetails(pharmadtl.ContactName, pharmadtl.About);      //register details page 3

                    //**** Modify json of consultation to match the structure in the service.js businesshours=[]
                    hcuePharmaService.setDeliveryDistance(pharmadtl.FreeDeliveryDist);
                    hcuePharmaService.updateDeliveryExecutives(pharmadtl.DeliveryPersonInfo);
                    hcuePharmaService.updatePharmacyBusinessHours(pharmaconsulthrs);
                   
                   // console.log(hcuePharmaService.getRegisterDetails());
                }
                $ionicLoading.hide();
                $state.go('app.lead');
            }
        })
        .error(function (data) {
            $ionicLoading.hide();
            alert("Please check the internet connectivity!!!");
        })

    };


})

.controller('hCueForgotpasswordController', function ($scope, $http, $ionicModal, $ionicLoading, $location, $ionicSideMenuDelegate, hcueServiceUrl, hcuePharmaService, $state) {
    $scope.mailidmodel = "enter your email id";
    $scope.phonenumbermodel = "enter your phone number";

    $scope.ForgotPassword = function (emailid, phonenumber) {
        $scope.errormsg = false;
      
        var phone = phonenumber;
        if (emailid == "enter your email id")
        { emailid = ""; }
        if (phone == "enter your phone number")
        { phone = ""; }

        console.log(phone);
        if (emailid == "" && phone == "") {
            $scope.errormsg = true;
            return;
        }
        //http post

        // http post ends
    }
})

.controller('hCueChangepasswordController', function ($scope, $http, $ionicModal, $ionicLoading, $location, $ionicSideMenuDelegate, hcueServiceUrl, hcuePharmaService, $state) {
    $scope.password = "";
    $scope.confirmpassword = "";

    $scope.errormsg = "Enter new Password.";
    $scope.errorflg = false;

    $scope.ChangePassword = function (password,confirmpassword) {
        $scope.errormsg = false;

        var pwd = password;
        var confirmpwd = confirmpassword;
        if (pwd == "") {
            $scope.errormsg = "Enter new Password.";
            $scope.errorflg = true;
            return;
        }
        if (confirmpwd == "")
        {
            $scope.errormsg = "Enter confirmation Password.";
            $scope.errorflg = true;
            return;
        }
        if (confirmpwd != pwd) {
            $scope.errormsg = "Both Password /Confirmation Password should match.";
            $scope.errorflg = true;
            return;
        }
        alert("Service to change: currently not updating");

        $ionicLoading.show({
            //duration: 30000,
            noBackdrop: true,
            template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>' // '<ion-spinner icon="crescent" class="spinner spinner-crescent" style="background-color:white"><svg viewBox="0 0 64 64"><g><circle stroke-width="4" stroke-dasharray="128" stroke-dashoffset="82" r="26" cx="32" cy="32" fill="none" transform="rotate(243.761 32 32)"><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></circle></g></svg></ion-spinner>' // '<p class="item-icon-left">Loading stuff...<ion-spinner icon="lines"/></p>' 

        });
        //http post
        var params = { "PharmaPassword": password, "PharmaConfirmPassword": confirmpassword, "USRType": "PHARMA", "PharmaID": hcuePharmaService.getLoginUserId(), "USRId": hcuePharmaService.getLoginUserId() };
        $http.post(hcueServiceUrl.pharmaSignupUpdate, params)
        .success(function (data) {
            if (data.PharmaDetails != null) {
                
                $ionicLoading.hide();
                $state.go('app.lead');
            }
            //  
        })
        .error(function (data) {
            $ionicLoading.hide();
            alert("Please check the internet connectivity!!!");
        });
        // http post ends
    }
})


.controller('hCueRegisterController', function ($scope, $http, $ionicModal, $ionicLoading, $location, $ionicSideMenuDelegate, hcueServiceUrl, hcuePharmaService, $state) {

    $scope.Register = hcuePharmaService.getRegisterDetails();
    $scope.pageno = 0;
    $scope.mailidmodel = "enter your email id";
    $scope.phonenumbermodel = "enter your phone number";

    $scope.businesshouritems = hcuePharmaService.getBusinessHours();
    $scope.businesshouritemsUI = hcuePharmaService.getUIBusinessHours();
    $scope.delivery = hcuePharmaService.getDeliveryDetails();

    ////////////////Default static values//////////////
    $scope.toggleGroup = function (item) {
        if ($scope.isGroupShown(item)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = item;
        }
    };
    $scope.isGroupShown = function (item) {
        return $scope.shownGroup == item;
    };
    $scope.showArrowUpDown = function (item) {
        if ($scope.shownGroup == item)
            return "ion-ios-arrow-up";
        else
            return "ion-ios-arrow-down";
    };
    $scope.RegisterClick = function (pageno, datamodel) {
        $scope.pageno = pageno;

        console.log("register 1 clicked - intialize");
        $scope.errormsg = "Enter Pharmacy Name.";
        $scope.errorflg = false;

        $scope.alreadyexists = false;
        var emailfilter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;



        if (pageno == 2) //Validate Registration Details Page 1
        {
            var emailid = datamodel[0].Email;
            var password = datamodel[0].Password;
            var confirmpassword = datamodel[0].ConfirmPassword;
            if (emailid == "" || emailid == 'example@example.com') {
                $scope.errormsg = "Enter Email ID.";
                $scope.errorflg = true;
                return;
            }
            if (!emailfilter.test(emailid)) {
                $scope.errormsg = "Enter Valid Email.";
                $scope.errorflg = true;
                return;
            }
            if (password == "" || confirmpassword == "") {
                $scope.errormsg = "Enter Password / Confirm Password.";
                $scope.errorflg = true;
                return;
            }
            if (password != confirmpassword) {
                $scope.errormsg = "Password / Confirm password should match.";
                $scope.errorflg = true;
                return;
            }

            //************************Login Service Call************************************//
            $ionicLoading.show({
                //duration: 30000,
                noBackdrop: true,
                template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>' // '<ion-spinner icon="crescent" class="spinner spinner-crescent" style="background-color:white"><svg viewBox="0 0 64 64"><g><circle stroke-width="4" stroke-dasharray="128" stroke-dashoffset="82" r="26" cx="32" cy="32" fill="none" transform="rotate(243.761 32 32)"><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></circle></g></svg></ion-spinner>' // '<p class="item-icon-left">Loading stuff...<ion-spinner icon="lines"/></p>' 

            });

            var params = { "PharmaPassword": password, "PharmaConfirmPassword": confirmpassword, "USRType": "PHARMA", "PharmaLoginID": emailid, "USRId": 0 };
            $http.post(hcueServiceUrl.pharmaSignup, params)
            .success(function (data) {
                $ionicLoading.hide();
                if (data.ExceptionType == "PSQLException" && data.Message.indexOf("duplicate") != -1) {
                    $scope.alreadyexists = true;
                    return;
                }
                if (data.PharmaDetails != null) {

                    var pharmadtl = data.PharmaDetails;
                    hcuePharmaService.addPharmaLoginDetails(pharmadtl.PharmaID, pharmadtl.EmailAddress, password, confirmpassword);

                    $state.go('register-' + pageno);
                }
                //  
            })
            .error(function (data) {
                $ionicLoading.hide();
                alert("Please check the internet connectivity!!!");
            });

            //************************Login Service Call************************************//
        }

        if (pageno == 3) //Validate Registration Details Page 1
        {
            var pharmaname = datamodel[0].PharmaName;
            var phoneno = datamodel[0].ContactNumber;
            var website = datamodel[0].Website;
            var tin = datamodel[0].Tin;
            var add1 = datamodel[0].Address1;
            var add2 = datamodel[0].Address2;
           // var lat = ngautocomplete_place_latitude;  //Variable refered in ngAutoComplete to avoid another service call
           // var lng = ngautocomplete_place_longitude;

            var lat = 0;
            var lng = 0;

            if (!angular.isUndefined($scope.latlng)) {
                lat = $scope.latlng.geometry.location.lat();  //Variable refered in ngAutoComplete to avoid another service call
                lng = $scope.latlng.geometry.location.lng();

            }
            //alert(place.geometry.location.lat());//alert(place.geometry.location.lng());

            if (pharmaname == "" || pharmaname == 'My Pharmacy') {
                $scope.errormsg = "Enter Pharmacy Name.";
                $scope.errorflg = true;
                return;
            }
            if (phoneno == "" || phoneno == '91' || isNaN(phoneno)) {
                $scope.errormsg = "Enter a valid Contact Number.";
                $scope.errorflg = true;
                return;
            }
          /*  if (tin != "" && isNaN(tin)) {
                $scope.errormsg = "TIN should be numeric";
                $scope.errorflg = true;
                return;
            } */
            if (add1 == "" && add2 == "") {
                $scope.errormsg = "Enter Address1 /Address";
                $scope.errorflg = true;
                return;
            }
            //************************Update Service Call - Pharma details************************************//
            var params = { "WebSite": website, "Longitude": lng.toString(), "Latitude": lat.toString(), "USRType": "PHARMA", "MobileNumber": parseInt(phoneno), "Address2": add2, "Address1": add1, "USRId": hcuePharmaService.getLoginUserId(), "PharmaName": pharmaname, "TINNumber": tin.toString(), "PharmaID": hcuePharmaService.getLoginUserId() };
            if (lat.toString() == "0" && lng.toString() == "0") { //In edit mode when location is not changed the value is return 0, and earlier selected values is replaced, hence check to avoid update to lat/lng
                var params = { "WebSite": website,  "USRType": "PHARMA", "MobileNumber": parseInt(phoneno), "Address2": add2, "Address1": add1, "USRId": hcuePharmaService.getLoginUserId(), "PharmaName": pharmaname, "TINNumber": tin.toString(), "PharmaID": hcuePharmaService.getLoginUserId() };
            }
             
            
            $ionicLoading.show({
                //duration: 30000,
                noBackdrop: true,
                template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>' // '<ion-spinner icon="crescent" class="spinner spinner-crescent" style="background-color:white"><svg viewBox="0 0 64 64"><g><circle stroke-width="4" stroke-dasharray="128" stroke-dashoffset="82" r="26" cx="32" cy="32" fill="none" transform="rotate(243.761 32 32)"><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></circle></g></svg></ion-spinner>' // '<p class="item-icon-left">Loading stuff...<ion-spinner icon="lines"/></p>' 

            });
            $http.post(hcueServiceUrl.pharmaSignupUpdate, params)
            .success(function (data) {
                $ionicLoading.hide();
                if (data.PharmaDetails != null) {
                    var pharmadtl = data.PharmaDetails;
                    var address = data.PharmaAddress;
                    hcuePharmaService.addPharmaDetails(pharmadtl.PharmaName, pharmadtl.MobileNumber, pharmadtl.WebSite, pharmadtl.TINNumber, address.Address1, address.Address2, address.Latitude, address.Longitude);  //register details page 2
                    //console.log(hcuePharmaService.getRegisterDetails());
                    $state.go('register-' + pageno);
                }
                //  
            })
            .error(function (data) {
                $ionicLoading.hide();
                alert("Please check the internet connectivity!!!");
            });

            //************************Update Service Call - Pharma details************************************//
            // hcuePharmaService.addPharmaDetails(pharmaname, phoneno,website, tin, add1, add2);
        }

        if (pageno == 4) {
            var contactname = datamodel[0].about.ContactName;
            var description = datamodel[0].about.Description;
            if (contactname == "") {
                $scope.errormsg = "Enter Contact Name.";
                $scope.errorflg = true;
                return;
            }
            if (description == "") {
                $scope.errormsg = "Enter About.";
                $scope.errorflg = true;
                return;
            }
            //************************Update Service Call - About Pharma details************************************//
            $ionicLoading.show({
                //duration: 30000,
                noBackdrop: true,
                template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>' // '<ion-spinner icon="crescent" class="spinner spinner-crescent" style="background-color:white"><svg viewBox="0 0 64 64"><g><circle stroke-width="4" stroke-dasharray="128" stroke-dashoffset="82" r="26" cx="32" cy="32" fill="none" transform="rotate(243.761 32 32)"><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></circle></g></svg></ion-spinner>' // '<p class="item-icon-left">Loading stuff...<ion-spinner icon="lines"/></p>' 

            });
            var params = { "ContactName": contactname, "AboutPharmacy": description, "USRType": "PHARMA", "PharmaID": hcuePharmaService.getLoginUserId(), "USRId": hcuePharmaService.getLoginUserId() };
            $http.post(hcueServiceUrl.pharmaSignupUpdate, params)
            .success(function (data) {
               // console.log("Sucess update about details");
                $ionicLoading.hide();
                if (data.PharmaDetails != null) {
                    var pharmadtl = data.PharmaDetails;
                    hcuePharmaService.addAboutPharmaDetails(contactname, description);
                   // console.log(hcuePharmaService.getRegisterDetails());
                    $state.go('register-' + pageno);
                }
                //  
            })
            .error(function (data) {
                $ionicLoading.hide();
                alert("Please check the internet connectivity!!!");
            });

            //************************Update Service Call - About Pharma details************************************//

        }
        if (pageno == 5) {
            
            //************************Update Service Call - business hr Pharma details************************************//

            var businesshrs = [];

            angular.forEach(datamodel, function (item) {
                if (item.Working) {
                    var businesshr = {};
                    businesshr["DayCD"] = item.DayCD;
                    businesshr["StartTime"] = item.StartTime;
                    businesshr["EndTime"] = item.EndTime;
                    businesshrs.push(businesshr);
                }
            });
           
            $ionicLoading.show({
                //duration: 30000,
                noBackdrop: true,
                template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>' // '<ion-spinner icon="crescent" class="spinner spinner-crescent" style="background-color:white"><svg viewBox="0 0 64 64"><g><circle stroke-width="4" stroke-dasharray="128" stroke-dashoffset="82" r="26" cx="32" cy="32" fill="none" transform="rotate(243.761 32 32)"><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></circle></g></svg></ion-spinner>' // '<p class="item-icon-left">Loading stuff...<ion-spinner icon="lines"/></p>' 

            });
            var params = { "consultationRecord": businesshrs, "USRType": "PHARMA", "USRId": hcuePharmaService.getLoginUserId(), "PharmaID": hcuePharmaService.getLoginUserId() };
            $http.post(hcueServiceUrl.pharmaAddSchedule, params)
            .success(function (data) {
                $ionicLoading.hide();
                if (data.PharmaDetails != null) {
                    var pharmadtl = data.PharmaDetails;
                    var pharmaconsulthrs = data.PharmaConsultation;
                    hcuePharmaService.updatePharmacyBusinessHours(pharmaconsulthrs);
                    //console.log(hcuePharmaService.getRegisterDetails());
                    $state.go('register-' + pageno);
                }
                //  
            })
            .error(function (data) {
                $ionicLoading.hide();
                alert("Please check the internet connectivity!!!");
            });

            //************************Update Service Call - business hr Pharma details************************************//
            // 
        }
        if (pageno == 6) {
            
            //************************Update Service Call - delivery Pharma details************************************//
            var deliveryjs = {};

            angular.forEach(datamodel.deliveryExecutive, function (item) {
                deliveryjs[item.PhoneNumber] = item.ExecutiveName;
            });


            $ionicLoading.show({
                //duration: 30000,
                noBackdrop: true,
                template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>' // '<ion-spinner icon="crescent" class="spinner spinner-crescent" style="background-color:white"><svg viewBox="0 0 64 64"><g><circle stroke-width="4" stroke-dasharray="128" stroke-dashoffset="82" r="26" cx="32" cy="32" fill="none" transform="rotate(243.761 32 32)"><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></circle></g></svg></ion-spinner>' // '<p class="item-icon-left">Loading stuff...<ion-spinner icon="lines"/></p>' 

            });
            var params = { "USRType": "PHARMA", "DeliveryPersonInfo": deliveryjs, "FreeDeliveryDist": parseInt(datamodel.distance), "USRId": hcuePharmaService.getLoginUserId(), "PharmaID": hcuePharmaService.getLoginUserId() };
           
            $http.post(hcueServiceUrl.pharmaSignupUpdate, params)
            .success(function (data) {
                $ionicLoading.hide();
                if (data.PharmaDetails != null) {
                     var pharmadtl = data.PharmaDetails;
                    var address = data.PharmaAddress;
                    var pharmaconsulthrs = data.PharmaConsultation;
                    hcuePharmaService.addPharmaLoginDetails(pharmadtl.PharmaID, pharmadtl.EmailAddress, '', '');
                    hcuePharmaService.addPharmaDetails(pharmadtl.PharmaName, pharmadtl.MobileNumber, pharmadtl.WebSite, pharmadtl.TINNumber, address.Address1, address.Address2, address.Latitude, address.Longitude);  //register details page 2
                    hcuePharmaService.addAboutPharmaDetails(pharmadtl.ContactName, pharmadtl.About);      //register details page 3

                    //**** Modify json of consultation to match the structure in the service.js businesshours=[]
                    hcuePharmaService.setDeliveryDistance(pharmadtl.FreeDeliveryDist);
                    hcuePharmaService.updateDeliveryExecutives(pharmadtl.DeliveryPersonInfo);


                    hcuePharmaService.updatePharmacyBusinessHours(pharmaconsulthrs);
                    console.log(hcuePharmaService.getRegisterDetails());

                    $state.go('app.lead');
                }
                //  
            })
            .error(function (data) {
                $ionicLoading.hide();
                alert("Please check the internet connectivity!!!");
            });

            //************************Update Service Call - delivery hr Pharma details************************************//


            // hcuePharmaService.updateDeliveryExecutives(datamodel);

            console.clear();
            console.log("********Saving data");
            console.log(hcuePharmaService.getRegisterDetails());
            console.log(hcuePharmaService.getBusinessHours());
            console.log(hcuePharmaService.getDeliveryExecutives());
            console.log("********Saving data");

            alert("Registered User");
            return;
        }

        /*   var pagepath = 'register-=' + pageno;
           console.log(pagepath);
           $scope.pageno = pageno;
           $state.go('register-' + pageno); */
        //// Http post call ends


    };
    $scope.ApplyToAll = function (item) {

        angular.forEach($scope.businesshouritemsUI, function (scheduleItem) {
           // console.log(scheduleItem.ApplyTo);
            if (false == scheduleItem.ApplyTo) {
                scheduleItem.StartTimeHH = item.StartTimeHH;
                scheduleItem.StartTimeMM = item.StartTimeMM;
                scheduleItem.StartTime = item.StartTimeHH + ':' + item.StartTimeMM;
                scheduleItem.EndTimeHH = item.EndTimeHH;
                scheduleItem.EndTimeMM = item.EndTimeMM;
                scheduleItem.EndTime = item.EndTimeHH + ':' + item.EndTimeMM;
                scheduleItem.Working = item.Working;
            }

        });
        /*  console.log(item);
          console.log($scope.businesshouritems);
          console.log(item.StartTimeMM);
          console.log(item.StartTimeCD);*/
    }
    $scope.OnScheduleEdit = function (item) {

        item.StartTime = item.StartTimeHH + ':' + item.StartTimeMM;
        item.EndTime = item.EndTimeHH + ':' + item.EndTimeMM;
        item.ApplyTo = true;

    }

    $scope.AddExecutive = function () {
        var newitem = { PhoneNumber: '91', ExecutiveName: 'Delivery Executive' };
        $scope.delivery.deliveryExecutive.push(newitem);

    }
    $scope.RemoveExecutive = function (item) {
        
        var index = $scope.delivery.deliveryExecutive.indexOf(item);
        $scope.delivery.deliveryExecutive.splice(index, 1);

    }

    $scope.NavigateBack = function () {
        window.history.back();
    }
})

.controller('hCueLeadController', function ($scope, $http, $filter, $ionicPopup, $ionicLoading, $location, $ionicSideMenuDelegate, hcueServiceUrl, hcuePharmaService, hcuePharmaLeadService, $state) {
   
   
   /* $scope.showPopup = function () {
        var alertPopup = $ionicPopup.confirm({
            title: 'Delivery',
            template: 'Is the shipment made?' 
        });
        alertPopup.then(function (res) {
            console.log('Call postback');
        });
    };
    */
    $scope.toggleMenu = function () {
        $scope.sideMenuController.toggleLeft();
    }
    /*  $scope.leftButtons = [{
          type: 'button-icon icon ion-navicon',
          tap: function (e) {
              $scope.toggleMenu();
          }
      }];*/
    ///*******************************Get Leads Service Call*********************//


    $ionicLoading.show({
        //duration: 30000,
        noBackdrop: true,
        template: '<p class="item-icon-left">Loading...<ion-spinner icon="lines"/></p>' // '<ion-spinner icon="crescent" class="spinner spinner-crescent" style="background-color:white"><svg viewBox="0 0 64 64"><g><circle stroke-width="4" stroke-dasharray="128" stroke-dashoffset="82" r="26" cx="32" cy="32" fill="none" transform="rotate(243.761 32 32)"><animateTransform values="0,32,32;360,32,32" attributeName="transform" type="rotate" repeatCount="indefinite" dur="750ms"></animateTransform></circle></g></svg></ion-spinner>' // '<p class="item-icon-left">Loading stuff...<ion-spinner icon="lines"/></p>' 

    });
    var startdt = $filter('date')(new Date(), "yyyy-MM-dd");
   
    var enddt =  new moment(startdt).add("days", 1).format('YYYY-MM-DD');
    $scope.pharmaLeads = [];
   // alert(enddt + "hardcoded");
    //var params = { "StartData": todaydt, "EndData": todaydt, "PageSize": 10, "PageNumber": 1, "PharmaID": hcuePharmaService.getLoginUserId(), "Status": "FRDP" };
    //FRDP
    //ACPH
    //Now sending only INIT as doctor post status as INIT // confirmed the same with service call.
    var pharmaid = hcuePharmaService.getLoginUserId();
    pharmaid = parseFloat(pharmaid);
    var params = { "Status": "INIT", "EndData": enddt, "PageSize": 10, "PageNumber": 1, "StartData": startdt, "PharmaID": pharmaid };
    var acceptedparams = { "Status": "ACPH", "EndData": enddt, "PageSize": 10, "PageNumber": 1, "StartData": startdt, "PharmaID": pharmaid };

    
    $http.post(hcueServiceUrl.pharmaLeads, params)
           .success(function (data) {
               
               if (data.rows != null) {
                   var datamodel = data.rows;
                   hcuePharmaLeadService.setLeadsInfo(datamodel);
                   $scope.pharmaLeads = hcuePharmaLeadService.getLeadsInfo();
                    
               }
                
           })
           .error(function (data) {
               $ionicLoading.hide();
               alert("Please check the internet connectivity!!!");
           });

    //Accepted Pharmas
    $http.post(hcueServiceUrl.pharmaLeads, acceptedparams)
          .success(function (data) {
              $ionicLoading.hide();
              if (data.rows != null) {
                  var datamodel = data.rows;
                  hcuePharmaLeadService.setAcceptedLeadsInfo(datamodel);
                  $scope.activepharmaLeads = hcuePharmaLeadService.getAcceptedLeadsInfo();
              }
          })
          .error(function (data) {
              $ionicLoading.hide();
              alert("Please check the internet connectivity!!!");
          });

    ///*******************************Get Leads Service Call*********************//
    var respSpl = $http.get(hcueServiceUrl.readLookup);
    respSpl.success(function (data) {
       
        hcuePharmaLeadService.setDoctorSpeciality(data.doctorSpecialityType);
    });
    respSpl.error(function (data) {
        $ionicLoading.hide();
        alert("Please check the internet connectivity!!!");
    });
     
    $scope.showPopup = function (data) {
        
        if (!data.delivered)
            return;

         $ionicPopup.show({
             template: "<style>.popup { width:500px; }</style><p>Are the medicines delivered?<p/>",
             title: 'Delivery Status',
             //subTitle: 'MySubTitle',
             scope: $scope,
             buttons: [
              
              {
                  text: '<b>Delivered</b>',
                  type: 'button-positive',
                  onTap: function () {
                      $scope.SetDeliveryStatus(data);
                  }
              },
              { text: 'Cancel' }
             ]
         });
    }  
    $scope.SetDeliveryStatus = function (item) {
        console.log(item);
        
        var rows = [];
        var i = 0;
        var patientID = '';
        var hasChecked = false;
          
        angular.forEach(item.patientPrescription, function (item) {

          //  if (item.Accepted) {
                if (i > 0)
                { rows = rows + ","; }

                rows = rows + item.RowID;
                patientID = item.PatientCaseID;
                hasChecked = true;
                i++;
          //  }
        });
        
        if(!hasChecked)
            return;
        var params = { "USRType": "PHARMA", "Status": 'DELD', "RowID": "[" + rows + "]", "PatientCaseID": patientID, "USRId": hcuePharmaService.getLoginUserId(), "PharmaID": hcuePharmaService.getLoginUserId() };
        
        $http.post(hcueServiceUrl.updatePrescription, params)
               .success(function (data) {
                   if (data.rows != null) {
                       var datamodel = data.rows;
                       $scope.pharmaLeads = datamodel;
                       $state.go('app.lead');
                   }
               })
               .error(function (data) {
                   console.log("Error About");
                   console.log(data);
               }); 
    }
    $scope.tabno = hcuePharmaService.getTab();

    $scope.fnShowTab = function (tabno) {
        $scope.tabno = tabno;
        hcuePharmaService.setTab(tabno);
    }
    $scope.fnSetTabColor = function (tabno) {
        if (tabno == $scope.tabno) {
            return "active";
        }
        else {
            return "";
        }
    }

    $scope.GetEstimate = function (dataitems) {
        var total = 0;
        console.log("***********dataitems****");
        console.log(dataitems);
        angular.forEach(dataitems, function (item) {
            total += parseFloat(item.MRP);
        }
        );
        return total;
    }
    $scope.CalculateExpiryTime = function (date) {

        var dt1 = new Date(date);
        var dt2 = new Date();
        
        var e = Math.abs(dt2 - dt1) / 36e5;
        var hh = Math.floor(e);
        var mm = Math.floor((e - Math.floor(e)) * 60);

        if (isNaN(hh)) {
            hh = "00";
        }
        if (isNaN(mm)) {
            mm = "00";
        }
        return hh + ":" + mm;

    }

    $scope.NavigateTo = function (path, item) {
        hcuePharmaLeadService.AddSelectedLeadItem(item);
        $state.go(path);
    }

})

.controller('hCueLeadItemController', function ($scope, $http, $filter, $compile,$ionicPopup, $ionicLoading, $location, $ionicSideMenuDelegate, hcueServiceUrl, hcuePharmaService, hcuePharmaLeadService, $state) {
    $scope.showpast = false;
    var leads = hcuePharmaLeadService.getSelectedLeadItem(); //hcuePharmaLeadService.getLeadsInfo();
    console.log(leads);
    angular.forEach(leads.patientPrescription, function (item) {
        item.Accepted = true;
    }); 
    $scope.pharmaLeads = leads;

    if (!$scope.showpast) {
        $scope.caption = "View on Map";
    }
    else {
        $scope.caption = "View on details";
    }
    
        $scope.doctorSpecialities = hcuePharmaLeadService.getDoctorSpeciality();

        $scope.deliveryExecutive = hcuePharmaService.getDeliveryExecutives();
        $scope.deliveryPerson = "";

        $scope.CalculateExpiryTime = function (date) {

            var dt1 = new Date(date);
            var dt2 = new Date();
            var e = Math.abs(dt2 - dt1) / 36e5;
            var hh = Math.floor(e);
            var mm = Math.floor((e - Math.floor(e)) * 60);
            if (isNaN(hh)) {
                hh = "00";
            }
            if (isNaN(mm)) {
                mm = "00";
            }
            return hh + ":" + mm;

        }
        
        $scope.GetEstimate = function (dataitems) {
            var total = 0;
            angular.forEach(dataitems, function (item) {
                total += parseFloat(item.MRP);
            }
            );
            return total;
        }
        $scope.UpdateLeadItem = function (status) {
            var template = 'Are you sure you want to end the consultation?';
            var templatename = 'End Consultation';
            if (status == "RJPH") {
                templatename = "Reject Lead";
                template = 'Are you sure you want to reject the lead?';
            }
            else {
                templatename = "Accept Lead";
                template = 'Are you sure you want to accept the lead?';
            }
            var confirmPopup = $ionicPopup.confirm({
                title: templatename,
                template: template
            });
            confirmPopup.then(function (res) {
                if (res) {
                    $scope.UpdateStatus(status);
                } else {
                    //alert("Not Done");
                }
            });
        }
        $scope.UpdateStatus = function (status) {
             
            
            var rows = [];
            var i=0;
            var patientID = '';
            var hasChecked = false;
            angular.forEach($scope.pharmaLeads.patientPrescription, function (item) {

                if (item.Accepted) {
                    if (i > 0)
                    {
                        rows = rows + ",";
                    }

                    rows = rows + item.RowID;
                    patientID = item.PatientCaseID;
                    hasChecked = true;
                    i++;
                }
            });
            if (!hasChecked) {
                alert("Please select atleast one item to proceed");
                return;
            }
           
            var params = { "USRType": "PHARMA", "Status": status, "RowID": "[" + rows + "]", "PatientCaseID": patientID, "USRId": hcuePharmaService.getLoginUserId(), "PharmaID": hcuePharmaService.getLoginUserId() };
            console.log(params);
            $http.post(hcueServiceUrl.updatePrescription, params)
                   .success(function (data) {
                       if (data!= null) {
                          
                           $scope.pharmaLeads = data;
                           $state.go('app.lead');
                       }
                   })
                   .error(function (data) {
                       console.log("Error About");
                       console.log(data);
                   });  
        }
        $scope.NavigateTo = function (path) {
            $state.go(path);
        }
    //*******************Map controll
        var pharmaName = ''
        var regdata = hcuePharmaService.getRegisterDetails();
        var patientinfo = hcuePharmaLeadService.getSelectedLeadItem().patientDetails;
    //  var patientinfo = hcuePharmaLeadService.getSelectedLeadItem().PatientAddress;
        var lat = 0;
        var long = 0;
        if (patientinfo.PatientAddress.length > 0) {
             lat = patientinfo.PatientAddress[0].Latitude;
             long = patientinfo.PatientAddress[0].Longitude;
        }
        pharmaName = patientinfo.Patient[0].FullName;
        console.log("calling map");
        console.log(lat);
        console.log(long);
        console.log("calling map");
        $scope.initialize = function initialize() {

            var myLatlng = new google.maps.LatLng(lat, long);

            var mapOptions = {
                center: myLatlng,
                zoom: 16, //16
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"),
                mapOptions);

            //Marker + infowindow + angularjs compiled ng-click
            var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
            var compiled = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow({
                content: compiled[0]
            });

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: pharmaName//'Uluru (Ayers Rock)'
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });

            $scope.map = map;
        }


    // google.maps.event.addDomListener(window, 'load', initialize);
        $scope.initialize();

        $scope.centerOnMe = function () {
            if (!$scope.map) {
                return;
            }

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            navigator.geolocation.getCurrentPosition(function (pos) {
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.loading.hide();
            }, function (error) {
                alert('Unable to get location: ' + error.message);
            });
        };

        $scope.clickTest = function () {
            alert('infowindow with ng-click')
        };
})
.controller('hCueActiveLeadItemController', function ($scope, $http, $filter, $ionicModal, $ionicLoading, $location, $ionicSideMenuDelegate, hcueServiceUrl, hcuePharmaService, hcuePharmaLeadService, $state) {

    var leads = hcuePharmaLeadService.getAcceptedLeadsInfo();

    angular.forEach(leads[0].patientPrescription, function (item) {
        item.Accepted = true;
    });
    $scope.deliveryExecutive = hcuePharmaService.getDeliveryExecutives();
    $scope.deliveryPerson = "";
    $scope.doctorSpecialities = hcuePharmaLeadService.getDoctorSpeciality();

    $scope.CalculateExpiryTime = function (date) {
       
        var dt1 = new Date(date);
        var dt2 = new Date();
        var e = Math.abs(dt2 - dt1) / 36e5;
        var hh = Math.floor(e);
        var mm = Math.floor((e - Math.floor(e)) * 60);
        if (isNaN(hh)) {
            hh = "00";
        }
        if (isNaN(mm)) {
            mm = "00";
        }
        return hh + ":" + mm;

    }
    $scope.GetEstimate = function (dataitems) {
        var total = 0;
        angular.forEach(dataitems, function (item) {
            total += parseFloat(item.MRP);
        }
        );
        return total;
    }
    $scope.NavigateTo = function (path) {
        $state.go(path);
    }
    
})
.controller('hCueProfileController', function ($scope, $http, $filter, $ionicModal, $ionicLoading, $location, $ionicSideMenuDelegate, hcueServiceUrl, hcuePharmaService, hcuePharmaLeadService, $state) {
   
    $scope.businesshouritems = hcuePharmaService.getBusinessHours();
    $scope.businesshouritemsUI = hcuePharmaService.getUIBusinessHours();
    $scope.profile = hcuePharmaService.getRegisterDetails();
    $scope.deliveryExecutive = hcuePharmaService.getDeliveryExecutives();
    $scope.Register = hcuePharmaService.getRegisterDetails();
     
    $scope.tabno = hcuePharmaService.getTab();
     
    $scope.fnShowTab = function (tabno) {
        $scope.tabno = tabno;
        hcuePharmaService.setTab(tabno);
    }
    $scope.fnSetTabColor = function (tabno) {
        if (tabno == $scope.tabno) {
            return "tab-item active";
        }
        else {
            return "tab-item person-2";
        }
    }
    
     
    //********** Tab 2 ***************
    //Update db values to businesshouritemsUI so that they are autopopulated
    angular.forEach($scope.businesshouritemsUI, function (businesshrs) {
        businesshrs.Working = false;
        angular.forEach($scope.businesshouritems, function (businesshourEntered) {
            if (businesshourEntered.DayCD == businesshrs.DayCD) {
                businesshrs.Working = true;
                businesshrs.StartTime = businesshourEntered.StartTime;
                businesshrs.EndTime = businesshourEntered.EndTime;

                var sthours = businesshourEntered.StartTime.split(":");
                businesshrs.StartTimeHH = sthours[0];
                businesshrs.StartTimeMM = sthours[1];

                var endhours = businesshourEntered.EndTime.split(":");
                businesshrs.EndTimeHH = endhours[0];
                businesshrs.EndTimeMM = endhours[1];
            }
        });
    });
     
    //********** Tab 2 Ends***************

    //********* Tab 3 ****************
      
    //****Modify the key,value pair for delivery executive into {PhoneNumber:'',DeliveryExecutive:''} json arry format//
    var deliveryitems = [];
    for (name in $scope.deliveryExecutive) {

        var value = $scope.deliveryExecutive[name];
        var deliveryitem = { PhoneNumber: name, ExecutiveName: value };

        deliveryitems.push(deliveryitem);
    }
    hcuePharmaService.setUIDeliveryExecutiveFormat(deliveryitems);

    //****Modify the key,value pair for delivery executive into {PhoneNumber:'',DeliveryExecutive:''} json arry format//
 
    //***********Tab 3 ends***********
})


.controller('hCueProfileEditAboutController', function ($scope, $http, $filter, $ionicModal, $ionicLoading, $location, $ionicSideMenuDelegate, hcueServiceUrl, hcuePharmaService, hcuePharmaLeadService, $state) {

    $scope.Register = hcuePharmaService.getRegisterDetails();

    $scope.RegisterClick = function (pageno, datamodel) {
        $scope.pageno = pageno;
        $scope.errormsg = "Enter Pharmacy Name.";
        $scope.errorflg = false;
        $scope.alreadyexists = false;
    
        //**************About********************************
            var contactname = datamodel[0].about.ContactName;
            var description = datamodel[0].about.Description;
            if (contactname == "") {
                $scope.errormsg = "Enter Contact Name";
                $scope.errorflg = true;
                return;
            }
            if (description == "") {
                $scope.errormsg = "Enter About";
                $scope.errorflg = true;
                return;
            }
            //************************Update Service Call - About Pharma details************************************//

            var params = { "ContactName": contactname, "AboutPharmacy": description, "USRType": "PHARMA", "PharmaID": hcuePharmaService.getLoginUserId(), "USRId": hcuePharmaService.getLoginUserId() };
            $http.post(hcueServiceUrl.pharmaSignupUpdate, params)
            .success(function (data) {
                 
                if (data.PharmaDetails != null) {
                    var pharmadtl = data.PharmaDetails;
                    hcuePharmaService.addAboutPharmaDetails(contactname, description);
                   // console.log(hcuePharmaService.getRegisterDetails());
                    $state.go('app.profile');
                }
                //  
            })
            .error(function (data) {
                console.log("Error About");

                console.log(data);
            });

            //************************Update Service Call - About Pharma details************************************//

        //**************About********************************
    }

   
})
.controller('hCueProfileEditDetailController', function ($scope, $http, $filter, $ionicModal, $ionicLoading, $location, $ionicSideMenuDelegate, hcueServiceUrl, hcuePharmaService, hcuePharmaLeadService, $state) {

    $scope.Register = hcuePharmaService.getRegisterDetails();

    $scope.RegisterClick = function (pageno, datamodel) {
        $scope.pageno = pageno;
        $scope.errormsg = "Enter Pharmacy Name.";
        $scope.errorflg = false;
        $scope.alreadyexists = false;
 
        //**************About********************************
            var pharmaname = datamodel[0].PharmaName;
            var phoneno = datamodel[0].ContactNumber;
            var website = datamodel[0].Website;
            var tin = datamodel[0].Tin;
            var add1 = datamodel[0].Address1;
            var add2 = datamodel[0].Address2;
           // var lat = ngautocomplete_place_latitude;  //Variable refered in ngAutoComplete to avoid another service call
           // var lng = ngautocomplete_place_longitude;
            var lat = 0;
            var lng = 0;

            if (!angular.isUndefined($scope.latlng)) {
                lat = $scope.latlng.geometry.location.lat();  //Variable refered in ngAutoComplete to avoid another service call
                lng = $scope.latlng.geometry.location.lng();

            }
            if (pharmaname == "" || pharmaname == 'My Pharmacy') {
                $scope.errormsg = "Enter Pharmacy Name.";
                $scope.errorflg = true;
                return;
            }
            if (phoneno == "" || phoneno == '91' || isNaN(phoneno)) {
                $scope.errormsg = "Enter a valid Contact Number.";
                $scope.errorflg = true;
                return;
            }
        /*    if (tin != "" && isNaN(tin)) {
                $scope.errormsg = "TIN should be numeric";
                $scope.errorflg = true;
                return;
            }*/
            if (add1 == "" && add2 == "") {
                $scope.errormsg = "Enter Address1 /Address";
                $scope.errorflg = true;
                return;
            }
            //************************Update Service Call - Pharma details************************************//
            //  var params = { "webSite": website, "Longitude": lng, "Latitude": lat, "USRType": "PHARMA", "MobileNumber": parseInt(phoneno), "Address2": add2, "Address1": add1, "USRId": hcuePharmaService.getLoginUserId(), "PharmaName": "1", "TINNumber": tin, "PharmaID": hcuePharmaService.getLoginUserId() };

            var params = { "WebSite": website, "Longitude": lng.toString(), "Latitude": lat.toString(), "USRType": "PHARMA", "MobileNumber": parseInt(phoneno), "Address2": add2, "Address1": add1, "USRId": hcuePharmaService.getLoginUserId(), "PharmaName": pharmaname, "TINNumber": tin.toString(), "PharmaID": hcuePharmaService.getLoginUserId() };

            if (lat.toString() == "0" && lng.toString() == "0") { //In edit mode when location is not changed the value is return 0, and earlier selected values is replaced, hence check to avoid update to lat/lng
                  params = { "WebSite": website, "USRType": "PHARMA", "MobileNumber": parseInt(phoneno), "Address2": add2, "Address1": add1, "USRId": hcuePharmaService.getLoginUserId(), "PharmaName": pharmaname, "TINNumber": tin.toString(), "PharmaID": hcuePharmaService.getLoginUserId() };
            }

            $http.post(hcueServiceUrl.pharmaSignupUpdate, params)
            .success(function (data) {
                
                if (data.PharmaDetails != null) {
                    var pharmadtl = data.PharmaDetails;
                    var address = data.PharmaAddress;
                    hcuePharmaService.addPharmaDetails(pharmadtl.PharmaName, pharmadtl.MobileNumber, pharmadtl.WebSite, pharmadtl.TINNumber, address.Address1, address.Address2, address.Latitude, address.Longitude);  //register details page 2

                    //hcuePharmaService.addPharmaDetails(pharmaname, phoneno, website, tin, add1, add2);
                    // console.log(hcuePharmaService.getRegisterDetails());
                    $state.go('app.profile');
                }
                //  
            })
            .error(function (data) {
                console.log("Error Updating Profile info.");
                console.log(data);
            });

            //************************Update Service Call - Pharma details************************************//

        //**************About********************************
    }

   
})
.controller('hCueProfileEditBusinessHoursController', function ($scope, $http, $filter, $ionicModal, $ionicLoading, $location, $ionicSideMenuDelegate, hcueServiceUrl, hcuePharmaService, hcuePharmaLeadService, $state) {

    $scope.businesshouritems = hcuePharmaService.getBusinessHours();
    $scope.businesshouritemsUI = hcuePharmaService.getUIBusinessHours();
    $scope.Register = hcuePharmaService.getRegisterDetails();

    //Update db values to businesshouritemsUI so that they are autopopulated
    angular.forEach($scope.businesshouritemsUI, function (businesshrs) {
        businesshrs.Working = false;
        angular.forEach($scope.businesshouritems, function (businesshourEntered) {
            if (businesshourEntered.DayCD == businesshrs.DayCD) {
                businesshrs.Working = true;
                businesshrs.StartTime = businesshourEntered.StartTime;
                businesshrs.EndTime = businesshourEntered.EndTime;

                var sthours = businesshourEntered.StartTime.split(":");
                businesshrs.StartTimeHH = sthours[0];
                businesshrs.StartTimeMM = sthours[1];

                var endhours = businesshourEntered.EndTime.split(":");
                businesshrs.EndTimeHH = endhours[0];
                businesshrs.EndTimeMM = endhours[1];
            }
        });
    });
     
    $scope.ApplyToAll = function (item) {

        angular.forEach($scope.businesshouritemsUI, function (scheduleItem) {
             
            if (false == scheduleItem.ApplyTo) {
                scheduleItem.StartTimeHH = item.StartTimeHH;
                scheduleItem.StartTimeMM = item.StartTimeMM;
                scheduleItem.StartTime = item.StartTimeHH + ':' + item.StartTimeMM;
                scheduleItem.EndTimeHH = item.EndTimeHH;
                scheduleItem.EndTimeMM = item.EndTimeMM;
                scheduleItem.EndTime = item.EndTimeHH + ':' + item.EndTimeMM;
                scheduleItem.Working = item.Working;
            }

        });
        
    }
    $scope.OnScheduleEdit = function (item) {

        item.StartTime = item.StartTimeHH + ':' + item.StartTimeMM;
        item.EndTime = item.EndTimeHH + ':' + item.EndTimeMM;
        item.ApplyTo = true;

    }
    $scope.RegisterClick = function (pageno, datamodel) {
        $scope.pageno = pageno;
        $scope.errormsg = "Enter Pharmacy Name.";
        $scope.errorflg = false;
        $scope.alreadyexists = false;
        
            //*************Business Hours************************
        
            //************************Update Service Call - business hr Pharma details************************************//
            var businesshrs = [];

            angular.forEach(datamodel, function (item) {
                if (item.Working) {
                    var businesshr = {};
                    businesshr["DayCD"] = item.DayCD;
                    businesshr["StartTime"] = item.StartTime;
                    businesshr["EndTime"] = item.EndTime;
                    businesshrs.push(businesshr);
                }
            });
             
            var params = { "consultationRecord": businesshrs, "USRType": "PHARMA", "USRId": hcuePharmaService.getLoginUserId(), "PharmaID": hcuePharmaService.getLoginUserId() };
            
            $http.post(hcueServiceUrl.pharmaAddSchedule, params)
           .success(function (data) {
               
               if (data.PharmaDetails != null) {
                   var pharmadtl = data.PharmaDetails;
                   var pharmaconsulthrs = data.PharmaConsultation;
                   hcuePharmaService.updatePharmacyBusinessHours(businesshrs); //pharmaconsulthrs
                  // console.log(hcuePharmaService.getRegisterDetails());
                   $state.go('app.profile');
               }
               //  
           })
           .error(function (data) {
               console.log("Error About");
               console.log(data);
           });

            //************************Update Service Call - business hr Pharma details************************************//

        //*************Business Hours************************
    }

    $scope.toggleGroup = function (item) {
        if ($scope.isGroupShown(item)) {
            $scope.shownGroup = null;
        } else {
            $scope.shownGroup = item;
        }
    };
    $scope.isGroupShown = function (item) {
        return $scope.shownGroup == item;
    };
    $scope.showArrowUpDown = function (item) {
        if ($scope.shownGroup == item)
            return "ion-ios-arrow-up";
        else
            return "ion-ios-arrow-down";
    };
})
.controller('hCueProfileEditDeliveryController', function ($scope, $http, $filter,$ionicLoading, $location, $ionicSideMenuDelegate, hcueServiceUrl, hcuePharmaService, hcuePharmaLeadService, $state) {

    $scope.deliveryExecutive = hcuePharmaService.getDeliveryExecutives();
    $scope.Register = hcuePharmaService.getRegisterDetails();

    //****Modify the key,value pair for delivery executive into {PhoneNumber:'',DeliveryExecutive:''} json arry format//
    var deliveryitems = [];
    for (name in $scope.deliveryExecutive) {

        var value = $scope.deliveryExecutive[name];
        var deliveryitem = { PhoneNumber: name, ExecutiveName: value };

        deliveryitems.push(deliveryitem);
    }
    hcuePharmaService.setUIDeliveryExecutiveFormat(deliveryitems);
     
    //****Modify the key,value pair for delivery executive into {PhoneNumber:'',DeliveryExecutive:''} json arry format//

    $scope.RegisterClick = function (pageno, datamodel) {
        $scope.pageno = pageno;
        $scope.errormsg = "Enter Pharmacy Name.";
        $scope.errorflg = false;
        $scope.alreadyexists = false;

            //**********Delivery Executive Edit******************
            
            //************************Update Service Call - delivery Pharma details************************************//
            var deliveryjs = {};
            
            angular.forEach(datamodel.deliveryExecutiveUI, function (item) {
                deliveryjs[item.PhoneNumber] = item.ExecutiveName;
            });

            var params = { "USRType": "PHARMA", "DeliveryPersonInfo": deliveryjs, "FreeDeliveryDist": parseInt(datamodel.distance), "USRId": hcuePharmaService.getLoginUserId(), "PharmaID": hcuePharmaService.getLoginUserId() };
           
            $http.post(hcueServiceUrl.pharmaSignupUpdate, params)
            .success(function (data) {
                
                if (data.PharmaDetails != null) {
                    var pharmadtl = data.PharmaDetails;
                    hcuePharmaService.updateDeliveryExecutives(pharmadtl.DeliveryPersonInfo);
                    //  console.log(hcuePharmaService.getRegisterDetails());
                    $state.go('app.profile');
                }
                //  
            })
            .error(function (data) {
                console.log("Error About");
                console.log(data);
            });

            //************************Update Service Call - delivery hr Pharma details************************************//
            return;

        //**********Delivery Executive Edit Ends*************
    }

    $scope.AddExecutive = function () {
        
        var newitem = { PhoneNumber: '91', ExecutiveName: 'Delivery Executive' };
        $scope.Register[0].delivery.deliveryExecutiveUI.push(newitem);

    }
    $scope.RemoveExecutive = function (item) {
        
        var index = $scope.Register[0].delivery.deliveryExecutiveUI.indexOf(item);
        $scope.Register[0].delivery.deliveryExecutiveUI.splice(index, 1);

    }
})
 
   
    .controller('MapCtrl', function ($scope, $ionicLoading, $compile, hcuePharmaService, hcuePharmaLeadService) {
        //var lat = 43.07493;
        //var long = -89.381388;
        var pharmaName =''
        var regdata = hcuePharmaService.getRegisterDetails();
        var patientinfo = hcuePharmaLeadService.getSelectedLeadItem().patientDetails;
      //  var patientinfo = hcuePharmaLeadService.getSelectedLeadItem().PatientAddress;
        var lat = patientinfo.PatientAddress[0].Latitude;
        var long = patientinfo.PatientAddress[0].Longitude;
        pharmaName = patientinfo.Patient[0].FullName;
        console.log("calling map");
        console.log(lat);
        console.log(long);
        console.log("calling map");
        $scope.initialize =function initialize() {
            
            var myLatlng = new google.maps.LatLng(lat, long);

            var mapOptions = {
                center: myLatlng,
                zoom: 16, //16
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map"),
                mapOptions);

            //Marker + infowindow + angularjs compiled ng-click
            var contentString = "<div><a ng-click='clickTest()'>Click me!</a></div>";
            var compiled = $compile(contentString)($scope);

            var infowindow = new google.maps.InfoWindow({
                content: compiled[0]
            });

            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                title: pharmaName//'Uluru (Ayers Rock)'
            });

            google.maps.event.addListener(marker, 'click', function () {
                infowindow.open(map, marker);
            });

            $scope.map = map;
        }
        
      
        // google.maps.event.addDomListener(window, 'load', initialize);
        $scope.initialize();

        $scope.centerOnMe = function () {
            if (!$scope.map) {
                return;
            }

            $scope.loading = $ionicLoading.show({
                content: 'Getting current location...',
                showBackdrop: false
            });

            navigator.geolocation.getCurrentPosition(function (pos) {
                $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
                $scope.loading.hide();
            }, function (error) {
                alert('Unable to get location: ' + error.message);
            });
        };

        $scope.clickTest = function () {
            alert('infowindow with ng-click')
        };
       
    });

/*
<script src="http://maps.google.com/maps/api/js?sensor=true&libraries=geometry"></script>
              <script>
                  function distance() {
                      var from = new google.maps.LatLng(49.004, 8.456);
                    var to   = new google.maps.LatLng(49.321, 8.789);
                    var dist = google.maps.geometry.spherical.computeDistanceBetween(from, to);
                    console.log(dist /1000); //distance in meters
                      console.log("ok");
                  }
        </script>
        */