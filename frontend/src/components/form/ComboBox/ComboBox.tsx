import { Combobox, Transition } from "@headlessui/react";
import { FC, Fragment, useEffect, useState } from "react";
import {
    faCheck,
    faChevronDown,
    faChevronUp,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SelectOption } from "../../../models/SelectOption";
import { useController } from "react-hook-form";

type ComboBoxProps = {
    name: string;
    options: SelectOption[];
    className?: string;
    placeholder?: string;
    autoFocus?: boolean;
};
export const ComboBox: FC<ComboBoxProps> = ({
    name,
    options,
    className,
    placeholder,
    autoFocus = false,
}) => {
    const { field } = useController({
        name,
    });

    const [selected, setSelected] = useState<any>();
    const [query, setQuery] = useState("");

    const filteredOptions =
        query === ""
            ? options
            : options.filter((option) =>
                  option.label
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    return (
        <div className="w-full">
            <Combobox
                value={selected}
                onChange={(option: SelectOption) => {
                    field.onChange({ target: { value: option.value, name } });
                    setSelected(option);
                }}
            >
                <div className="relative mt-1">
                    <div className="relative w-full cursor-default bg-white text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                        <Combobox.Input
                            {...field}
                            placeholder={placeholder}
                            className={`p-2 border text-base border-gray-100 rounded-md focus:outline-none focus:ring text-gray-500 autofill:!bg-yellow-200 ${className}`}
                            displayValue={(option: SelectOption) =>
                                option?.label
                            }
                            onChange={(event) => setQuery(event.target.value)}
                            autoFocus={autoFocus}
                        />
                        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                            <div>
                                <FontAwesomeIcon icon={faChevronUp} />
                                <FontAwesomeIcon icon={faChevronDown} />
                            </div>
                        </Combobox.Button>
                    </div>
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                        afterLeave={() => setQuery("")}
                    >
                        <Combobox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                            {filteredOptions.length === 0 && query !== "" ? (
                                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                    Nothing found.
                                </div>
                            ) : (
                                filteredOptions.map((option) => (
                                    <Combobox.Option
                                        key={option.value}
                                        className={({ active }) =>
                                            `relative cursor-default text-base select-none py-2 pl-10 pr-4 ${
                                                active
                                                    ? "bg-blue-100 text-slate-800"
                                                    : "text-gray-500"
                                            }`
                                        }
                                        value={option}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {option.label}
                                                </span>
                                                {selected ? (
                                                    <span
                                                        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                                                            active
                                                                ? "text-white"
                                                                : "text-teal-600"
                                                        }`}
                                                    >
                                                        <FontAwesomeIcon
                                                            className="w-5 h-5"
                                                            icon={faCheck}
                                                            aria-hidden
                                                        />
                                                    </span>
                                                ) : null}
                                            </>
                                        )}
                                    </Combobox.Option>
                                ))
                            )}
                        </Combobox.Options>
                    </Transition>
                </div>
            </Combobox>
        </div>
    );
};
