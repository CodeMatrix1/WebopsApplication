import "./Admin.css";
function Admin({ database }) {
  return (
    <div className="admin-container">
      <div className="header">
        <p className="h-element">Username</p>
        <p className="h-element">Email</p>
      </div>
      {database.map((data) => (
        <div className="group">
          <p className="g-element">{data.name}</p>
          <p className="g-element">{data.email}</p>
        </div>
      ))}
    </div>
  );
}
export default Admin;
