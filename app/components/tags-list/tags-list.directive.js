angular.module('st.components.tags-list', [
]).directive('tagsList', function () {
    return {
        templateUrl: 'app/components/tags-list/tags-list.html',
        scope: { bookmarks : '='},
        controller: function ( $scope, $location) {
            $scope.tags = {};
            $scope.filterByTag = function(tag){
                $location.url('filter/' + tag);
            };

            $scope.$watch('bookmarks', function() {
                $scope.tags = $scope.bookmarks.reduce(function(tagMap, bookmark){
                    if (bookmark.tags) {
                        bookmark.tags.split(',').reduce(function(tagMap,tag){
                            if (tagMap[tag]) { tagMap[tag]++;}
                            else {tagMap[tag] = 1;}
                            return tagMap;
                        },tagMap);
                    }
                    return tagMap;
                },{});
            },true);
        }
    };
});

