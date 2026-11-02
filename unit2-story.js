'use strict';
(()=>{
 document.body.classList.add('unit2-story');
 const menu=document.getElementById('menu');menu.classList.add('mia-lessons');
 const stages=document.createElement('section');stages.id='storyStage';stages.className='story-stage hidden';document.getElementById('play').before(stages);
 const lessons=lessonMap.map((l,i)=>({n:l[0],topic:l[1],actions:l[5].map((a,j)=>`<button onclick="launchLesson(${i},${j})">${a[2]} →</button>`).join('')}));
 menu.innerHTML=MiaStory.catalog(2,lessons)+'<p class="story-small">Общий отчёт собирается, пока открыт раздел. Скачайте его перед закрытием страницы.</p>';
 const originalHome=window.goHome;
 window.goHome=function(){stages.classList.add('hidden');const ending=document.getElementById('unit2Ending');if(ending)ending.remove();if(window.speechSynthesis)window.speechSynthesis.cancel();originalHome();};
 window.launchLesson=function(i,j){window.goHome();menu.classList.add('hidden');stages.classList.remove('hidden');const l=lessonMap[i],action=l[5][j];stages.innerHTML=`<span class="story-eyebrow">УРОК ${l[0]} · ${l[1]}</span><h1>${action[2]}</h1>${MiaStory.block(2,l[0])}<div class="story-actions"><button id="beginStoryGame">Начать задание →</button><button onclick="goHome()">← К урокам</button></div>`;document.getElementById('beginStoryGame').onclick=()=>{stages.classList.add('hidden');launchLessonCore(i,j);};window.scrollTo(0,0);};
 window.addEventListener('message',e=>{if(e.source!==document.getElementById('player').contentWindow||e.data?.miaHub!=='result'||!pendingLesson)return;let ending=document.getElementById('unit2Ending');if(ending)ending.remove();ending=document.createElement('div');ending.id='unit2Ending';ending.className='story-ending';const i=lessonMap.findIndex(l=>l[0]===pendingLesson.lesson);ending.innerHTML='<h2>История продолжается</h2>'+MiaStory.block(2,pendingLesson.lesson,true)+(i<6?`<button id="nextStoryLesson">К следующему уроку →</button>`:`<button onclick="goHome()">К урокам →</button>`);document.getElementById('play').appendChild(ending);if(i<6)document.getElementById('nextStoryLesson').onclick=()=>window.launchLesson(i+1,0);});
})();
