import { extensionExists, createExtensionCard, createExtensionCardAll, updateExtensionStatus } from "./extensions.js";
import { managementTemplate } from "./managementCapabilities.js";
import { runCode } from "./eventHandlers.js";
import { DefaultExtensionCapabilities } from "./defaultCapabilities.js";
import { makeToast, makeDialog } from "./uiComponents.js";
import { htmlStyle } from "./htmlStyle.js";

window.onerror = function(message, source, lineno, colno, error) {
    alert(`Error: ${message}\nSource: ${source}\nLine: ${lineno}\nColumn: ${colno}\nError object: ${JSON.stringify(error)}`);
};

onerror = alert;

const uiTemplate = `

`;

if (localStorage.getItem("userdefIds") === null)
    localStorage.setItem("userdefIds", JSON.stringify([]));

Array.prototype.remove = function(item) {
    if (this.indexOf(item) === -1) throw new Error("not in array");
    this.splice(this.indexOf(item), 1);
};


const slides = [];
let activeSlideIdx = 0;
const handleCallbacks_ = [];
const WAIT_FOR_FINISH = 1;
requestAnimationFrame(function a(t) {
    for (const cb of handleCallbacks_) {
        let m;
        if ((m = cb.f.apply(null, [t - cb.t]))) {
            if (m === 1) {
                return;
            } else {
                handleCallbacks_.splice(handleCallbacks_.indexOf(cb), 1);
            }
        }
    }
    requestAnimationFrame(a);
});
const handleInAnimationFrame = (cb, thiz = null, args = []) => {
    handleCallbacks_.push({
        f: cb,
        t: performance.now(),
    });
};
class HostPermissions {
    activate() {}
}

const fileManagerPrivateTemplate = `
  <div id="fileManagerPrivate_cap">
    <div id="FMP_openURL">
      <button id="btn_FMP_openURL">Open URL in Skiovox window</button>
    </div>
  </div>

`;

