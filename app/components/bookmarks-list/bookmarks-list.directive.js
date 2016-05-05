angular.module('st.components.bookmarks-list', [
    'ngMaterial',
    'ngAnimate',
    'mongolab-factory'
]).directive('bookmarksList', function (mongolabFactory,$location) {
    return {
        templateUrl: 'app/components/bookmarks-list/bookmarks-list.html',
        require: '^bookmarkApplication',
        scope: {
            bookmarks : '=',
            filterTag :'='
        },
        link: function ($scope, $element, $attr, bookmarkApplicationController) {
            $scope.editBookmark = function(bookmark) {
                bookmarkApplicationController.selectedBookmark = bookmark;
            };

            $scope.deleteBookmark = function(bookmark) {
                bookmark.isBeingDeleted = true;
                var promise = mongolabFactory.remove({id: bookmark._id.$oid}).$promise;
                promise.then(function (resource) {
                    bookmark.isBeingDeleted = false;
                    $scope.bookmarks.splice($scope.bookmarks.indexOf(bookmark),1);
                },function (error){
                    bookmark.isBeingDeleted = false;
                });
            };

            $scope.clearFilter = function(bookmark) {
                $location.url('/');
            };
        }
    };
}).filter('hasTag', function(){
    return function(bookmarks, tag){
        if (tag) {
            return bookmarks.filter(function (bookmark) {
                return bookmark.tags.indexOf(tag) > -1;
            });
        } else {
            return bookmarks;
        }
    }
});
