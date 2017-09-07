$("document").ready(function() {
  var libs = {};
  var reactMode = false;

  // List of Frameworks & Extensions
  var frameworks = {
    "jQuery 3.2.1": "js/vendor/jQuery 3.2.1.js",
    "Angular 1.6.6": "js/vendor/angular1.6/Angular 1.6.6.js",
    "Angular Animate": "js/vendor/angular1.6/Angular Animate.js",
    "Angular Cookies": "js/vendor/angular1.6/Angular Cookies.js",
    "Angular Loader": "js/vendor/angular1.6/Angular Loader.js",
    "Angular Parse Ext": "js/vendor/angular1.6/Angular Parse Ext.js",
    "Angular Resource": "js/vendor/angular1.6/Angular Resource.js",
    "Angular Route": "js/vendor/angular1.6/Angular Route.js",
    "Angular Sanitize": "js/vendor/angular1.6/Angular Sanitize.js",
    "Angular Scenario": "js/vendor/angular1.6/Angular Scenario.js",
    "Angular Touch": "js/vendor/angular1.6/Angular Touch.js",
    "React Redux": "js/vendor/react/React Redux.js",
    "React Router": "js/vendor/react/React Router.js",
    "Redux Saga": "js/vendor/react/Redux Saga.js",
    Chartjs: "js/vendor/Chartjs.js",
    "Date.js": "js/vendor/Date.js.js",
    D3: "js/vendor/D3.js"
  };

  var frameworks_css = {};

  var frameworks_extras = {};
  // Frameworks & Extensions Dropdown
  $("#dropdownMenu1 li a").click(function(event) {
    event.preventDefault();
    console.log("clicked", frameworks[event.target.innerText]);
    var scriptTagSrc = frameworks[event.target.innerText];
    var insertingScriptTag = '<script src="' + scriptTagSrc + '"></script>';
    htmlEditor.session.insert(htmlEditor.getCursorPosition(), insertingScriptTag);
    $(".extra").remove();

    var dropdown = $(this).parents(".btn-group");
    var selText = $(this).text();
    // dropdown.find(".dropdown-toggle").html(selText + ' <span class="caret"></span>');
    var lib_extras = frameworks_extras[selText];
    for (extra in lib_extras) dropdown.append(
        "<div class='extra checkbox'><label><input type='checkbox'></input><span class='chk_lbl'>" +
          extra +
          "</span></label></div>"
      );
  });

  // Script Injection Dropdown
  $("#dropdownMenu2 li a").click(function(event) {
    event.preventDefault();

    var dropdown = $(this).parents(".btn-group");

    var selText = $(this).text();
    dropdown.find(".dropdown-toggle").html(selText + ' <span class="caret"></span>');
  });

  // Doctype Dropdown
  $("#dropdownMenu3 li a").click(function(event) {
    event.preventDefault();

    var dropdown = $(this).parents(".btn-group");

    var selText = $(this).text();
    dropdown.find(".dropdown-toggle").html(selText + ' <span class="caret"></span>');
  });

  // HTML Dropdown
  $("#dropdownMenu4 li a").click(function(event) {
    event.preventDefault();

    var dropdown = $(this).parents(".btn-group");

    var selText = $(this).text();
    dropdown.find(".dropdown-toggle").html(selText + ' <span class="caret"></span>');
  });

  // CSS Dropdown
  $("#dropdownMenu5 li a").click(function(event) {
    event.preventDefault();

    var dropdown = $(this).parents(".btn-group");

    var selText = $(this).text();
    dropdown.find(".dropdown-toggle").html(selText + ' <span class="caret"></span>');
  });

  // Javascript Dropdown
  $("#dropdownMenu6 li a").click(function(event) {
    event.preventDefault();
    console.log("here", event.target.dataset.js);
    if (event.target.dataset.js === "react") {
      reactMode = true;
      jsEditor.getSession().setUseWorker(false);
    } else {
      reactMode = false;
      jsEditor.getSession().setUseWorker(true);
    }

    var dropdown = $(this).parents(".btn-group");

    var selText = $(this).text();
    dropdown.find(".dropdown-toggle").html(selText + ' <span class="caret"></span>');
  });

  // RUN Button
  $("#btnRun").click(function(event) {
    event.preventDefault();

    var scriptType = reactMode ? "text/babel" : "text/javascript";
    var css = ace.edit("css-editor").getSession().getValue();
    var script = ace.edit("js-editor").getSession().getValue();
    var html = ace.edit("html-editor").getSession().getValue();
    var previewDoc = window.frames[0].document;

    previewDoc.write("<!DOCTYPE html>");
    previewDoc.write("<html>");
    previewDoc.write("<head>");
    previewDoc.write("<style type='text/css'>" + css + "</style>");
    if (reactMode) {
      previewDoc.write('<script src="js/vendor/react/babel.js"></script>');
      previewDoc.write('<script src="js/vendor/react/react.js"></script>');
      previewDoc.write('<script src="js/vendor/react/react-dom.js"></script>');
    }

    var dropdownMenu2Sel = $("#dropdownMenu2").parents(".btn-group").find(".dropdown-toggle").text().trim();
    if (dropdownMenu2Sel == "onLoad") {
      previewDoc.write("<script type='" + scriptType + "'>window.onload = function() {" + script + "}</script>");
    } else if (dropdownMenu2Sel == "onDomReady") {
      previewDoc.write(
        "<script type='" +
          scriptType +
          "'>document.addEventListener('DOMContentLoaded', function() {" +
          script +
          "});</script>"
      );
    } else if (dropdownMenu2Sel == "No wrap - in head") {
      previewDoc.write("<script type='" + scriptType + "'>" + script + "</script>");
    }
    previewDoc.write("</head>");
    previewDoc.write("<body>");
    previewDoc.write(html);
    if (dropdownMenu2Sel == "No wrap - in body")
      previewDoc.write("<script type='" + scriptType + "'>" + script + "</script>");
    previewDoc.write("</body>");
    previewDoc.write("</html>");
    previewDoc.close();
  });

  // Preview code on page load
  $("#btnRun").click();

  // TIDYUP Button
  $("#btnTidyUp").click(function(event) {
    event.preventDefault();

    var html = ace.edit("html-editor").getSession().getValue();
    var html2 = style_html(html);

    ace.edit("html-editor").getSession().setValue(html2);

    var css = ace.edit("css-editor").getSession().getValue();
    var css2 = css_beautify(css);

    ace.edit("css-editor").getSession().setValue(css2);

    var js = ace.edit("js-editor").getSession().getValue();
    var js2 = js_beautify(js);

    ace.edit("js-editor").getSession().setValue(js2);
  });

  // Together Button
  $("#btnTogether").click(function(event) {
    event.preventDefault();

    TogetherJS(this);
    return false;
  });
});
