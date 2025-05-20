
function initVoiceRecordingUI() {
  const $checkbox = $('#recordmyvideo1');
  const $btnStart = $('#btnstartrecordingvoice');
  const $btnStop = $('#btnstoprecordingvoice');
  const $btnAgain = $('#btnagaincordingvoice');
  const $formCheck = $('.form-check');
  const $voicePlayer = $('.card-record-voice-player');

  // Enable/disable Start Recording button based on checkbox
  $checkbox.on('change', function () {
    if ($(this).is(':checked')) {
      $btnStart.removeAttr('disabled');
    } else {
      $btnStart.attr('disabled', true);
    }
  });

  // Handle Start Recording
  $btnStart.on('click', function () {
    $(this).addClass('d-none');
    $btnStop.removeClass('d-none');
  });

  // Handle Stop Recording
  $btnStop.on('click', function () {
    $(this).addClass('d-none');
    $btnAgain.removeClass('d-none');
    $voicePlayer.removeClass('d-none');
    $formCheck.addClass('d-none');
  });

  // Handle Record Again
  $btnAgain.on('click', function () {
    $(this).addClass('d-none');
    $btnStart.removeClass('d-none');
  });
}

function initOnboardingFlowVoice() {
  const $stepsVoice = $(".section-onboarding-voice .onboarding-content-item"); // dynamically detect all step items
  let currentStepVoice = 0;

  const $progressBarVoice = $(".section-onboarding-voice .faceclip-video-tabs-progress .progress-bar");
  const $progressTextVoice = $(".section-onboarding-voice .faceclip-video-tabs-progress .faceclip-video-progress-step");
  const $progressCountVoice = $(".section-onboarding-voice.faceclip-video-tabs-progress .faceclip-video-progress-count");
  const $btnSkipVoice = $(".section-onboarding-voice #onboarding-button-skip");
  const $btnPrevVoice = $(".section-onboarding-voice #onboarding-button-prev");
  const $btnNextVoice = $(".section-onboarding-voice #onboarding-button-next");

  function renderOnboardingStepVoice() {
    // Switch tab content
    $stepsVoice.removeClass("show active");
    $stepsVoice.eq(currentStepVoice).addClass("show active");

    // Progress bar % & step text
    // const progressPercent = ((currentStepVoice + 1) / $stepsVoice.length) * 100;
    const progressPercent = (((currentStepVoice + 1) / $stepsVoice.length) * 100).toFixed(2);
    $progressBarVoice.css("width", `${progressPercent}%`);
    $progressTextVoice.text(`Step ${currentStepVoice + 1} of ${$stepsVoice.length}`);
    $progressCountVoice.text(`${progressPercent}%`);

    // Button visibility
    $btnSkipVoice.toggle(currentStepVoice === 0);
    $btnPrevVoice.toggle(currentStepVoice > 0);

    // Toggle between next button and landing link
    if (currentStepVoice === 0) {
      // $btnNextVoice.hide();
      $(".section-onboarding-voice #onboarding-button-landing").hide();
    } else if (currentStepVoice === $stepsVoice.length - 1) {
      $btnNextVoice.hide();
      $(".section-onboarding-voice #onboarding-button-landing").show();
    } else {
      $btnNextVoice.show();
      $(".section-onboarding-voice #onboarding-button-landing").hide();
    }

    // Optional: update next button text
    // $btnNextVoice.html('Save & Continue <img src="icon/icon-right-arrow-white.svg" class="img-fluid" alt="">');
  }

  $btnNextVoice.on("click", function () {
    if (currentStepVoice < $stepsVoice.length - 1) {
      currentStepVoice++;
      renderOnboardingStepVoice();
    } else {
      console.log("Final step reached");
      // Optional: final action here
    }
  });

  $btnPrevVoice.on("click", function () {
    if (currentStepVoice > 0) {
      currentStepVoice--;
      renderOnboardingStepVoice();
    }
  });

  $btnSkipVoice.on("click", function () {
    // currentStepVoice++;
    // renderOnboardingStepVoice();
  });

  $(document).on("click", ".card-getstarted", function () {
    if (currentStepVoice === 0) {
      $(".section-onboarding-voice .card-getstarted").removeClass("active");
      $(this).addClass("active");
      currentStepVoice++;
      renderOnboardingStepVoice();
    }
  });

  renderOnboardingStepVoice(); // Initial load
}