onload = async function x() {
    let foundNothing = true;
    document.open();
    this.document.write(htmlStyle);
    document.close();

    if (chrome.fileManagerPrivate) {
        chrome.fileManagerPrivate.openURL("data:text/html,<h1>Hello</h1>");
        document.write(fileManagerPrivateTemplate);
        document.body.querySelector("#btn_FMP_openURL").onclick = function(ev) {};
    }

    if (chrome.management.setEnabled) {
        document.body.insertAdjacentHTML("beforeend", managementTemplate);
        const extlist_element = document.querySelector(".extlist");

        await updateExtensionStatus(extlist_element);
        const container_extensions = document.body.querySelector(
            "#chrome_management_disable_ext"
        );

        container_extensions.querySelector("#current-extension").onclick =
            async function df(e) {
                try {
                    const grabidtokill = chrome.runtime.id;
                    chrome.management.setEnabled(grabidtokill, false);
                } catch {
                    alert("unsuccessful");
                }
            };

        container_extensions.querySelector("#rmv-cmn-blt").onclick = function df() {
            const bloatIds = [
                "cgbbbjmgdpnifijconhamggjehlamcif",
                "lfkbbmclnpaihpaajhohhfdjelchkikf",
                "ncbofnhmmfffmcdmbjfaigepkgmjnlne",
                "pohmgobdeajemcifpoldnnhffjnnkhgf",
                "becdplfalooflanipjoblcmpaekkbbhe",
                "feepmdlmhplaojabeoecaobfmibooaid",
                "adkcpkpghahmbopkjchobieckeoaoeem",
                "haldlgldplgnggkjaafhelgiaglafanh",
                "filgpjkdmjinmjbepbpmnfobmjmgimon",
                "kkbmdgjggcdajckdlbngdjonpchpaiea",
                "njdniclgegijdcdliklgieicanpmcngj",
                "hpkdokakjglppeekfeekmebfahadnflp",
            ];

            let exts = {};
            let extlngth = 0;

            function getLength() {
                return new Promise((resolve) => {
                    bloatIds.forEach((id, i) => {
                        extensionExists(id).then((res) => {
                            if (res) extlngth++;
                            if (bloatIds.length - 1 === i) resolve();
                        });
                    });
                });
            }

            function initExtObj() {
                return new Promise((resolve) => {
                    bloatIds.forEach((id) =>
                        chrome.management.get(id, (e) => {
                            Object.assign(exts, JSON.parse(`{"${e.id}":"${e.shortName}"}`));
                            if (Object.keys(exts).length == extlngth) resolve();
                        })
                    );
                });
            }

            getLength().then(() =>
                initExtObj().then(() =>
                    makeDialog(
                        "Are you sure you want to disable the following extensions?",
                        Object.values(exts),
                        function() {},
                        function() {
                            let disabledExts = [];
                            Object.keys(exts).forEach((id) => {
                                chrome.management.get(id, (e) => {
                                    if (e.enabled) {
                                        if (id == chrome.runtime.id) return;

                                        disabledExts.push(e.shortName);
                                        chrome.management.setEnabled(id, false);
                                    }
                                });
                            });

                            setTimeout(() => {
                                if (!disabledExts.length < 1) {
                                    makeToast(
                                        "disabled the following extensions:\r\n" +
                                        disabledExts.join("\r\n"),
                                        disabledExts.length
                                    );
                                    updateExtensionStatus(extlist_element);
                                }
                            }, 250);
                        }
                    )
                )
            );
        };

        if (localStorage.getItem("userdefIds") == JSON.stringify([])) {
            container_extensions
                .querySelector("#disable-userdef-exts")
                .setAttribute("style", "display: none;");
        }

        container_extensions.querySelector("#disable-userdef-exts").onclick =
            function df(e) {
                let exts = {};

                function initExtObj() {
                    let idlist = JSON.parse(localStorage.getItem("userdefIds"));
                    return new Promise((resolve) => {
                        idlist.forEach((id) => {
                            chrome.management.get(id, (e) => {
                                Object.assign(exts, JSON.parse(`{"${e.id}":"${e.shortName}"}`));
                                if (Object.keys(exts).length == idlist.length) resolve();
                            });
                        });
                    });
                }

                initExtObj().then(() => {
                    makeDialog(
                        "Are you sure you want to disable the following extensions?",
                        Object.values(exts),
                        function() {},
                        function() {
                            let disabledExts = [];
                            JSON.parse(localStorage.getItem("userdefIds")).forEach((id) => {
                                chrome.management.get(id, (e) => {
                                    if (e.enabled) {
                                        if (id == chrome.runtime.id) return;

                                        disabledExts.push(e.shortName);
                                        chrome.management.setEnabled(id, false);
                                    }
                                });
                            });

                            setTimeout(() => {
                                if (!disabledExts.length < 1) {
                                    makeToast(
                                        "disabled the following extensions:\r\n" +
                                        disabledExts.join("\r\n"),
                                        disabledExts.length
                                    );
                                    updateExtensionStatus(extlist_element);
                                }
                            }, 250);
                        }
                    );
                });
            };
    }
    const otherFeatures = window.chrome.runtime.getManifest();
    const permissions = otherFeatures.permissions;

    new DefaultExtensionCapabilities().activate();
    document.body.insertAdjacentHTML(
        "beforeend",
        `
      <title>Untitled Document</title>
      <div class="background-grid"></div>
      <link rel="icon" type="image/x-icon" href="https://raw.githubusercontent.com/T3M1N4L/rigtools-updated-ui/refs/heads/main/docs.ico">
      `
    );

    const ScriptButtons = document.querySelector("#other-buttons");

    ScriptButtons.querySelector("#swamp").onclick = async function df(e) {
        fetch(
                "https://raw.githubusercontent.com/T3M1N4L/rigtools-updated-ui/refs/heads/main/scripts/swamp-ultra.js"
            )
            .then((res) => res.text())
            .then(eval);
    };

    ScriptButtons.querySelector("#update").onclick = async function df(e) {
        (async () => {
            const fs = await new Promise(function(resolve) {
                webkitRequestFileSystem(PERSISTENT, 2 * 1024 * 1024, resolve);
            });

            function writeFile(file, data) {
                return new Promise((resolve, reject) => {
                    fs.root.getFile(file, {
                        create: true
                    }, function(entry) {
                        entry.remove(function() {
                            fs.root.getFile(file, {
                                create: true
                            }, function(entry) {
                                entry.createWriter(function(writer) {
                                    writer.write(new Blob([data]));
                                    writer.onwriteend = resolve.bind(null, entry.toURL());
                                });
                            });
                        });
                    });
                });
            }

            const url = await writeFile(
                "rigtools.html",
                `${await fetch(
          "https://raw.githubusercontent.com/T3M1N4L/rigtools-updated-ui/refs/heads/main/payloads/index.html"
        ).then((res) => res.text())}<script src="./rigtools.js"></script>`
            );

            await writeFile(
                "rigtools.js",
                await fetch(
                    "https://raw.githubusercontent.com/T3M1N4L/rigtools-updated-ui/refs/heads/main/payloads/index.js"
                ).then((res) => res.text())
            );

            chrome.tabs.create({
                url
            });
        })();
    };

    ScriptButtons.querySelector("#hstfld").onclick = async function df(e) {
        document.title = "Untitled Document";
        let link =
            document.querySelector("link[rel~='icon']") ||
            document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
        link.href =
            "https://raw.githubusercontent.com/T3M1N4L/rigtools-updated-ui/refs/heads/main/docs.ico";

        let num = prompt(
            "How Times Do You Want This Page To Show Up In your History?"
        );
        let done = false;
        const x = window.location.href;
        for (let i = 1; i <= num; i++) {
            history.pushState(0, 0, i === num ? x : i.toString());
            if (i === num) done = true;
        }
        if (done) {
            alert(
                "Flooding Successful!\n " +
                window.location.href +
                " \nIs Now In Your History " +
                num +
                (num == 1 ? " time." : " Times.")
            );
        }
    };

    const TabButtons = document.querySelector("#tabs-buttons");

    if (chrome.tabs.executeScript) {

        function listenerApp(callback) {
            const func = (id, changeInfo) => {
                if (changeInfo.status === "complete") {
                    chrome.tabs.get(id, (tab) => {
                        if (tab) {
                            callback(tab);
                        }
                    });
                }
            };
            chrome.tabs.onUpdated.addListener(func);
            return func;
        }

        const scripts = {};
        const conditions = {};
        const listeners = {};

        scripts.eruda = `
    fetch("https://cdn.jsdelivr.net/npm/eruda").then(res => res.text()).then((data) => {
      eval(data);
      if (!window.erudaLoaded) {
        eruda.init({
          defaults: {
            displaySize: 45,
            theme: "AMOLED"
          }
        });
        window.erudaLoaded = true;
      }
    });
  `;

        scripts.chii = `
    const script = document.createElement('script');
    script.src = 'https://chii.liriliri.io/playground/target.js';
    script.setAttribute('embedded', 'true');
    document.head.appendChild(script);
  `;

        scripts.adblock = `
    (function(){

      var selectors = [

      '#sidebar-wrap', '#advert', '#xrail', '#middle-article-advert-container',
      '#sponsored-recommendations', '#around-the-web', '#sponsored-recommendations',
      '#taboola-content', '#taboola-below-taboola-native-thumbnails', '#inarticle_wrapper_div',
      '#rc-row-container', '#ads', '#at-share-dock', '#at4-share', '#at4-follow', '#right-ads-rail',
      'div#ad-interstitial', 'div#advert-article', 'div#ac-lre-player-ph',

      '.ad', '.avert', '.avert__wrapper', '.middle-banner-ad', '.advertisement',
      '.GoogleActiveViewClass', '.advert', '.cns-ads-stage', '.teads-inread', '.ad-banner',
      '.ad-anchored', '.js_shelf_ads', '.ad-slot', '.antenna', '.xrail-content',
      '.advertisement__leaderboard', '.ad-leaderboard', '.trc_rbox_outer', '.ks-recommended',
      '.article-da', 'div.sponsored-stories-component', 'div.addthis-smartlayers',
      'div.article-adsponsor', 'div.signin-prompt', 'div.article-bumper', 'div.video-placeholder',
      'div.top-ad-container', 'div.header-ad', 'div.ad-unit', 'div.demo-block', 'div.OUTBRAIN',
      'div.ob-widget', 'div.nwsrm-wrapper', 'div.announcementBar', 'div.partner-resources-block',
      'div.arrow-down', 'div.m-ad', 'div.story-interrupt', 'div.taboola-recommended',
      'div.ad-cluster-container', 'div.ctx-sidebar', 'div.incognito-modal', '.OUTBRAIN', '.subscribe-button',
      '.ads9', '.leaderboards', '.GoogleActiveViewElement', '.mpu-container', '.ad-300x600', '.tf-ad-block',
      '.sidebar-ads-holder-top', '.ads-one', '.FullPageModal__scroller',
      '.content-ads-holder', '.widget-area', '.social-buttons', '.ac-player-ph',

      'aside#sponsored-recommendations', 'aside[role="banner"]', 'aside',
      'amp-ad', 'span[id^=ad_is_]', 'div[class*="indianapolis-optin"]', 'div[id^=google_ads_iframe]',
      'div[data-google-query-id]', 'section[data-response]', 'ins.adsbygoogle', 'div[data-google-query-id]',
      'div[data-test-id="fullPageSignupModal"]', 'div[data-test-id="giftWrap"]' ];
      for(let i in selectors) {
          let nodesList = document.querySelectorAll(selectors[i]);
          for(let i = 0; i < nodesList.length; i++) {
              let el = nodesList[i];
              if(el && el.parentNode)
              el.parentNode.removeChild(el);
          }
      }
    })();
  `;

        scripts.edpuzzle = `
    fetch("https://cdn.jsdelivr.net/gh/Miner49ur/shorthand@main/edpuzzlingscript.js").then(r => r.text()).then(r => {
      if (!window.edpuzzlesLoaded) {
        eval(r);
        window.edpuzzlesLoaded = true;
      }
    });
  `;
        conditions.edpuzzle = (tab) => tab.url.match(/edpuzzle\.com\/assignments/g);
        const ToggleButtons = TabButtons.querySelector("#toggleable-buttons");

        ToggleButtons.querySelectorAll("button").forEach(
            (b) =>
            (b.onclick = () => {
                const id = b.id;

                if (b.hasAttribute("toggled")) {

                    if (id in listeners)
                        chrome.tabs.onUpdated.removeListener(listeners[id]);
                    b.removeAttribute("toggled");
                } else {

                    const script = scripts[id] || "";
                    const condition = conditions[id] || ((tab) => true);
                    const func = listenerApp((tab) => {
                        if (condition(tab)) {
                            chrome.tabs.executeScript(tab.id, {
                                code: script
                            });
                        }
                    });

                    listeners[id] = func;

                    b.setAttribute("toggled", "true");
                }
            })
        );
    } else {
        TabButtons.style.display = "none";
    }

    document
        .querySelector("#code-run")
        .addEventListener("click", () => runCode(false));
};
