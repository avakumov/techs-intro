import React from "react";
import { useImmerReducer } from "use-immer";
import { login } from "../utils/utils";

const initState: LoginState = {
  username: "",
  password: "",
  isLoading: false,
  error: "",
  isLoggedIn: false,
  variant: "login",
};

interface LoginState {
  username: string;
  password: string;
  isLoading: boolean;
  error: string;
  isLoggedIn: boolean;
  variant: "login" | "forgetPassword";
}

type LoginAction =
  | { type: "login" | "success" | "error" | "logout" }
  | { type: "field"; field: "username" | "password"; value: string };

function loginReducer(draft: LoginState, action: LoginAction) {
  switch (action.type) {
    case "login": {
      draft.error = "";
      draft.isLoading = true;
      return;
    }
    case "success": {
      draft.isLoading = false;
      draft.error = "";
      draft.isLoggedIn = true;
      draft.password = "";
      return;
    }
    case "error": {
      draft.isLoading = false;
      draft.error = "Incorrect username or password!";
      draft.password = "";
      return;
    }
    case "logout": {
      draft.isLoggedIn = false;
      draft.username = "";
      return;
    }
    case "field": {
      draft[action.field] = action.value;
      return;
    }
    default:
      return;
  }
}

function Login() {
  const [state, dispatch] = useImmerReducer(loginReducer, initState);

  const { username, password, isLoading, error, isLoggedIn } = state;

  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ): Promise<any> => {
    e.preventDefault();
    dispatch({ type: "login" });
    try {
      await login({ username, password });
      dispatch({ type: "success" });
    } catch {
      dispatch({ type: "error" });
    }
  };
  const onLogout = () => {
    dispatch({ type: "logout" });
  };
  return (
    <div className="w-full max-w-xs">
      {isLoggedIn ? (
        <>
          <h1>Hello {username}</h1>
          <button
            onClick={onLogout}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            Log out
          </button>
        </>
      ) : (
        <form
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          onSubmit={onSubmit}
        >
          <p className="font-bold py-4">LOGIN!</p>

          {error && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  field: "username",
                  value: e.currentTarget.value,
                })
              }
            />
          </div>

          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>

            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) =>
                dispatch({
                  type: "field",
                  field: "password",
                  value: e.currentTarget.value,
                })
              }
              autoComplete="new-password"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "log in"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export { Login };
