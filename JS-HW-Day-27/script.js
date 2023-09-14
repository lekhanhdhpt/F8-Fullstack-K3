const cart = {};

function addItem(productId) {
  const quantity = parseInt(
    document.getElementById(`quantity-${productId}`).value
  );

  if (quantity > 0) {
    const productName = `Sản phẩm ${productId}`;
    const productPrice = getPrice(productId);
    const totalPrice = quantity * productPrice;

    if (cart[productName]) {
      cart[productName].quantity += quantity;
      cart[productName].totalPrice += totalPrice;
    } else {
      cart[productName] = {
        quantity: quantity,
        totalPrice: totalPrice,
      };
    }

    updateCart();
  }
}

function updateCart() {
  const cartTable = document.querySelector("#cartTable");
  const totalPriceElement = document.querySelector("#totalPrice");

  while (cartTable.rows.length > 1) {
    cartTable.deleteRow(1);
  }

  let total = 0;

  for (const product in cart) {
    if (cart.hasOwnProperty(product)) {
      const row = cartTable.insertRow();

      const productNameCell = row.insertCell(0);
      productNameCell.textContent = product;

      const quantityCell = row.insertCell(1);
      quantityCell.textContent = cart[product].quantity;

      const totalPriceCell = row.insertCell(2);
      totalPriceCell.textContent = cart[product].totalPrice;

      const deleteButtonCell = row.insertCell(3);
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Xóa";
      deleteButton.onclick = createDeleteFunction(product);
      deleteButtonCell.appendChild(deleteButton);

      total += cart[product].totalPrice;
    }
  }

  if (total > 0) {
    totalPriceElement.textContent = `Tổng giá tiền: ${total}`;
    cartTable.style.display = "table";
  } else {
    totalPriceElement.textContent = "";
    cartTable.style.display = "none";
  }
}

function createDeleteFunction(product) {
  return function () {
    delete cart[product];
    updateCart();
  };
}

function getPrice(productId) {
  let price;
  switch (productId) {
    case 1:
      price = 1000;
      break;
    case 2:
      price = 2000;
      break;
    case 3:
      price = 3000;
      break;
    case 4:
      price = 4000;
      break;
    default:
      price = 0;
  }
  return price;
}
