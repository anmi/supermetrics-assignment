import React, { useCallback, useEffect, useState } from 'react';
import { Input } from '../Input/Input';

interface DelayedInputProps {
    value: string;
    onChange: (value: string) => void;
    name: string;
    delay: number;
}

export const DelayedInput: React.FC<DelayedInputProps> = ({ value, onChange, name, delay }) => {
    const [localValue, setLocalValue] = useState(value);

    useEffect(() => {
        setLocalValue(value);
    }, [value]);

    const handleChange = useCallback((inputValue: string) => {
        setLocalValue(inputValue)
    }, []);

    useEffect(() => {
        const timeoutHandle = setTimeout(() => {
            onChange(localValue)
        }, delay);

        return () => clearTimeout(timeoutHandle);
    }, [localValue, delay, onChange]);

    return <Input value={localValue} onChange={handleChange} name={name}/>
}