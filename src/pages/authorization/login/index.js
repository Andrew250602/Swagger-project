import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../../redux/action/user';

const LoginComponent = (props) => {
    const { fetchUsers, message, users, loading, error, displayMessage } = props;

    useEffect(() => {
        fetchUsers(); 
    }, [fetchUsers]); // Only depend on fetchUsers

    return (
        <div>
            <h1>Welcome to the Outlet!</h1>
            <p style={{ color: "red" }}>{message}</p>
            <button onClick={fetchUsers}>Click Me!</button>

            {loading && <p>Loading users...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            <ul>
                {users && users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

// Function to map dispatch to props
const mapDispatchToProps = (dispatch) => ({
    fetchUsers: () => dispatch(fetchUsers()),
});

// Function to map state to props
const mapStateToProps = (state) => {
    return {
        message: state.message,
        users: state.userState.users,
        loading: state.userState.loading,
        error: state.userState.error,
    };
};

// Connect the component to Redux
export default connect(mapStateToProps, mapDispatchToProps)(LoginComponent);