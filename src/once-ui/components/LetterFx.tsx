'use client';

import React, { useState, useRef, useCallback, useEffect, ReactNode } from 'react';

const allowedCharacters = ['X', '$', '@', 'a', 'H', 'z', 'o', '0', 'y', '#', '?', '*', '0', '1', '+'];

function getRandomCharacter(): string {
	const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
	return allowedCharacters[randomIndex];
}

function createEventHandler(
	originalText: string,
	setText: React.Dispatch<React.SetStateAction<string>>,
	inProgress: boolean,
	setInProgress: React.Dispatch<React.SetStateAction<boolean>>,
	speed: 'fast' | 'medium' | 'slow',
	setHasAnimated?: React.Dispatch<React.SetStateAction<boolean>>
) {
	const speedSettings = {
		fast: { BASE_DELAY: 10, REVEAL_DELAY: 10, INITIAL_RANDOM_DURATION: 100 },
		medium: { BASE_DELAY: 30, REVEAL_DELAY: 30, INITIAL_RANDOM_DURATION: 300 },
		slow: { BASE_DELAY: 60, REVEAL_DELAY: 60, INITIAL_RANDOM_DURATION: 600 }
	};

	const { BASE_DELAY, REVEAL_DELAY, INITIAL_RANDOM_DURATION } = speedSettings[speed];

	const generateRandomText = () =>
		originalText
		.split('')
		.map((char) => (char === ' ' ? ' ' : getRandomCharacter()))
		.join('');

	return async () => {
		if (inProgress) return;

		setInProgress(true);

		let randomizedText = generateRandomText();
		const endTime = Date.now() + INITIAL_RANDOM_DURATION;

		while (Date.now() < endTime) {
			setText(randomizedText);
			await new Promise((resolve) => setTimeout(resolve, BASE_DELAY));
			randomizedText = generateRandomText();
		}

		for (let i = 0; i < originalText.length; i++) {
			await new Promise((resolve) => setTimeout(resolve, REVEAL_DELAY));
			setText(
				`${originalText.substring(0, i + 1)}${randomizedText.substring(i + 1)}`
			);
		}

		setInProgress(false);
		if (setHasAnimated) {
			setHasAnimated(true);
		}
	};
}

type LetterFxProps = {
	children: ReactNode; 
	trigger?: 'hover' | 'instant' | 'custom';
	speed?: 'fast' | 'medium' | 'slow';
	onTrigger?: (triggerFn: () => void) => void;
};

function LetterFx({ children, trigger = 'hover', speed = 'medium', onTrigger }: LetterFxProps) {
	const [text, setText] = useState<string>(typeof children === 'string' ? children : '');
	const [inProgress, setInProgress] = useState<boolean>(false);
	const [hasAnimated, setHasAnimated] = useState<boolean>(false);
	const originalText = useRef<string>(typeof children === 'string' ? children : '');

	const eventHandler = useCallback(createEventHandler(
		originalText.current,
		setText,
		inProgress,
		setInProgress,
		speed,
		trigger === 'instant' ? setHasAnimated : undefined
	), [inProgress, trigger, speed]);

	useEffect(() => {
		if (typeof children === 'string') {
			setText(children);
			originalText.current = children;

			if (trigger === 'instant' && !hasAnimated) {
				eventHandler();
			}
		}
	}, [children, trigger, eventHandler, hasAnimated]);

	useEffect(() => {
		if (trigger === 'custom' && onTrigger) {
			onTrigger(eventHandler);
		}
	}, [trigger, onTrigger, eventHandler]);

	return (
		<span onMouseOver={trigger === 'hover' ? eventHandler : undefined}>
			{text}
		</span>
	);
}

export { LetterFx };