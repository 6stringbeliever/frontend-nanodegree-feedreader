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

        var postTitle,
            headerText;

        beforeEach(function(done) {
            loadFeed(0, function() {
                postTitle = $('.feed .entry h2').text();
                headerText = $('h1.header-title').text();
                loadFeed(1, function() {
                    done();
                });
            });
        });

        it('contains different content', function(done) {
            expect($('.feed .entry h2').text()).not.toBe(postTitle);
            done();
        });

        it('updates the feed title', function(done) {
            expect($('h1.header-title').text()).not.toBe(headerText);
            done();
        });

    });

    describe('Add new feed dialog', function() {

        beforeEach(function() {
            /* Open the menu. Click the add new feed button. */
            $('body').toggleClass('menu-hidden', false);
            $('#menu-add-new-feed').click();
        });

        afterEach(function() {
            /* Hide the menu. Hide the dialog. Clear the dialog fields.*/
            $('body').toggleClass('menu-hidden', true);
            $('#add-feed-dialog').toggleClass('dialog-hidden', true);
            $('#new-feed-name').val('');
            $('#new-feed-url').val('');
        });

        it('displays when "Add New Feed" is clicked', function() {
            expect($('#add-feed-dialog').length).toBeGreaterThan(0);
            expect($('#add-feed-dialog').hasClass('dialog-hidden')).toBe(false);
        });

        it('closes the menu when "Add New Feed" is clicked', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it('displays an error if user does not enter a name', function() {
            var feedName = '';
            var feedURL = 'http://daringfireball.net/feeds/main';

            /* Fill in the dialog. Valid URL. No Name. Click the button. */
            $('#new-feed-name').val(feedName);
            $('#new-feed-url').val(feedURL);
            $('#new-feed-submit').click();

            /* Verify that there is an error message. */
            expect($('#add-feed-dialog .error-message').length).toBeGreaterThan(0);
        });

        it('displays an error if user enters an invalid URL', function() {
            var feedName = 'Legit Feed Name';
            var feedURL = 'Not a legit URL dot com tilde php dot rss';

            /* Fill in the dialog. Valid Name. Invalid URL. Click the button. */
            $('#new-feed-name').val(feedName);
            $('#new-feed-url').val(feedURL);
            $('#new-feed-submit').click();

            /* Verify that there is an error message. */
            expect($('#add-feed-dialog .error-message').length).toBeGreaterThan(0);
        });

        it('closes when the user adds a valid feed', function() {
            var feedName = 'Daring Fireball';
            var feedURL = 'http://daringfireball.net/feeds/main';

            /* Fill in the dialog. Valid Name. Valid URL. Click the button. */
            $('#new-feed-name').val(feedName);
            $('#new-feed-url').val(feedURL);
            $('#new-feed-submit').click();

            /* Verify that there is no error message and the window is hidden. */
            expect($('#add-feed-dialog .error-message').length).toBe(0);
            expect($('#add-feed-dialog').hasClass('dialog-hidden')).toBe(true);
        });

        it('adds a valid feed to the menu', function() {
            var startingFeedNum = allFeeds.length;
            var feedName = 'Daring Fireball';
            var feedURL = 'http://daringfireball.net/feeds/main';

            /* Fill in the dialog. Valid Name. Valid URL. Click the button. */
            $('#new-feed-name').val(feedName);
            $('#new-feed-url').val(feedURL);
            $('#new-feed-submit').click();

            /* Verify that we've added one feed to allFeeds and that we've
                updated the feed list in the menu. */
            expect(allFeeds.length).toBe(startingFeedNum + 1);
            expect($('.feed-list li:contains(""' + feedName + '"")').length)
                .toBeGreaterThan(0);
        });
    });

}());
