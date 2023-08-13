import { LoginButton } from "./Login";

export default function NavBar() {
    return (
        <nav className="navbar navbar-expand-md navbar-light bg-light">
            <a className="navbar-brand" href="/">Restaurantly</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {/* 
                    w-100 and ms-auto are bootstrap classes for to push 
                    the last element of the navbar to the right.
                */}
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav w-100">
                    <li className="nav-item active">
                        <a className="nav-link" href="/qr">QR</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/dashboard/menu/1">Menu builder</a>
                    </li>
                    <li className="nav-item ms-auto">
                        <LoginButton />
                    </li>
                </ul>
            </div>
        </nav >
    )
}
