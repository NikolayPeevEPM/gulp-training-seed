angular.module('st.components.form-add-bookmark', [
    'ngMessages',
    'mongolab-factory'
]).directive('formAddBookmark', function (mongolabFactory) {
    return {
        templateUrl: 'app/components/form-add-bookmark/form-add-bookmark.html',
        scope: {bookmark: '='},
        require: '^bookmarkApplication',
        link: function ($scope, $element, $attr, bookmarkApplicationController) {
            $scope.$watch('bookmark', function (newValue, oldValue) {
                if (newValue instanceof Object && Object.keys(newValue).length) $scope.addBookmarkForm.$setDirty();
            });
            $scope.addBookmark = function () {
                $scope.isSaving = true;
                if ($scope.bookmark.$$hashKey) {
                    mongolabFactory.update({id: $scope.bookmark._id.$oid}, $scope.bookmark).$promise.then(function (resource) {
                        $scope.clearForm();
                        $scope.isSaving = false;
                    });
                } else {
                    mongolabFactory.save($scope.bookmark).$promise.then(function (resource) {
                        bookmarkApplicationController.bookmarks.push(resource);
                        $scope.clearForm();
                        $scope.isSaving = false;
                    })
                }
            };

            $scope.clearForm = function () {
                //TODO: qurey for the stored value of the bookmark and replace JUST the modified with the original
                if ($scope.bookmark.$$hashKey) {
                    bookmarkApplicationController.bookmarks = mongolabFactory.query();
                }
                $scope.bookmark = {};
                $scope.addBookmarkForm.$setPristine();
                $scope.addBookmarkForm.$setUntouched();
            }
        }
    };
});