function initOnboardingFlow() {
  const $stepsFlow = $(".section-onboarding-new .onboarding-content-item"); // dynamically detect all step items
  let currentStepFlow = 0;

  const $progressBarFlow = $(".section-onboarding-new .faceclip-video-tabs-progress .progress-bar");
  const $progressTextFlow = $(".section-onboarding-new .faceclip-video-tabs-progress .faceclip-video-progress-step");
  const $progressCountFlow = $(".section-onboarding-new .faceclip-video-tabs-progress .faceclip-video-progress-count");
  const $btnSkipFlow = $(".section-onboarding-new #onboarding-button-skip");
  const $btnPrevFlow = $(".section-onboarding-new #onboarding-button-prev");
  const $btnNextFlow = $(".section-onboarding-new #onboarding-button-next");

  function renderOnboardingStep() {
    // Switch tab content
    $stepsFlow.removeClass("show active");
    $stepsFlow.eq(currentStepFlow).addClass("show active");

    // Progress bar % & step text
    // const progressPercent = ((currentStepFlow + 1) / $stepsFlow.length) * 100;
    const progressPercent = (((currentStepFlow + 1) / $stepsFlow.length) * 100).toFixed(2);
    $progressBarFlow.css("width", `${progressPercent}%`);
    $progressTextFlow.text(`Step ${currentStepFlow + 1} of ${$stepsFlow.length}`);
    $progressCountFlow.text(`${progressPercent}%`);

    // Button visibility
    $btnSkipFlow.toggle(currentStepFlow === 0);
    $btnPrevFlow.toggle(currentStepFlow > 0);

    // Toggle between next button and landing link
    if (currentStepFlow === 0) {
      $btnNextFlow.hide();
      $("#onboarding-button-landing").hide();
    } else if (currentStepFlow === $stepsFlow.length - 1) {
      $btnNextFlow.hide();
      $("#onboarding-button-landing").show();
    } else {
      $btnNextFlow.show();
      $("#onboarding-button-landing").hide();
    }

    // Optional: update next button text
    // $btnNextFlow.html('Save & Continue <img src="icon/icon-right-arrow-white.svg" class="img-fluid" alt="">');
  }

  $btnNextFlow.on("click", function () {
    if (currentStepFlow < $stepsFlow.length - 1) {
      currentStepFlow++;
      renderOnboardingStep();
    } else {
      console.log("Final step reached");
      // Optional: final action here
    }
  });

  $btnPrevFlow.on("click", function () {
    if (currentStepFlow > 0) {
      currentStepFlow--;
      renderOnboardingStep();
    }
  });

  $btnSkipFlow.on("click", function () {
    // currentStepFlow++;
    // renderOnboardingStep();
  });

  $(document).on("click", ".card-getstarted", function () {
    if (currentStepFlow === 0) {
      $(".section-onboarding-new .card-getstarted").removeClass("active");
      $(this).addClass("active");
      currentStepFlow++;
      renderOnboardingStep();
    }
  });

  renderOnboardingStep(); // Initial load
}

function createVideoStep() {
  // Select only direct children of #createNewVideoTabContent (top-level steps only)
  const $tabs = $("#createNewVideoTabContent > .tab-pane");
  const $progressSteps = $(".progress-video-create-item");
  const $progressBar = $(".progress-bar");
  const $nextBtn = $("#createvideonextbtn");
  const $redirectvideonextbtn = $("#redirectvideonextbtn");
  let currentStep = 0;

  function updateUI(index) {
    // Switch visible tab content
    $tabs.removeClass("show active");
    $tabs.eq(index).addClass("show active");

    // Update step classes
    $progressSteps.each(function (i) {
      $(this).removeClass("active done");
      if (i < index) {
        $(this).addClass("done");       // Mark previous steps as done
      } else if (i === index) {
        $(this).addClass("active");     // Mark current step as active
      }
    });

    // Update progress bar width
    const progress = ((index + 1) / $tabs.length) * 100;
    $progressBar.css("width", `${progress}%`);

    // Change button text and UI on last step
    if (index === $tabs.length - 1) {
      // $nextBtn.html(`Generate Video <img src="icon/icon-right-arrow-white.svg" class="img-fluid" height="16" alt="Right Arrow Icon">`);
      // $("#generateVideoInProgress").removeClass("d-none");
      // $(".page-content-wrapper").addClass("d-none");
      $nextBtn.hide();
      $redirectvideonextbtn.removeClass("d-none");
    } else {
      // $nextBtn.html(`Continue <img src="icon/icon-right-arrow-white.svg" class="img-fluid" height="16" alt="Right Arrow Icon">`);
      $nextBtn.show();
      $redirectvideonextbtn.addClass("d-none");
    }
  }

  // Next button
  $nextBtn.on("click", function () {
    if (currentStep < $tabs.length - 1) {
      currentStep++;
      updateUI(currentStep);
    } else {
      // alert("All steps completed!");
    }
  });

  // Back button
  $("#createvideoprevbtn").on("click", function () {
    if (currentStep > 0) {
      currentStep--;
      updateUI(currentStep);
    }
  });

  // Initialize
  updateUI(currentStep);
}

