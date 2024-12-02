import { Spin } from "antd";
import "./style.css";
const LoadingSpin = () => {
  return (
    <div className="loading-container">
      <Spin size="large" />
    </div>
  );
};

export default LoadingSpin;
