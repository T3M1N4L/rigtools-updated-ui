function makeToast(msg, time) {
    const popover = document.createElement("article");
    popover.popover = "manual";
    popover.classList.add("toast");
    popover.classList.add("newest");
    popover.textContent = msg;
    popover.style.translate = "-50%";

    document.body.appendChild(popover);
    popover.showPopover();

    setTimeout(() => {
        popover.hidePopover();
        setTimeout(() => {
            popover.remove();
        }, 500);
    }, time * 1000);

    popover.addEventListener("toggle", (event) => {
        if (event.newState === "open") {
            moveToasts();
        }
    });
}

function moveToasts() {
    const toasts = document.querySelectorAll(".toast");

    toasts.forEach((toast) => {
        if (toast.classList.contains("newest")) {
            toast.style.top = `5px`;
            toast.classList.remove("newest");
        } else {
            const prevValue = toast.style.top.replace("px", "");
            const newValue = parseInt(prevValue) + toast.clientHeight + 10;
            toast.style.top = `${newValue}px`;
        }
    });
}

function makeDialog(title, msg, oncancel, onconfirm) {
    const dialog = document.createElement("dialog");
    const confirmBtn = document.createElement("button");
    const cancelBtn = document.createElement("button");
    const head = document.createElement("h1");
    const body = document.createElement("div");
    const foot = document.createElement("div");

    dialog.appendChild(head);
    dialog.appendChild(body);
    dialog.appendChild(foot);
    foot.appendChild(confirmBtn);
    foot.appendChild(cancelBtn);
    document.body.appendChild(dialog);

    head.textContent = title;

    body.style.overflowY = "scroll";
    body.style.color = "rgb(220 220 220)";
    body.style.fontSize = "1rem";
    body.style.borderRadius = "10px";
    body.style.padding = "10px";
    body.style.marginBottom = "10px";

    if (Array.isArray(msg)) {
        body.style.border = "solid 1px #1d1d1d";
        msg.forEach((value) => {
            let item = document.createElement("p");
            item.textContent = value;
            body.appendChild(item);
        });
    } else {
        body.style.border = "solid 1px #2d2d2d";
        body.textContent = msg;
    }

    foot.style.height = "fit-content";
    foot.style.marginTop = "auto";
    foot.style.display = "flex";
    foot.style.flexDirection = "row-reverse";

    confirmBtn.classList.add("confirmBtn");
    confirmBtn.addEventListener("click", () => {
        dialog.close();
        onconfirm();
        setTimeout(() => dialog.remove(), 1000);
    });
    confirmBtn.textContent = "Confirm";

    cancelBtn.classList.add("cancelBtn");
    cancelBtn.addEventListener("click", () => {
        dialog.close();
        oncancel();
        setTimeout(() => dialog.remove(), 1000);
    });
    cancelBtn.textContent = "Cancel";

    dialog.showModal();
}

export{ makeToast, moveToasts, makeDialog }