/*function initOnboardingCreatorFlow() {
  const $steps = $(".creator-onboarding-content-item"); // dynamically detect all step items
  let currentStep = 0;

  const $progressBar = $(".faceclip-video-tabs-progress .progress-bar");
  const $progressText = $(".faceclip-video-tabs-progress .faceclip-video-progress-step");
  const $progressCount = $(".faceclip-video-tabs-progress .faceclip-video-progress-count");
  const $btnSkip = $("#creator-onboarding-button-skip");
  const $btnPrev = $("#creator-onboarding-button-prev");
  const $btnNext = $("#creator-onboarding-button-next");

  function renderOnboardingCreatorStep() {
    $steps.removeClass("show active");
    $steps.eq(currentStep).addClass("show active");

    const progressPercent = (((currentStep + 1) / $steps.length) * 100).toFixed(2);
    $progressBar.css("width", `${progressPercent}%`);
    $progressText.text(`Step ${currentStep + 1} of ${$steps.length}`);
    $progressCount.text(`${progressPercent}%`);

    $btnSkip.toggle(currentStep === 0);
    $btnPrev.toggle(currentStep > 0);

    if (currentStep === 0) {
      $btnNext.hide();
      $btnPrev.hide();
      $("#creator-onboarding-button-landing").hide();
    } else if ($steps.eq(currentStep).attr("id") === "creator-payment-successful-pane") {
      $btnNext.hide();
      $btnPrev.hide();
      $("#creator-onboarding-button-landing").hide();

      // Show the correct payment card
      if (selectedPlan === "pro") {
        $(".card-payment-pro").removeClass("d-none");
        $(".card-payment-platinum").addClass("d-none");
      } else if (selectedPlan === "platinum") {
        $(".card-payment-platinum").removeClass("d-none");
        $(".card-payment-pro").addClass("d-none");
      }
    } else if (currentStep === $steps.length - 1) {
      $btnNext.hide();
      $("#creator-onboarding-button-landing").show();
    } else {
      $btnNext.show();
      $btnPrev.show();
      $("#creator-onboarding-button-landing").hide();
    }

  }

  $btnNext.on("click", function () {
    if (currentStep < $steps.length - 1) {
      currentStep++;
      renderOnboardingCreatorStep();
    } else {
      console.log("Final step reached");
      // Optional: final action here
    }
  });

  $btnPrev.on("click", function () {
    if (currentStep > 0) {
      currentStep--;
      renderOnboardingCreatorStep();
    }
  });

  $btnSkip.on("click", function () {
    // currentStep++;
    // renderOnboardingCreatorStep();
  });

  $("#continueMyPaymentSetupBtn").on("click", function () {
    // Move to next step from payment pane
    currentStep++;
    renderOnboardingCreatorStep();
  });

  let selectedPlan = null; // Will be 'starter', 'pro', or 'platinum'

  $(document).on("click", ".card-creator-plan", function () {
    if (currentStep === 0) {
      $(".card-creator-plan").removeClass("active");
      $(this).addClass("active");

      if ($(this).hasClass("card-creator-plan-starter")) {
        selectedPlan = "starter";
      } else if ($(this).hasClass("card-creator-plan-pro")) {
        selectedPlan = "pro";
      } else if ($(this).hasClass("card-creator-plan-platinum")) {
        selectedPlan = "platinum";
      }

      setTimeout(() => {
        if (selectedPlan === "starter") {
          currentStep = $("#creator-basevideo-tab-pane").index();
        } else {
          currentStep = $("#creator-payment-successful-pane").index();
        }

        renderOnboardingCreatorStep();
      }, 500);
    }

    // Update navbar creator text and dot color
    const $navbarCreatorText = $("#navbar-creator-text");
    $navbarCreatorText.removeClass("bg-purple bg-primary bg-danger"); // Remove old color

    if ($(this).hasClass("card-creator-plan-starter")) {
      selectedPlan = "starter";
      $navbarCreatorText.html('<span class="p-1 bg-purple rounded-circle"></span> Starter Creator');
    } else if ($(this).hasClass("card-creator-plan-pro")) {
      selectedPlan = "pro";
      $navbarCreatorText.html('<span class="p-1 bg-primary rounded-circle"></span> Pro Creator');
    } else if ($(this).hasClass("card-creator-plan-platinum")) {
      selectedPlan = "platinum";
      $navbarCreatorText.html('<span class="p-1 bg-danger rounded-circle"></span> Platinum Creator');
    }
  });

  renderOnboardingCreatorStep(); // Initial load
}*/

