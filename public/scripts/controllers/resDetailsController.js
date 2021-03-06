angryCatfishApp.controller('resDetailsController', function ($http, $scope, $timeout, $interval, $routeParams, $location, $uibModalStack, BikeService, ReservationService, editId) {
  console.log('loaded Reservation Details Controller');
  var _this = this;
  var bikeService = BikeService;
  var reservationService = ReservationService;

  _this.resInfo = editId;
  console.log("BikeInfo", _this.bikeInfo);
  _this.modalID = _this.resInfo.Id;


  //Grabs Reservations for this bike
  _this.getReservations = function(){
    reservationService.getReservationsByTransactionID(_this.modalID).then(function(resList){
      _this.resData = resList.data[0];
      console.log("Reservation Info for this TransactionID", _this.resData);
      _this.getBikes();
    });
  };
  _this.getReservations();


  //Grabs all the bikes from the DB
  _this.getBikes = function(){
    _this.bikeNames = []
    bikeService.getBikes().then(function(bikeList){
      _this.bikeList = bikeList.data;
      console.log('bike list', _this.bikeList);
      //Finds matching Bike in bikeList
      _this.resData.bikeID.forEach(function(bikeID){
        console.log("bikeID",bikeID);
        _this.bikeList.forEach(function(matchID){
          console.log("matchID",matchID);
          if (bikeID == matchID._id){
            _this.bikeNames.push(matchID.bikeMake + " " + matchID.bikeModel)
          }
          console.log(_this.bikeNames);
        })
      })
    });
  };




});
