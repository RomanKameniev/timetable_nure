import TelegramBot from 'node-telegram-bot-api';
import config from 'config';
//import Parser from './parser.js';
import Browser from './browser.js';

const STUDENT = 'I am student';
const TEACHER = 'I am teacher';

const DATA = {}
//let P = new Parser();
let B = new Browser();
const TOKEN = config.get('token');

let DEPARTMENTS = false;

let COURSES = false


const BOT = new TelegramBot(TOKEN, {polling: true});

/*BOT.onText(/\/parse/, async (msg, [source, match]) => {
	console.log('parsing => ', msg);
	const {chat:{id}} = msg;
	let t = await P._start_parsing()
	console.log('t => ', t)
	BOT.sendMessage(id, t)
})*/

BOT.onText(/\/parse/, async (msg) => {
	try{
		DEPARTMENTS = await B.getDepartments()
		const {chat:{id}, text} = msg;
		BOT.sendMessage(id, 'Are you student or teacher?', {
			reply_markup: {
				keyboard: [[STUDENT], [TEACHER]]
			}
		});
	}catch(e){
		console.log('error=>', e)
	}
});

BOT.onText(/\/start/, async (msg) => {
	try{
		const {chat:{id}, text} = msg;	
		await B.createUser(id)
		DEPARTMENTS = await B.getDepartments()
		BOT.sendMessage(id, 'Are you student or teacher?', {
			reply_markup: {
				keyboard: [[STUDENT], [TEACHER]]
			}
		});
	}catch(e){
		console.log('error=>', e)
	}
});

BOT.on('message', async (msg) => {
	//console.log('in message', msg)
	const {chat:{id}, text} = msg;
	//let DB = await B.findUser(id)
	
	await B.updateUser(id)

	if (text === STUDENT || text === TEACHER){
		
		DATA.user = text
		
		BOT.sendMessage(id, "select your department", {
			reply_markup: {
				keyboard: DEPARTMENTS,
			}
				
		});
	}
	if(DEPARTMENTS && DEPARTMENTS.indexOf(text) != -1){
		data.dep = text
		COURSES = await B.getCourses()
		BOT.sendMessage(id, "select your course",{
			reply_markup: {
				keyboard: COURSES, 
			}
		});
	}


/*	if(COURSES.indexOf(text) != -1){
		data.course = text
	}
*/
	if (text.match(/цем/)){
		console.log('котя написала', text)
		BOT.sendMessage(id, "Приветик котик) я тебя люблю))")
	}
	if (text.match(/кусь/)){
		console.log('котя написала кусь', text)
		BOT.sendMessage(id, "кусь-кусь за бочек)")
	}
	if (text.match(/собака/)){
		console.log('котя написала собака', text)
		BOT.sendMessage(id, "ты шо, собака, кусь хош?)))")
	}
	if (text.match(/мур/)){
		console.log('котя написала собака', text)
		BOT.sendMessage(id, "мур), я котик-муркотик)")
	}

	console.log('data arr ', DATA)
}) 

