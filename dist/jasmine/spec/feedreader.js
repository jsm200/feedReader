/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that all urls are defined and not empy.*/
         it('ensures all URLs are definde and not empty', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url).toMatch('http');
            }
        });   
        /* Test each name is defined and not empty.*/
        it('ensures all Names are definde and not empty', function() {
            for (var i = 0, len = allFeeds.length; i < len; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toEqual(0);
            }
        });   
    });

    describe('The Menu', function() {
        /* test that ensures the menu element is
         * hidden by default.
         */
        it('ensures the menu element is hidden by default', function() {
            expect(document.body.className).toContain('menu-hidden');
        });
         /* test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */   
        it('ensures the menu changes visibility when the menu icon is clicked', function() {
            $('a.menu-icon-link').click();
            expect(document.body.className).not.toContain('menu-hidden');
            $('a.menu-icon-link').click();
            expect(document.body.className).toContain('menu-hidden');
        });
    });
    
    describe('Initial Entries', function() {
        beforeEach(function(done) {
            loadFeed(0,done);
        });        
        /* test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        it('there is at least a single .entry element within the .feed container', function() { //removed done from function() per code reviewer
            var lengthList = $('.feed .entry').length;
            expect(lengthList).toBeGreaterThan(0);
            // done();  // removed per cod reviewer
        });   
    });

    describe('New Feed Selection', function() {
        var content1;
        var content2;

        beforeEach(function(done) {
            loadFeed(0,function() {
                content1 = $('.feed .entry').find('h2')[0].textContent;
                loadFeed(1, done);
            });
        });       
         /* test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */    
        it('content change with new feed', function(done) {
           content2 = $('.feed .entry').find('h2')[0].textContent;
           expect(content1).not.toEqual(content2);
           done();
        });
    });
}());
