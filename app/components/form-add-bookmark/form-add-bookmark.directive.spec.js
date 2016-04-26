describe ('st.components.form-add-bookmark', function() {

    beforeEach(function() {
        module('st.components.form-add-bookmark');
        module(function ($provide) {
            $provide.factory('mongolabFactory',function($q) {
                return { save: function(){
                    return {
                        $promise: $q.resolve()
                    }
                },
                update: ""
                }
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

    it('addBookmark should be defined', function(){
        expect(isolatedScope.addBookmark).toBeDefined();
    });

    it('addBookmark should update if element is not new', function(){
        isolatedScope.bookmark = {$$hashKey:'test value'};
        isolatedScope.addBookmark();
        isolatedScope.$apply();
    });

    it('addBookmark should save if element is new', function(){
        isolatedScope.bookmark = {};
        isolatedScope.addBookmark();
        isolatedScope.$apply();
    });
});
