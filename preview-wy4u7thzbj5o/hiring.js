/* Star Man Studio — openings, applications, junior desks. Low compute. */
(function () {
  var script = document.currentScript || document.querySelector("script[data-base]");
  var base = (script && script.getAttribute("data-base")) || ".";
  base = base.replace(/\/$/, "");

  function article(title) {
    return /^[aeiou]/i.test(title) ? "an " + title : "a " + title;
  }

  function joinList(items) {
    if (items.length === 0) return "";
    if (items.length === 1) return items[0];
    if (items.length === 2) return items[0] + " and " + items[1];
    return items.slice(0, -1).join(", ") + ", and " + items[items.length - 1];
  }

  function asset(path) {
    if (!path) return "";
    if (/^https?:/i.test(path)) return path;
    return base + "/" + path.replace(/^\//, "");
  }

  function load(name) {
    return fetch(base + "/data/" + name + ".json", { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("Could not read " + name);
      return r.json();
    });
  }

  function openList(data) {
    return (data && data.open) || [];
  }

  function reservedOpenings(data) {
    return (data && data.reservedOpenings) || [];
  }

  function renderBanner(openings) {
    var root = document.getElementById("hiring-sign");
    if (!root) return;
    var line = root.querySelector(".hiring-line");
    var also = root.querySelector(".hiring-also");
    if (!openings.length) {
      if (line) line.textContent = "All desks are filled. Apply anyway.";
      if (also) also.hidden = true;
      return;
    }
    var titles = openings.map(function (o) { return o.title; });
    var i = 0;
    function show() {
      if (line) line.textContent = "Star Man Studio is hiring: " + article(titles[i]) + ".";
      if (also) {
        if (titles.length > 1) {
          var rest = titles.filter(function (_, idx) { return idx !== i; }).map(article);
          also.hidden = false;
          also.textContent = "Also wanted: " + joinList(rest) + ".";
        } else {
          also.hidden = true;
        }
      }
    }
    show();
    if (titles.length > 1) {
      setInterval(function () {
        i = (i + 1) % titles.length;
        show();
      }, 4200);
    }
  }

  function fillOpeningsList(openings) {
    var list = document.getElementById("openings-list");
    if (!list) return;
    list.textContent = "";
    if (!openings.length) {
      var p = document.createElement("p");
      p.textContent = "All desks are filled. Applications are still taken, and kept for the next one.";
      list.appendChild(p);
      return;
    }
    openings.forEach(function (o) {
      var h = document.createElement("h2");
      h.className = "piece-h";
      h.textContent = o.title;
      var b = document.createElement("p");
      var blurb = o.blurb || "";
      if (o.reserved && !/^reserved\b/i.test(blurb)) {
        blurb = "Reserved. " + blurb;
      }
      b.textContent = blurb;
      list.appendChild(h);
      list.appendChild(b);
    });
  }

  function fillApplyForm(openings) {
    var form = document.getElementById("apply-form");
    if (!form) return;
    var select = form.querySelector("[name=position]");
    var subject = form.querySelector("[name=_subject]");
    if (select) {
      select.textContent = "";
      if (!openings.length) {
        var opt = document.createElement("option");
        opt.value = "The next desk that comes free";
        opt.textContent = "The next desk that comes free";
        select.appendChild(opt);
      } else {
        openings.forEach(function (o, idx) {
          var opt = document.createElement("option");
          opt.value = o.title;
          opt.textContent = o.title;
          if (idx === 0) opt.selected = true;
          select.appendChild(opt);
        });
      }
    }
    function syncSubject() {
      if (subject && select) {
        subject.value = "Star Man Studio application: " + (select.value || "an open desk");
      }
    }
    if (select) select.addEventListener("change", syncSubject);
    syncSubject();

    var email = form.querySelector("[name=email]");
    var replyto = form.querySelector("[name=_replyto]");
    if (email && replyto) {
      email.addEventListener("input", function () {
        replyto.value = email.value.trim();
      });
    }

    var submit = form.querySelector("[type=submit]");
    var max = 5 * 1024 * 1024;
    function bindPhoto(input, preview, errBox) {
      function setError(msg) {
        if (!errBox) return;
        if (msg) {
          errBox.style.display = "block";
          errBox.textContent = msg;
        } else {
          errBox.style.display = "none";
          errBox.textContent = "";
        }
      }
      if (input) {
        input.addEventListener("change", function () {
          var f = input.files && input.files[0];
          if (preview) {
            preview.style.display = "none";
            preview.removeAttribute("src");
          }
          setError("");
          if (!f) return;
          if (!f.type || f.type.indexOf("image/") !== 0) {
            setError("The photograph must be an image.");
            input.value = "";
            return;
          }
          if (f.size > max) {
            setError("The photograph must be five megabytes or smaller. The telex is not a warehouse.");
            input.value = "";
            return;
          }
          if (preview) {
            preview.src = URL.createObjectURL(f);
            preview.style.display = "block";
          }
        });
      }
      return { input: input, setError: setError };
    }
    var front = bindPhoto(
      form.querySelector("[name=portrait]"),
      document.getElementById("apply-preview"),
      document.getElementById("apply-file-error")
    );
    var side = bindPhoto(
      form.querySelector("[name=portrait_side]"),
      document.getElementById("apply-preview-side"),
      document.getElementById("apply-file-error-side")
    );
    function photoOk(f) {
      return f && f.type && f.type.indexOf("image/") === 0 && f.size <= max;
    }
    form.addEventListener("submit", function (e) {
      var frontFile = front.input && front.input.files && front.input.files[0];
      var sideFile = side.input && side.input.files && side.input.files[0];
      if (!frontFile) {
        e.preventDefault();
        front.setError("A front photograph is required. The desk comes with a picture frame.");
        if (submit) submit.disabled = false;
        return;
      }
      if (!photoOk(frontFile)) {
        e.preventDefault();
        front.setError("The front photograph must be an image, and no larger than five megabytes.");
        return;
      }
      if (sideFile && !photoOk(sideFile)) {
        e.preventDefault();
        side.setError("The side photograph must be an image, and no larger than five megabytes.");
        return;
      }
      syncSubject();
    });
  }

  function renderHires(staff) {
    var wrap = document.getElementById("junior-desks");
    var grid = document.getElementById("friend-hires");
    if (!wrap || !grid) return;
    var hires = (staff && staff.hires) || [];
    if (!hires.length) {
      wrap.hidden = true;
      return;
    }
    wrap.hidden = false;
    grid.textContent = "";
    hires.forEach(function (h) {
      var fig = document.createElement("figure");
      fig.className = "person";
      var pic = document.createElement("picture");
      if (h.portraitWebp) {
        var src = document.createElement("source");
        src.type = "image/webp";
        src.srcset = asset(h.portraitWebp);
        pic.appendChild(src);
      }
      var img = document.createElement("img");
      img.src = asset(h.portrait);
      img.width = 864;
      img.height = 1152;
      img.alt = "Studio portrait of " + h.name + (h.position ? ", " + h.position : "");
      pic.appendChild(img);
      var nm = document.createElement("h3");
      nm.textContent = h.name;
      var role = document.createElement("p");
      role.className = "role";
      role.textContent = h.position || "";
      var bio = document.createElement("p");
      bio.textContent = h.bio || "";
      fig.appendChild(pic);
      fig.appendChild(nm);
      fig.appendChild(role);
      fig.appendChild(bio);
      grid.appendChild(fig);
    });
  }

  function renderFormer(former) {
    var wrap = document.getElementById("former-employees");
    var grid = document.getElementById("former-grid");
    if (!wrap || !grid) return;
    var list = (former && former.employees) || [];
    if (!list.length) {
      wrap.hidden = true;
      return;
    }
    wrap.hidden = false;
    grid.textContent = "";
    list.forEach(function (p) {
      var fig = document.createElement("figure");
      fig.className = "former";
      if (p.portrait) {
        var img = document.createElement("img");
        img.src = asset(p.portrait);
        img.width = 864;
        img.height = 1152;
        img.alt = p.name || "A former employee";
        if (p.portraitWebp) {
          var pic = document.createElement("picture");
          var src = document.createElement("source");
          src.srcset = asset(p.portraitWebp);
          src.type = "image/webp";
          pic.appendChild(src);
          pic.appendChild(img);
          fig.appendChild(pic);
        } else {
          fig.appendChild(img);
        }
      }
      var nm = document.createElement("h3");
      nm.textContent = p.name;
      var role = document.createElement("p");
      role.className = "role";
      role.textContent = p.position || "";
      var reason = document.createElement("p");
      reason.textContent = p.reason || "";
      fig.appendChild(nm);
      fig.appendChild(role);
      fig.appendChild(reason);
      grid.appendChild(fig);
    });
  }

  function renderEotm(staff) {
    var root = document.getElementById("eotm");
    if (!root) return;
    var hires = (staff && staff.hires) || [];
    if (!hires.length) {
      root.hidden = true;
      return;
    }
    var now = new Date();
    var start = new Date(now.getFullYear(), 0, 0);
    var day = Math.floor((now - start) / 86400000);
    var pick = hires[day % hires.length];
    var img = document.getElementById("eotm-img");
    var name = root.querySelector(".eotm-name");
    var role = root.querySelector(".eotm-role");
    if (img) {
      img.src = asset(pick.portrait);
      img.alt = "Employee of the Month: " + pick.name;
    }
    if (name) name.textContent = pick.name;
    if (role) role.textContent = pick.position || "";
    root.hidden = false;
  }

  var tasks = [];
  if (document.getElementById("hiring-sign") || document.getElementById("openings-list") || document.getElementById("apply-form")) {
    tasks.push(load("openings").then(function (data) {
      var openings = openList(data);
      renderBanner(openings);
      fillOpeningsList(openings);
      fillApplyForm(openings);
    }).catch(function () {
      var line = document.querySelector("#hiring-sign .hiring-line");
      if (line && !line.textContent.trim()) line.textContent = "Star Man Studio is hiring.";
    }));
  }
  if (document.getElementById("junior-desks") || document.getElementById("eotm")) {
    tasks.push(load("staff").then(function (staff) {
      renderHires(staff);
      renderEotm(staff);
    }).catch(function () {}));
  }
  if (document.getElementById("former-employees")) {
    tasks.push(load("former").then(renderFormer).catch(function () {}));
  }
})();
