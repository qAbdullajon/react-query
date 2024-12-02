import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useGetDeteilQuery } from "../hooks/queries";
import { Button } from "antd";
import { useDeleteDetail } from "../hooks/mutations";
import DetailModal from "./modal";

const Deteil = () => {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<any>({});
  const { product_detail, product } = useGetDeteilQuery(Number(id)).data || {};
  const { mutate } = useDeleteDetail();
  const deleteDeteil = () => {
    mutate(Number(product_detail.id));
  };
  const handleCancel = () => {
    setOpen(false);
  };
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <DetailModal open={open} handleCancel={handleCancel} update={update} id={id} />
      {!product_detail ? (
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingBlock: "5px" }}>
            <p style={{ fontSize: "20px" }}>Product name</p>
            <p style={{ fontSize: "20px", fontWeight: "500", color: "#4096ff" }}>{product?.name}</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingBlock: "5px" }}>
            <p style={{ fontSize: "20px" }}>Product price</p>
            <p style={{ fontSize: "20px", fontWeight: "500", color: "#4096ff" }}>{product?.price}$</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingBlock: "5px" }}>
            <p style={{ fontSize: "20px" }}>Product detail</p>
            <Button onClick={() => setOpen(true)} size="large" type="primary">
              Add detail
            </Button>
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
          <div></div>
          <div style={{ width: "45%", display: "grid", gap: "10px" }}>
            <h1 style={{ fontSize: "24px", fontWeight: 500, marginBottom: "20px", textAlign: "center" }}>{product.name}</h1>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBlock: "5px", borderBottom: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: "20px", fontWeight: "500" }}>Description:</p>
              <p style={{ fontSize: "18px" }}>{product_detail.description}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBlock: "5px", borderBottom: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: "20px", fontWeight: "500" }}>Product colors</p>
              <p style={{ fontSize: "18px" }}>{product_detail.colors}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBlock: "5px", borderBottom: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: "20px", fontWeight: "500" }}>Product quantity</p>
              <p style={{ fontSize: "18px" }}>{product_detail.quantity}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", paddingBlock: "5px", borderBottom: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: "20px", fontWeight: "500" }}>Product discount</p>
              <p style={{ fontSize: "18px" }}>{product_detail.discount}</p>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "end", paddingBlock: "5px", borderBottom: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: "20px", fontWeight: "500" }}>Product price</p>
              <div style={{ fontSize: "16px" }}>
                <del style={{ opacity: "30%" }}>{product.price} $</del>
                <p>{Math.floor(product.price * (1 - product_detail.discount / 100))} $</p>
              </div>
            </div>
            <div>
              <Button
                onClick={() => {
                  setOpen(true);
                  setUpdate(product_detail);
                }}
                type="text"
                style={{ backgroundColor: "orange", marginRight: "20px", color: "white" }}
                size="large"
              >
                Update detail
              </Button>
              <Button onClick={deleteDeteil} type="text" style={{ backgroundColor: "red", color: "white" }} size="large">
                Delete detail
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Deteil;
