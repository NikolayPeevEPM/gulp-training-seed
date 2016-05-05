describe ('st.components.bookmarks-list', function() {

    beforeEach(function() {
        module('st.components.bookmarks-list');
        module(function ($provide) {
            $provide.factory('mongolabFactory',function() {
                return {
                    remove: function(){}
                }
            });
            $provide.factory('ngMaterial',function() {});
        });
    });

    var isolatedScope, mongolabFactory, element, $location;
    beforeEach(inject(function($compile, $rootScope, _mongolabFactory_,_$location_){
        var scope = angular.extend($rootScope.$new(),{});
        element = $compile('<bookmarks-list></bookmarks-list>')(scope);
        element.data('$bookmarkApplicationController',{});
        scope.$digest();
        isolatedScope  = element.isolateScope();
        mongolabFactory = _mongolabFactory_;
        $location = _$location_;

    }));

    it('editBookmark should be defined', function(){
        expect(isolatedScope.editBookmark).toBeDefined();
    });

    it('editBookmark should update the controller value', function(){
        var testValue = 'test value';
        isolatedScope.editBookmark(testValue);
        expect(element.data('$bookmarkApplicationController').selectedBookmark).toEqual(testValue);
    });

    it('deleteBookmark should be defined', function(){
        expect(isolatedScope.deleteBookmark).toBeDefined();
    });

    it('deleteBookmark should call remove', function(){
        spyOn(mongolabFactory, 'remove').and.returnValue({$promise:{then:function(){}}});
        isolatedScope.deleteBookmark({_id: {$oid: 'test value'}});
        expect(mongolabFactory.remove).toHaveBeenCalled();
    });

    it('deleteBookmark should call remove', function(){
        isolatedScope.bookmarks = [{_id: {$oid: 'test value'}}];
        spyOn(mongolabFactory, 'remove').and.returnValue({$promise:{then:function(cb){
            cb();
        }}});
        isolatedScope.deleteBookmark({_id: {$oid: 'test value'}});
        expect(isolatedScope.bookmarks).toEqual([]);
    });

    it('deleteBookmark should not splice array if error', function(){
        isolatedScope.bookmarks = [{_id: {$oid: 'test value'}}];
        spyOn(mongolabFactory, 'remove').and.returnValue({$promise:{then:function(cb, err){
            err();
        }}});
        isolatedScope.deleteBookmark({_id: {$oid: 'test value'}});
        expect(isolatedScope.bookmarks).toEqual([{_id: {$oid: 'test value'}}]);
    });

    it('clearFilter should be defined', function(){
        expect(isolatedScope.clearFilter).toBeDefined();
    });

    it('clearFilter to redirect', function(){
        spyOn($location,'url');
        isolatedScope.clearFilter();
        expect($location.url).toHaveBeenCalled();
    });

    it('hasTag should exist', inject(function ($filter) {
        expect($filter('hasTag')).not.toBeNull();
    }));

    it('hasTag should filter when provided with tag', inject(function (hasTagFilter) {
        expect(hasTagFilter([{tags:['test tag', 'another test tag']},{tags:['another test tag']}],'test tag'))
            .toEqual([{tags:['test tag', 'another test tag']}]);
    }));

    it('hasTag should return all when NOT provided with tag', inject(function (hasTagFilter) {
        expect(hasTagFilter([{tags:['test tag', 'another test tag']},{tags:['another test tag']}]))
            .toEqual([{tags:['test tag', 'another test tag']},{tags:['another test tag']}]);
    }))
});
