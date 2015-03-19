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

        it('have an URL', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        it('have valid URLs', function() {
            var urlregex = /^(https?|ftp):\/\/[a-z0-9-]+(\.[a-z0-9-]+)+([/?].+)?$/;
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toMatch(urlregex);
            }
        });

        it('have a name', function(){
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });

    });


    describe('The menu', function() {

        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('toggles when the hamburger button is clicked', function() {
            /* Get the current state of the menu */
            var open = $('body').hasClass('menu-hidden');

            /* Click the hamburger button then check that the menu state has
            * changed. */
            $('.menu-icon-link').click();

            expect($('body').hasClass('menu-hidden')).not.toBe(open);

            /* Click the hamburger button again then check that the menu state has
            * returned to the beginning state. */
            $('.menu-icon-link').click();

            expect($('body').hasClass('menu-hidden')).toBe(open);
        });

        it('closes when a feed is selected', function() {
            /* Open the menu. Click the first item. */
            $('body').toggleClass('menu-hidden', false);
            $('.feed-list a').first().click();

            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

    });


    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(1, function() { done(); });
        });

        it('have at least one entry', function(done) {
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });
    });


    describe('New Feed Selection', function() {

        var postTitle;

        beforeEach(function(done) {
            loadFeed(0, function() {
                postTitle = $('.feed .entry h2').text();
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it('contains different content', function(done) {
            expect($('.feed .entry h2').text()).not.toBe(postTitle);
            done();
        });

    });

}());
