import { RouterProvider, createBrowserRouter, defer } from "react-router-dom";
import { lesson, lessonNotes } from "./api";

import { AuthProvider } from "./auth/AuthContext";
import { AuthedLayout } from "./components/AuthedLayout";
import { LessonPage } from "./pages/Lesson";
import { Login } from "./pages/Login/Login";
import { Logout } from "./pages/Logout/Logout";
import { Planner } from "./pages/Planner/Planner";
import { PrivateRoutes } from "./components/PrivateRoutes/PrivateRoutes";

function App() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <Login />,
        },
        {
            element: <PrivateRoutes />,
            children: [
                {
                    element: <AuthedLayout />,
                    children: [
                        {
                            path: "/planner",
                            element: <Planner />,
                        },
                        {
                            path: "/lesson/:id",
                            loader: async ({ params }) => {
                                return defer({
                                    lesson: lesson(params.id ?? ""),
                                });
                            },
                            element: <LessonPage />,
                        },
                        {
                            path: "/logout",
                            element: <Logout />,
                        },
                    ],
                },
            ],
        },
    ]);
    return (
        <div className="App h-full text-gray-500">
            <AuthProvider>
                <RouterProvider router={router} />
            </AuthProvider>
        </div>
    );
}

export default App;
