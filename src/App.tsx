import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductViewer from "./components/ProductViewer";

function App() {
    return (
        <div className="min-h-screen bg-white">
            <Navbar />
            <main className="container mx-auto flex flex-row py-20 gap-16">
                <ProductList />
                <ProductViewer />
            </main>
        </div>
    );
}

export default App;
