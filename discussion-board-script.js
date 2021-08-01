var screenshot =
  "https://res.cloudinary.com/kunj-maniar/image/upload/v1627835918/discussion-icons/3050525_hdotcc.png";

function runWithJQuery(runnerFunc, jQueryCode) {
  if (window.jQuery) {
    console.log("Loaded jquery");
    jQueryCode(runnerFunc);
  } else {
    console.log("Loaded jquery in else");
    var script = document.createElement("script");
    document.head.appendChild(script);
    script.type = "text/javascript";
    script.src =
      "https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js";
    script.onload = () => {
      jQueryCode(runnerFunc);
    };
  }
}

runWithJQuery(runnerFunc, jQueryCode);

// function findCss(fileName) {
//   var finderRe = new RegExp(fileName + '.*?\.css', "i");
//   var linkElems = document.getElementsByTagName("link");
//   for (var i = 0, il = linkElems.length; i < il; i++) {
//     if (linkElems[i].href && finderRe.test(linkElems[i].href)) {
//         return true;
//     }
//   }
//   return false;
// }

function jQueryCode(runnerFunc) {
  //   document.body.innerHTML +=
  //     ;

  $(document).ready(function () {
    // $("button").click(function() {
    //     $("p").text("Jquery_text_method");
    // });

    const bootstrap_enabled = typeof $().modal == "function";
    console.log("bootstrap_enabled", bootstrap_enabled);
    if (!bootstrap_enabled) {
      $("head").append(
        `
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        `
      );
    }

    if (!typeof window.Popper) {
      $("head").append(
        `<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>`
      );
    }

    if (!bootstrap_enabled) {
      $("head").append(
        `<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        `
      );
    }

    $("head").append(
      `
        <link
          rel="stylesheet"
          href="https://use.fontawesome.com/releases/v5.11.2/css/all.css"
          crossorigin="anonymous"
        />

        <link
          rel="stylesheet"
          href="https://unpkg.com/cropperjs/dist/cropper.css"
          crossorigin="anonymous"
        />
        <link rel="stylesheet" href="https://kunjmaniar.github.io/discussion-script/css/main.css" />
      `
    );

    $("body").append(`
      <div id="meteor-discusstion-start"></div>
     `);

    let add_after = $("#meteor-discusstion-start");

    add_after.after(`<div
          id="image-discussion-button"
          style="
            position: fixed;
            bottom: 1.2rem;
            right: 1.5rem;
            padding: 12px;
            background: radial-gradient(
              circle,
              rgb(238, 174, 202) 0%,
              rgb(148, 187, 233) 100%
            );
            border-radius: 50%;
            cursor: pointer;
          "
          onClick="captureAndGroup()"
        >
          <img
            style="height: 30px"
            src="https://res.cloudinary.com/kunj-maniar/image/upload/v1627835918/discussion-icons/3050525_hdotcc.png"
          />
        </div>
        `);

    // <script
    //   src="https://unpkg.com/cropperjs/dist/cropper.js"
    //   crossorigin="anonymous"
    // ></script>

    add_after.after(`
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl" role="document" style="width: 90%">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Meteor Discussion Board</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            ${modal_str}
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    `);

    const s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://unpkg.com/html2canvas@1.1.4/dist/html2canvas.js";
    // s.src = "./dom-to-image.js";
    // s.src =
    //   "https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js";
    // Use any selector
    $("head").append(s);

    const s_b = document.createElement("script");
    document.body.appendChild(s_b);
    s_b.type = "text/javascript";
    s_b.src = "https://unpkg.com/cropperjs/dist/cropper.js";
    console.log("here before cropper");

    // s_b.onload = () => {
    //   setTimeout(() => {
    //     runnerFunc();
    //   }, 1000);
    // };
    // console.log("here after cropper");

    // s.src = "./dom-to-image.js";
    // s.src =
    //   "https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js";
    // Use any selector
    // $("body").append(s_b);

    // $("body").append(`
    //   <script type="application/javascript" src="js/jquery-cropper.js"></script>
    //   <script type="application/javascript" src="js/main.js"></script>
    //  `);
    // $("#img").attr("crossOrigin", "anonymous");
  });

  // your jQuery code
}

