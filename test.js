// Javascript here
let the_obj = {
  test: "This is a string",
  me: 123.0,
  here: true,
  oob: {
    more: "sub-object",
    here: 3321,
    again: {
      this:
        "next object aslasl as;la asla sl;as vv askla sasa@akskl.als/la/s/askalk/sla:l;sal sjj",
      is: 123000.1245,
      me: true
    }
  },
  list: [123, "test", false, [1, 2, 3]]
};

function CreateObjView(container, name, obj) {
  let expandFn = function () {
    let b = this.querySelector(".expander");
    let content = this.parentElement.querySelector(".content");
    if (b.classList.contains("active")) {
      b.classList.remove("active");
      content.style.display = "none";
    } else {
      b.classList.add("active");
      content.style.display = "block";
    }
  };

  container.style.width = "100%";
  container.style.padding = "2px";
  container.style.display = "block";
  container.style.boxSizing = "border-box";
  // expander
  let h = document.createElement("div");
  h.style.display = "inline-block";
  if (typeof obj === "object") {
    // expander continue
    h.className = "expander";
    h.innerHTML = `<span class="mdi mdi-triangle mdi-rotate-90"></span>`;
    // header
    let header = document.createElement("div");
    header.style.width = "100%";
    header.appendChild(h);
    header.addEventListener("click", expandFn);
    // icon
    h = document.createElement("div");
    h.className = "obj-icon";
    h.style.display = "inline-block";
    h.innerHTML = `&nbsp;&nbsp;<span class="mdi ${
      Array.isArray(obj) ? "mdi-code-brackets" : "mdi-lan"
    }"></span>&nbsp;&nbsp;`;
    header.appendChild(h);
    // name
    h = document.createElement("div");
    h.style.display = "inline-block";
    h.innerHTML = `<b><code style="color: blue;">${name}</code></b>:`;
    header.appendChild(h);
    container.appendChild(header);
    // content
    let content = document.createElement("div");
    content.style.display = "none";
    content.style.width = "100%";
    content.style.paddingLeft = "30px";
    content.className = "content";
    content.style.boxSizing = "border-box";

    if (Array.isArray(obj)) {
      console.log("array", name, obj);
      for (let i = 0; i < obj.length; i++) {
        // container c
        let c = document.createElement("div");
        c.style.width = "100%";
        CreateObjView(c, `[${i}]`, obj[i]);
        content.appendChild(c);
      }
    } else {
      console.log("object", name, obj);
      for (const p in obj) {
        if (obj.hasOwnProperty(p)) {
          // container c
          let c = document.createElement("div");
          c.style.width = "100%";
          CreateObjView(c, p, obj[p]);
          content.appendChild(c);
        }
      }
    }
    container.appendChild(content);
    return;
  }
  // simple type
  let icon = "mdi-help";
  let color = "black";
  let val = `${obj}`;
  switch (typeof obj) {
    case "number":
      icon = "mdi-numeric";
      color = "red";
      console.log("number", name, obj);
      break;
    case "boolean":
      icon = "mdi-help-circle-outline";
      color = "green";
      console.log("boolean", name, obj);
      break;
    case "string":
      console.log("string", name, obj);
      icon = "mdi-alphabetical";
      color = "magenta";
      val = '"' + val + '"'; // quote the string value
      break;
    default:
      break;
  }
  // flex is required to put long obj-value box on the same line
  container.style.display = "flex";
  container.style.alignItems = "center";
  //container.style.border = "1px solid #d0d0d0";
  container.style.verticalAlign = "middle";
  h.style.display = "inline-block";
  //h.style.width = "18px";
  h.className = "expander";
  h.innerHTML = `<span class="mdi mdi-triangle mdi-rotate-90" style="opacity: 0;"></span>`;
  container.appendChild(h);
  //icon
  h = document.createElement("div");
  h.className = "obj-icon";
  h.style.display = "inline-block";
  h.innerHTML = `&nbsp;&nbsp;<span class="mdi ${icon}"></span>&nbsp;&nbsp;`;
  container.appendChild(h);
  // name
  h = document.createElement("div");
  h.style.display = "inline-block";
  h.innerHTML = `<b><code style="color: blue;">${name}</code></b>:&nbsp`;
  container.appendChild(h);
  // value
  h = document.createElement("div");
  h.className = "obj-value";
  h.style.display = "inline-block";
  h.style.wordBreak = "break-all";
  h.innerHTML = `<code style="color: ${color};">${val}</code>`;
  container.appendChild(h);
  return;
}

function showHideContent(obj) {
  let v = document.getElementById("raw");
  let sa = document.getElementById("selAll");
  if (v.style.display === "block") {
    v.style.display = "none";
    sa.style.display = "none";
    obj.innerText = "Show Content in JSON";
    return;
  }
  v.style.display = "block";
  sa.style.display = "inline";
  obj.innerText = "Hide Content in JSON";
}

function selectText(containerid) {
  if (document.selection) {
    // IE
    var range = document.body.createTextRange();
    range.moveToElementText(document.getElementById(containerid));
    range.select();
  } else if (window.getSelection) {
    var range = document.createRange();
    range.selectNode(document.getElementById(containerid));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);
  }
}

let v = document.getElementById("viewer");
CreateObjView(v, "test_object", the_obj);
let r = document.getElementById("raw_text");
r.innerText = JSON.stringify(the_obj, null, 2);
the_obj = null;
