import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../../../redux/action/user';
import "../../../style/author/index.scss"
const LoginComponent = (props) => {
    const { fetchUsers, message, users, loading, error, displayMessage } = props;

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <>
            <div class="login-wrapper">
                <div class="login-header">
                    <h2>
                        <span>▶</span> LOGIN <span>❤</span>
                    </h2>
                </div>
                <div class="login-form">
                    <div class="input-group">
                        <input type="text" placeholder="Username" />
                    </div>
                    <div class="input-group">
                        <input type="password" placeholder="Password" />
                    </div>
                    <button class="sign-in-button">Sign in</button>
                    <div class="links">
                        <a href="#">Forgot Password</a>
                        <a href="#">Sign up</a>
                    </div>
                </div>
            </div>

        </>
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


// <div>
//     <h1>Welcome to the Outlet!</h1>
//     <p style={{ color: "red" }}>{message}</p>
//     <button onClick={fetchUsers}>Click Me!</button>

//     {loading && <p>Loading users...</p>}
//     {error && <p style={{ color: "red" }}>Error: {error}</p>}
//     <ul>
//         {users && users.map(user => (
//             <li key={user.id}>{user.name}</li>
//         ))}
//     </ul>
// </div>