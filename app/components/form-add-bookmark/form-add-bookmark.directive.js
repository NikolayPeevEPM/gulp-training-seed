angular.module('st.components.form-add-bookmark', [
    'ngMessages',
    'mongolab-factory'
]).directive('formAddBookmark', function (mongolabFactory) {
    return {
        templateUrl: 'app/components/form-add-bookmark/form-add-bookmark.html',
        scope: { bookmark : '='},
        require: '^bookmarkApplication',
        link: function ($scope, $element, $attr, bookmarkApplication) {
            $scope.addBookmark = function (){
                if ($scope.bookmark.$$hashKey) {
                    mongolabFactory.update({id: $scope.bookmark._id.$oid},$scope.bookmark);
                } else {
                    mongolabFactory.save($scope.bookmark).$promise.then(function (resource) {
                            bookmarkApplication.bookmarks.push($scope.bookmark);
                    })
                }
            }

            $scope.clearForm = function (){
                bookmark = mongolabFactory.query
                bookmark = {};

            }
        }
    };
});
