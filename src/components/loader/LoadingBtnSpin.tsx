import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";

export default function LoadingBtnSpin() {
  const antIcon = (
    <LoadingOutlined
      style={{
        fontSize: 24,
        color: "white",
      }}
      spin
    />
  );
  return <Spin indicator={antIcon} />;
}