function captureAndGroup() {
  console.log("here");
  $("#image-discussion-button").hide();

  html2canvas(document.body).then(function (canvas) {
    // screenshot = canvas.toDataURL();
    screenshot = canvas.toDataURL();
    console.log(screenshot);
    // console.log(screenshot.toDataURL());

    // console.log(canvas.toDataURL());
    // document.body.appendChild(canvas);
    // console.log(canvas.to)
    // .modal("show");

    const modalImg = $("#modal-img");
    console.log(modalImg);
    modalImg.attr("src", screenshot);
    const modal = $("#exampleModal");
    runnerFunc(modalImg);
    modal.modal("show");
  });

  // var node = $("body");

  // domtoimage
  //   .toPng(node)
  //   .then(function (dataUrl) {
  //     var img = new Image();
  //     img.src = dataUrl;
  //     console.log(dataUrl);
  //     // document.body.appendChild(img);
  //   })
  //   .catch(function (error) {
  //     console.error("oops, something went wrong!", error);
  //   });

  // domtoimage.toPng(document.body).then(function (img) {
  //   document.body.appendChild(img);
  //   console.log(img);
  // });

  console.log(screenshot);
  $("#image-discussion-button").show();

  // $("body").append(`<img
  //     style="height: 30px"
  //     src=${screenshot}
  //   />`);
}

// about:config
// privacy.file_unique_origin false - allows cors

const modal_str = `<div class="container">
<div class="row">
  <div class="col-md-12">
    <!-- <h3>Demo:</h3> -->
    <div class="img-container" style="display: flex;justify-content: center;">
      <img id="modal-img" src=${screenshot} alt="Picture" />
    </div>
  </div>
</div>
<div class="row">
  <div class="col-md-12 docs-buttons" style="display: flex;justify-content: center; flex-wrap: wrap;">
    <!-- <h3>Toolbar:</h3> -->
    <div class="col-md-12" style="display: flex;justify-content: center;"> 
    <div class="btn-group">
      <button
        type="button"
        class="btn btn-primary"
        data-method="setDragMode"
        data-option="move"
        title="Move"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("setDragMode", "move")'
        >
          <span class="fa fa-arrows-alt"></span>
        </span>
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-method="setDragMode"
        data-option="crop"
        title="Crop"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("setDragMode", "crop")'
        >
          <span class="fa fa-crop-alt"></span>
        </span>
      </button>
    </div>

    <div class="btn-group">
      <button
        type="button"
        class="btn btn-primary"
        data-method="zoom"
        data-option="0.1"
        title="Zoom In"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("zoom", 0.1)'
        >
          <span class="fa fa-search-plus"></span>
        </span>
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-method="zoom"
        data-option="-0.1"
        title="Zoom Out"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("zoom", -0.1)'
        >
          <span class="fa fa-search-minus"></span>
        </span>
      </button>
    </div>

    <div class="btn-group">
      <button
        type="button"
        class="btn btn-primary"
        data-method="move"
        data-option="-10"
        data-second-option="0"
        title="Move Left"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("move", -10, 0)'
        >
          <span class="fa fa-arrow-left"></span>
        </span>
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-method="move"
        data-option="10"
        data-second-option="0"
        title="Move Right"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("move", 10, 0)'
        >
          <span class="fa fa-arrow-right"></span>
        </span>
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-method="move"
        data-option="0"
        data-second-option="-10"
        title="Move Up"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("move", 0, -10)'
        >
          <span class="fa fa-arrow-up"></span>
        </span>
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-method="move"
        data-option="0"
        data-second-option="10"
        title="Move Down"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("move", 0, 10)'
        >
          <span class="fa fa-arrow-down"></span>
        </span>
      </button>
    </div>

    <div class="btn-group">
      <button
        type="button"
        class="btn btn-primary"
        data-method="rotate"
        data-option="-45"
        title="Rotate Left"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("rotate", -45)'
        >
          <span class="fa fa-undo-alt"></span>
        </span>
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-method="rotate"
        data-option="45"
        title="Rotate Right"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("rotate", 45)'
        >
          <span class="fa fa-redo-alt"></span>
        </span>
      </button>
    </div>

    <div class="btn-group">
      <button
        type="button"
        class="btn btn-primary"
        data-method="scaleX"
        data-option="-1"
        title="Flip Horizontal"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("scaleX", -1)'
        >
          <span class="fa fa-arrows-alt-h"></span>
        </span>
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-method="scaleY"
        data-option="-1"
        title="Flip Vertical"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("scaleY", -1)'
        >
          <span class="fa fa-arrows-alt-v"></span>
        </span>
      </button>
    </div>

    <div class="btn-group">
      <button
        type="button"
        class="btn btn-primary"
        data-method="crop"
        title="Crop"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("crop")'
        >
          <span class="fa fa-check"></span>
        </span>
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-method="clear"
        title="Clear"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("clear")'
        >
          <span class="fa fa-times"></span>
        </span>
      </button>
    </div>

    <div class="btn-group">
      <button
        type="button"
        class="btn btn-primary"
        data-method="disable"
        title="Disable"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("disable")'
        >
          <span class="fa fa-lock"></span>
        </span>
      </button>
      <button
        type="button"
        class="btn btn-primary"
        data-method="enable"
        title="Enable"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("enable")'
        >
          <span class="fa fa-unlock"></span>
        </span>
      </button>
    </div>

    <div class="btn-group">
      <button
        type="button"
        class="btn btn-primary"
        data-method="reset"
        title="Reset"
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("reset")'
        >
          <span class="fa fa-sync-alt"></span>
        </span>
      </button>
    </div>
    </div>
    <div class="col-md-12" style="display: flex;justify-content: center;">
    <div class="btn-group btn-group-crop">
      <button
        type="button"
        class="btn btn-success"
        data-method="getCroppedCanvas"
        data-option='{ "maxWidth": 4096, "maxHeight": 4096 }'
      >
        <span
          class="docs-tooltip"
          data-toggle="tooltip"
          data-animation="false"
          title='$().cropper("getCroppedCanvas", { maxWidth: 4096, maxHeight: 4096 })'
        >
          Get Cropped Canvas
        </span>
      </button>
    </div>

    
    <!--button
      type="button"
      class="btn btn-secondary"
      data-method="moveTo"
      data-option="0"
    >
      <span
        class="docs-tooltip"
        data-toggle="tooltip"
        data-animation="false"
        title="cropper.moveTo(0)"
      >
        Move to [0,0]
      </span>
    </button>
    <button
      type="button"
      class="btn btn-secondary"
      data-method="zoomTo"
      data-option="1"
    >
      <span
        class="docs-tooltip"
        data-toggle="tooltip"
        data-animation="false"
        title="cropper.zoomTo(1)"
      >
        Zoom to 100%
      </span>
    </button-->
    </div>
  </div>
</div>
</div>

<!-- Show the cropped image in modal -->
    <div
      class="modal fade docs-cropped"
      id="getCroppedCanvasModal"
      aria-hidden="true"
      aria-labelledby="getCroppedCanvasTitle"
      role="dialog"
      tabindex="-1"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="getCroppedCanvasTitle">
              Start a New Discussion
            </h5>
            <button
              type="button"
              class="close"
              aria-label="Close"
              onclick="$('#getCroppedCanvasModal').modal('hide');"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="modal-body-cropped-image"></div>
              <input
                id="new-discussion-heading"
                class="new-discussion-heading-input"
                placeholder="Give the discussion a title"
                style="padding: 10; margin-top: 15px"
              />
              <textarea
                id="new-discussion-text"
                class="new-discussion-description-text-area"
                name="new-discussion-description-text"
                placeholder="Write your description here."
                style="min-height: 150px;  "
              ></textarea>
          </div>
          <div class="modal-footer docs-buttons">
            <button
              type="button"
              class="btn btn-secondary"
              onclick="$('#getCroppedCanvasModal').modal('hide');"
            >
              Close
            </button>
            <a
            class="btn btn-primary"
            id="download"
            href="javascript:void(0);"
            download="cropped.jpg"
            >Download</a
          >
            <button
              id="startDiscussion"
              type="button"
              class="btn btn-primary"
              data-image-link=""
              onclick="send_data()"
            >
            Start Discussion
          </button>
           
          </div>
        </div>
      </div>
    </div>
    <!-- /.modal -->

`;

