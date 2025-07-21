import Navbar from "../components/Navbar.jsx";
import Sidebar from "../components/Sidebar.jsx";
import "../App.css"
import Provider from "../components/Providers.jsx";
import './globals.css'

export default function RootLayout({ children }) {

    return (
    <html lang="en">
      <body>
        <Provider>

            <div className={`app  light-mode`}>
                <Navbar />
                <div className="content-container">
                    <Sidebar />
                    <main className="main-content">
                        {children}
                    </main>
                </div>
            </div>
        </Provider>
        </body>
        </html>
    );
}



