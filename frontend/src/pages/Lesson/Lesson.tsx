import "./lesson.css";

import { Await, useLoaderData, useParams } from "react-router-dom";
import { FC, Suspense } from "react";
import { Lesson, Student } from "../../models/Lesson";

import { APP_TITLE } from "../../config";
import { Helmet } from "react-helmet";
import { Info } from "./components/Info/Info";
import { Loader } from "../../components";
import { Notes } from "./components/Notes/Notes";
import { ServerError } from "../../components/Error/ServerError";
import { Students } from "./components/Students/Students";

interface LessonProps {}
export const LessonPage: FC<LessonProps> = () => {
    const { lesson: lessonLoader } = useLoaderData() as { lesson: Lesson };
    return (
        <Suspense fallback={<Loader label="Loading lesson... 📚" />}>
            <Await
                resolve={lessonLoader}
                errorElement={<ServerError />}
                children={(lesson) => (
                    <div className="flex-1 h-[calc(100vh-200px)]">
                        <Helmet>
                            <title>
                                {APP_TITLE} | Lesson {lesson.name}
                            </title>
                        </Helmet>
                        <div className="w-full h-full p-4 flex items-center justify-center bg-slate-300">
                            <div
                                id="lesson-layout"
                                className="w-full h-full flex items-center justify-center"
                            >
                                <Info lesson={lesson} />
                                <Students lesson={lesson} />
                                <Notes />
                            </div>
                        </div>
                    </div>
                )}
            />
        </Suspense>
    );
};
