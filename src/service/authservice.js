import { toast } from "react-toastify";

export const login = async (email, password,role) => {
	const response = await JSON.parse(localStorage.getItem('nj'));
    console.log(response);
    const user = response.filter(user => user.njEmail === email && user.njPassword === password && user.njRole == role);
    console.log(user);
	if (user.length > 0) {
		localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem("isLogin", JSON.stringify(true));
		localStorage.setItem("role", JSON.stringify(role));
	}

	return user;
};

export const isAuthenticated = () => {
	const user = localStorage.getItem('user');
	if (!user) {
		return {}
	}
    return JSON.parse(user);
};