import { APP_ICON, APP_TITLE } from "../../config";
import { FC, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { demoUsernames, login } from "../../api";

import { Button } from "../../components/form/Button/Button";
import { ComboBox } from "../../components/form/ComboBox/ComboBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "../../components/form/Input/Input";
import Joi from "joi";
import { joiResolver } from "@hookform/resolvers/joi";
import { useAuth } from "../../auth/useAuth";
import { useNavigate } from "react-router-dom";

const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
});

interface LoginProps {}
export const Login: FC<LoginProps> = () => {
    const navigate = useNavigate();
    const methods = useForm({
        mode: "all",
        defaultValues: { username: "jane.darby", password: "" },
        resolver: joiResolver(schema),
    });
    const { user, setUser } = useAuth();
    const [usernames, setUsernames] = useState<string[]>([]);

    const [error, setError] = useState("");
    useEffect(() => {
        demoUsernames().then(setUsernames, console.error);
    }, []);

    if (user.id > 0) {
        // already logged in!
        navigate("/planner");
        return null;
    }

    const {
        handleSubmit,
        formState: { isValid, isSubmitting },
    } = methods;

    const doLogin = async ({
        username,
        password,
    }: {
        username: string;
        password: string;
    }) => {
        try {
            const { user } = await login(username, password);
            if (user) {
                setUser(user);
                navigate("/planner");
            }
        } catch {
            setError("Login failed!");
        }
    };
    return (
        <div className="login-view h-full flex justify-center items-center bg-gray-100">
            <FormProvider {...methods}>
                <form
                    onSubmit={handleSubmit(doLogin)}
                    className="login-form border bg-white p-8 rounded-lg flex flex-col gap-4 shadow-sm"
                >
                    <div className="text-center font-bold flex gap-2 items-center justify-center text-xl mb-6">
                        <FontAwesomeIcon icon={APP_ICON} />
                        <div>{APP_TITLE}</div>
                    </div>
                    {error.length > 0 && (
                        <div className="bg-red-300 text-red-600 p-4 rounded-sm text-center">
                            {error}
                        </div>
                    )}
                    <ComboBox
                        name="username"
                        placeholder="Username"
                        options={usernames.map((u) => ({ label: u, value: u }))}
                        autoFocus
                    />
                    <Input
                        name="password"
                        placeholder="Password"
                        type="password"
                    />
                    <Button
                        type="submit"
                        disabled={!isValid}
                        loading={isSubmitting}
                    >
                        Login
                    </Button>
                </form>
            </FormProvider>
        </div>
    );
};
