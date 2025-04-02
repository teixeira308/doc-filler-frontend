import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const apiUrl = process.env.REACT_APP_DOCFILLER_API;

  // Carregar o usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false); // Marca como carregado
  }, []);

  const signin = (email, password) => {
    return fetch(`${apiUrl}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then(response => {
        if (!response.ok) {
          return response.json().then(errorData => {
            throw new Error(errorData.message || "E-mail ou senha incorretos");
          });
        }
        return response.json();
      })
      .then(data => {
        const token = data.token;
        const userId = data.userId;
        const loggedInUser = { email, token, userId };
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser)); // Salva no localStorage
        return null;
      })
      .catch(error => {
        return error.message || "E-mail ou senha incorretos";
      });
  };

  const signup = (email, password) => {
    const usersStorage = JSON.parse(localStorage.getItem("users_bd"));

    const hasUser = usersStorage?.filter((user) => user.email === email);

    if (hasUser?.length) {
      return "Já tem uma conta com esse E-mail";
    }

    let newUser;

    if (usersStorage) {
      newUser = [...usersStorage, { email, password }];
    } else {
      newUser = [{ email, password }];
    }

    localStorage.setItem("users_bd", JSON.stringify(newUser));

    return;
  };

  const signout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove ao fazer logout
  };

  return (
    <AuthContext.Provider value={{ user, signed: !!user, loading, signin, signup, signout }}>
      {children}
    </AuthContext.Provider>
  );
};
