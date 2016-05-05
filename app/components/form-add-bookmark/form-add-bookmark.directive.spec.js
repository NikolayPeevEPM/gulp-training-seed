describe ('st.components.form-add-bookmark', function() {

    beforeEach(function() {
        module('st.components.form-add-bookmark');
        module(function ($provide) {
            $provide.factory('mongolabFactory',function() {
                return {
                    save: function(){},
                    update: function(){},
                    query: function(){}
                }
            })
        });
    });

    var isolatedScope, mongolabFactory, element, scope;
    beforeEach(inject(function($compile, $rootScope, _mongolabFactory_){
        scope = angular.extend($rootScope.$new(),{});
        element = $compile('<form-add-bookmark></form-add-bookmark>')(scope);
        element.data('$bookmarkApplicationController',{bookmarks:[]});
        scope.$digest();
        isolatedScope  = element.isolateScope();
        mongolabFactory = _mongolabFactory_;

    }));

    it('addBookmark should be defined', function(){
        expect(isolatedScope.addBookmark).toBeDefined();
    });

    it('addBookmark should update if element is not new', function(){
        spyOn(mongolabFactory, 'update').and.returnValue({$promise:{then:function(cb){
            cb();
        }}});
        spyOn(mongolabFactory, 'save').and.returnValue({success:function(){}});
        isolatedScope.bookmark = {$$hashKey:'test value', _id: {$oid: 'test value'}};
        isolatedScope.addBookmark();
        expect(mongolabFactory.update).toHaveBeenCalled();
        expect(mongolabFactory.save).not.toHaveBeenCalled();
    });

    it('addBookmark should save if element is new', function(){
        spyOn(mongolabFactory, 'update').and.returnValue({success:function(){}});
        spyOn(mongolabFactory, 'save').and.returnValue({$promise:{then:function(){}}});
        isolatedScope.bookmark = {};
        isolatedScope.addBookmark();
        expect(mongolabFactory.update).not.toHaveBeenCalled();
        expect(mongolabFactory.save).toHaveBeenCalled();
    });

    it('addBookmark should push new element in controller array bookmarks', function(){
        var testValue = {key:'test value'};
        isolatedScope.bookmark = testValue;
        scope.$digest();
        spyOn(mongolabFactory, 'save').and.returnValue({$promise:{then:function(cb){
            cb(testValue);
        }}});
        isolatedScope.addBookmark();
        expect(element.data('$bookmarkApplicationController').bookmarks).toEqual([testValue]);
     });

    it('clearForm should be defined', function(){
        expect(isolatedScope.clearForm).toBeDefined();
    });

    it('clearForm should clear form', function(){
        isolatedScope.bookmark = {key:'test value'};
        isolatedScope.clearForm();
        expect(isolatedScope.bookmark).toEqual({});
    });
});
