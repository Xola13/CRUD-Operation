// Part 3: Create a search bar to find a specific country

// Solution with a try catch for validation

// CREATE, READ, UPDATE, DELETE
var productList = document.getElementById('products');
let products = [
  {
    name: 'Carvella',
    category: 'Sneaker',
    price: 'R2 500'
  },
  {
    name: 'Tosoni',
    category: 'shoe',
    price: 'R1 800'
  },
  {
    name: 'Toughees',
    category: 'Shoe',
    price: 'R350'
  },
  {
    name: 'Grey',
    category: 'Trousers',
    price: 'R150'
  },
  {
    name: 'Charcoal',
    category: 'Trousers',
    price: 'R200'
  },
  {
    name: 'Grasshopper',
    category: 'Shoe',
    price: 'R400'
  },
  {
    name: 'Buccaneer',
    category: 'Shoe',
    price: 'R450'
  }
];

// Counter: Number of countries in the array
countProducts = data => {
  var count = document.getElementById('counter');
  if (data) {
    count.innerHTML = 'There are a total of ' + data + ' products';
    // Show the heading text for the table
    document.getElementById('name').style.display = 'block';
  } else {
    count.innerHTML = 'No product';
    // Hide the heading text for the table

    document.getElementById('id').style.display = 'none';
    document.getElementById('name').style.display = 'none';
    document.getElementById('category').style.display = 'none';
    document.getElementById('price').style.display = 'none';
  }
};
// Read: GET
getProducts = () => {
  var data = '';
  if (products.length > 0) {
    for (i = 0; i < products.length; i++) {
      data += '<tr>';
      data += '<td>'+(i+1)+'</td>';
      data += '<td>' + products[i].name + '</td>';
      data += '<td>' + products[i].category + '</td>';
      data += '<td>' + products[i].price + '</td>';
      data += '<td><button onclick="editProduct(' + i + ')">Edit</button></td>';
      data += '<td><button onclick="deleteProduct(' + i + ')">Delete</button></td>';
      data += '</tr>';
    }
  }

  countProducts(products.length);
  return productList.innerHTML = data;
};
// Create: POST
addProduct = () => {
  try {
    var productAdded = document.getElementById('add-product').value.trim();
    var categoryAdded = document.getElementById('add-category').value.trim();
    var priceAdded = document.getElementById('add-price').value.trim();
    if(!productAdded || !categoryAdded || !priceAdded) {
      throw new Error('You have not inserted a value in one of the input fields');
    }
    // Get the value
    var productDetails = {
      name: productAdded,
      category: categoryAdded,
      price: priceAdded
    }
    if (productDetails) {
      // addCountry the new value
      products.push(productDetails);
      // Reset input value
      productAdded.value = '';
      // Dislay the new list
      getProducts();
    }
  } catch (err) {
    alert(err.message);
  }
};
// Update: PUT
editProduct = item => {
  var editProduct = document.getElementById('edit-product');
  var editCategory = document.getElementById('edit-category');
  var editPrice = document.getElementById('edit-price');
  // Display value in the field
  editProduct.value = products[item].name;
  editCategory.value = products[item].category;
  editPrice.value = products[item].price;
  // Display fields
  document.getElementById('editForm').style.display = 'block';
  // When the form is submitted
  document.getElementById('saveEdit').onsubmit = () => {
    try {
      console.log(editProduct.value.trim())
      if(!editProduct.value.trim() || !editCategory.value.trim() || !editPrice.value.trim()) {
        throw new Error('You have not inserted a value in one of the input fields');
      }
      // Get value
      var productDetails = {
        name: editProduct.value,
        category: editCategory.value,
        price: editPrice.value
      };

      if (productDetails) {
        // editCountry value
        products.splice(item, 1, productDetails);
        // Display the new list
        getProducts();
        // Hide fields
        closeInput();
      }
    } catch (err) {
      alert(err.message);
    }
  }
};
// Delete: Delete
deleteProduct = item => {
  // deleteCountry the current row
  products.splice(item, 1);
  // Display the new list
  getProducts();
};
// Search: Country Search
searchbar = () => {
  var searchedProduct = document.getElementById('search').value.trim();
  try {
    if (!searchedProduct) {
      throw new Error('Nothing was entered in the search bar');
    }
    // Filter all the countries in the array with value typed into the input field
    let productsFound = products.filter(products => products.name.toLowerCase().includes(searchedProduct.toLowerCase()));
    if(productsFound.length === 0) {
      throw new Error('No products were found');
    }
    products = productsFound;
    getProducts();
  } catch (err) {
    alert(err.message);
  }
};

// Where the script starts. This executes when the file loads on the browser
getProducts();

// Close Edit form
closeInput = () => {
  document.getElementById('editForm').style.display = 'none';
}