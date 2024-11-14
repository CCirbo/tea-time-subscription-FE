import "./Header.css"
function Header() {
    return (
      <header className="header">
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Delius&display=swap"
          rel="stylesheet"
        />
        <h1 className="delius-regular">Tea Time Subscriptions Admin Page</h1>
      </header>
    );
  }
  
  export default Header;