describe ('st.components.form-add-bookmark', function() {

    beforeEach(function() {
        module('st.components.form-add-bookmark');
        module(function ($provide) {
            $provide.factory('mongolabFactory',function($q) {
                return { save: function(){
                    return {
                        $promise: $q.when({})
                    }
                }}
            })
        });
    });

    var isolatedScope;
    beforeEach(inject(function($compile, $rootScope){
        var scope = angular.extend($rootScope.$new(),{});
        var element = $compile('<form-add-bookmark></form-add-bookmark>')(scope);
        element.data('$bookmarkApplicationController',{});
        scope.$digest();
        isolatedScope  = element.isolateScope();

    }));

    it('should', function(){
        isolatedScope.bookmark = {tags: '1,2,3'};
        isolatedScope.addBookmark();
        expect(1).toBe(1);
    });

    it('should', function(){
        isolatedScope.bookmark = {};
        isolatedScope.addBookmark();
        expect(1).toBe(1);
    });
});
