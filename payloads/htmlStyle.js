
const htmlStyle = `
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Geist:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
      body {
        font-family: 'Geist', sans-serif;
        background-color: #000000;
        color: #fff;
        margin: 0;
        padding: 20px;
      }
    .background-grid {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-image: radial-gradient(#333 1px, transparent 1px);
        background-size: 2rem 2rem;
        z-index: -1;
        animation: moveGrid 4s linear infinite;
        transition: background-position-x 400ms;
      }

      @keyframes moveGrid {
        0% {
          background-position: 0 0;
        }

        100% {
          background-position: 2rem 2rem;
        }
      }

      .background-grid:hover {
        background-position-x: 2rem;
      }
      body::-webkit-scrollbar, dialog::-webkit-scrollbar, dialog div::-webkit-scrollbar {
        display: none;
      }
      p {
        margin: 5px auto;
      }
      #chrome_management_disable_ext, #ext_default {
         max-width: 1200px;
         margin: 0 auto;
      }
      h1 {
        font-size: 24px;
        margin-bottom: 20px;
      }
      .description {
        margin-bottom: 20px;
        color: #333;
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
  border: 1px solid #333;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #000000;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.extension-card:has(input:checked) {
  background-color: #000;
  border: 1px solid #333;
}

.extension-card-all {
  border: 1px solid #333;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  display: flex;
  justify-content: start;
  align-items: center;
  background-color: #000000;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.extension-card-all:has(input:checked) {
  background-color: #000;
  border: 1px solid #333;
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
  height: 30px;
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
  background-color: #27272a;
  transition: 0.4s;
  border-radius: 9999px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px; /* Increased size */
  width: 26px;  /* Increased size */
  left: 4px;
  bottom: 2px;
  background-color: #000; 
  transition: 0.4s;
  border-radius: 50%;
  transform: translateX(0); /* Start by aligning the dot to the left */
}

input:checked + .slider {
  background-color: #fff; 
}

input:checked + .slider:before {
  transform: translateX(26px); /* Adjusted translation for the larger dot */
}

		.header {
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .logo {
        width: 4em; 
        height: auto;
        margin-right: 10px;
      }
      .tablist-item {
        border: 1px solid #333;
        margin-bottom: 10px;
        background-color:#000;
        padding: 15px;
        border-radius: 8px;
        display: flex;
		font-weight:bold;
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
      .tablist-item span:hover {
        overflow: visible; 
        white-space: normal;
        height:auto;  
      }
button {
    background-color: #000; 
    color: #fff; 
    border: 1px solid #333; 
    padding: 8px 16px; 
	margin: 4px 2px;
    text-align: center;
    border-radius: 6px; 
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    font-size: 14px; 
    font-weight: bold; 
	        text-decoration: none;
        display: inline-block;
}

button:hover {
    transition: background-color 0.3s, color 0.3s, border-color 0.3s;
    background-color: #111; 
    border-color: #fff; 

}
input {
    padding: 8px 16px; 
	margin: 4px 2px;
	color:white;
    border: 1px solid #333 !important; 
}
input:hover {
    background-color: #111; 
    border-color: #fff; 
}
#toggleable-buttons button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: flex-start;
    transition: background-color 0.3s, color 0.3s;
    overflow: hidden;
    border: none;
    padding: 9px 15px 9px 60px;
    text-align: left;
    border-radius: 6px;
    background-color: white; 
    color: black; 
    cursor: pointer;
    margin: 4px 2px;
}

#toggleable-buttons button:hover {
    background-color: #e2e2e2; 
}

#toggleable-buttons button::before {
    content: '';
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 42px;
    height: 22px;
    background-color: #333; 
    border-radius: 12px;
    transition: background-color 0.3s;
}

#toggleable-buttons button::after {
    content: '';
    position: absolute;
    left: 14px;
    top: 50%;
    transform: translateY(-50%);
    width: 18px;
    height: 18px;
    background-color: #fff; 
    border-radius: 50%;
    transition: transform 0.3s, background-color 0.3s;
}

#toggleable-buttons button[toggled="true"] {
    background-color: #e2e2e2; 
}

#toggleable-buttons button[toggled="true"]::before {
    background-color: #000; 
}

#toggleable-buttons button[toggled="true"]::after {
    transform: translateY(-50%) translateX(20px); 
    background-color: #fff; 
}

      .container {
        display: flex;
        gap: 10px;
      }
     #code-run {
  align-self: flex-start;
  background-color: #fff; 
  border:none;
  color: black;
  cursor: pointer;
  border-radius: 5px;
  padding: 8px 16px;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
}

#code-run:hover {
  background-color: #e2e2e2; 
  border:none;
}

#code {
  background: rgb(0, 0, 0); 
  color: white;
  width: 100%;
  min-height: 50px;
  height: 200px;
  resize: both;
  border: 1px solid #4B4B4D; 
  border-radius: 5px;
  font-family: monospace, sans-serif;
  padding: 8px;
  box-sizing: border-box;
  transition: outline 0.3s ease-in-out;
}

#code:focus {
border-color:#fff;
}

      input[type='checkbox'] {
        accent-color: #fff !important;
      }
      input[id='TabURLInput'] {
        background-color: #0a0a0a !important;
        border-color: #fff !important;
        border-style: solid;
        border-radius: 3px;
      }
      .toast[popover]:popover-open {
        opacity: 1;
        top: 5px;
        left: 50%;
      }
      @starting-style {
        .toast[popover]:popover-open {
          opacity: 0;
          transform: translateY(-100%);
        }
      }
      .toast[popover] {
        position: fixed;
        inset: unset;
        padding: 5px 10px;
        text-align: center;
        border-radius: 5px;
        opacity: 0;
        transition: all 0.5s allow-discrete;
        font-weight: bold;
        background:#0a0a0a;
        color: white;
        border: 1px solid #444;
        white-space: pre-wrap;
      }
      dialog[open] {
        opacity: 1;
        transform: scale(1);
      }
      dialog {
        opacity: 0;
        padding: 30px;
        padding-bottom: 15px;
        border: 1px solid #2d2d2d;
        transform: scale(0.95);
        background: #000;
        background-image: radial-gradient(#333 1px, transparent 1px);
        background-size: 2rem 2rem;
        z-index: -1;
        animation: moveGrid 4s linear infinite;
        transition: background-position-x 400ms;
        border-radius: 10px;
        transition: overlay 0.5s allow-discrete, display 0.5s allow-discrete, opacity 0.5s allow-discrete, transform 0.5s allow-discrete;
        min-width: 50vw;
        min-height: 60vh;
        max-width: 50vw;
        max-height: 60vh;
        display: flex;
        flex-direction: column;
      }
      @starting-style {
        dialog[open] {
          opacity: 0;
          transform: scale(0.95);
        }
      }
      dialog::backdrop {
        background: transparent;
        backdrop-filter: blur(0px);
        transition: all 0.5s allow-discrete;
      }
      dialog[open]::backdrop {
        background-color: rgb(0 0 0 / 0.25);
        backdrop-filter: blur(3px);
      }
      @starting-style {
        dialog[open]::backdrop {
          background-color: transparent;
          backdrop-filter: blur(0px);
        }
      }
      dialog div {
        min-width: auto;
        width: auto;
        height: fit-content;
        font-family: 'Geist', sans-serif;
        white-space: pre-wrap;
        padding: none;
        background-color:#000;

      }
      dialog p {
        margin-bottom: 9px;
        padding: 9px;
        border: 1px solid #27272a;
        color: inherit;
        font-family: inherit;
        font-size: inherit;
        font-weight: 700;
        border-radius: 5px;
        width: auto;
      }
      dialog h1 {
        font-family: 'Geist', sans-serif;
        font-size: 1.5rem;
        color: white;
        font-weight: 900;
        margin-bottom: 25px;
        margin-top: 0;
      }
.prahit-container {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  text-align: center;
  display: flex;
  max-height: 90%;
  flex-direction: column;
  gap: 10px; 
  align-items: center;
  justify-content: center;
}

.prahit-image {
  height: 600px;
  border-radius: 20px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.5);
  -webkit-animation-name: shake;
  -webkit-animation-duration: 0.5s;
  -webkit-transform-origin: 50% 50%;
  -webkit-animation-iteration-count: infinite;
}

@-webkit-keyframes shake {
  0% { -webkit-transform: translate(5px, 3px) rotate(0deg); }
  10% { -webkit-transform: translate(-5px, -6px) rotate(-3deg); }
  20% { -webkit-transform: translate(-8px, 0px) rotate(3deg); }
  30% { -webkit-transform: translate(0px, 6px) rotate(0deg); }
  40% { -webkit-transform: translate(3px, -4px) rotate(3deg); }
  50% { -webkit-transform: translate(-3px, 6px) rotate(-3deg); }
  60% { -webkit-transform: translate(-8px, 3px) rotate(0deg); }
  70% { -webkit-transform: translate(5px, 3px) rotate(-3deg); }
  80% { -webkit-transform: translate(-3px, -3px) rotate(3deg); }
  90% { -webkit-transform: translate(5px, 6px) rotate(0deg); }
  100% { -webkit-transform: translate(3px, -6px) rotate(-3deg); }
}

.prahit-textbox {
  background-color: rgba(0, 0, 0, 0.8); 
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  max-width: 100%; 
  margin: 10px 0;
}

@-webkit-keyframes snowflakes-fall{0%{top:-10%}100%{top:100%}}@-webkit-keyframes snowflakes-shake{0%,100%{-webkit-transform:translateX(0);transform:translateX(0)}50%{-webkit-transform:translateX(80px);transform:translateX(80px)}}@keyframes snowflakes-fall{0%{top:-10%}100%{top:100%}}@keyframes snowflakes-shake{0%,100%{transform:translateX(0)}50%{transform:translateX(80px)}}.snowflake{position:fixed;top:-10%;z-index:9999;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;cursor:default;-webkit-animation-name:snowflakes-fall,snowflakes-shake;-webkit-animation-duration:10s,3s;-webkit-animation-timing-function:linear,ease-in-out;-webkit-animation-iteration-count:infinite,infinite;-webkit-animation-play-state:running,running;animation-name:snowflakes-fall,snowflakes-shake;animation-duration:10s,3s;animation-timing-function:linear,ease-in-out;animation-iteration-count:infinite,infinite;animation-play-state:running,running}.snowflake:nth-of-type(0){left:1%;-webkit-animation-delay:0s,0s;animation-delay:0s,0s}.snowflake:nth-of-type(1){left:10%;-webkit-animation-delay:1s,1s;animation-delay:1s,1s}.snowflake:nth-of-type(2){left:20%;-webkit-animation-delay:6s,.5s;animation-delay:6s,.5s}.snowflake:nth-of-type(3){left:30%;-webkit-animation-delay:4s,2s;animation-delay:4s,2s}.snowflake:nth-of-type(4){left:40%;-webkit-animation-delay:2s,2s;animation-delay:2s,2s}.snowflake:nth-of-type(5){left:50%;-webkit-animation-delay:8s,3s;animation-delay:8s,3s}.snowflake:nth-of-type(6){left:60%;-webkit-animation-delay:6s,2s;animation-delay:6s,2s}.snowflake:nth-of-type(7){left:70%;-webkit-animation-delay:2.5s,1s;animation-delay:2.5s,1s}.snowflake:nth-of-type(8){left:80%;-webkit-animation-delay:1s,0s;animation-delay:1s,0s}.snowflake:nth-of-type(9){left:90%;-webkit-animation-delay:3s,1.5s;animation-delay:3s,1.5s}.snowflake:nth-of-type(10){left:25%;-webkit-animation-delay:2s,0s;animation-delay:2s,0s}.snowflake:nth-of-type(11){left:65%;-webkit-animation-delay:4s,2.5s;animation-delay:4s,2.5s}
.snowflake {
  z-index: 99;
  color: #ffffff;
  font-size: 1em;
  font-family: Arial, sans-serif;
  text-shadow: 0 0 5px #000000;
  opacity: 0.7;
}
whitebuttons button {
  background-color: white;
  border: none;
  color: black;
}

whitebuttons button:hover {
  background-color: #e2e2e2;
}
litstuff{
color:#444;
font-family: monospace, sans-serif;
font-size:12px;
font-weight: normal;
margin-left:6px;
font-style:italic;
}
    </style>
  `;
export{ htmlStyle }