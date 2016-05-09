describe('Bookmarks Application', function () {
    beforeEach(function () {
        browser.get('http://localhost:8080');
    });

    it('should have three custom directives', function () {
        expect($$('form-add-bookmark')).toBeDefined();
        expect($$('bookmarks-list')).toBeDefined();
        expect($$('tags-list')).toBeDefined();
    });

    it('should save new entry when input is valid', function () {
        var form = element(by.css('form-add-bookmark'));
        var saveButton = form.element(by.css('[ng-click="addBookmark()"]'));
        expect(saveButton.isEnabled()).toEqual(false);
        form.element(by.model('bookmark.url')).sendKeys('http://www.dir.bg');
        form.element(by.model('bookmark.title')).sendKeys('Test');
        expect(saveButton.isEnabled()).toEqual(true);
        var bookmarksList = element(by.css('bookmarks-list'));
        var initialCount;
        bookmarksList.all(by.css('md-list-item')).count().then(function(count){
            initialCount=count;
        });

        saveButton.click();

        var finalCount;
        bookmarksList.all(by.css('md-list-item')).count().then(function(count){
            finalCount=count;
            expect(finalCount).toEqual(initialCount + 1);
        });

        //cleaning
        element.all(by.css('[aria-label="Test(http://www.dir.bg) |"] + button')).then(function(elems){
            elems.forEach(function(ele) {
                ele.click();
            })
        });

        //waiting for test entries to have been cleaned
        browser.driver.wait(function(){
            var currentCount;
            return bookmarksList.all(by.css('md-list-item')).count().then(function(count){
                currentCount=count;
                return currentCount === initialCount;
            });


        })
    });

});
