angular.module('sofia-training', [
    'st.components.form-add-bookmark',
    'st.components.bookmarks-list',
    'st.components.tags-list',
    'ngRoute',
    'ngMaterial',
    'mongolab-factory',
    'sofiaTraining.templates'
]).directive('bookmarkApplication', function (mongolabFactory) {
    return {
        templateUrl: 'app/bookmark-application.html',
        scope: {},
        controllerAs: 'bookmarkApplicationController',
        controller: function($routeParams,$scope){
            this.filterTag = $routeParams.tag;
            this.selectedBookmark = {};
            this.bookmarks = mongolabFactory.query();
        }
    };
}).config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.when('/', {
            template: '<bookmark-application></bookmark-application>'
        }).when('/filter/:tag', {
            template: '<bookmark-application></bookmark-application>'
        }).otherwise({
            redirectTo: '/'
        })
}]).config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('purple')
 });

angular.module('sofiaTraining.templates', []);
try {
    angular.module('sofiaTraining.templates');
} catch ( error ) {
    angular.module('sofiaTraining.templates', []).constant('sofiaTrainingVersion', null);
}