function initOnboardingCreatorFlow() {
  const $steps = $(".section-onboarding-creator .creator-onboarding-content-item");
  let currentStep = 0;
  let selectedPlan = null;

  const planFlows = {
    starter: [
      "creator-plan-tab-pane",
      "creator-basevideo-tab-pane",
      "creator-creatormarketplace-tab-pane",
      "creator-licencesetting-tab-pane",
      "creator-templete-tab-pane"
    ],
    pro: [
      "creator-plan-tab-pane",
      "creator-payment-successful-pane",
      "creator-basevideo-tab-pane",
      "creator-creatormarketplace-tab-pane",
      "creator-videoprice-tab-pane",
      "creator-licencesetting-tab-pane",
      "creator-templete-tab-pane"
    ],
    platinum: [
      "creator-plan-tab-pane",
      "creator-payment-successful-pane",
      "creator-basevideo-tab-pane",
      "creator-creatormarketplace-tab-pane",
      "creator-videoprice-tab-pane",
      "creator-licencesetting-tab-pane",
      "creator-templete-tab-pane"
    ]
  };

  let activeFlow = [];

  const $progressBar = $(".section-onboarding-creator .faceclip-video-tabs-progress .progress-bar");
  const $progressText = $(".section-onboarding-creator .faceclip-video-tabs-progress .faceclip-video-progress-step");
  const $progressCount = $(".section-onboarding-creator .faceclip-video-tabs-progress .faceclip-video-progress-count");
  const $btnSkip = $(".section-onboarding-creator #creator-onboarding-button-skip");
  const $btnPrev = $(".section-onboarding-creator #creator-onboarding-button-prev");
  const $btnNext = $(".section-onboarding-creator #creator-onboarding-button-next");

  function renderOnboardingCreatorStep() {
    const currentId = activeFlow[currentStep];

    $steps.removeClass("show active");
    $("#" + currentId).addClass("show active");

    const progressPercent = (((currentStep + 1) / activeFlow.length) * 100).toFixed(2);
    $progressBar.css("width", `${progressPercent}%`);
    $progressText.text(`Step ${currentStep + 1} of ${activeFlow.length}`);
    $progressCount.text(`${progressPercent}%`);

    $btnSkip.toggle(currentStep === 0);
    $btnPrev.toggle(currentStep > 0);

    if (currentStep === 0) {
      $btnNext.hide();
      $btnPrev.hide();
      $("#creator-onboarding-button-landing").hide();
    } else if (currentId === "creator-payment-successful-pane") {
      $btnNext.hide();
      $btnPrev.hide();
      $("#creator-onboarding-button-landing").hide();

      // Show the correct payment card
      if (selectedPlan === "pro") {
        $(".card-payment-pro").removeClass("d-none");
        $(".card-payment-platinum").addClass("d-none");
      } else if (selectedPlan === "platinum") {
        $(".card-payment-platinum").removeClass("d-none");
        $(".card-payment-pro").addClass("d-none");
      }
    } else if (currentId === "creator-videoprice-tab-pane") {
      $btnNext.hide();
      $btnPrev.hide();
      $("#savePricingContinueBtn").on("click", function () {
        $("#creator-onboarding-button-next").trigger("click");
      });
    } else if (currentId === "creator-licencesetting-tab-pane") {
      $btnNext.hide();
      $btnPrev.hide();
    } else if (currentStep === activeFlow.length - 1) {
      $btnNext.hide();
      $btnPrev.hide();
      $("#creator-onboarding-button-landing").hide();
    } else {
      $btnNext.show();
      $btnPrev.show();
      $("#creator-onboarding-button-landing").hide();
    }
  }

  $btnNext.on("click", function () {
    if (currentStep < activeFlow.length - 1) {
      currentStep++;
      renderOnboardingCreatorStep();
    }
  });

  $btnPrev.on("click", function () {
    if (currentStep > 0) {
      currentStep--;
      renderOnboardingCreatorStep();
    }
  });

  $("#continueMyPaymentSetupBtn").on("click", function () {
    if (currentStep < activeFlow.length - 1) {
      currentStep++;
      renderOnboardingCreatorStep();
    }
  });

  $(document).on("click", ".card-creator-plan", function () {
    if (currentStep === 0) {
      $(".card-creator-plan").removeClass("active");
      $(this).addClass("active");

      if ($(this).hasClass("card-creator-plan-starter")) {
        selectedPlan = "starter";
      } else if ($(this).hasClass("card-creator-plan-pro")) {
        selectedPlan = "pro";
      } else if ($(this).hasClass("card-creator-plan-platinum")) {
        selectedPlan = "platinum";
      }

      // Navbar update
      const $navbarCreatorText = $("#navbar-creator-text");
      $navbarCreatorText.removeClass("bg-purple bg-primary bg-danger");

      if (selectedPlan === "starter") {
        $navbarCreatorText.html('<span class="p-1 bg-purple rounded-circle"></span> Starter Creator');
      } else if (selectedPlan === "pro") {
        $navbarCreatorText.html('<span class="p-1 bg-primary rounded-circle"></span> Pro Creator');
      } else if (selectedPlan === "platinum") {
        $navbarCreatorText.html('<span class="p-1 bg-danger rounded-circle"></span> Platinum Creator');
      }

      // Load correct flow
      activeFlow = planFlows[selectedPlan] || [];
      setTimeout(() => {
        currentStep = 1; // Always move to next step after plan selection
        renderOnboardingCreatorStep();
      }, 500);
    }
  });

  // Set default flow for initial load
  activeFlow = planFlows["starter"];
  renderOnboardingCreatorStep();
}

function setupTabSwitching() {
  $('#nextaddTagsBtn').on('click', function () {
    $('#addTags-tab').tab('show');
  });

  $('#nextfinalConfimrationBtn').on('click', function () {
    $('#finalConfirmation-tab').tab('show');
  });

  $('#nextPublishBtn').on('click', function () {
    $("#creator-onboarding-button-next").trigger("click");
  });
}

