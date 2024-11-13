const Dashboard = ({ session }) => {
    if (!session) {
      return <p>You must be logged in to view this page</p>;
    }
  
    return <h1>Welcome to your dashboard!</h1>;
  };
  
  export default Dashboard;
  