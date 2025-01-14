import { makeToast } from "./uiComponents.js";

let savedExtList = [];

async function extensionExists(id) {
    return new Promise((resolve) =>
        chrome.management.getAll((extensions) =>
            resolve(extensions.some((ext) => ext.id === id))
        )
    );
}

function createExtensionCard(name, id, enabled, icon_url) {
    const li = document.createElement("li");
    li.className = "extension-card";
    li.innerHTML = `
      <img class="extension-icon" src="${icon_url}"/>
      <span class="extension-name">${name} <litstuff> ${id}</litstuff></span>
      <label class="toggle-switch">
          <input type="checkbox" ${enabled ? "checked" : ""}>
          <span class="slider"></span>
      </label>
  `;
    return li;
}

function createExtensionCardAll(enabled = true) {
    const li = document.createElement("li");
    li.className = "extension-card-all";
    li.innerHTML = `
      <img class="extension-icon" src="https://raw.githubusercontent.com/T3M1N4L/T3M1N4L/refs/heads/main/images/XOsX.gif"/>
      <span class="extension-name">All Extensions</span>
      <label class="toggle-switch">
          <input type="checkbox" ${enabled ? "checked" : ""}>
          <span class="slider"></span>
      </label>
  `;
    return li;
}

function updateExtensionStatus(extlist_element) {
    return new Promise(function(resolve, reject) {
        extlist_element.innerHTML = "";
        let cardAll = createExtensionCardAll();
        let cardInputAll = cardAll.querySelector("input");

        cardInputAll.addEventListener("change", (event) => {
            cardInputAll.disabled = true;
            chrome.management.getSelf(function(self) {
                chrome.management.getAll(function(extensions) {
                    if (chrome.runtime.lastError) {
                        alert(
                            "Error loading extensions: " + chrome.runtime.lastError.message
                        );
                        return reject(chrome.runtime.lastError);
                    }

                    const promises = [];
                    for (let i = 0; i < extensions.length; i++) {
                        let extId = extensions[i].id;
                        if (extId !== self.id) {
                            promises.push(
                                chrome.management.setEnabled(extId, event.target.checked)
                            );
                        }
                    }
                    Promise.all(promises)
                        .then(() => {
                            cardInputAll.disabled = false;
                            resolve();
                        })
                        .catch((error) => {
                            alert("Error enabling/disabling extensions: " + error.message);
                            reject(error);
                        });
                });
            });
        });

        extlist_element.appendChild(cardAll);

        chrome.management.getAll(function(extlist) {
            if (chrome.runtime.lastError) {
                alert("Error loading extensions: " + chrome.runtime.lastError.message);
                return reject(chrome.runtime.lastError);
            }

            const ordlist = [];
            extlist.forEach(function(extension) {
                if (extension.id === new URL(new URL(location.href).origin).host) {
                    return;
                }
                ordlist.push(extension);

                const icon =
                    extension.icons?.find((ic) => ic.size === 128) ??
                    extension.icons?.at(-1);

                let card = createExtensionCard(
                    extension.name,
                    extension.id,
                    extension.enabled,
                    icon?.url ||
                    "https://raw.githubusercontent.com/T3M1N4L/T3M1N4L/refs/heads/main/images/XOsX.gif"
                );

                let cardInput = card.querySelector("input");

                cardInput.addEventListener("change", (event) => {
                    chrome.management.setEnabled(
                        extension.id,
                        event.target.checked,
                        (result) => {
                            if (chrome.runtime.lastError) {
                                alert(
                                    "Error updating extension status: " +
                                    chrome.runtime.lastError.message
                                );
                            }
                        }
                    );
                });

                card.querySelector(".extension-icon").addEventListener("click", () => {
                    userdefIds = JSON.parse(localStorage.getItem("userdefIds"));
                    if (userdefIds.includes(extension.id)) {
                        userdefIds.remove(extension.id);
                        localStorage.setItem("userdefIds", JSON.stringify(userdefIds));
                        makeToast("removed " + extension.shortName + " from the list", 2);
                    } else {
                        userdefIds.push(extension.id);
                        localStorage.setItem("userdefIds", JSON.stringify(userdefIds));
                        makeToast("added " + extension.shortName + " to the list", 2);
                    }

                    if (localStorage.getItem("userdefIds") === JSON.stringify([])) {
                        document
                            .querySelector("#disable-userdef-exts")
                            .setAttribute("style", "display: none;");
                    } else {
                        document
                            .querySelector("#disable-userdef-exts")
                            .setAttribute("style", "display: inline;");
                    }
                });

                extlist_element.appendChild(card);
            });
            savedExtList = ordlist;
            resolve();
        });
    });
}
export{ extensionExists, createExtensionCard, createExtensionCardAll, updateExtensionStatus }