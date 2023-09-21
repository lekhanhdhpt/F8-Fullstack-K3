const sortableList = document.querySelector(".list");
let sortableItems = document.querySelectorAll(".list-element:not(.modules)");
let fixedModules = document.querySelectorAll(".list-element.modules");
let draggedElement = null;

document.addEventListener("DOMContentLoaded", function () {
  sortableItems.forEach((item, index) => {
    item.setAttribute("draggable", "true");
    item.addEventListener("dragstart", handleDragStart);
    item.addEventListener("dragend", handleDragEnd);

    const span = item.querySelector("span");
    const orderSpan = document.createElement("span");
    orderSpan.className = "new-order";
    orderSpan.textContent = `${index + 1}: `;
    item.insertBefore(orderSpan, span);
  });

  fixedModules.forEach((module, index) => {
    module.setAttribute("draggable", "true");
    module.addEventListener("dragstart", handleDragStart);
    module.addEventListener("dragend", handleDragEnd);

    const span = module.querySelector("span");
    const orderSpan = document.createElement("span");
    orderSpan.className = "new-order";
    orderSpan.textContent = ` ${index + 1}: `;
    module.insertBefore(orderSpan, span);
  });

  sortableList.addEventListener("dragover", handleDragOver);

  function handleDragStart(e) {
    draggedElement = this;
    e.target.classList.add("dragging");
  }

  function handleDragEnd(e) {
    draggedElement = null;
    updateOrderNumbers();
    e.target.classList.remove("dragging");
  }

  function updateOrderNumbers() {
    sortableItems = document.querySelectorAll(".list-element:not(.modules)");
    fixedModules = document.querySelectorAll(".list-element.modules");

    sortableItems.forEach((item, index) => {
      if (!item.classList.contains("modules")) {
        const orderSpan = item.querySelector(".new-order");
        orderSpan.textContent = `${index + 1}: `;
      }
    });

    fixedModules.forEach((module, index) => {
      const orderSpan = module.querySelector(".new-order");
      orderSpan.textContent = ` ${index + 1}: `;
    });
  }

  function handleDragOver(e) {
    e.preventDefault();
    if (draggedElement) {
      const targetItem = e.target.closest(".list-element");
      if (targetItem !== null && targetItem !== draggedElement) {
        const targetRect = targetItem.getBoundingClientRect();
        const dropTarget =
          e.clientY < targetRect.top + targetRect.height / 2
            ? "before"
            : "after";

        if (draggedElement.classList.contains("modules")) {
          if (dropTarget === "before") {
            sortableList.insertBefore(draggedElement, targetItem);
          } else {
            sortableList.insertBefore(
              draggedElement,
              targetItem.nextElementSibling
            );
          }
        } else {
          if (
            targetItem.getBoundingClientRect().top >=
            draggedElement.getBoundingClientRect().bottom
          ) {
            updateOrderNumbers();
          }
          sortableList.insertBefore(draggedElement, targetItem);
        }

        updateOrderNumbers();
      }
    }
  }
});
