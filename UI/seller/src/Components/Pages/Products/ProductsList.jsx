/* eslint-disable react/prop-types */
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const columns = [
  { field: "id", headerName: "ID", width: 250 },
  { field: "name", headerName: "Product name", flex: 1 },
  { field: "category", headerName: "Category name", flex: 1 },
  { field: "mrp", headerName: "MRP", width: 200 },
  { field: "price", headerName: "Sale Price", width: 200, editable: true},
  { field: "stock", headerName: "Stock", width: 200, editable: true },
  { field: "status", headerName: "Status", width: 200 },
];

const updateData = (newRow, oldRow) => {
  const sellerId = localStorage.getItem("sellerId");
  console.log(newRow);
  console.log(oldRow);
  const productId = oldRow.id;
  console.log(productId);
  const updatedData = {
    sellerPrice: newRow.price,
    stock: newRow.stock
  };
  console.log(updatedData);
  const updateOrder = async (productId, updatedData) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/sellers/${sellerId}/products/${productId}`, updatedData);
      console.log('Order updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating order:', error.response ? error.response.data : error.message);
    }
  };
  updateOrder(productId, updatedData);
  const notify = () => toast("Product Modified Successfully!");
  notify();
}

const paginationModel = { page: 0, pageSize: 10 };

const DataTable = ({products, setSelectedRows, apiRef}) => {
  // const [selectedRows, setSelectedRows] = useState([]);
  return (
    <Paper sx={{ width: "100%" }}>
      <DataGrid
        rows={products}
        columns={columns}
        apiRef={apiRef}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        rowHeight={60}
        // onRowSelectionModelChange={rows => {setSelectedRows(rows); console.log(rows)}}
        onRowSelectionModelChange={(rowIds) => {
          const selectedRowsWithNames = rowIds.map((id) => {
            const product = products.find((prod) => prod.id === id);
            return [ id, product?.name ]; // Find name by id
          });
    
          setSelectedRows(selectedRowsWithNames); // Store id and name
          console.log(selectedRowsWithNames); // Log the array with {id, name}
        }}
        checkboxSelection
        sx={{ border: 0 }}
        processRowUpdate={updateData}
      />
    </Paper>
  );
};

const ProductsList = ({selectedRows, setSelectedRows, isSubmitClicked, apiRef, deletingProduct, setDeletingProduct}) => {
  const sellerId = localStorage.getItem('sellerId');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const fetchProducts = async () => {
    try {
      // Call the API to get all products for a seller
      const response = await axios.get(`http://localhost:3000/api/v1/sellers/${sellerId}/products`);
      setProducts(response.data.products); // Assuming the API returns products under 'products'
      setLoading(false);
      setDeletingProduct(false);
    } catch (err) {
      console.error(err);
      setError("Error fetching products");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchProducts();
  }, [sellerId, isSubmitClicked, deletingProduct]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="flex flex-col gap-5">
      <DataTable products={products} selectedRows={selectedRows} setSelectedRows={setSelectedRows} apiRef={apiRef}/>
    </div>
  );
};

export default ProductsList;
