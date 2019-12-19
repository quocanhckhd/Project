var app = angular.module('app', ['firebase']);
app.controller('chatCtrl', ['$scope', '$firebase', function($scope, $firebase) {
    var name = prompt("Enter your name: ", '');
    $scope.name = name;
    $scope.chatMessage = "";
    var ref = new Firebase("https://quocanhckhd-a17a5.firebaseio.com/");
    var sync = $firebase(ref);
    $scope.chatMessages = sync.$asArray();
    $scope.sendChat = function() {
        var chatMessage = {
            name: name,
            message: $scope.chatMes
        };
        $scope.chatMessages.$add(chatMessage);
        $scope.chatMes = "";
    }
    $scope.clear = function() {
        for(var i = 0; i < $scope.chatMessages.length; i++) {
            $scope.chatMessages.$remove($scope.chatMessages[i]);
        }
    }
}]);