describe ('st.components.tags-list', function() {

    beforeEach(function() {
        module('st.components.tags-list');
    });

    var isolatedScope, element, scope;
    beforeEach(inject(function($compile, $rootScope){
        scope = angular.extend($rootScope.$new());
        element = $compile('<tags-list bookmarks="[]"></tags-list>')(scope);
        scope.$digest();
        isolatedScope  = element.isolateScope();

    }));

    it('tags should bew counted', function(){
        isolatedScope.bookmarks = [{tags:'test tag'},{tags:'test tag2'},{tags:'test tag'}];
        scope.$digest();
        expect(isolatedScope.tags).toEqual({'test tag2':1, 'test tag':2});
    });


});
