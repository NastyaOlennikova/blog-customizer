import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import {
	backgroundColors,
	contentWidthArr,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
	OptionType,
} from 'src/constants/articleProps';
import { Separator } from 'src/ui/separator';
import { Text } from 'src/ui/text';
import clsx from 'clsx';

export const ArticleParamsForm = () => {
	const [open, setOpen] = useState(false);
	const [selectedFont, setFont] = useState<OptionType | null>(
		fontFamilyOptions[0]
	);
	const [selectedFontSize, setFontSize] = useState<OptionType>(
		fontSizeOptions[0]
	);
	const [selectedFontColor, setFontColor] = useState<OptionType | null>(
		fontColors[0]
	);
	const [selectedBackgroundColor, setBackgroundColor] =
		useState<OptionType | null>(backgroundColors[0]);
	const [selectedContentWidth, setContentWidth] = useState<OptionType | null>(
		contentWidthArr[0]
	);

	const formRef = useRef<HTMLElement>(null);

	const handleArrowClick = () => {
		setOpen(!open);
	};

	const handleFormReset = () => {
		setFont(fontFamilyOptions[0]);
		setFontSize(fontSizeOptions[0]);
		setFontColor(fontColors[0]);
		setBackgroundColor(backgroundColors[0]);
		setContentWidth(contentWidthArr[0]);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (formRef.current && !formRef.current.contains(event.target as Node)) {
			setOpen(false);
		}
	};

	useEffect(() => {
		if (open) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [open]);

	return (
		<>
			<ArrowButton isOpen={open} onClick={handleArrowClick} />
			<aside
				ref={formRef}
				className={clsx(styles.container, open && styles.container_open)}>
				<form className={styles.form}>
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
