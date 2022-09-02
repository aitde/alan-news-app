import React, { useEffect, useState } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import NewsCards from "./components/NewsCards/NewsCards";
import useStyles from "./styles";
import wordsToNumbers from "words-to-numbers";

const alanKey =
	"a5f3ee7fcd5c878f154772fae2b0cff92e956eca572e1d8b807a3e2338fdd0dc/stage";

const App = () => {
	const [activeArticle, setActiveArticle ] = useState(-1);
	const [newsArticles, setNewsArticles] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		alanBtn({
			key: alanKey,
			onCommand: ({ command, articles, number }) => {
				if (command === 'newHeadlines') {
					setNewsArticles(articles)
					setActiveArticle(-1)
				}
				else if(command === 'highlight'){
					setActiveArticle((prevAvtiveArticle)=> prevAvtiveArticle+1)
				}
				else if(command === 'open'){
					const parsedNumber = number.length > 2 ? wordsToNumbers(number, {fuzzy: true}): number;
					const article = articles[parsedNumber-1];

					if(parsedNumber > 20){
						alanBtn().playText('Please try that again.');
					}
					else if(article){
						window.open(article.url, '_blank');
						alanBtn().playText("Opening.");
					}
				}
			},
		});
	}, []);

	return (
		<div>
			<div className={classes.logoContainer}>
				<img src="https://46ba123xc93a357lc11tqhds-wpengine.netdna-ssl.com/wp-content/uploads/2019/10/alan.jpg" className={classes.alanLogo} alt="alan logo"/>
			</div>
			<NewsCards articles={newsArticles} activeArticle={activeArticle}/>
		</div>
	);
};

export default App;
