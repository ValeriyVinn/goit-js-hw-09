const t=document.querySelector("button[data-start]"),e=document.querySelector("button[data-stop]");t.addEventListener("click",(function(){t.disabled=!0,e.disabled=!1,o=setInterval(n,1e3)})),e.addEventListener("click",(function(){t.disabled=!1,e.disabled=!0,clearInterval(o)}));let o=null;function n(){const t=`#${Math.floor(16777215*Math.random()).toString(16).padStart(6,0)}`;console.log("Color = ",t),document.body.style.backgroundColor=t}console.dir(t);
//# sourceMappingURL=01-color-switcher.7772915a.js.map
