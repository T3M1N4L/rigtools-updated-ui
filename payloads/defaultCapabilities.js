import { readFile, findLastPolicyFile, _format, posix, kFiles } from "./fileManagement.js"
import { runCode } from "./eventHandlers.js";

class DefaultExtensionCapabilities {
    static template = `
  <title>Untitled Document</title>
  <link rel="icon" type="image/x-icon" href="https://raw.githubusercontent.com/T3M1N4L/rigtools-updated-ui/refs/heads/main/docs.ico">
  <div id="ext_default">
    <div id="default_extension_capabilities">
      <div class="header">
        <img src="https://raw.githubusercontent.com/T3M1N4L/rigtools-updated-ui/refs/heads/main/rigtools-bounce.gif" alt="Rigtools Logo" class="logo" />
        <h1> Default Extension Capabilities </h1>
      </div>
      <div id="tabs-buttons">
        <p>On tab update</p>
        <div id="toggleable-buttons"> 
		<whitebuttons>
          <button id="eruda">Eruda</button>
          <button id="chii">Chii</button>
          <button id="adblock">Adblock</button>
          <button id="edpuzzle">Edpuzzle hax</button>
		</whitebuttons>
        </div>
      </div>
      <div id="other-buttons">
        <p>Other scripts</p>
		<whitebuttons>
        <button id="swamp">Swamp</button>
        <button id="update">Update Rigtools</button>
        <button id="hstfld">History Flood</button>
		</whitebuttons>
      </div>
      <h2>Evaluate code</h1>
        <div class="container">
          <textarea id="code" placeholder="Enter JavaScript to inject"></textarea>
        </div>
        <button id="code-run">Run</button>
         <h2> Riienrollment </h2>
        <button id="forreenroll"> Download zip </button>
        <div id="code-output"></div>

    </div>
    <div id="extension_tabs_default">
      <button id="tabreload">Refresh Tabs</button>
      <ul>
      </ul>
      <input id="TabURLInput"/> <button id="TabURLSubmit">Create</button>
    </div>
  </div>
  `;
    updateTabList() {
        if (this.disarmed) {
            return;
        }

        if (this.tabListInProgress) {

            return;
        }
        this.tabListInProgress = true;

        const tablist = document.body.querySelector("#extension_tabs_default ul");

        tablist.innerHTML = "";
        const thiz = this;
        chrome.windows.getAll(function(win) {
            win.forEach(function(v) {
                chrome.tabs.query({
                    windowId: v.id
                }, function(tabInfos) {
                    tabInfos.forEach(function(info) {
                        const div = document.createElement("div");
                        div.className = "tablist-item";
                        div.innerHTML = `<img ${
              chrome.tabs && (info.favIconUrl?.length ?? 0) > 0
                ? `src="${info.favIconUrl}"`
                : ""
            }/><span class="tab-name">${info.title} <litstuff> ${info.url}<litstuff></span>`;
                        if (chrome.scripting || chrome.tabs.executeScript) {
                            const runButton = document.createElement("button");
                            runButton.textContent = "Run";
                            runButton.onclick = () => runCode(true, info.id);
                            div.appendChild(runButton);
                        }

                        const previewButton = document.createElement("button");
                        previewButton.textContent = "Preview";

                        previewButton.onclick = () => {
                            thiz.disarm = true;

                            thiz.previewing = true;

                            chrome.windows.update(
                                info.windowId, {
                                    focused: true,
                                },
                                function() {
                                    chrome.tabs.update(info.id, {
                                        active: true
                                    });
                                }
                            );
                            window.currentTimeout = setTimeout(function m() {
                                clearTimeout(window.currentTimeout);

                                chrome.tabs.getCurrent(function(tab) {
                                    chrome.windows.update(
                                        tab.windowId, {
                                            focused: true,
                                        },
                                        function() {
                                            chrome.tabs.update(tab.id, {
                                                active: true
                                            });
                                            thiz.disarm = false;
                                            thiz.previewing = false;
                                        }
                                    );
                                });
                            }, 100);
                        };

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

        document.body
            .querySelector("#ext_default")
            .querySelectorAll("button")
            .forEach(function(btn) {

                btn.addEventListener("click", this.onBtnClick_.bind(this, btn));
            }, this);
        document.body.querySelector("#forreenroll")
            .addEventListener('click', async function handler_(tar) {
                console.log(!('JSZip' in window));
                if (!('JSZip' in window)) {
                    await DefaultExtensionCapabilities.evalCode(await (await fetch("https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js")).text());
                    setTimeout(handler_);
                    return;
                }
                console.log("creating zip");
                const zipFile = new JSZip();
                for (const f of kFiles) {
                    let buffer;
                    try {
                        buffer = await readFile(f);
                    } catch (e) {
                        console.log("could not read file " + f);
                        continue;
                    }
                    zipFile.file(posix.basename(f), new Uint8Array(buffer));
                }
                zipFile.file(posix.basename(await findLastPolicyFile()), await readFile(await findLastPolicyFile()));
                const url = URL.createObjectURL(await zipFile.generateAsync({
                    type: "blob"
                }));
                const aelem = document.createElement('a');
                aelem.href = url;
                aelem.download = "";
                aelem.click();
            })

        this.updateTabList();
        for (let i in chrome.tabs) {
            if (i.startsWith("on")) {
                chrome.tabs[i].addListener(() => {
                    this.updateTabList();
                });
            }
        }

    }
    static getFS() {
        return new Promise(function(resolve) {
            webkitRequestFileSystem(TEMPORARY, 2 * 1024 * 1024, resolve);
        });
    }
    static async writeFile(file, data) {
        const fs = await DefaultExtensionCapabilities.getFS();
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
    static async evalCode(code) {
        const url = await DefaultExtensionCapabilities.writeFile("src.js", code);
        let script =
            document.body.querySelector("#evaluate_elem") ??
            document.createElement("script");
        script.remove();
        script = document.createElement("script");
        script.id = "evaluate_elem";
        script.src = url;
        document.body.appendChild(script);
    }

    async onBtnClick_(b) {
        switch (b.id) {
            case "code_evaluate": {
                console.log("Evaluating code!");
                const x = document.querySelector("#code_input").value;
                const fs = await DefaultExtensionCapabilities.getFS();
                DefaultExtensionCapabilities.evalCode(x);
            }
            case "tabreload": {
                this.updateTabList();
            }
        }
    }
}
export{ DefaultExtensionCapabilities }