$(document).ready(function () {

  if ($(".faceclip-add-image-list").length > 0) {
    $(".faceclip-add-image-item").on("click", function () {
      $(".faceclip-add-image-item").removeClass("active");
      $(this).addClass("active");
    });
  }

  if ($("#facelipaddimageupload").length > 0) {
    $("#facelipaddimageupload").on("change", function (e) {
      const file = e.target.files[0];

      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();

        reader.onload = function (e) {
          $("#previewImage").attr("src", e.target.result).removeClass("d-none");
        };

        reader.readAsDataURL(file);
      } else {
        $("#previewImage").hide().attr("src", "");
      }
    });
  }

  if ($(".faceclip-video-tabs").length > 0) {
    let currentStep = 0;

    const $tabs = $(".faceclip-video-tabs-link");
    const $panes = $(".faceclip-video-content-item");

    function updateStepUI() {
      $tabs.removeClass("active done");

      $tabs.each(function (index) {
        if (index < currentStep) {
          $(this).addClass("done");
        } else if (index === currentStep) {
          $(this).addClass("active");
        }
      });

      $panes.removeClass("show active").eq(currentStep).addClass("show active");

      // $("#faceclip-video-button-prev").toggle(currentStep > 0);
      if (currentStep > 0) {
        $("#faceclip-video-button-prev").css({ opacity: 1, pointerEvents: "auto" });
      } else {
        $("#faceclip-video-button-prev").css({ opacity: 0, pointerEvents: "none" });
      }

      if (currentStep === $tabs.length - 1) {
        $("#faceclip-video-button-next").html('<img src="icon/icon-circle-done.svg" class="img-fluid" alt="" /> Create Video');
      } else {
        // $("#faceclip-video-button-next").text("Next");
        $("#faceclip-video-button-next").html('Next <img src="icon/icon-right-arrow-white.svg" class="img-fluid" alt="" />');
      }

      const progressPercent = ((currentStep + 1) / $tabs.length) * 100;
      $(".faceclip-video-tabs-progress .progress-bar").css("width", progressPercent + "%");

      $(".faceclip-video-step-text").text(`Step ${currentStep + 1}/${$tabs.length}`);
    }

    updateStepUI();

    $("#faceclip-video-button-next").on("click", function () {
      if (currentStep < $tabs.length - 1) {
        currentStep++;
        updateStepUI();
      } else {
        alert("All steps completed!");
      }

      $("html, body").animate({ scrollTop: 0 }, "fast");
    });

    $("#faceclip-video-button-prev").on("click", function () {
      if (currentStep > 0) {
        currentStep--;
        updateStepUI();
      }

      $("html, body").animate({ scrollTop: 0 }, "fast");
    });

    $tabs.on("click", function () {
      const index = $tabs.index(this);
      currentStep = index;
      updateStepUI();
    });
  }

  if ($(".faceclip-video-voice-select-item").length > 0 || $(".faceclip-video-choose-type-item").length > 0) {
    $(".faceclip-video-voice-select-item .form-check-input[type='radio'], .faceclip-video-choose-type-item .form-check-input[type='radio']")
      .on("change", function () {
        $(".faceclip-video-voice-select-item, .faceclip-video-choose-type-item").removeClass("active");

        $(this).closest(".faceclip-video-voice-select-item, .faceclip-video-choose-type-item").addClass("active");

        const totalItems = $(".faceclip-video-voice-select-item, .faceclip-video-choose-type-item").length;
        console.log("Total voice/choose-type items:", totalItems);
      });
  }

  if ($("#recordingguidelines").length > 0) {
    $("#recordingguidelines").on("click", function (e) {
      e.preventDefault();
      $(".faceclip-video-recording").removeClass("d-none");
      $(".faceclip-video-choose-type").addClass("d-none");
    });
  }

  if ($("#recordingguidelinesback").length > 0) {
    $("#recordingguidelinesback").on("click", function (e) {
      e.preventDefault();
      $(".faceclip-video-recording").addClass("d-none");
      $(".faceclip-video-choose-type").removeClass("d-none");
    });
  }

  if ($("#savedImageAnimation").length > 0) {
    $("#savedImageAnimationBtn").on("click", function () {
      $("#savedImage").addClass("d-none");
      $("#savedImageAnimation").removeClass("d-none");
    });
  }

  if ($(".faceclip-video-emotion-card").length > 0) {
    $(".faceclip-video-emotion-card").on("click", function () {
      const $row = $(this).closest(".row");

      $row.find(".faceclip-video-emotion-card").removeClass("active");

      $(this).addClass("active");
    });
  }

  if ($(".card-setting-profile").length > 0) {
    $('#btneditprofile').on('click', function () {
      if ($(this).text().trim() === 'Cancel') {
        $('.card-setting-profile .form-control').attr('disabled', true);
        $('.card-setting-profile .card-footer').addClass('d-none').removeClass('d-flex');
        $('#uploadphototext').addClass('d-none');
        $('.card-profile-image-edit').css('display', 'none');

        $(this).text('Edit');
        $(this)
          .removeClass('btn-outline-primary')
          .addClass('btn-primary');
      } else {
        $('.card-setting-profile .form-control').removeAttr('disabled');
        $('.card-setting-profile .card-footer').removeClass('d-none').addClass('d-flex');
        $('#uploadphototext').removeClass('d-none');
        $('.card-profile-image-edit').css('display', 'flex');

        $(this).text('Cancel');

        $(this)
          .removeClass('btn-primary')
          .addClass('btn-outline-primary');
      }
    });
  }

  if ($("#uploadphoto").length > 0) {
    $("#uploadphoto").change(function (event) {
      var input = event.target;
      if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
          $(".card-profile-image #userprofileimage").attr("src", e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
      }
    });

    $("#removephoto").click(function () {
      $(".card-profile-image #userprofileimage").attr("src", "assets/images/user-profile.png");
      $("#uploadphoto").val(""); // clear input file
    });
  }

  if ($(".card-setting-account").length > 0) {
    $("#btnupdatepassowrd").on("click", function () {
      $(this).addClass("d-none");
      $("#formupdatepassword").removeClass("d-none");
    });

    $("#formupdatepassword button").on("click", function () {
      if (!$("#formupdatepassword").hasClass("d-none")) {
        $("#formupdatepassword").addClass("d-none");
        $("#btnupdatepassowrd").removeClass("d-none");
      }
    });
  }

  if ($("#integrationTab").length > 0) {
    $('#integrationTab .nav-link').on('click', function () {
      $('.nav-link').removeClass('active');
      $(this).addClass('active');

      const selectedType = $(this).data('integration-id');

      if (selectedType === 'integationall') {
        $('[data-integration]').removeClass('d-none').addClass('d-flex');
      } else {
        $('[data-integration]').each(function () {
          const itemType = $(this).data('integration');
          if (itemType === selectedType) {
            $(this).removeClass('d-none').addClass('d-flex');
          } else {
            $(this).addClass('d-none').removeClass('d-flex');
          }
        });
      }
    });
  }

  if ($(".perfect-plan-switch").length > 0) {
    $('[data-bs-toggle="tab"]').on('click', function () {
      $('.perfect-plan-switch').addClass('d-none');

      if (this.id === 'monthlyplans-tab') {
        $('#monthlyplanswitch').removeClass('d-none');
      } else if (this.id === 'teamsenterprise-tab') {
        $('#teamsenterpriseswitch').removeClass('d-none');
      }
    });
  }

  // if ($(".card-your-face-upload").length > 0) {
  //   $("#card-your-face-upload").on("change", function (e) {
  //     const file = e.target.files[0];

  //     if (file && file.type.startsWith("video/")) {
  //       const videoURL = URL.createObjectURL(file);

  //       // Set video source
  //       $("#card-your-face-upload-preview video").attr("src", videoURL);

  //       // Show preview, hide upload UI
  //       $("#card-your-face-uploaded").addClass("d-none");
  //       $("#card-your-face-upload-preview").removeClass("d-none");
  //     } else {
  //       alert("Please upload a valid video file.");
  //     }
  //   });
  // }

  if ($(".card-your-profilepicture").length > 0) {
    $("#card-your-profilepicture-upload").on("change", function (e) {
      const file = e.target.files[0];

      if (file && file.type.startsWith("image/")) {
        const imageURL = URL.createObjectURL(file);

        $(".card-your-profilepicture-img img").attr("src", imageURL);

        $(".card-your-profilepicture-upload").addClass("d-none");
        $(".card-your-profilepicture-change").removeClass("d-none");
      } else {
        alert("Please upload a valid image file.");
      }
    });

    $("#btnchoosedifferentphoto").on("click", function () {
      $(".card-your-profilepicture-upload").removeClass("d-none");
      $(".card-your-profilepicture-change").addClass("d-none");
      $("#card-your-profilepicture-upload").val("");
    });
  }

  // if ($(".select-voice-video-option").length > 0) {
  //   $('.select-voice-video-option .form-check-input').on('change', function () {
  //     $('.select-voice-video-option .form-check-input').not(this).prop('checked', false);
  //     $('.select-voice-video-option-item').removeClass('active');

  //     if ($(this).is(':checked')) {
  //       $(this).closest('.select-voice-video-option-item').addClass('active');
  //     }
  //   });
  // }

  if ($(".select-voice-video-option-item").length > 0) {
    $('.select-voice-video-option-item').on('click', function () {
      $('.select-voice-video-option-item input[type="checkbox"]').prop('checked', false);
      $('.select-voice-video-option-item').removeClass('active');
      $(this).addClass('active');
      $(this).find('input[type="checkbox"]').prop('checked', true);
    });
  }

  if ($(".new-video-type-card").length > 0) {
    $(".new-video-type-card").on("click", function () {
      $(".new-video-type-card").removeClass("active");
      $(this).addClass("active");
    });
  }

  if ($(".card-welcome").length > 0) {
    $(".card-welcome").on("click", function () {
      $(".card-welcome").removeClass("active");
      $(this).addClass("active");
    });
  }

  // $("#generateVideoInProgressBtn").on("click", function (e) {
  //   // Check if the click was NOT on the "Preview Audio" button
  //   if (!$(e.target).closest("[data-bs-target='#audioPreviewModal']").length) {
  //     // Hide the #generateVideoInProgress element and show the content wrapper
  //     $("#generateVideoInProgress").addClass("d-none"); // Hide the button
  //     $(".page-content-wrapper").removeClass("d-none"); // Show the content
  //   }
  // });


  /* VIDEO UPLOAD START */
  if ($("#myassetsvideouploadbtn").length > 0) {
    $("#myassetsvideouploadbtn input[type='file']").on("change", function (e) {
      const file = e.target.files[0];
      if (!file || !file.type.startsWith("video/")) return;

      const videoURL = URL.createObjectURL(file);
      const tempVideo = document.createElement("video");

      tempVideo.preload = "metadata";
      tempVideo.src = videoURL;

      // Wait for metadata to load
      tempVideo.addEventListener("loadedmetadata", function () {
        const width = tempVideo.videoWidth;
        const height = tempVideo.videoHeight;

        let ratioClass = "ratio-16x9"; // default
        const ratio = width / height;

        // Check and apply the closest known ratio
        if (Math.abs(ratio - 16 / 9) < 0.1) {
          ratioClass = "ratio-16x9";
        } else if (Math.abs(ratio - 9 / 16) < 0.1) {
          ratioClass = "ratio-9x16";
        } else if (Math.abs(ratio - 1) < 0.1) {
          ratioClass = "ratio-1x1";
        } else if (Math.abs(ratio - 4 / 5) < 0.1) {
          ratioClass = "ratio-4x5";
        }

        const ratioLabel = ratioClass.replace("ratio-", "").replace("x", ":");

        const videoCard = `
        <div class="col-xxl-3 col-xl-4 col-lg-6 d-flex">
          <div class="card w-100">
            <div class="card-body">
              <div class="d-flex flex-column align-items-center gap-3">
                <div class="flex-shrink-0 w-100 position-relative">
                  <span class="badge-radio top-0 start-0 mt-2 ms-2">${ratioLabel}</span>
                  <span class="badge-radio bottom-0 start-0 mb-2 ms-2">0:15</span>
                  <div class="ratio ${ratioClass} rounded-3 overflow-hidden">
                    <video controls>
                      <source src="${videoURL}" type="${file.type}">
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
                <div class="w-100">
                  <h5 class="heading-06 fw-semibold mb-2">${file.name}</h5>
                  <p class="heading-06 text-light">Uploaded Video</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

        // Add new video to the top
        $("#myassetsvideouploadRow").first().prepend(videoCard);
      });
    });
  }
  /* VIDEO UPLOAD END */

  /* SELECT VOICE IN CREATE VIDEO */
  if ($("#choosestockvoiceModal").length > 0) {
    $("#choosestockvoiceModal .choose-stock-voice-item .btn-outline-light").on("click", function () {
      // Remove active class from all buttons
      $("#choosestockvoiceModal .choose-stock-voice-item .btn-outline-light").removeClass("active");

      // Add active to clicked button
      $(this).addClass("active");

      // Show the selected voice block
      $("#selectchoosestockvoice").removeClass("d-none");

      // Get the voice name (from h6 inside the same .choose-stock-voice-item)
      const voiceName = $(this).closest(".choose-stock-voice-item").find("h6").text().trim();

      // Update the voice name in the h5 inside #selectchoosestockvoice
      $("#selectchoosestockvoice h5").html(`
    <img src="icon/icon-done-green.svg" class="img-fluid" alt="">
    ${voiceName}
  `);
    });
  }
  /* SELECT VOICE IN CREATE VIDEO */

  if ($("#card-your-face-upload").length > 0) {
    $("#card-your-face-upload").on("change", function (e) {
      const file = e.target.files[0];

      if (file && file.type.startsWith("video/")) {
        const videoURL = URL.createObjectURL(file);

        // Inject video into the next step containers
        const $videoHTML = `
        <video controls class="w-100 rounded-4">
          <source src="${videoURL}" type="${file.type}">
          Your browser does not support the video tag.
        </video>
      `;

        $("#creator-creatormarketplace-tab-pane .ratio").html($videoHTML);
        $("#onboarding-yourprofile-tab-pane .ratio").html($videoHTML);

        $("#onboarding-button-next").trigger("click");
        $("#creator-onboarding-button-next").trigger("click");

        // const $currentPane = $(".tab-pane.active");
        // const $nextPane = $currentPane.nextAll(".tab-pane").first();

        // if ($nextPane.length > 0) {
        //   $currentPane.removeClass("show active");
        //   $nextPane.addClass("show active");
        // }
      }
    });
  }

  if ($(".range-slider").length > 0) {
    $(".range-slider").each(function () {
      const $this = $(this);
      const start = parseInt($this.data("start")) || 0;
      const min = parseInt($this.data("min")) || 0;
      const max = parseInt($this.data("max")) || 100;

      const $valueInput = $this.closest(".slider-group").find(".slider-value");

      $this.slider({
        value: start,
        min: min,
        max: max,
        range: "min", // 🔥 This is the key
        slide: function (event, ui) {
          $valueInput.val(ui.value);
        }
      });

      $valueInput.val(start);
    });
  }

  if ($(".tag-list").length > 0) {
    $(document).on("click", ".tag-item li", function () {
      $(this).toggleClass("active");
    });
  }


  function togglePlans(switchId, monthlyId, yearlyId) {
    const isChecked = $(switchId).is(':checked');
    if (isChecked) {
      $(monthlyId).addClass('d-none');
      $(yearlyId).removeClass('d-none');
    } else {
      $(yearlyId).addClass('d-none');
      $(monthlyId).removeClass('d-none');
    }
  }

  // Initial check on page load
  togglePlans('#monthlyperfectplan', '#monthlyplans', '#yearlyplans');
  togglePlans('#teamsenterpriseperfectplan', '#teamsenterpirsemonthlyplans', '#teamsenterpirseyearlyplans');

  // On switch change
  $('#monthlyperfectplan').on('change', function () {
    togglePlans('#monthlyperfectplan', '#monthlyplans', '#yearlyplans');
  });

  $('#teamsenterpriseperfectplan').on('change', function () {
    togglePlans('#teamsenterpriseperfectplan', '#teamsenterpirsemonthlyplans', '#teamsenterpirseyearlyplans');
  });

  /* MEGE SECONDARY MENU */
  function isMobile() {
    return $(window).width() < 991;
  }

  $('.nav-megamenu-sticky .nav-link-megamenu.dropdown-toggle').on('click', function (e) {
    const $this = $(this);

    setTimeout(function () {
      if ($this.hasClass('show') && isMobile()) {
        $('body').addClass('overflow-hidden');
      } else {
        $('body').removeClass('overflow-hidden');
      }
    }, 50);
  });

  $(document).on('click', function (e) {
    const $target = $(e.target);
    const isInsideMenu = $target.closest('.dropdown-menu').length > 0 || $target.closest('.nav-megamenu-sticky .nav-link-megamenu.dropdown-toggle').length > 0;

    if (!isInsideMenu && isMobile()) {
      $('.nav-megamenu-sticky .nav-link-megamenu.dropdown-toggle, .dropdown-menu').removeClass('show');
      $('body').removeClass('overflow-hidden');
    }
  });
  
  $('.dropdown-menu a').on('click', function () {
    if (isMobile()) {
      $('body').removeClass('overflow-hidden');
      $('.nav-megamenu-sticky .nav-link-megamenu.dropdown-toggle, .dropdown-menu').removeClass('show');
    }
  });

  $(window).on('resize', function () {
    if (!isMobile()) {
      $('body').removeClass('overflow-hidden');
    }
  });

  initVoiceRecordingUI();
  initOnboardingFlowVoice();
  initOnboardingFlow();
  createVideoStep();
  initOnboardingCreatorFlow();
  setupTabSwitching();
});

/* VOULUM */
// const volumeSlider = document.getElementById('volumeRange');
// const volumeValue = document.getElementById('volumeValue');

// volumeSlider.addEventListener('input', () => {
//   volumeValue.textContent = volumeSlider.value;
// }); 

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

/* SWIPER JS */

// Initialize thumbnail swiper
const thumbSwiper = new Swiper(".swiper-creator-videoThumb", {
  spaceBetween: 8,
  slidesPerView: "auto",
  watchSlidesProgress: true,
});

// Initialize main swiper
const mainSwiper = new Swiper(".swiper-creator-video", {
  thumbs: {
    swiper: thumbSwiper,
  },
});

// Handle thumbnail click and replace video source
document.querySelectorAll(".swiper-creator-videoThumb .swiper-slide img").forEach((thumb, index) => {
  thumb.addEventListener("click", () => {
    const videoSrc = thumb.getAttribute("data-video");
    const video = document.getElementById("mainVideo");
    video.querySelector("source").setAttribute("src", videoSrc);
    video.load();
    video.play();
  });
});

const creatorMoreVideoSwiper = new Swiper(".swiper-creator-morevideo", {
  spaceBetween: 16,
  slidesPerView: 1,
  watchSlidesProgress: true,
  breakpoints: {
    580: {
      slidesPerView: 2,
    },
    1200: {
      slidesPerView: 3,
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const creatorVideoLikeSwiper = new Swiper(".swiper-creator-video-like", {
  spaceBetween: 0,
  slidesPerView: 1,
  watchSlidesProgress: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});