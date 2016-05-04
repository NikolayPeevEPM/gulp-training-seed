angular.module('cat-rain', [
]).directive('catRainApp', function () {
    return {
        template: '<h3>Victims</h3><victims-count casualties="catRainAppController.casualties"></victims-count><div style="clear: both;"></div><shooting-ring casualties="catRainAppController.casualties"></shooting-ring>',
        scope: {},
        controllerAs:'catRainAppController',
        controller: function(){
            this.casualties = {};
        }
    };
}).directive('victimsCount', function (victims) {
    return {
        template: '<div class="victims-count"><div ng-repeat="victim in victims"><hr ng-show="casualties[victim]"/><img ng-src="{{victim}}"/><span>{{casualties[victim] || 0}}</span></div>',
        scope: {casualties:'='},
        link: function($scope, $element, $attr,catRainAppController){
            $scope.victims = victims;
        }
    };
}).directive('shootingRing', function (victims) {
    return {
        template: '<h2>Shooting Ring</h2>' +
            '<h4>Cat Population: {{targets.length}} Time: {{gameTimeInSeconds|number:0}}s</h4>' +
            '<div class="shooting-ring">' +
                '<img ng-repeat="target in targets" ng-click=boom(target) ng-src="{{target.img}}" style="top: {{target.position}}px;left:{{40 * target.lane}}px"/>' +
                '<img ng-repeat="explosion in explosions" src="http://i523.photobucket.com/albums/w356/unkadug/explosion-1.gif" style="top: {{explosion.position}}px;left:{{40 * explosion.lane}}px"/>' +
                '<h1 ng-show="gameTimeInSeconds <= 0">GAME OVER</h1>' +
                '<img ng-show="gameTimeInSeconds <= 0" ng-repeat="grave in graves" src="http://www.nightmarefactory.com/AG807.jpg" style="top: {{grave.position}}px;left:{{40 * grave.lane}}px"/>' +
            '</div>',
        scope: {casualties:'='},
        controller: function($scope, $interval, $timeout){
            $scope.gameTimeInSeconds = 20;
            $scope.targets = [];
            $scope.explosions = [];
            $scope.graves = [];

            var tick = 200;

            $scope.boom = function(victim){
                $scope.targets.splice($scope.targets.indexOf(victim),1);
                if (!$scope.casualties[victim.img]) $scope.casualties[victim.img] = 0;
                $scope.casualties[victim.img]++;
                $scope.explosions.push({lane:victim.lane, position:victim.position});
                $timeout(function(){
                    $scope.graves.push($scope.explosions.splice(0,1)[0]);
                    console.log($scope.graves[0]);
                },800)
            };

            var stop = $interval(function() {
                var shouldCatAppear = (Math.random() > 0.8);
                if (shouldCatAppear && $scope.targets.length < 20){
                    console.log('meow');
                    $scope.targets.push(
                        {
                            img: victims[Math.floor(Math.random()*victims.length)],
                            lane:Math.floor(Math.random()*40),
                            position: 300,
                            speed: Math.floor(Math.random()*3+1)*5
                        }
                    )
                }
                $scope.targets.map(function(target){
                    target.position += target.speed;
                });
                $scope.targets = $scope.targets.reduce(function(result,current) {
                    if (current.position < 800) result.push(current);
                    return result;
                },[]);

                $scope.gameTimeInSeconds -= tick/1000;
                if ($scope.gameTimeInSeconds <= 0){
                    $interval.cancel(stop);
                    stop = undefined;
                    $scope.targets = [];
                }
             }, tick);
        }
    };
}).constant('victims',[
    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTrymLwzeGgu0kyd8QTQJ3u34xk4F135VKp89W5_bD0FXwHWqHhvA',
    'https://artprojectsforkids.org/wp-content/uploads/2014/12/Grumpy-Cat.jpg',
    'http://www.becauseimacat.com/wp-content/uploads/2015/10/Funny-Cats-October-20151-660x330.jpg',
    'http://images1.fanpop.com/images/image_uploads/Funny-Cat-Pictures-cats-935742_555_555.jpg'
]);
