import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';
import { useClose } from 'src/hooks/useClose';

type ArticleParamsFormProps = {
	onSubmit?: (options: ArticleStateType) => void;
	currentState: ArticleStateType;
};

export const ArticleParamsForm = ({
	onSubmit,
	currentState,
}: ArticleParamsFormProps) => {
	const [open, setOpen] = useState(false);
	const [selectedFont, setFont] = useState<OptionType | null>(
		currentState.fontFamilyOption
	);
	const [selectedFontSize, setFontSize] = useState<OptionType>(
		currentState.fontSizeOption
	);
	const [selectedFontColor, setFontColor] = useState<OptionType | null>(
		currentState.fontColor
	);
	const [selectedBackgroundColor, setBackgroundColor] =
		useState<OptionType | null>(currentState.backgroundColor);
	const [selectedContentWidth, setContentWidth] = useState<OptionType | null>(
		currentState.contentWidth
	);

	const formRef = useRef<HTMLElement>(null);

	useClose({
        isOpen: open,
        onClose: () => setOpen(false),
        rootRef: formRef,
    });

	useEffect(() => {
		setFont(currentState.fontFamilyOption);
		setFontSize(currentState.fontSizeOption);
		setFontColor(currentState.fontColor);
		setBackgroundColor(currentState.backgroundColor);
		setContentWidth(currentState.contentWidth);
	}, [currentState]);

	const handleArrowClick = () => {
		setOpen(!open);
	};

	const handleFormReset = () => {
		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);

		onSubmit?.(defaultArticleState);
		setOpen(false);
	};

	const handleFormSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const newState: ArticleStateType = {
			fontFamilyOption: selectedFont || defaultArticleState.fontFamilyOption,
			fontSizeOption: selectedFontSize || defaultArticleState.fontSizeOption,
			fontColor: selectedFontColor || defaultArticleState.fontColor,
			backgroundColor:
				selectedBackgroundColor || defaultArticleState.backgroundColor,
			contentWidth: selectedContentWidth || defaultArticleState.contentWidth,
		};

		onSubmit?.(newState);
		setOpen(false);
	};

	return (
		<>
			<ArrowButton isOpen={open} onClick={handleArrowClick} />
			<aside
				ref={formRef}
				className={clsx(styles.container, open && styles.container_open)}>
				<form className={styles.form} onSubmit={handleFormSubmit}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры{' '}
					</Text>
					<Select
						title='Шрифт'
						selected={selectedFont}
						options={fontFamilyOptions}
						onChange={(option) => setFont(option)}
					/>
					<RadioGroup
						title='Размер шрифта'
						name='font-size'
						options={fontSizeOptions}
						selected={selectedFontSize}
						onChange={(option) => setFontSize(option)}
					/>
					<Select
						title='Цвет шрифта'
						options={fontColors}
						selected={selectedFontColor}
						onChange={(option) => setFontColor(option)}
					/>
					<Separator />
					<Select
						title='Цвет фона'
						options={backgroundColors}
						selected={selectedBackgroundColor}
						onChange={(option) => setBackgroundColor(option)}
					/>
					<Select
						title='Ширина контента'
						selected={selectedContentWidth}
						options={contentWidthArr}
						onChange={(option) => setContentWidth(option)}
					/>

					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='reset'
							type='clear'
							onClick={handleFormReset}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
