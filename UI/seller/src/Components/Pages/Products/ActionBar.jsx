/* eslint-disable react/prop-types */
import { GoPlus } from "react-icons/go";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { MdOutlineFileUpload } from "react-icons/md";
import { MdOutlineFileDownload } from "react-icons/md";
import axios from "axios";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { StyledDropZone } from "react-drop-zone";
// import "react-drop-zone/dist/styles.css";



const DeleteDialog = ({ selectedRows, open, setOpen, sellerId, setDeletingProduct }) => {
  const handleClose = () => {
    setOpen(false);
  };
  const deleteProducts = async() => {
    // setDeletingProduct(true);
    console.log("Deleting....");
    console.log(selectedRows);
    try {
      // Call the API to get all products for a seller
      const data = {
        "productsList": selectedRows
      }
      const response = await axios.delete(`http://localhost:3000/api/v1/sellers/${sellerId}/products/bulk/delete`, {data});
      console.log(response);
    } catch (err) {
      console.error(err);
    }
    setOpen(false);
    setDeletingProduct(true);
    const notify = () => toast("Product Deleted Successfully!");
    notify()
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        {"Are you sure you want to delete these products?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {selectedRows.map((row) => {
            return <h1 key={row}>{row}</h1>;
          })}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={deleteProducts} autoFocus color="error">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const ActionBar = ({
  selectedRows,
  sellerId,
  setAddingProduct,
  setIsExportClicked,
  apiRef,
  deletingProduct,
  setDeletingProduct
}) => {
  const [open, setOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const ImageDrop = () => {
    //TODO: ALSO ADD `PREVIEW-DROP_IMAGES`
    const [file, setFile] = useState(null);
    const label = file ? file : "Click or drop your CSV file here";
    const sellerId = localStorage.getItem("sellerId");
    const bulkAdd = async() => {
      // setAddingProduct(true);
      if (!file) return;
  
      const formData = new FormData();
      formData.append("file", file);  // Assuming you're sending the file as "file"
  
      try {
        const response = await axios.post(`http://localhost:3000/api/v1/sellers/${sellerId}/products/import`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log(response.data);
        // setAddingProduct(false);
      } catch (err) {
        console.error(err);
      }
    }
    
    return (
      <div className="flex">
        <StyledDropZone onDrop={setFile} label={label} className="flex-1 flex justify-center h-1 items-center rounded-md bg-inherit border-black border-[1px]"/>
        {
          file && (
            <>
              <button onClick={bulkAdd}>Submit</button>
              <button onClick={()=>{setFile(null)}}>Cancel</button>
            </>
          )
        }
      </div>
    );
  };

  const handleExport = () => {
    setIsExportClicked(true);
    console.log("clicked");
    if (apiRef.current) {
      apiRef.current.exportDataAsCsv();
    }
    setIsExportClicked(false);
  };
  return (
    <>
      <DeleteDialog
        selectedRows={selectedRows}
        open={open}
        setOpen={setOpen}
        sellerId={sellerId}
        deletingProduct = {deletingProduct}
        setDeletingProduct = {setDeletingProduct}
      />
      <div className="bg-white px-4 py-2 rounded-sm border border-gray-200 flex flex-1 text-gray-200">
        <div className="p-1 flex-1 flex gap-8 text-black">
          <button
            className="p-3 px-5 rounded-lg flex justify-center items-center gap-2 border-black border  duration-150 hover:border-emerald-500"
            onClick={handleExport}
          >
            <MdOutlineFileUpload />
            Export
          </button>
          <button className="p-3 px-5 rounded-lg flex justify-center items-center gap-2 border-black border  duration-150 hover:border-emerald-500" onClick={()=>{setIsImportOpen(true)}}>
            <MdOutlineFileDownload />
            Import
          </button>
          {
            isImportOpen &&
            <ImageDrop/>
          }
        </div>
        <div className="p-1 flex-1 flex justify-end gap-8">
          <button className="p-3 bg-slate-400 rounded-lg flex justify-center items-center gap-2">
            <FiEdit />
            Bulk Action
          </button>
          <button
            className="p-3 bg-red-500 rounded-lg flex justify-center items-center gap-2"
            onClick={() => {
              selectedRows.length > 0 && setOpen(true);
            }}
          >
            <RiDeleteBin6Line />
            Delete
          </button>
          <button
            className="p-3 bg-emerald-500 rounded-lg flex justify-center items-center gap-2"
            onClick={() => setAddingProduct(true)}
          >
            <GoPlus />
            Add Product
          </button>
        </div>
      </div>
    </>
  );
};

export default ActionBar;
