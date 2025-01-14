import { DefaultExtensionCapabilities } from "./defaultCapabilities.js";

const runCode = async (onTab, tabId = "") => {
    const codeTextarea = document.querySelector("#code");
    let code = codeTextarea.value.trim();

    const outputDiv = document.querySelector("#code-output");

    if (code.toLowerCase() === "prahit") {

        const container = document.createElement("div");
        container.className = "prahit-container";

        const overlayImage = document.createElement("img");
        overlayImage.src =
            "https://raw.githubusercontent.com/T3M1N4L/rigtools-updated-ui/refs/heads/main/prahit.png";
        overlayImage.alt = "Prahit Image";
        overlayImage.className = "prahit-image";

        const textBox = document.createElement("div");
        textBox.textContent = "\"I made my own oil rigging stock market tools.\"";
        textBox.className = "prahit-textbox";

        container.appendChild(overlayImage);
        container.appendChild(textBox);

        document.body.appendChild(container);

        const snowflakesDiv = document.createElement("div");
        snowflakesDiv.className = "snowflakes";
        snowflakesDiv.setAttribute("aria-hidden", "true");

        for (let i = 0; i < 14; i++) {
            const snowflake = document.createElement("div");
            snowflake.className = "snowflake";

            const snowflakeImage = document.createElement("img");
            snowflakeImage.width = 30;
            snowflakeImage.src = "https://raw.githubusercontent.com/T3M1N4L/rigtools-updated-ui/refs/heads/main/prahit.png";
            snowflake.appendChild(snowflakeImage);

            snowflakesDiv.appendChild(snowflake);
        }

        document.body.appendChild(snowflakesDiv);

        const explosionImage = document.createElement("img");
        explosionImage.src = "https://raw.githubusercontent.com/ssoggycat/soggy.cat/refs/heads/main/team/assets/images/boom.awebp";
        explosionImage.style.position = "fixed";
        explosionImage.style.top = "0";
        explosionImage.style.left = "0";
        explosionImage.style.width = "100%";
        explosionImage.style.height = "100%";
        explosionImage.style.zIndex = "9999";
        explosionImage.style.display = "none";
        document.body.appendChild(explosionImage);

        const explode = new Audio("https://raw.githubusercontent.com/ssoggycat/soggy.cat/refs/heads/main/team/assets/audio/boom.mp3");

        const catsMusic = new Audio("https://raw.githubusercontent.com/ssoggycat/soggy.cat/refs/heads/main/team/assets/audio/cats.ogg");
        catsMusic.loop = true;

        function showExplosionAndPlayMusic() {

            explosionImage.style.display = 'block';

            explode.play();
            catsMusic.play();

            setTimeout(function() {
                explosionImage.style.display = 'none';
            }, 1500);

            setTimeout(function() {
                explode.pause();
                explode.currentTime = 0;
            }, 1500);
        }

        showExplosionAndPlayMusic();

        return;
    }

    if (onTab) {
        code = chrome.tabs.executeScript ?
            `;chrome.tabs.executeScript(
          ${tabId},
          { code: ${JSON.stringify(code)} }
        )` :
            chrome.scripting ?
            `chrome.scripting.executeScript({
          target: {tabId: ${tabId}},
          func: () => {${code}}
        });` :
            `alert("something went wrong, runCode was executed on a tab without proper permissions")`;
    }

    try {
        const originalLog = console.log;
        console.log = (...args) => {
            outputDiv.innerHTML += args.join(" ") + "<br>";
        };

        const fs = await DefaultExtensionCapabilities.getFS();

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
export { runCode };
