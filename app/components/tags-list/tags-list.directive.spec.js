describe ('st.components.tags-list', function() {

    beforeEach(function() {
        module('st.components.tags-list');
    });

    var isolatedScope, element, scope, $location;
    beforeEach(inject(function($compile, $rootScope,_$location_){
        scope = angular.extend($rootScope.$new());
        element = $compile('<tags-list bookmarks="[]"></tags-list>')(scope);
        scope.$digest();
        isolatedScope  = element.isolateScope();
        $location = _$location_;

    }));

    it('tags should be counted', function(){
        isolatedScope.bookmarks = [{tags:'test tag'},{tags:'test tag2'},{tags:'test tag'}];
        scope.$digest();
        expect(isolatedScope.tags).toEqual({'test tag2':1, 'test tag':2});
    });

    it('filterByTag should be defined', function(){
        expect(isolatedScope.filterByTag).toBeDefined();
    });

    it('filterByTag should redirect', function(){
        spyOn($location,'url');
        isolatedScope.filterByTag();
        expect($location.url).toHaveBeenCalled();
    });
});
