
app.factory("BombFactory", function($http){

	var bombFactory = {};

	bombFactory.diffuse = function(userAnswer, question){
		var result = true;
		
		if(question.category === 'match_some' || question.category === 'match_all'){
		let regexAnswer = new RegExp(userAnswer);
			question.testCases.forEach(function(testCase){
				if(testCase.match){
					if(!regexAnswer.test(testCase.content)) {
						result = false;
					}
				}else{
					if(regexAnswer.test(testCase.content)){
						result = false;
					}
				}
			})
			console.log(result);
		return result;	
		}else if(question.category === 'validation'){
			if(question.answer !== userAnswer){
				result = false;
			}
			console.log('inside validation diffuse', result);
			return result;
		}
	}

	bombFactory.storeUserAnswer = function(answer, question, userid){
		return $http.post('/api/user/'+ userid +'/addanswer', {
			questionId: question.id,
			user_answer: answer
		})
	}

	bombFactory.leave = function(currentBomb){
		return currentBomb = null;
	}

	return bombFactory;

});