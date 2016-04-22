angular.module('st.components.bookmarks-list', [
    'ngMaterial',
    'mongolab-factory'
]).directive('bookmarksList', function (mongolabFactory) {
    return {
        templateUrl: 'app/components/bookmarks-list/bookmarks-list.html',
        require: '^bookmarkApplication',
        scope: { bookmarks : '='},
        link: function ($scope, $element, $attr, bookmarkApplication) {
            $scope.filterTag = bookmarkApplication.filterTag;

            $scope.editBookmark = function(bookmark) {
                bookmarkApplication.selectedBookmark = bookmark;
            };

            $scope.deleteBookmark = function(bookmark) {
                mongolabFactory.remove({id: bookmark._id.$oid}).$promise.then(function (resource) {
                    $scope.bookmarks.splice($scope.bookmarks.indexOf(bookmark),1);
                });
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
