import { CSSProperties, useState } from 'react';

import '../../styles/index.scss';
import styles from '../../styles/index.module.scss';
import {
	ArticleStateType,
	defaultArticleState,
} from '../../constants/articleProps';
import { ArticleParamsForm } from '../article-params-form';
import { Article } from '../article';

export const App = () => {
	const [currentState, setCurrentState] =
		useState<ArticleStateType>(defaultArticleState);

	const handleFormSubmit = (newState: ArticleStateType) => {
		setCurrentState(newState);
	};

	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentState.fontFamilyOption.value,
					'--font-size': currentState.fontSizeOption.value,
					'--font-color': currentState.fontColor.value,
					'--container-width': currentState.contentWidth.value,
					'--bg-color': currentState.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				onSubmit={handleFormSubmit}
				currentState={currentState}
			/>
			<Article />
		</main>
	);
};
