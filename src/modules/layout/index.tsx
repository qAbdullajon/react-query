import { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import Logo from "../../assets/logo.svg";
import routes from "../../router/routes";
import "./style.scss";
import { NavLink, Outlet, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const App = () => {
  const [selectedKey, setSelectedKey] = useState(sessionStorage.getItem("selectedKey") || "0");
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const handleLogo = () => {
    setSelectedKey("0");
    navigate("/");
    sessionStorage.setItem("selectedKey", "0");
  };
  const handleMenuClick = (e: { key: string }) => {
    setSelectedKey(e.key);
    sessionStorage.setItem("selectedKey", `${e.key}`);
  };
  return (
    <Layout>
      <Sider className={collapsed ? "min-w" : "max-w"} trigger={null} collapsible collapsed={collapsed} style={{ minHeight: "100vh" }}>
        <div className="demo-logo-vertical" />
        <div onClick={handleLogo} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "15px 14px", cursor: "pointer" }}>
          <img src={Logo} alt="logo" />
          {collapsed || <p style={{ color: "#fff", fontSize: "20px" }}>TechnoArk</p>}
        </div>
        <Menu
          onClick={handleMenuClick}
          theme="dark"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={routes.map((item, i) => ({
            ...item,
            key: i.toString(),
            icon: item.icon,
            label: (
              <NavLink style={{ fontSize: "18px" }} to={item.path}>
                {item.title}
              </NavLink>
            ),
          }))}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;
