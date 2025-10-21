<p align=center><img src="https://raw.githubusercontent.com/T3M1N4L/rigtools-updated-ui/refs/heads/main/rigtools-bounce.gif" height="170vh"/> <img alt="rigtools" src="https://github.com/user-attachments/assets/f491a85e-9fd7-4fe4-979f-1fa70a1b630e"  PRAHITS RIGTOOOLS height="170vh"></p>

# <p align=center><code>Extension/Devtools code execution</code></p> 
## How to use

> There are two ways you could use this. If your on <128 use the instructions, I will tell you what the second way is for users >133 later in this readme
```sh
$ git clone https://github.com/T3M1N4L/rigtools-updated-ui 
$ cd rigtools
$ npm i
# Create a file named `server_config.json`
# Then paste in `{"updater_url":"localhost:8080"}` (Or whatever your websocket URL is)
$ npm start
```
- Then visit `devtools://devtools/bundled/devtools_app.html` in your browser
- Open a new tab and visit `devtools://devtools/bundled/devtools_app.html?experiments=true&ws=*websocket url*`
- Click on `Network`
- Then click on the gray box twice

## Hartools
[crossjbly](https://github.com/crossjbly/), and a few friends had figured out how to still use rigtools post-rigtools patch on 129-132 **if javascript:// URLs are unblocked** through the use of http archive files, aka `.har` files. If javascript:// URLs are **Blocked** this method only works until version 128 (patched **on** 129).
1. Download the latest `.har` file from the [releases page](https://github.com/t3m1n4l/rigtools-updated-ui/releases/latest/)
2. Get the `.har` file onto the device you want to run the devtools XSS on
3. On the device you want to run the devtools XSS on go to `devtools://devtools/bundled/inspector.html`
> If `devtools://devtools/bundled/inspector.html` is blocked use the one of the following links
> * `devtools://devtools/bundled/js_app.html`
> * `devtools://devtools/bundled/devtools_app.html`
> * `devtools://devtools/bundled/worker_app.html`
4. Once it FULLY loads, add `?experiments=true` to the end of the URL and click enter. (ex. `devtools://devtools/bundled/inspector.html?expirements=true`)
5. Go to the `Network` tab. If you can't find it there should be a button on the topbar that looks like this `>>` and a dropdown should open in which you can select `Network`
> ^^^ if you are already on the network page you can skip this ^^^
6. Click the little upload button and upload the downloaded `.har` file
> ^^^ you may need to expand the sidebar to see it ^^^
7. Double click on the text that appears in the box `[DOUBLE CLICK THIS]`

## Creating your own payloads
1. Clone the GitHub Repository: `git clone https://github.com/t3m1n4l/rigtools-updated-ui`
2. Change directory to `rigtools-updated-ui`: `cd rigtools-updated-ui`
3. The payload files are located in the payloads folder, edit those to your liking
4. Install dependencies: `npm i`
5. If you want to run the websocket server run `npm run start`
6. If you want to package your code to the `.har` file run `npm run har-build`

## Terminology
- Entry
  - Entrypoint (or main script) when running devtools xss.
  - Payload
  - Script passed to extension to run code, such as disabling extensions.
- Chrome URLs
  - Elevated URLs that have extra access to features such as WebUI.
  - Only modify the entrypoint when necessary. If not modified properly, things such as the updater will break, do not remove any buttons and reuse ids.
- ChromeVox hijacking (EXPERIMENTAL, BETA)
  - Devtools payload (script ran by devtools://devtools to create an iframe to chromevox's logging page and run the entry script)
  - ChromeVox entry payload (script injected into the logging page to create the files for the evaluations page)
  - ChromeVox evaluations page (page that allows executing code as chromevox with access to private API's like accessibilityPrivate or settingsPrivate)

## Release information
- Release 2.1.0
  - This release contains the following things
    - Experimental ChromeVox payload
- Release 2.0.0
  - This release contains the following things
    - `.har` file exploit furthering the use of rigtools in newer chrome versions
- Release 1.0.0
  - This release contains the following things
    - Better UI
    - Multiple extension presets
    - QoL features
- Release 0.0.1
  - This release contains the following things:
    - Updater
    - Extension debugging
    - Devtools debugging
    - Chrome url debugging.

## Credits
  - unretained: Original rigtools developer tools code execution exploit (this literally wouldn't have been possible without rigtools lol)
  - t3rm1n4l: Pioneering the new repo as well as improving ui and helping with QoL features 
  - Fallden4: QoL Features
  - Miner49ur: Main developer of the updated ui, later improved and maintained by t3rm1n4l
  - kxtzownsu: skid notice, figuring out that gforms locked mode extension has management perms
  - Crossjbly: Finding the vulnerability in .har files
  - Blobby Boi: Helping with development of the payloads and UI
  - axqmx: Testing and help with development
  - HarryTarryJarry: Creating autoxss and with helping development
  - fanqyxl: provided hosting