const jquery_cropper = (global, factory) => {
  typeof exports === "object" && typeof module !== "undefined"
    ? factory(require("jquery"), require("cropperjs"))
    : typeof define === "function" && define.amd
    ? define(["jquery", "cropperjs"], factory)
    : ((global = global || self), factory(global.jQuery, global.Cropper));
};

const mainFunction = (modal_image) => {
  // "use strict";

  var console = window.console || { log: function () {} };
  var URL = window.URL || window.webkitURL;
  // var $image = $("#modal-img");
  // console.log($image);
  var $image = modal_image;
  var $download = $("#download");
  var $dataX = $("#dataX");
  var $dataY = $("#dataY");
  var $dataHeight = $("#dataHeight");
  var $dataWidth = $("#dataWidth");
  var $dataRotate = $("#dataRotate");
  var $dataScaleX = $("#dataScaleX");
  var $dataScaleY = $("#dataScaleY");
  var options = {
    aspectRatio: 16 / 9,
    preview: ".img-preview",
    crop: function (e) {
      $dataX.val(Math.round(e.detail.x));
      $dataY.val(Math.round(e.detail.y));
      $dataHeight.val(Math.round(e.detail.height));
      $dataWidth.val(Math.round(e.detail.width));
      $dataRotate.val(e.detail.rotate);
      $dataScaleX.val(e.detail.scaleX);
      $dataScaleY.val(e.detail.scaleY);
    },
    minContainerWidth: "855",
    minContainerHeight: "481",
  };
  var originalImageURL = $image.attr("src");
  var uploadedImageName = "cropped.jpg";
  var uploadedImageType = "image/jpeg";
  var uploadedImageURL;

  // Tooltip
  $('[data-toggle="tooltip"]').tooltip();

  // Cropper
  $image
    .on({
      ready: function (e) {
        console.log(e.type);
      },
      cropstart: function (e) {
        // console.log(e.type, e.detail.action);
        console.log(e.type, "crop started");
      },
      cropmove: function (e) {
        // console.log(e.type, e.detail.action);
        console.log(e.type, "crop moved");
      },
      cropend: function (e) {
        // console.log(e.type, e.detail.action);
        console.log(e.type, "crop ended");
      },
      crop: function (e) {
        console.log(e.type);
      },
      zoom: function (e) {
        console.log(e.type, "zoomed");
        // console.log(e);
        // console.log(e.detail);
        // console.log(e.type, e.detail.ratio);
      },
    })
    .cropper(options);

  // Buttons
  if (!$.isFunction(document.createElement("canvas").getContext)) {
    $('button[data-method="getCroppedCanvas"]').prop("disabled", true);
  }

  if (
    typeof document.createElement("cropper").style.transition === "undefined"
  ) {
    $('button[data-method="rotate"]').prop("disabled", true);
    $('button[data-method="scale"]').prop("disabled", true);
  }

  // Download
  if (typeof $download[0].download === "undefined") {
    $download.addClass("disabled");
  }

  // Options
  $(".docs-toggles").on("change", "input", function () {
    var $this = $(this);
    var name = $this.attr("name");
    var type = $this.prop("type");
    var cropBoxData;
    var canvasData;

    if (!$image.data("cropper")) {
      return;
    }

    if (type === "checkbox") {
      options[name] = $this.prop("checked");
      cropBoxData = $image.cropper("getCropBoxData");
      canvasData = $image.cropper("getCanvasData");

      options.ready = function () {
        $image.cropper("setCropBoxData", cropBoxData);
        $image.cropper("setCanvasData", canvasData);
      };
    } else if (type === "radio") {
      options[name] = $this.val();
    }

    $image.cropper("destroy").cropper(options);
  });

  // Methods
  $(".docs-buttons").on("click", "[data-method]", function () {
    var $this = $(this);
    var data = $this.data();
    var cropper = $image.data("cropper");
    console.log(cropper);
    var cropped;
    var $target;
    var result;

    if ($this.prop("disabled") || $this.hasClass("disabled")) {
      return;
    }
    // console.log("data-method", data);
    if (cropper && data.method) {
      data = $.extend({}, data); // Clone a new one

      if (typeof data.target !== "undefined") {
        $target = $(data.target);

        if (typeof data.option === "undefined") {
          try {
            data.option = JSON.parse($target.val());
          } catch (e) {
            console.log(e.message);
          }
        }
      }

      cropped = cropper.cropped;

      switch (data.method) {
        case "rotate":
          if (cropped && options.viewMode > 0) {
            $image.cropper("clear");
          }

          break;

        case "getCroppedCanvas":
          if (uploadedImageType === "image/jpeg") {
            if (!data.option) {
              data.option = {};
            }

            data.option.fillColor = "#fff";
            data.option.imageSmoothingEnabled = true;
            data.option.imageSmoothingQuality = "high";
          }

          break;
      }

      result = $image.cropper(data.method, data.option, data.secondOption);
      switch (data.method) {
        case "rotate":
          if (cropped && options.viewMode > 0) {
            $image.cropper("crop");
          }

          break;

        case "scaleX":
        case "scaleY":
          $(this).data("option", -data.option);
          break;

        case "getCroppedCanvas":
          if (result) {
            // console.log(result.toDataURL("image/jpeg"));
            // send_data(result.toDataURL("image/jpeg"));
            // Bootstrap's Modal
            const imageDataURL = result.toDataURL(uploadedImageType);
            $("#getCroppedCanvasModal")
              .modal()
              .find(".modal-body-cropped-image")
              .html(result);

            if (!$download.hasClass("disabled")) {
              download.download = uploadedImageName;
              $download.attr("href", imageDataURL);
            }

            $("#startDiscussion").attr("data-image-link", imageDataURL);
          }

          break;

        case "destroy":
          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
            uploadedImageURL = "";
            $image.attr("src", originalImageURL);
          }

          break;
      }

      if ($.isPlainObject(result) && $target) {
        try {
          $target.val(JSON.stringify(result));
        } catch (e) {
          console.log(e.message);
        }
      }
    }
  });

  // Keyboard
  $(document.body).on("keydown", function (e) {
    if (e.target !== this || !$image.data("cropper") || this.scrollTop > 300) {
      return;
    }

    switch (e.which) {
      case 37:
        e.preventDefault();
        $image.cropper("move", -1, 0);
        break;

      case 38:
        e.preventDefault();
        $image.cropper("move", 0, -1);
        break;

      case 39:
        e.preventDefault();
        $image.cropper("move", 1, 0);
        break;

      case 40:
        e.preventDefault();
        $image.cropper("move", 0, 1);
        break;
    }
  });

  // Import image
  var $inputImage = $("#inputImage");

  if (URL) {
    $inputImage.change(function () {
      var files = this.files;
      var file;

      if (!$image.data("cropper")) {
        return;
      }

      if (files && files.length) {
        file = files[0];

        if (/^image\/\w+$/.test(file.type)) {
          uploadedImageName = file.name;
          uploadedImageType = file.type;

          if (uploadedImageURL) {
            URL.revokeObjectURL(uploadedImageURL);
          }

          uploadedImageURL = URL.createObjectURL(file);
          $image
            .cropper("destroy")
            .attr("src", uploadedImageURL)
            .cropper(options);
          $inputImage.val("");
        } else {
          window.alert("Please choose an image file.");
        }
      }
    });
  } else {
    $inputImage.prop("disabled", true).parent().addClass("disabled");
  }
};

