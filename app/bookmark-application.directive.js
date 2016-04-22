angular.module('sofia-training', [
    'st.components.form-add-bookmark',
    'st.components.bookmarks-list',
    'st.components.tags-list',
    'ngRoute',
    'mongolab-factory'
]).directive('bookmarkApplication', function (mongolabFactory) {
    return {
        templateUrl: 'app/bookmark-application.html',
        scope: {},
        controllerAs: 'bookmarkApplicationController',
        controller: function($routeParams){
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
}]);
