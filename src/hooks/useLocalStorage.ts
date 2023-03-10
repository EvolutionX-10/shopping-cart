import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useLocalStorage<T>(
	key: string,
	initialValue: T | (() => T)
): [T, Dispatch<SetStateAction<T>>] {
	const [value, setValue] = useState<T>(() => {
		const jsonValue = localStorage.getItem(key);
		if (jsonValue) return JSON.parse(jsonValue);

		if (typeof initialValue === "function") {
			return (initialValue as () => T)();
		}
		return initialValue;
	});

	useEffect(() => {
		localStorage.setItem(key, JSON.stringify(value));
	}, [key, value]);

	return [value, setValue];
}
