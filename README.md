# wd-bidi

package for implementing [webdriver BIDI](https://w3c.github.io/webdriver-bidi/). 
The alpha-1 has basic class to create, subscribe and listen to events. Currently, the development of this package is ongoing and the next release will include a simple API for subscribing to and listening to multiple events. This will make it easier for developers to interact with the WebDriver BIDI protocol and handle multiple events within their applications.

# Usage
```shell
npm i wd-bidi
```

Here is the sample code on implementation. Get complete code from [github](https://github.com/harsha509/selenium_bidi_demo).

```javascript
require('chromedriver');
const {Builder} = require('selenium-webdriver');
const Chrome= require('selenium-webdriver/chrome');
const opts = new Chrome.Options();
const { BIDI } = require('wd-bidi');

describe('Sample Bidi tests', ()=> {
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
    const bidi = new BIDI(WebSocketUrl.replace('localhost', '127.0.0.1'));

    // Subscribe to log events
    await bidi.send({
      method: 'session.subscribe',
      params: { events: ['log.entryAdded'] }
    })

    // trigger an event
    await driver.executeScript('console.log("Hello Bidi")', [])

    // listen to logEvent message and print
    bidi.socket.on('message', (data) => {
      console.log(JSON.parse(Buffer.from(data.toString())))
    })
  })

  after(async ()=> await driver.quit())
})
```

___NOTE___: THIS IS NOT AN OFFICIAL PACKAGE from Webdriver BIDI community!


