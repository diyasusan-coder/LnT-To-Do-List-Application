$(document).ready(function () {
  // Navigation
  $(".nav-pill, .preview-card").click(function () {
    var target = $(this).data("target");
    $(".page").hide();
    $("#" + target).show();
    $(".nav-pill").removeClass("active");
    $('.nav-pill[data-target="' + target + '"]').addClass("active");
  });

  // Add task
  $("#taskForm").submit(function (e) {
    e.preventDefault();
    let taskText = $("#taskInput").val();
    let dueDate = $("#taskDueDatetime").val();
    if (taskText.trim() === "") return;

    let taskHtml = `
      <div class="task-list-item">
        <div class="task-content">
          <span class="task-text">${taskText}</span>
          ${dueDate ? <span class="task-due-date">${dueDate}</span> : ""}
        </div>
        <div class="task-actions">
          <button class="edit-btn">✏</button>
          <button class="delete-btn">🗑</button>
          <button class="complete-btn">✔</button>
        </div>
      </div>`;

    $("#taskList").append(taskHtml);
    $("#taskInput").val("");
    $("#taskDueDatetime").val("");
    $("#noTasksMessage").hide();
  });

  // Task actions
  $("#taskList").on("click", ".delete-btn", function () {
    $(this).closest(".task-list-item").remove();
    if ($("#taskList .task-list-item").length === 0) {
      $("#noTasksMessage").show();
    }
  });

  $("#taskList").on("click", ".complete-btn", function () {
    $(this).closest(".task-list-item").toggleClass("completed");
  });

  $("#taskList").on("click", ".edit-btn", function () {
    let item = $(this).closest(".task-list-item");
    let textEl = item.find(".task-text");
    let currentText = textEl.text();
    let newText = prompt("Edit task:", currentText);
    if (newText) textEl.text(newText);
  });

  // Filter tasks
  $(".filters button").click(function () {
    $(".filters button").removeClass("active");
    $(this).addClass("active");
    let filter = $(this).data("filter");

    $(".task-list-item").show();
    if (filter === "active") {
      $(".task-list-item.completed").hide();
    } else if (filter === "completed") {
      $(".task-list-item:not(.completed)").hide();
    }
  });

  // Pawxel chat toggle
  $("#pawxelToggle").click(function () {
    $("#pawxelChat").toggle();
  });

  // Pawxel chat form
  $("#pawxelForm").submit(function (e) {
    e.preventDefault();
    let msg = $("#pawxelInput").val();
    if (msg.trim() === "") return;

    $("#pawxelWindow").append(<div class="chat-bubble chat-user">${msg}</div>);
    $("#pawxelInput").val("");

    setTimeout(() => {
      $("#pawxelWindow").append(<div class="chat-bubble chat-bot">Meow! I’m Pawxel 🐱</div>);
      $("#pawxelWindow").scrollTop($("#pawxelWindow")[0].scrollHeight);
    }, 500);
  });
});