# Badgerloop Website- Condor ![GitHub Logo](https://raw.githubusercontent.com/badgerloop-software/pod-dashboard/master/src/public/images/icon.png)

The third revision of the Badgerloop website! The official page for UW-Madison's hyperloop competition team.

_Contributors: Luke Houge, Liam Mahoney_

## Contributing

For details on contributing to the site, check out [CONTIRBUTING.md](https://github.com/badgerloop-software/website-condor/blob/master/CONTRIBUTING.md)

## Testing &nbsp; [![Uptime Robot status](https://img.shields.io/uptimerobot/status/m779426128-6b6e81ed8dc987db17d4cad2.svg)](https://status.badgerloop.org) [![Actions Status](https://github.com/badgerloop-software/website-condor/workflows/Node_CI/badge.svg)](https://github.com/badgerloop-software/website-condor/actions)

https://github.com/badgerloop-software/website-condor/actions

- Configured with eslint for formatting tests
- Configured with jest for unit testing and coverage
- CI handled by Github Actions
- Uptime Robot tracks our uptime and notifies of any downtime

It is currently configured to run a pretest that uses eslint to check for any formating and stylistic errors. If that passes without any issues, then it runs jest which completes all unit tests that are setup (none except for a test called add.js for now) and then displays the coverage (what percent is unit tested). Github Actions will run automatically on any commit, and before a pull request to check that all checks passed.

## Website Technologies

1. **[Node.js](https://nodejs.org/en/about/)**

2. **[Google Fonts](https://fonts.google.com/)**

   - [Lato](https://fonts.google.com/specimen/Lato)
   - [Play](https://fonts.google.com/specimen/Play)

3. **[Font Awesome Icons](https://fontawesome.com/v4.7.0/icons/)**

4. **[Slack API](https://api.slack.com/)**

5. **[Google Apps Script Form Service](https://developers.google.com/apps-script/reference/forms/)**

6. **[Github Web Hooks](https://developer.github.com/webhooks/)**

7. **[GNU Mailutils-3.5 Mail Server Package](https://mailutils.org/)**

8. **[PostFix mail transfer agent (MTA) (included in Mailutils)](http://www.postfix.org/)**

## Server and Hosting

The website is hosted on a Computer Sciences department VM off ESXi hypervisor that is serving the site using apache. If there are issues with the server contact Luke Houge.

1. **[Ubuntu Server 18.04.1 LTS](https://www.ubuntu.com/download/server)**

2. **[Node.js](https://nodejs.org/en/about/)**

3. **[Mongo DB 4.0.5](https://www.mongodb.com/)**
