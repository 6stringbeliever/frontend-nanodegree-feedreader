# Project Overview

In this project you are given a web-based application that reads RSS feeds. The original developer of this application clearly saw the value in testing, they've already included [Jasmine](http://jasmine.github.io/) and even started writing their first test suite! Unfortunately, they decided to move on to start their own company and we're now left with an application with an incomplete test suite. That's where you come in.

# Additional Tests

* In the "RSS Feeds" suite, add a test to make sure that the URL values in allFeeds are actually URLs. This should pass.
* In the "The Menu" suite, add a test to make sure that the menu closes when users select a feed from the menu. This should pass.
* In the "New Feed Selection" suite, add a test to make sure the page header changes when a new feed is selected. This should pass.
* Add a new test suite to test for future feature of being able to add new feeds. A "Add New Feeds" button will appear below the list of feeds on the menu. Clicking the button will display a dialog box. Users will enter a feed name and feed URL in the dialog box and click an "Add Feed" button. If the feed name or URL are invalid, the dialog box will display an error message. If the feed name and URL are valid, the dialog box will disappear and the feed name will be added to the allFeeds variable and the list in the menu will be updated. These should all fail miserably like my 2015 March Madness bracket.

# References

* http://evanhahn.com/how-do-i-jasmine/
* Regular Expressions Cookbook by Jan Goyvaerts and Steven Levithan
(for the URL regex)
