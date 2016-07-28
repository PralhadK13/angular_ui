
var demoControllers = angular.module('demoControllers', []);

function resolveUrl(s)
{
    return "http://localhost:8888"+s;
}


demoControllers.controller('indexCtrl', ['$scope', '$rootScope', '$http',
function ($scope, $rootScope, $http) {
    $scope.login = function()
    {
         if($scope.loginEmail == "" || $scope.loginPassword== "")
            {
                alert("All field are required");
                return;
            }
       
        else{
           var logindata = {
              "email": $scope.loginEmail,
              "password": $scope.loginPassword
            }
          $http.post(resolveUrl('/login'), JSON.stringify(logindata)).success(function (response, status) {
               if(status==200)
                    {
                        localStorage.setItem("uid",$scope.loginEmail);
                        window.location.href="#home";
                    }
                    else{
                        alert("Error: Invalid data");
                    }
            }).error(function(data, status) {
                 alert("Error: Invalid login");
                });
        }
    }
    
    $scope.register = function()
    {
        if($scope.name == undefined || $scope.email== undefined || $scope.phone == undefined || $scope.password == undefined)
            {
                alert("All field are required");
                return;
            }
       
        else{
                var obj = {
                  "name": $scope.name,
                  "email": $scope.email,
                  "phone": parseInt($scope.phone),
                  "password": $scope.password
                }
            $http.post(resolveUrl('/registration'), JSON.stringify(obj)).success(function (response, status) {
                if(status==200)
                    {
                        localStorage.setItem("uid",$scope.email);
                        window.location.href="#home";
                    }
                    else{
                        alert("Error: Invalid data");
                    }
                    }).error(function(data, status) {
                         alert("Error: Invalid login");
                });
        }
    }
}]);



demoControllers.controller('dashboardCtrl', ['$scope', '$rootScope', '$http',
function ($scope, $rootScope, $http) {
        $scope.getAllMessage = function()
        {
                 $http.get(resolveUrl('/getmessage/')+localStorage.getItem("uid")).success(function (response, status) {
                       console.log(response);
                        $scope.records = response;
            }); 
    
        }
        $scope.getAllMessage();
    $http.get(resolveUrl('/user/')+localStorage.getItem("uid")).success(function (response, status) {
            console.log(response);
            $scope.username = response;
            localStorage.setItem("user",JSON.stringify(response));
            }); 

    $scope.showModelPopup = function()
    {
         $("#addMessageModal").modal('show');
    }
    
    $scope.logout = function()
    {
        localStorage.clear();
           window.location.href="#/";
    }
    
    $scope.addmessage = function()
    {
        
        var obj = {
              "id": "32432432",
              "userid": localStorage.getItem("uid"),
              "message": $scope.textMessage
            }
        $http.post(resolveUrl('/setmessage'), JSON.stringify(obj)).success(function (response, status) {
                if(status==200)
                    {
                         $scope.textMessage="";
                        $("#addMessageModal").modal('hide'); 
                        $scope.getAllMessage();
                         
                    }
            else{
                alert("Error: Invalid data");
            }
            });
    }
}]);
