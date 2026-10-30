'use strict';
window.L13_TASKS={
 key:'wc1:u2:l6:three-tasks:v3',
 pages:[['ready','Ready to talk'],['warm','Say three things'],['map','Three things to do'],['demo','You say it. I do it.'],['camera','Give me a command'],['classroom','Direct the picture classroom'],['swap','Now listen to me'],['parts','Name it. Touch it.'],['detective','Find the wrong ring'],['transfer','Tell me where to touch'],['letters','Big and little letters'],['order','Tell me the letter order'],['repair','Fix the letter pairs'],['reverse','Build a backwards line'],['show','Choose your challenge'],['reading','Read and match'],['exit','Your last three tasks'],['finish','Take it home']].map(([kind,name])=>({kind,name})),
 camera:['close','open','raise','clap'],classroom:['line','circle','front','seat'],swap:['raise','close','clap','open'],
 detective:[{part:'shoulders',wrong:'knees'},{part:'toes',wrong:'head'},{part:'eyes',wrong:'ears'},{part:'nose',wrong:'mouth'}],
 orders:['abcd','mnop'],reverse:['zyxw','qpon','edcb'],pairs:['b','d','p','q'],wrongPairs:['d','b','q','p'],
 reading:[{answer:'seat',text:'Please go back to your seat.',options:['sit','seat','front']},{answer:'part-shoulders',text:'shoulders',options:['part-knees','part-shoulders','part-head']},{answer:'letter-r',text:'R',options:['letter-h','letter-n','letter-r']}]
};
