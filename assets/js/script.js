$(document).ready(() => {
  // Variables
  let isPlaying = false
  let currentZoom = 50
  let isDarkTheme = true // Default to dark theme
  let selectedTool = null
  let videoUploaded = false
  const videoPlayer = document.getElementById("video-player")
  let videoCurrentTime = 0
  let videoDuration = 16 // Default duration in seconds
  let isDraggingPlayhead = false
  let selectedClips = []
  const clipStartPositions = {} // Store original positions for dragging

  // Initialize the interface
  updatePlayhead()
  updateZoom()

  // Make clips draggable
  initializeDraggableClips()

  // Generate waveform bars
  generateWaveformBars()

  // Update AI editor styling
  updateAIEditorStyling()

  // Theme toggle
  $("#theme-toggle").on("click", function () {
    $("body").toggleClass("dark-theme")
    isDarkTheme = !isDarkTheme

    // Change icon based on theme
    if (isDarkTheme) {
      $(this).find("i").removeClass("fa-sun").addClass("fa-moon")
    } else {
      $(this).find("i").removeClass("fa-moon").addClass("fa-sun")
    }
  })

  // Dropdown functionality
  $("#aspect-ratio-dropdown, #zoom-dropdown, .common-dropdown").on("click", function (e) {
    e.stopPropagation()
    $(this).find(".dropdown-menu").toggle()
  })

  // Close dropdowns when clicking elsewhere
  $(document).on("click", () => {
    $("#aspect-ratio-dropdown .dropdown-menu, #zoom-dropdown .dropdown-menu, .common-dropdown .dropdown-menu").hide()
  })

  // Dropdown item selection
  $("#aspect-ratio-dropdown .dropdown-item, #zoom-dropdown .dropdown-item, .common-dropdown .dropdown-item").on("click", function (e) {
    e.stopPropagation()
    const value = $(this).text()
    $(this).closest(".aspect-ratio-selector, .zoom-button, .common-dropdown").find("span").text(value)
    $(this).parent().hide()
  })

  // Tool selection
  $(".tool-button").on("click", function () {
    $(".tool-button").removeClass("active")
    $(this).addClass("active")
    selectedTool = $(this).data("tool")

    // Update AI sidebar help text based on selected tool
    if (selectedTool === "cut") {
      $(".ai-help-text").html(
        '<p>Use the cut tool to trim your video</p><p>You can also ask AI to "cut out silent parts" or "trim the first 5 seconds"</p>',
      )
    } else if (selectedTool === "text") {
      $(".ai-help-text").html(
        '<p>Add text to your video</p><p>You can ask AI to "add subtitles" or "create a title at the beginning"</p>',
      )
    } else {
      $(".ai-help-text").html(
        "<p>Select a tool from the toolbar above to get started</p><p>Try clicking on the transcript or cut tool.</p>",
      )
    }

    // Add a subtle animation to the help text when it changes
    $(".ai-help-text").hide().fadeIn(300)
  })

  // Video upload via button
  $("#upload-video-btn, #upload-placeholder").on("click", () => {
    $("#video-upload").click()
  })

  // Handle file selection
  $("#video-upload").on("change", (e) => {
    const file = e.target.files[0]
    if (file) {
      const url = URL.createObjectURL(file)
      videoPlayer.src = url
      videoPlayer.style.display = "block"
      $("#upload-placeholder").hide()

      // Wait for video metadata to load
      videoPlayer.onloadedmetadata = () => {
        videoDuration = videoPlayer.duration
        updateTimeDisplay(0, videoDuration)
        videoUploaded = true

        // Update timeline
        updateTimelineMarkers()
      }
    }
  })

  // Play/Pause button
  $("#play-pause").on("click", function () {
    if (!videoUploaded) {
      $("#video-upload").click()
      return
    }

    if (isPlaying) {
      videoPlayer.pause()
      $(this).find("i").removeClass("fa-pause").addClass("fa-play")
    } else {
      videoPlayer.play()
      $(this).find("i").removeClass("fa-play").addClass("fa-pause")
    }

    isPlaying = !isPlaying
  })

  // Previous/Next frame buttons
  $("#prev-frame").on("click", () => {
    if (!videoUploaded) return
    videoPlayer.currentTime = Math.max(0, videoPlayer.currentTime - 0.1)
    updatePlayhead()
  })

  $("#next-frame").on("click", () => {
    if (!videoUploaded) return
    videoPlayer.currentTime = Math.min(videoDuration, videoPlayer.currentTime + 0.1)
    updatePlayhead()
  })

  // Video progress bar interaction
  $("#video-progress").on("click", function (e) {
    if (!videoUploaded) return

    const progressBar = $(this)
    const clickPosition = (e.pageX - progressBar.offset().left) / progressBar.width()
    const newTime = clickPosition * videoDuration

    videoPlayer.currentTime = newTime
    updatePlayhead()
  })

  // Draggable progress dot
  $("#progress-dot").on("mousedown", (e) => {
    if (!videoUploaded) return

    e.preventDefault()
    isDraggingPlayhead = true

    $(document).on("mousemove.progressDrag", (e) => {
      if (isDraggingPlayhead) {
        const progressBar = $("#video-progress")
        const position = (e.pageX - progressBar.offset().left) / progressBar.width()
        const clampedPosition = Math.max(0, Math.min(1, position))
        const newTime = clampedPosition * videoDuration

        videoPlayer.currentTime = newTime
        updatePlayhead()
      }
    })

    $(document).on("mouseup.progressDrag", () => {
      isDraggingPlayhead = false
      $(document).off("mousemove.progressDrag mouseup.progressDrag")
    })
  })

  // Timeline playhead dragging
  $("#timeline-playhead").on("mousedown", (e) => {
    e.preventDefault()
    isDraggingPlayhead = true

    $(document).on("mousemove.timelineDrag", (e) => {
      if (isDraggingPlayhead) {
        const timeline = $(".timeline-ruler")
        const position = (e.pageX - timeline.offset().left) / timeline.width()
        const clampedPosition = Math.max(0, Math.min(1, position))
        const newTime = clampedPosition * videoDuration

        if (videoUploaded) {
          videoPlayer.currentTime = newTime
        } else {
          videoCurrentTime = newTime
        }

        updatePlayhead()
      }
    })

    $(document).on("mouseup.timelineDrag", () => {
      isDraggingPlayhead = false
      $(document).off("mousemove.timelineDrag mouseup.timelineDrag")
    })
  })

  // Timeline ruler click to position playhead
  $(".timeline-ruler").on("click", function (e) {
    const timeline = $(this)
    const clickPosition = (e.pageX - timeline.offset().left) / timeline.width()
    const newTime = clickPosition * videoDuration

    if (videoUploaded) {
      videoPlayer.currentTime = newTime
    } else {
      videoCurrentTime = newTime
    }

    updatePlayhead()
  })

  // Zoom controls
  $("#zoom-slider").on("input", function () {
    currentZoom = $(this).val()
    $("#zoom-dropdown span").text(currentZoom + "%")
    updateZoom()
  })

  $("#zoom-in").on("click", () => {
    currentZoom = Math.min(150, Number.parseInt(currentZoom) + 25)
    $("#zoom-slider").val(currentZoom)
    $("#zoom-dropdown span").text(currentZoom + "%")
    updateZoom()
  })

  $("#zoom-out").on("click", () => {
    currentZoom = Math.max(25, Number.parseInt(currentZoom) - 25)
    $("#zoom-slider").val(currentZoom)
    $("#zoom-dropdown span").text(currentZoom + "%")
    updateZoom()
  })

  // Clip selection
  $(".clip").on("click", function (e) {
    if (e.ctrlKey || e.metaKey) {
      // Multi-select with Ctrl/Cmd key
      $(this).toggleClass("selected")
      if ($(this).hasClass("selected")) {
        selectedClips.push($(this))
      } else {
        selectedClips = selectedClips.filter((clip) => clip.get(0) !== $(this).get(0))
      }
    } else {
      // Single select
      $(".clip").removeClass("selected")
      $(this).addClass("selected")
      selectedClips = [$(this)]
    }
  })

  // Timeline tools
  $("#cut-tool").on("click", () => {
    if (selectedClips.length === 0) {
      alert("Please select a clip to cut")
      return
    }

    // Simulate cutting the selected clip
    selectedClips.forEach((clip) => {
      const width = clip.width()
      const newWidth = width / 2

      clip.css("width", newWidth + "px")

      // Create a new clip
      const newClip = clip.clone()
      newClip.css("width", newWidth + "px")
      newClip.insertAfter(clip)

      // Add event listener to the new clip
      newClip.on("click", function (e) {
        if (e.ctrlKey || e.metaKey) {
          $(this).toggleClass("selected")
          if ($(this).hasClass("selected")) {
            selectedClips.push($(this))
          } else {
            selectedClips = selectedClips.filter((c) => c.get(0) !== $(this).get(0))
          }
        } else {
          $(".clip").removeClass("selected")
          $(this).addClass("selected")
          selectedClips = [$(this)]
        }
      })

      // Make the new clip draggable
      makeClipDraggable(newClip)
    })

    // Clear selection after cutting
    $(".clip").removeClass("selected")
    selectedClips = []
  })

  $("#duplicate-tool").on("click", () => {
    if (selectedClips.length === 0) {
      alert("Please select a clip to duplicate")
      return
    }

    // Duplicate selected clips
    selectedClips.forEach((clip) => {
      const newClip = clip.clone()
      newClip.insertAfter(clip)

      // Add event listener to the new clip
      newClip.on("click", function (e) {
        if (e.ctrlKey || e.metaKey) {
          $(this).toggleClass("selected")
          if ($(this).hasClass("selected")) {
            selectedClips.push($(this))
          } else {
            selectedClips = selectedClips.filter((c) => c.get(0) !== $(this).get(0))
          }
        } else {
          $(".clip").removeClass("selected")
          $(this).addClass("selected")
          selectedClips = [$(this)]
        }
      })

      // Make the new clip draggable
      makeClipDraggable(newClip)
    })

    // Clear selection after duplicating
    $(".clip").removeClass("selected")
    selectedClips = []
  })

  // AI example button
  $("#example-btn").on("click", () => {
    const examples = [
      "Cut out all the silent parts of the video",
      "Add subtitles to the entire video",
      "Trim the first 5 seconds of the video",
      "Add a fade-in effect at the beginning",
      "Speed up the middle section by 2x",
      "Add background music",
    ]

    const randomExample = examples[Math.floor(Math.random() * examples.length)]
    $("#ai-input").val(randomExample)
  })

  // AI send button
  $("#send-btn").on("click", () => {
    const input = $("#ai-input").val().trim()
    if (input === "") return

    // Simulate AI processing
    $(".ai-help-text").html("<p>Processing your request...</p><p>This may take a moment.</p>")

    // Clear the input
    $("#ai-input").val("")

    // Simulate AI response after a delay
    setTimeout(() => {
      $(".ai-help-text").html(
        "<p>I've processed your request: \"" + input + '"</p><p>Please check the timeline for changes.</p>',
      )
    }, 2000)
  })

  // Video player event listeners
  videoPlayer.addEventListener("timeupdate", () => {
    updatePlayhead()
  })

  videoPlayer.addEventListener("ended", () => {
    isPlaying = false
    $("#play-pause").find("i").removeClass("fa-pause").addClass("fa-play")
  })

  // Undo/Redo buttons
  $("#undo-button, #redo-button").on("click", () => {
    // Simulate undo/redo functionality
    alert("Undo/Redo functionality would be implemented here")
  })

  // Helper functions
  function updatePlayhead() {
    const currentTime = videoUploaded ? videoPlayer.currentTime : videoCurrentTime
    const percentage = (currentTime / videoDuration) * 100

    // Update progress bar
    $("#progress-dot").css("left", percentage + "%")
    $("#progress-track").css("width", percentage + "%")

    // Update timeline playhead
    $("#timeline-playhead").css("left", percentage + "%")

    // Update time displays
    updateTimeDisplay(currentTime, videoDuration)
  }

  function updateTimeDisplay(current, total) {
    const currentFormatted = formatTime(current)
    const totalFormatted = formatTime(total)

    $("#time-display").text(currentFormatted + " / " + totalFormatted)
    $("#timeline-time").text(currentFormatted + " / " + totalFormatted)
  }

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return (minutes < 10 ? "0" : "") + minutes + ":" + (remainingSeconds < 10 ? "0" : "") + remainingSeconds
  }

  function updateZoom() {
    // Update timeline zoom level
    const zoomFactor = currentZoom / 50 // 50% is the default zoom

    // Adjust clip widths based on zoom
    $(".clip").each(function () {
      const clipStart = Number.parseFloat($(this).data("start"))
      const clipEnd = Number.parseFloat($(this).data("end"))
      const clipDuration = clipEnd - clipStart

      // Base width is 60px per second at 50% zoom
      const baseWidth = clipDuration * 60
      $(this).css("min-width", baseWidth * zoomFactor + "px")
    })

    // Adjust audio waveform width
    $(".audio-waveform").each(function () {
      const baseWidth = $(this).parent().width() * 0.8
      $(this).css("width", baseWidth * zoomFactor + "px")
    })
  }

  function updateTimelineMarkers() {
    // Clear existing markers
    $("#time-markers").empty()

    // Calculate appropriate time intervals based on duration
    const interval = videoDuration <= 60 ? 5 : videoDuration <= 300 ? 30 : 60
    const markerCount = Math.ceil(videoDuration / interval)

    // Add markers
    for (let i = 0; i <= markerCount; i++) {
      const time = i * interval
      const formattedTime = formatTime(time)
      $("#time-markers").append(`<div class="time-marker">${formattedTime}</div>`)
    }
  }

  function initializeDraggableClips() {
    $(".clip").each(function () {
      makeClipDraggable($(this))
    })

    $(".audio-waveform").each(function () {
      makeClipDraggable($(this))
    })
  }

  function makeClipDraggable(clip) {
    clip.draggable({
      axis: "x",
      containment: "parent",
      start: (event, ui) => {
        // Store original position
        clipStartPositions[clip.index()] = ui.position.left
      },
      drag: (event, ui) => {
        // Snap to grid (optional)
        // ui.position.left = Math.round(ui.position.left / 10) * 10;
      },
      stop: (event, ui) => {
        // Update clip data attributes based on new position
        const trackWidth = clip.parent().width()
        const clipStart = (ui.position.left / trackWidth) * videoDuration
        const clipDuration = Number.parseFloat(clip.data("end")) - Number.parseFloat(clip.data("start"))
        const clipEnd = clipStart + clipDuration

        clip.data("start", clipStart.toFixed(2))
        clip.data("end", clipEnd.toFixed(2))
      },
    })
  }

  // Add this to the document ready function to generate the audio waveform bars
  function generateWaveformBars() {
    const waveformContainer = $(".waveform-bars")
    waveformContainer.empty()

    for (let i = 0; i < 40; i++) {
      const height = Math.random() * 12 + 2
      const bar = $('<div class="waveform-bar"></div>').css({
        height: height + "px",
        width: "2px",
        "background-color": "white",
        margin: "0 1px",
        "border-radius": "1px",
      })
      waveformContainer.append(bar)
    }
  }

  // Update the AI editor styling
  function updateAIEditorStyling() {
    // Add a subtle hover effect to the refresh button
    $(".refresh-button").hover(
      function () {
        $(this).css("color", "var(--primary-color)")
      },
      function () {
        $(this).css("color", "var(--light-text)")
      },
    )
    // Make the AI help text more dynamic
    $(".tool-button").on("click", () => {
      // Existing tool selection code...

      // Add a subtle animation to the help text when it changes
      $(".ai-help-text").hide().fadeIn(300)
    })
  }

  // Call this function on page load
  updateAIEditorStyling()
})

document.addEventListener("DOMContentLoaded", function () {
  const buttons = document.querySelectorAll(".tool-button");

  buttons.forEach(button => {
    button.addEventListener("click", function () {
      // Remove 'active' class from all buttons
      buttons.forEach(btn => btn.classList.remove("active"));

      // Add 'active' class to the clicked button
      this.classList.add("active");
    });
  });
});