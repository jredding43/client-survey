import r43 from "../assets/r43.png";

const Header = () => {
    return (
      <header className="flex justify-center items-center bg-gray-200">
        <img
          src={r43}
          alt="Company Logo"
          className="h-[200px] w-auto object-contain"
        />
      </header>
    );
  };

  export default Header;