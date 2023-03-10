import './App.css';
import {Layout} from 'antd';
import HeaderComponent from "./components/HeaderComponent";
import ProductsPage from "./components/ProductsPage";

const {Header, Content} = Layout;

function App() {
    return (
        <Layout>
            <Header style={{backgroundColor: '#1677ff'}}>
                <HeaderComponent/>
            </Header>
            <Content>
                <ProductsPage></ProductsPage>
            </Content>
        </Layout>
    );
}

export default App;
