angular.module('st.components.tags-list', [
]).directive('tagsList', function () {
    return {
        templateUrl: 'app/components/tags-list/tags-list.html',
        require: '^bookmarkApplication',
        scope: { bookmarks : '='},
        link: function ( $scope, $element, $attr, bookmarkApplication) {
            $scope.tags = {};
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

