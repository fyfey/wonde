import { BACKEND_URI } from "../config";
import { Lesson } from "../models/Lesson";
import { Note } from "../models/Note";
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

export const demoUsernames = async (): Promise<string[]> => {
    const res = await fetch(`${BACKEND_URI}/api/demo/usernames`);
    const { usernames } = await res.json();
    return usernames;
};

export const me = async (): Promise<User> => {
    const res = await fetch(`${BACKEND_URI}/api/me`);
    if (res.status !== 200) {
        throw new Error("Unauthorised");
    }
    return res.json();
};

export const periods = async (): Promise<any> => {
    const res = await fetch(`${BACKEND_URI}/api/periods`);
    return res.json();
};

export const lessonNotes = async (lessonId: string): Promise<Note> => {
    const res = await fetch(`${BACKEND_URI}/api/lessons/${lessonId}/notes`, {});
    const { note } = await res.json();

    return note;
};
export const saveLessonNotes = async (
    lessonId: string,
    body: string
): Promise<Note> => {
    const res = await fetch(`${BACKEND_URI}/api/lessons/${lessonId}/notes`, {
        method: "put",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ lessonId, body }),
    });
    const { note } = await res.json();

    return note;
};
export const lesson = async (id: string): Promise<Lesson> => {
    const res = await fetch(`${BACKEND_URI}/api/lessons/${id}`, {});
    const { lesson } = await res.json();
    return {
        ...lesson,
        startAt: new Date(lesson.startAt),
        endAt: new Date(lesson.endAt),
        overlapping: [],
    };
};

export const lessons = async (
    after: string,
    before: string
): Promise<Lesson[]> => {
    const qs = new URLSearchParams({ after, before });
    const res = await fetch(`${BACKEND_URI}/api/lessons?${qs}`, {});
    const json = await res.json();

    return json.lessons.map((lesson: any) => ({
        ...lesson,
        startAt: new Date(lesson.startAt),
        endAt: new Date(lesson.endAt),
        overlapping: [],
    }));
};
