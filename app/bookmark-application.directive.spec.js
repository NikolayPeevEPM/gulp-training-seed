describe ('st.components.form-add-bookmark', function() {

    beforeEach(function() {
        module('sofia-training');
        module(function ($provide) {
            $provide.factory('mongolabFactory',function() {
                return {
                    query: function(){
                        return [{test:'value'}]
                    }
                }
            })
        });
    });

    var scope, ctrl;
    beforeEach(inject(function($compile, $rootScope,$controller){
        scope = angular.extend($rootScope.$new(),{bookmarks:[]});
        var element = $compile('<bookmark-application></bookmark-application>')(scope);
        scope.$digest();
        ctrl = element.controller('bookmarkApplication');

        }));

    it('bookmarks should be populated', function(){
        //not a very good test
        expect(ctrl.bookmarks).toBeDefined();
    });
});
