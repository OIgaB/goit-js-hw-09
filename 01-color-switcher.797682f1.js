const t={startBtn:document.querySelector("button[data-start]"),stopBtn:document.querySelector("button[data-stop]"),body:document.querySelector("body")};let e,n;t.startBtn.addEventListener("click",(function(o){if("BUTTON"!==o.target.nodeName)return;n=setInterval((()=>{e=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`,t.body.style.backgroundColor=e}),1e3),o.target.disabled=!0})),t.stopBtn.addEventListener("click",(function(){clearInterval(n),t.startBtn.disabled=!1}));
//# sourceMappingURL=01-color-switcher.797682f1.js.map
