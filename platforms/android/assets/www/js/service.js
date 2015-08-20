angular.module('services', [])

.factory('hcuePharmaService', function ($http, hcueServiceUrl) {
    // Registration fields
   
   // var errorflg = false;
    var register = [{tab:1,
        PharmaId: 0, Email: 'example@example.com', Password: '', ConfirmPassword: '', PharmaName: '', Latitude :'',Longitude :'', ContactNumber: '', Website: '', Tin: '', Address1: '', Address2: '',
        about: { ContactName: '', Description: '' },

        delivery: { distance: 0, deliveryExecutive: { '0': '' } },

        businesshours: [],// [{ DayCD: '', StartTime: '', EndTime: '' }],
        businesshoursUI: [{ DayCode: 'Monday', DayCD: 'MON', ApplyTo: false, Working: true, StartTimeHH: '00', StartTimeMM: '00', StartTime: '00:00 AM', EndTimeHH: '00', EndTimeMM: '00', EndTime: '21:00 PM' },
        { DayCode: 'Tuesday', DayCD: 'TUE', ApplyTo: false, Working: true, StartTimeHH: '00', StartTimeMM: '00', StartTime: '00:00 AM', EndTimeHH: '00', EndTimeMM: '00', EndTime: '21:00 PM' },
        { DayCode: 'Wednesday', DayCD: 'WED', ApplyTo: false, Working: true, StartTimeHH: '00', StartTimeMM: '00', StartTime: '00:00 AM', EndTimeHH: '00', EndTimeMM: '00', EndTime: '21:00 PM' },
        { DayCode: 'Thursday', DayCD: 'THU', ApplyTo: false, Working: true, StartTimeHH: '00', StartTimeMM: '00', StartTime: '00:00 AM', EndTimeHH: '00', EndTimeMM: '00', EndTime: '21:00 PM' },
        { DayCode: 'Friday', DayCD: 'FRI', ApplyTo: false, Working: true, StartTimeHH: '00', StartTimeMM: '00', StartTime: '00:00 AM', EndTimeHH: '00', EndTimeMM: '00', EndTime: '21:00 PM' },
        { DayCode: 'Saturday', DayCD: 'SAT', ApplyTo: false, Working: true, StartTimeHH: '00', StartTimeMM: '00', StartTime: '00:00 AM', EndTimeHH: '00', EndTimeMM: '00', EndTime: '21:00 PM' },
        { DayCode: 'Sunday', DayCD: 'SUN', ApplyTo: false, Working: true, StartTimeHH: '00', StartTimeMM: '00', StartTime: '00:00 AM', EndTimeHH: '00', EndTimeMM: '00', EndTime: '21:00 PM' }
        ]
    }];

   /* var businesshoursUI = [{ DayCode: 'Monday', DayCD: 'MON', ApplyTo: false, Working: true, StartTimeHH: '00', StartTimeMM: '00', StartTime: '00:00 AM', EndTimeHH: '00', EndTimeMM: '00', EndTime: '21:00 PM' },
        { DayCode: 'Tuesday', DayCD: 'TUE', ApplyTo: false, Working: true, StartTimeHH: '00', StartTimeMM: '00', StartTime: '00:00 AM', EndTimeHH: '00', EndTimeMM: '00', EndTime: '21:00 PM' },
        { DayCode: 'Wednesday', DayCD: 'WED', ApplyTo: false, Working: true, StartTimeHH: '00', StartTimeMM: '00', StartTime: '00:00 AM', EndTimeHH: '00', EndTimeMM: '00', EndTime: '21:00 PM' },
        { DayCode: 'Thursday', DayCD: 'THU', ApplyTo: false, Working: true, StartTimeHH: '00', StartTimeMM: '00', StartTime: '00:00 AM', EndTimeHH: '00', EndTimeMM: '00', EndTime: '21:00 PM' },
        { DayCode: 'Friday', DayCD: 'FRI', ApplyTo: false, Working: true, StartTimeHH: '00', StartTimeMM: '00', StartTime: '00:00 AM', EndTimeHH: '00', EndTimeMM: '00', EndTime: '21:00 PM' },
        { DayCode: 'Saturday', DayCD: 'SAT', ApplyTo: false, Working: true, StartTimeHH: '00', StartTimeMM: '00', StartTime: '00:00 AM', EndTimeHH: '00', EndTimeMM: '00', EndTime: '21:00 PM' },
        { DayCode: 'Sunday', DayCD: 'SUN', ApplyTo: false, Working: true, StartTimeHH: '00', StartTimeMM: '00', StartTime: '00:00 AM', EndTimeHH: '00', EndTimeMM: '00', EndTime: '21:00 PM' }
    ];*/

    var delivery = { distance: 0, deliveryExecutive: [{ PhoneNumber: '91', ExecutiveName: 'Delivery Executive' }], deliveryExecutiveUI: [{ PhoneNumber: '91', ExecutiveName: 'Delivery Executive' }] };

    var deliveryExecutives = { 91: '' };
    //////////Register 1 details
    var addPharmaLoginDetails = function (userid,emailid, password, confirmpassword) {
        register[0].PharmaId = userid;
        register[0].Email = emailid;
        register[0].Password = password;
        register[0].ConfirmPassword = confirmpassword;
    }
    var getLoginUserId = function () {

        return register[0].PharmaId;
    }
    var getLoginEmailId = function () {
       
        return register[0].Email;
    }
    var getPassword = function () {
        //  return password;
        return register[0].Password;
    }
    var getConfirmPassword = function () {
        //return confirmpassword;
        return register[0].ConfirmPassword;
    } 

    //////////Register 2 details
    var addPharmaDetails = function (name, phonenumber, website,tin,address1,address2,latitute,longitude) {
        
      //  var params = { "webSite": website, "USRType": "PHARMA", "MobileNumber": phonenumber, "Address1": address1, "Address2": address2, "USRId": 3, "PharmaName": name, "TINNumber": tin, "PharmaID": getLoginUserId() }//, "ContactName": "Thangavel" }
        register[0].PharmaName = name;
        register[0].ContactNumber = phonenumber;
        register[0].Website = website;
        register[0].Tin = tin;
        register[0].Address1 = address1;
        register[0].Address2 = address2;
        register[0].Latitude = latitute;
        register[0].Longitude = longitude;
    }
    var getPharmaName = function () {
        return register[0].PharmaName;
    }
    var getPharmaContactNumber = function () {
        return register[0].ContactNumber;
    }
    var getPharmaWebSite = function () {
        return register[0].Website;
    }
    var getPharmaTin = function () {
        return register[0].Tin;
    }
    var getPharmaAddress1 = function () {
        return register[0].Address1;
    }
    var getPharmaAddress2 = function () {
        return register[0].Address2;
    }
    //////////Register 3 details
    var addAboutPharmaDetails = function (name, description) {
   
        register[0].about.ContactName = name;
        register[0].about.Description = description;
     
    }
    var getAboutContactName = function () {
        return register[0].about.ContactName;
    }
    var getAboutDescription = function () {
        return register[0].about.Description;
    }


    //////////Register 4 details

    var getRegisterDetails = function () {
        return register;
    }
    var setTab = function (data) {
        register[0].tab = data;
    }
    var getTab = function (data) {
        return register[0].tab;
    }
    /////// General properties
    
    var updatePharmacyBusinessHours = function (data) {
        
        //  register[0].businesshours = [];
        if (register[0].businesshours.length > 0)
            register[0].businesshours.splice(0,1);

        register[0].businesshours.push(data);
       //  register[0].businesshours = data;
        
    }
    var getBusinessHours = function () {
        return register[0].businesshours[0];
    }
    var getUIBusinessHours = function () {
        return register[0].businesshoursUI;
    }
    var getDeliveryDetails = function () {
        return delivery;//[0].deliveryExecutive;
    }
    var getDeliveryDistance = function () {
        return register[0].delivery.distance;//[0].deliveryExecutive;
    }
    var setDeliveryDistance = function (delivery) {
        register[0].delivery.distance = delivery;//[0].deliveryExecutive;
    }
    var updateDeliveryExecutives = function (data) {
        register[0].delivery.deliveryExecutive = data;
    }
    var getDeliveryExecutives = function () {
        return register[0].delivery.deliveryExecutive;
    }
    var setUIDeliveryExecutiveFormat = function (data) {
        
         register[0].delivery.deliveryExecutiveUI = data; //{PhonenO: '',deliveryexecutive:''}
    }
    var getUIDeliveryExecutiveFormat = function () {

        return register[0].delivery.deliveryExecutiveUI ; //{PhonenO: '',deliveryexecutive:''}
    }
   
    
    
    ///******************Login Service************************//
    
    return {
     
        setTab: setTab,
        getTab :getTab,
        getLoginEmailId: getLoginEmailId,
        getLoginUserId:getLoginUserId,
        getPassword: getPassword,
        getConfirmPassword: getConfirmPassword,
        addPharmaLoginDetails: addPharmaLoginDetails,

        getPharmaName: getPharmaName,
        getPharmaContactNumber: getPharmaContactNumber,
        getPharmaWebSite: getPharmaWebSite,
        getPharmaTin: getPharmaTin,
        getPharmaAddress1: getPharmaAddress1,
        getPharmaAddress2: getPharmaAddress2,
        addPharmaDetails :addPharmaDetails,

        getRegisterDetails: getRegisterDetails,
        getBusinessHours: getBusinessHours,
        getUIBusinessHours:getUIBusinessHours,
        updatePharmacyBusinessHours: updatePharmacyBusinessHours,
        getDeliveryDetails: getDeliveryDetails,
        getDeliveryDistance: getDeliveryDistance,
        setDeliveryDistance: setDeliveryDistance,
        getDeliveryExecutives: getDeliveryExecutives,
        getUIDeliveryExecutiveFormat: getUIDeliveryExecutiveFormat, //Only in edit mode
        setUIDeliveryExecutiveFormat:setUIDeliveryExecutiveFormat, //Only in edit mode
        updateDeliveryExecutives :updateDeliveryExecutives,

        addAboutPharmaDetails: addAboutPharmaDetails,
        getAboutContactName: getAboutContactName,
        getAboutDescription: getAboutDescription
    };
})
.factory('hcuePharmaLeadService', function () {
    var selectedLeaditem;
    //var leadsdata = {"rows":[{"patientDetails":{"Patient":[{"FirstName":"Ravi Kumar","FullName":"Ravi Kumar","PatientID":9884201160001,"Gender":"M","DOB":362707200000,"FamilyHdIND":"Y","FamilyHdID":9884201160001}],"PatientPhone":[],"PatientAddress":[],"PatientEmail":[],"PatientOtherIds":[]},"patientPrescription":[{"RowID":1,"PatientCaseID":1431223703071368,"PharmaWrkFlowStatusID":"FRDP","BeforeAfter":"Y","MedicineType":"T","Medicine":"Dolo00 65o","Dosage":"qwe","PerDay":"1-0-1","Quantity":45,"MRP":12.56,"Manufacturer":"Manufactur","MedicineGenericName":"Manufactur","MedicineContainer":"Manufactur","Modified":1431216000000},{"RowID":2,"PatientCaseID":1431223703071368,"PharmaWrkFlowStatusID":"FRDP","BeforeAfter":"Y","MedicineType":"T","Medicine":"Dolo888 65o","Dosage":"qwe","PerDay":"1-0-1","Quantity":45,"MRP":12.56,"Manufacturer":"Manufactur","MedicineGenericName":"Manufactur","MedicineContainer":"Manufactur","Modified":1431216000000}],"estimatedCost":25.12,"requestSubmitDate":1431216000000}],"count":1};
    var leadsdata;
    var doctorspeciality;
    var acceptedleads;

    var getLeadsDetails = function () {
        return leads;
    } //remove when finished


    var getLeadsInfo = function () {
        return leadsdata;
    }
    var setLeadsInfo = function (data) {
        leadsdata = data;
    }
    var getDoctorSpeciality = function () {
        return doctorspeciality;
    }
    var setDoctorSpeciality = function (data) {
        doctorspeciality = data;
    }
    var getAcceptedLeadsInfo = function () {
        return acceptedleads;
    }
    var setAcceptedLeadsInfo = function (data) {
        acceptedleads = data;
    }
    var AddSelectedLeadItem = function (data) {

        selectedLeaditem = data; //{PhonenO: '',deliveryexecutive:''}
    }
    var getSelectedLeadItem = function () {

        return selectedLeaditem; //{PhonenO: '',deliveryexecutive:''}
    }

    ///******************Login Service************************//

    return {
        setLeadsInfo: setLeadsInfo,
        getLeadsInfo: getLeadsInfo,
        getDoctorSpeciality: getDoctorSpeciality,
        setDoctorSpeciality: setDoctorSpeciality,
        getAcceptedLeadsInfo: getAcceptedLeadsInfo,
        setAcceptedLeadsInfo: setAcceptedLeadsInfo,
        AddSelectedLeadItem: AddSelectedLeadItem,
        getSelectedLeadItem: getSelectedLeadItem

    };
})
