import { BACKEND_URI } from "../config";
import { ClassesResponse } from "../models/ClassesResponse";
import { Lesson } from "../models/Lesson";
import { User } from "../models/User";

export const login = async (
    username: string,
    password: string
): Promise<{ user: User }> => {
    const resp = await fetch(`${BACKEND_URI}/api/auth`, {
        method: "post",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, password }),
    });
    if (resp.status === 200) {
        return resp.json();
    }
    throw new Error("Login failed");
};

export const logout = async () => {
    const resp = await fetch(`${BACKEND_URI}/api/deauth`, {
        method: "post",
    });
    if (resp.status !== 200) {
        throw new Error("Logout failed");
    }
};

export const me = async (): Promise<User> => {
    const res = await fetch(`${BACKEND_URI}/api/me`);
    return res.json();
};

export const periods = async (): Promise<any> => {
    const res = await fetch(`${BACKEND_URI}/api/periods`);
    return res.json();
};

export const lessons = async (): Promise<{ lessons: Lesson[] }> => {
    const res = await fetch(`${BACKEND_URI}/api/lessons`);
    return res.json();
};
