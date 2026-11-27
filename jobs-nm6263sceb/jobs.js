/* Star Man Studio — standalone jobs board. Reads local copies of openings.json
   and staff.json (kept in step by add_hire.py) so a new hire updates this page
   without a link to the unfinished site. */
(function () {
  var MAX = 5 * 1024 * 1024;

  function load(name) {
    return fetch("data/" + name + ".json", { cache: "no-store" }).then(function (r) {
      if (!r.ok) throw new Error("Could not read " + name);
      return r.json();
    });
  }

  function firstName(hire) {
    if (hire.realFirst) return hire.realFirst;
    var name = (hire.name || "").trim();
    return name.split(/\s+/)[0] || "";
  }

  function filledMap(staff) {
    var map = {};
    ((staff && staff.hires) || []).forEach(function (h) {
      if (h && h.position) map[h.position] = firstName(h) || "a new hire";
    });
    return map;
  }

  function boardList(openings) {
    var board = (openings && openings.board) || [];
    if (!board.length) board = (openings && openings.open) || [];
    var seen = {};
    var list = [];
    board.forEach(function (o) {
      if (!o || !o.title || seen[o.title]) return;
      seen[o.title] = true;
      list.push(o);
    });
    ((openings && openings.open) || []).forEach(function (o) {
      if (!o || !o.title || seen[o.title]) return;
      seen[o.title] = true;
      list.push(o);
    });
    return list;
  }

  function renderBoard(desks, filled) {
    var list = document.getElementById("job-list");
    var count = document.getElementById("job-count");
    if (!list) return;
    list.textContent = "";
    var openN = 0;
    desks.forEach(function (o) {
      var who = filled[o.title];
      var card = document.createElement("article");
      card.className = "job-card " + (who ? "is-filled" : "is-open");
      card.setAttribute("data-title", o.title);
      var top = document.createElement("div");
      top.className = "job-card-top";
      var h = document.createElement("h2");
      h.textContent = o.title;
      var badge = document.createElement("span");
      badge.className = "badge " + (who ? "badge-filled" : "badge-open");
      badge.textContent = who ? ("Filled by " + who) : "Open";
      top.appendChild(h);
      top.appendChild(badge);
      var blurb = document.createElement("p");
      blurb.className = "job-blurb";
      blurb.textContent = o.blurb || "";
      card.appendChild(top);
      card.appendChild(blurb);
      if (o.fit) {
        var fit = document.createElement("p");
        fit.className = "job-fit";
        fit.textContent = o.fit;
        card.appendChild(fit);
      }
      if (!who) {
        openN += 1;
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "apply-btn";
        btn.setAttribute("data-position", o.title);
        btn.textContent = "Apply";
        card.appendChild(btn);
      }
      list.appendChild(card);
    });
    if (count) {
      count.textContent = openN + " of " + desks.length + " positions open";
    }
  }

  function fillApplyForm(desks, filled) {
    var form = document.getElementById("apply-form");
    if (!form) return;
    var select = form.querySelector("[name=position]");
    var subject = form.querySelector("[name=_subject]");
    var open = desks.filter(function (o) { return !filled[o.title]; });
    if (select) {
      var previous = select.value;
      select.textContent = "";
      var placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.textContent = "Choose a desk.";
      select.appendChild(placeholder);
      if (!open.length) {
        var opt = document.createElement("option");
        opt.value = "The next desk that comes free";
        opt.textContent = "The next desk that comes free";
        select.appendChild(opt);
        opt.selected = true;
      } else {
        open.forEach(function (o) {
          var opt = document.createElement("option");
          opt.value = o.title;
          opt.textContent = o.title;
          select.appendChild(opt);
        });
        if (previous && !filled[previous]) select.value = previous;
      }
    }
    function syncSubject() {
      if (subject && select) {
        subject.value = "Star Man Studio application: " + (select.value || "an open desk");
      }
    }
    if (select && !select.dataset.bound) {
      select.addEventListener("change", syncSubject);
      select.dataset.bound = "1";
    }
    syncSubject();

    var email = form.querySelector("[name=email]");
    var replyto = form.querySelector("[name=_replyto]");
    if (email && replyto && !email.dataset.bound) {
      email.addEventListener("input", function () {
        replyto.value = email.value.trim();
      });
      email.dataset.bound = "1";
    }

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
      if (input && !input.dataset.bound) {
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
          if (f.size > MAX) {
            setError("The photograph must be five megabytes or smaller. The telex is not a warehouse.");
            input.value = "";
            return;
          }
          if (preview) {
            preview.src = URL.createObjectURL(f);
            preview.style.display = "block";
          }
        });
        input.dataset.bound = "1";
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
      return f && f.type && f.type.indexOf("image/") === 0 && f.size <= MAX;
    }
    if (!form.dataset.bound) {
      form.addEventListener("submit", function (e) {
        var frontFile = front.input && front.input.files && front.input.files[0];
        var sideFile = side.input && side.input.files && side.input.files[0];
        var submit = form.querySelector("[type=submit]");
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
        if (filled[select && select.value]) {
          e.preventDefault();
          return;
        }
        syncSubject();
      });
      form.dataset.bound = "1";
    }
  }

  function goApply(title) {
    var form = document.getElementById("apply-form");
    var select = form && form.querySelector("[name=position]");
    if (select) {
      var found = false;
      Array.prototype.forEach.call(select.options, function (opt) {
        if (opt.value === title) found = true;
      });
      if (found) {
        select.value = title;
        select.dispatchEvent(new Event("change"));
      }
    }
    var target = document.getElementById("apply");
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    if (select) select.focus();
  }

  function bindApplyButtons() {
    var list = document.getElementById("job-list");
    if (!list || list.dataset.bound) return;
    list.addEventListener("click", function (e) {
      var btn = e.target.closest && e.target.closest(".apply-btn");
      if (!btn) return;
      var title = btn.getAttribute("data-position");
      if (title) goApply(title);
    });
    list.dataset.bound = "1";
  }

  bindApplyButtons();
  fillApplyForm(
    [
      { title: "Graphic Designer" },
      { title: "Copywriter" },
      { title: "Designer" },
      { title: "Stylist" },
      { title: "Client Account Manager" },
      { title: "Talent Manager" },
      { title: "Mail Boy" },
      { title: "Bartender" }
    ],
    {}
  );

  Promise.all([load("openings"), load("staff")])
    .then(function (pair) {
      var desks = boardList(pair[0]);
      var filled = filledMap(pair[1]);
      // Only treat a board desk as filled when a current hire holds that exact title.
      // Older desks (Tea Lady, Jingle Writer) stay off this board.
      var onBoard = {};
      desks.forEach(function (d) { onBoard[d.title] = true; });
      Object.keys(filled).forEach(function (title) {
        if (!onBoard[title]) delete filled[title];
      });
      renderBoard(desks, filled);
      fillApplyForm(desks, filled);
      bindApplyButtons();
      var params = new URLSearchParams(location.search);
      var want = params.get("position") || params.get("role");
      if (want && !filled[want]) goApply(want);
    })
    .catch(function () {
      var line = document.getElementById("job-count");
      if (line && !line.textContent.trim()) line.textContent = "8 of 8 positions open";
    });
})();