function runnerFunc(modal_image) {
  jquery_cropper(this, function ($, Cropper) {
    "use strict";

    $ = $ && $.hasOwnProperty("default") ? $["default"] : $;
    Cropper =
      Cropper && Cropper.hasOwnProperty("default")
        ? Cropper["default"]
        : Cropper;

    if ($ && $.fn && Cropper) {
      var AnotherCropper = $.fn.cropper;
      var NAMESPACE = "cropper";

      $.fn.cropper = function jQueryCropper(option) {
        for (
          var _len = arguments.length,
            args = new Array(_len > 1 ? _len - 1 : 0),
            _key = 1;
          _key < _len;
          _key++
        ) {
          args[_key - 1] = arguments[_key];
        }

        var result;
        this.each(function (i, element) {
          var $element = $(element);
          var isDestroy = option === "destroy";
          var cropper = $element.data(NAMESPACE);

          if (!cropper) {
            if (isDestroy) {
              return;
            }

            var options = $.extend(
              {},
              $element.data(),
              $.isPlainObject(option) && option
            );
            cropper = new Cropper(element, options);
            $element.data(NAMESPACE, cropper);
          }

          if (typeof option === "string") {
            var fn = cropper[option];

            if ($.isFunction(fn)) {
              result = fn.apply(cropper, args);

              if (result === cropper) {
                result = undefined;
              }

              if (isDestroy) {
                $element.removeData(NAMESPACE);
              }
            }
          }
        });
        return result !== undefined ? result : this;
      };

      $.fn.cropper.Constructor = Cropper;
      $.fn.cropper.setDefaults = Cropper.setDefaults;

      $.fn.cropper.noConflict = function noConflict() {
        $.fn.cropper = AnotherCropper;
        return this;
      };
    }
  });
  mainFunction(modal_image);
}

const send_data = () => {
  const imageData = $("#startDiscussion").attr("data-image-link");
  const heading = $("#new-discussion-heading").val();
  const text = $("#new-discussion-text").val();
  const title = $("title").html();
  console.log(title);
  function dataURLtoBlob(dataURL) {
    let array, binary, i, len;
    binary = atob(dataURL.split(",")[1]);
    array = [];
    i = 0;
    len = binary.length;
    while (i < len) {
      array.push(binary.charCodeAt(i));
      i++;
    }
    return new Blob([new Uint8Array(array)], {
      type: "image/jpeg",
    });
  }

  const test = dataURLtoBlob(imageData);
  console.log(test);
  console.log(heading);
  console.log(text);
  console.log(title);
  var fd = new FormData();
  fd.append("upl", test, title + ".jpeg");
  fd.append("heading", heading);
  fd.append("text", text);

  $.ajax({
    type: "POST",
    url: "http://localhost:4000/kunj-test-file-upload",
    data: fd,
    processData: false,
    contentType: false,

    success: function (data) {
      console.log("device control succeeded");
    },
    error: function () {
      console.log("Device control failed");
    },
  });
};

// function a(x) {
//   //task
//   x()
// }

// a(function b(){})
