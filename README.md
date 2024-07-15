# wd-bidi

package for implementing [webdriver BIDI](https://w3c.github.io/webdriver-bidi/). 
The alpha-4 has basic class to create, subscribe and listen to events. Currently, the development of this package is ongoing and the next release will 
include a simple API for subscribing to and listening to multiple events. 
This will make it easier for developers to interact with the WebDriver BIDI 
protocol and handle multiple events within their applications.

### [API docs](https://harsha509.github.io/wd-bidi-docs/)

# Usage
```shell
npm i wd-bidi@latest
```
Here is the sample code on implementation. Get complete code from [github](https://github.com/harsha509/selenium_bidi_demo).

### BrowsingContext: Create context and listen to event
```javascript
require('chromedriver');
const {Builder} = require('selenium-webdriver');
const Chrome= require('selenium-webdriver/chrome');
const opts = new Chrome.Options();
const {BiDi, BrowsingContext } = require('wd-bidi');

describe('BrowserContext: Create and listen to event', ()=> {
  let driver;

  before(async ()=> {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(opts.set('webSocketUrl', true))
      .build();
  })

  it('should listen browserContext events', async () => {
    const caps = await driver.getCapabilities();
    let WebSocketUrl = caps['map_'].get('webSocketUrl')
    const conn = new BiDi(WebSocketUrl.replace('localhost', '127.0.0.1'));

    // Subscribe to events
    const browsingContext = new BrowsingContext(conn);
    await browsingContext.events.contextCreated();

    // create a tab
    await browsingContext.create({type: 'tab'})

    // print the subscription result
    console.log(await browsingContext.events.eventSubscriptionData)
  })

  after(async ()=> await driver.quit())
})
```


## Session: Subscribe to an event
```javascript
require('chromedriver');
const {Builder, By} = require('selenium-webdriver');
const Chrome= require('selenium-webdriver/chrome');
const opts = new Chrome.Options();
const { Session, BiDi, Log} = require('wd-bidi');

describe('Log Events', ()=> {
  let driver;

  before(async ()=> {
    driver = await new Builder()
      .forBrowser('chrome')
      .setChromeOptions(opts.set('webSocketUrl', true))
      .build();
  })

  it('should listen to log events', async () => {
    const caps = await driver.getCapabilities();
    let WebSocketUrl = caps['map_'].get('webSocketUrl')
    const conn = new BiDi(WebSocketUrl.replace('localhost', '127.0.0.1'));
    const log = new Log(conn);

    // Subscribe to log events
    await log.events.entryAdded();

    await driver.get('https://www.selenium.dev/selenium/web/bidi/logEntryAdded.html');

    //generic log
    await driver.findElement(By.id('consoleLog')).click();
    await driver.sleep(1000);
    console.log(log.events.eventSubscriptionData)

    // console error
    await driver.findElement(By.id('consoleError')).click();
    await driver.sleep(1000);
    console.log(log.events.eventSubscriptionData)

    //js exception
    await driver.findElement(By.id('jsException')).click();
    await driver.sleep(1000);
    console.log(log.events.eventSubscriptionData)

    // log with stacktrace
    await driver.findElement(By.id('logWithStacktrace')).click();
    await driver.sleep(1000);
    console.log(log.events.eventSubscriptionData);
  })

  after(async ()=> await driver.quit())
})
```


