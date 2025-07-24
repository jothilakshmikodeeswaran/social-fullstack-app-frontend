import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav class="flex space-x-4">
      <NavLink to="/">Home</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/signin">Sign In</NavLink>
      <NavLink to="/feed">Feed Page</NavLink>
      
    </nav>
  );
}
export default NavBar;