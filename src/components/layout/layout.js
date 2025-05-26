import { useState } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet

import { Layout, Tabs } from "antd"; // Import Layout và Tabs
import ProfilePage from "../../pages/private/profile";
const { Header, Content, Sider, Footer } = Layout;
const TabLayout = () => {
    const [size, setSize] = useState('small');
    const [activeKey, setActiveKey] = useState('1');
    const [items, setItems] = useState([
        {
            label: 'Dashboard',
            key: '1',
            children: <ProfilePage />, // Sử dụng Outlet để hiển thị nội dung của các route con
        },
        {
            label: 'Profile',
            key: '2',
            children: 'Content of editable tab 2', // Placeholder cho tab khác
        },
        // Bạn có thể thêm các tab khác nếu cần
    ]);

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

    return (
          <Layout>
            <Sider width="25%" style={{ background: '#1677ff', color: '#fff' }}>
                Sider
            </Sider>
            <Layout>
                <Header style={{ background: '#4096ff', color: '#fff', textAlign: 'center' }}>
                    Header
                </Header>
                <Content style={{ margin: '16px', background: '#0958d9', color: '#fff' }}>
                    <Tabs activeKey={activeKey}>
                        <Tabs.TabPane tab="Dashboard" key="1">
                            <ProfilePage /> {/* This will render DashboardPage when active */}
                        </Tabs.TabPane>
                        <Tabs.TabPane tab="Profile" key="2">
                            <ProfilePage /> {/* Directly render ProfilePage */}
                        </Tabs.TabPane>
                    </Tabs>
                </Content>
                <Footer style={{ background: '#4096ff', color: '#fff', textAlign: 'center' }}>
                    Footer
                </Footer>
            </Layout>
        </Layout>
    );
};

export default TabLayout;