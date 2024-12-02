import { useState } from "react";
import { Upload } from "antd";
import type { UploadFile, UploadProps } from "antd";
import ImgCrop from "antd-img-crop";

type PropType = {
  setFile: (file: any) => void;
};
const Index = ({ setFile }: PropType) => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const onChange: UploadProps["onChange"] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    setFile(newFileList[0]);
  };

  const beforeUpload = () => {
    return false;
  };
  return (
    <ImgCrop rotationSlider>
      <Upload listType="picture-card" fileList={fileList} onChange={onChange} beforeUpload={beforeUpload}>
        {fileList.length < 1 && "+ Upload"}
      </Upload>
    </ImgCrop>
  );
};

export default Index;
