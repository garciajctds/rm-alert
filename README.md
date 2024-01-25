### Set up
1. Download zip (by pressing on the green (`Code` button) and then unzip
2. In your browser, go to chrome://extensions/
3. Press `Load Unpacked` button at the top left of the screen.
4. Select `rm-alert` folder

### How it Works
The extension's functionality can be broken down to 4 main actions: scraping, comparing, notifying, and reloading. When the extension is initially turned on, it scrapes the current `Unassigned` value from the webpage. Then it compares it to the previous value (in this case 0, the default starting value); if the current value is greater than the previous value, a sound is played. Then webpage is reloaded and the sequence of actions repeats, at a given time interval, until the extension is turned off.
