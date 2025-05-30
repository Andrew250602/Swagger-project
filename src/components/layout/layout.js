import { useState } from "react";

import { Layout, Tabs, Menu } from "antd";
import ProfilePage from "../../pages/private/profile";
import DashboardPage from "../../pages/private/dashboard";
import {
    PieChartOutlined,
    DesktopOutlined,
    ContainerOutlined,
    MailOutlined,
    AppstoreOutlined,
    RightOutlined,
    LeftOutlined,
    LogoutOutlined
} from '@ant-design/icons';
import { connect } from "react-redux";
import { logoutAction } from "../../redux/action/user";
import "../../style/tablayout/index.scss"
const { Header, Content, Sider, Footer } = Layout;
const TabLayout = (props) => {
    const [width, setWidth] = useState('20%');
    const [activeKey, setActiveKey] = useState('1');
    const [collapsed, setCollapsed] = useState(false);
    const { LogoutActionDispatch } = props;
    const [items, setItems] = useState([
        {
            label: 'Dashboard',
            key: '1',
            children: <DashboardPage />,
        },
        {
            label: 'Profile',
            key: '2',
            children: <ProfilePage />,
        },
    ]);
    const itemv = [
        { key: '1', icon: <PieChartOutlined />, label: 'Option 1' },
        { key: '2', icon: <DesktopOutlined />, label: 'Option 2' },
        { key: '3', icon: <ContainerOutlined />, label: 'Option 3' },
        {
            key: 'sub1',
            label: 'Navigation One',
            icon: <MailOutlined />,
            children: [
                { key: '5', label: 'Option 5' },
                { key: '6', label: 'Option 6' },
                { key: '7', label: 'Option 7' },
                { key: '8', label: 'Option 8' },
            ],
        },
        {
            key: 'sub2',
            label: 'Navigation Two',
            icon: <AppstoreOutlined />,
            children: [
                { key: '9', label: 'Option 9' },
                { key: '10', label: 'Option 10' },
                {
                    key: 'sub3',
                    label: 'Submenu',
                    children: [
                        { key: '11', label: 'Option 11' },
                        { key: '12', label: 'Option 12' },
                    ],
                },
            ],
        },
        {
            key: 'sub4',
            label: 'Navigation Two',
            icon: <AppstoreOutlined />,
            children: [
                { key: '13', label: 'Option 9' },
                { key: '14', label: 'Option 10' },
                {
                    key: 'sub5',
                    label: 'Submenu',
                    children: [
                        { key: '15', label: 'Option 11' },
                        { key: '16', label: 'Option 12' },
                    ],
                },
            ],
        },
    ];
    const add = () => {
        const newKey = String(items.length + 1);
        setItems([
            ...items,
            {
                label: `Tab ${newKey}`,
                key: newKey,
                children: `Content of editable tab ${newKey}`,
            },
        ]);
        setActiveKey(newKey);
    };

    const remove = targetKey => {
        if (!items) return;
        const targetIndex = items.findIndex(item => item.key === targetKey);
        const newItems = items.filter(item => item.key !== targetKey);
        if (newItems.length && targetKey === activeKey) {
            const newActiveKey =
                newItems[targetIndex === newItems.length ? targetIndex - 1 : targetIndex].key;
            setActiveKey(newActiveKey);
        }
        setItems(newItems);
    };

    const onEdit = (targetKey, action) => {
        if (action === 'add') {
            add();
        } else {
            remove(targetKey);
        }
    };
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
        setWidth(collapsed ? '25%' : '5%');
    };

    const handleLogout = () => {
        const request = {
            name: localStorage.getItem('name')
        }
        LogoutActionDispatch(request);
    }
    return (
        <Layout style={{ height: '100vh', width: "100%", position: "fixed" }}>
            <Sider width={width} style={{ background: '#1677ff', color: '#fff', position: "relative" }}>
                <div style={{
                    height: "65px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    top: 0
                }}>
                    <div style={{ width: "80%", height: "80%" }}>
                        {collapsed ? (
                            <img style={{ width: "100%", height: "100%" }} src={"https://ik.imagekit.io/alejk5lwty/PROJECT_/Logo.png?updatedAt=1748494099436"} />
                        ) : (
                            <div style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "30px",
                            }}>VyxNguyen</div>
                        )}
                    </div>
                </div>
                <div style={{ width: "100%", position: "absolute", top: "70px" }}>
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        inlineCollapsed={collapsed}
                        items={itemv}
                    />
                </div>
                <div style={{
                    position: "absolute",
                    bottom: 0,
                    padding: '10px',
                    width: '100%',
                    textAlign: 'center',
                    background: '#1677ff',
                    display: 'flex',
                }}>
                    <div style={{ flex: 1, textAlign: 'center' }}>
                        {collapsed ? (
                            <RightOutlined onClick={toggleCollapsed} style={{ color: '#fff', cursor: 'pointer' }} />
                        ) : (
                            <LeftOutlined onClick={toggleCollapsed} style={{ color: '#fff', cursor: 'pointer' }} />
                        )}
                    </div>
                    {width <= '25%' && (
                        <div style={{ flex: 1, textAlign: 'center' }}>
                            <LogoutOutlined onClick={handleLogout} style={{ color: '#fff', cursor: 'pointer' }} />
                        </div>
                    )}
                </div>
            </Sider>
            <Layout>
                <Header style={{ background: '#4096ff', color: '#fff', textAlign: 'center' }}>
                    Header
                </Header>
                <Content style={{ margin: '16px', background: '#0958d9', color: '#fff' }}>
                    <Tabs type="editable-card"
                        activeKey={activeKey}
                        onChange={setActiveKey}
                        onEdit={onEdit}
                        items={items}>
                    </Tabs>
                </Content>
                <Footer style={{ background: '#4096ff', color: '#fff', textAlign: 'center' }}>
                    Footer
                </Footer>
            </Layout>
        </Layout>
    );
};

const mapDispatchToProps = (dispatch) => ({
    LogoutActionDispatch: (values) => dispatch(logoutAction(values)),
});

const mapStateToProps = (state) => {
    return {
        loading: state.userState.loading,
        error: state.userState.error,
        isAuthenticated: state.userState.isAuthenticated,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabLayout);
