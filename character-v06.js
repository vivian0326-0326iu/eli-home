/* eli 角色 V0.6：真正分离的表情与服装矢量图层，完全不修改原照片。 */
(() => {
  'use strict';
  const wardrobe = {
    charcoal:{name:'炭灰卫衣',base:'#464852',light:'#686a77',dark:'#343641',type:'hoodie'},
    cream:{name:'奶油毛衣',base:'#e7dbcb',light:'#fff6e8',dark:'#c5b7a7',type:'knit'},
    mist:{name:'雾蓝外套',base:'#9cb8d1',light:'#c7d9e9',dark:'#708da9',type:'jacket'},
    sage:{name:'鼠尾草绿',base:'#a6bda9',light:'#d7e4d4',dark:'#77977f',type:'cardigan'},
    rose:{name:'灰粉针织',base:'#cba9b7',light:'#ead1d9',dark:'#a88092',type:'knit'},
    white:{name:'白衬衫',base:'#f5f5f1',light:'#ffffff',dark:'#b5c0cb',type:'shirt'}
  };
  const moods = {
    sleepy:{name:'困困',symbol:'☾'},
    happy:{name:'开心',symbol:'♡'},
    calm:{name:'安静',symbol:'✦'},
    cheer:{name:'打气',symbol:'✧'}
  };
  function eyes(mood){
    if(mood==='sleepy')return '<path d="M169 260q23 15 45-2M279 258q23 15 45-2" stroke="#56464a" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M176 272q12 4 23 0M288 272q12 4 23 0" stroke="#a17b80" stroke-width="2" opacity=".5" fill="none"/>';
    if(mood==='happy')return '<path d="M165 264q25-28 50 0M278 264q25-28 50 0" stroke="#514047" stroke-width="6" fill="none" stroke-linecap="round"/><path d="M169 263l-7-7M325 263l7-7" stroke="#514047" stroke-width="3" stroke-linecap="round"/>';
    const open='<g><path d="M163 257q26-28 55 0q-25 29-55 0Z" fill="#fffaf8" stroke="#57474b" stroke-width="4"/><ellipse cx="191" cy="256" rx="15" ry="19" fill="#847875"/><ellipse cx="191" cy="256" rx="9" ry="15" fill="#454448"/><circle cx="186" cy="249" r="5" fill="white"/><circle cx="197" cy="263" r="2" fill="#e6e6eb"/><path d="M275 257q26-28 55 0q-25 29-55 0Z" fill="#fffaf8" stroke="#57474b" stroke-width="4"/><ellipse cx="302" cy="256" rx="15" ry="19" fill="#847875"/><ellipse cx="302" cy="256" rx="9" ry="15" fill="#454448"/><circle cx="297" cy="249" r="5" fill="white"/><circle cx="308" cy="263" r="2" fill="#e6e6eb"/></g>';
    return open+(mood==='cheer'?'<path d="M165 235q25-14 49-2M278 233q24-12 48 2" fill="none" stroke="#58464a" stroke-width="4" stroke-linecap="round"/>':'');
  }
  function mouth(mood){
    if(mood==='sleepy')return '<path d="M238 309q10 5 18-1" fill="none" stroke="#ae747b" stroke-width="3.5" stroke-linecap="round"/>';
    if(mood==='happy')return '<path d="M230 307q17 23 36 0q-17 8-36 0Z" fill="#b9737d" stroke="#a56871" stroke-width="2"/><path d="M239 319q10 6 18-1" fill="none" stroke="#f5b4b6" stroke-width="3"/>';
    if(mood==='cheer')return '<path d="M227 306q22 30 44 0q-22 8-44 0Z" fill="#a95d6a" stroke="#965662" stroke-width="2"/><path d="M237 322q12 6 23-1" fill="none" stroke="#f4b1b8" stroke-width="3"/>';
    return '<path d="M237 307q10 5 19 0" fill="none" stroke="#ae747b" stroke-width="3" stroke-linecap="round"/>';
  }
  function garment(o){
    const C=o.base,D=o.dark,L=o.light;
    let body='<path d="M126 389q18-45 78-53l89 0q63 7 83 54l29 110H96Z" fill="'+C+'" stroke="'+D+'" stroke-width="4"/><path d="M130 391q-19 28-21 82M372 392q18 25 20 80" stroke="'+D+'" stroke-width="4" opacity=".55" fill="none"/>';
    if(o.type==='hoodie'){
      body+='<path d="M199 340q-49 10-53 54l55 31 47-34 49 34 53-32q-5-42-57-53l-44 43Z" fill="'+D+'" stroke="'+D+'" stroke-width="4"/><path d="M212 359q35 42 72 0l-36 51Z" fill="'+L+'" opacity=".45"/><path d="M227 390v56m41-56v56" stroke="'+L+'" stroke-width="5" stroke-linecap="round"/><path d="M177 461q72-14 146 0l-8 39H186Z" fill="'+C+'" stroke="'+D+'" stroke-width="3"/><path d="M191 468h113" stroke="'+L+'" stroke-width="2" opacity=".5"/>';
    }else if(o.type==='knit'){
      body+='<path d="M208 342q39 47 80 0l13 12q-49 65-107 0Z" fill="'+L+'" stroke="'+D+'" stroke-width="3"/><path d="M155 421q93 12 188 0M154 444q93 12 190 0M150 467q100 12 200 0" stroke="'+D+'" stroke-width="1.7" opacity=".24" fill="none"/><path d="M178 377l18 15-18 16-18-16Zm54 0 18 15-18 16-18-16Zm54 0 18 15-18 16-18-16Z" fill="none" stroke="'+D+'" stroke-width="2" opacity=".23"/><path d="M184 486h132" stroke="'+D+'" stroke-width="5" opacity=".3"/>';
    }else if(o.type==='jacket'){
      body+='<path d="M206 343q42 44 84 0l-7 74h-70Z" fill="#f6f1e9"/><path d="M200 346l-40 16 57 94 31-69Zm94 0 40 16-57 94-29-69Z" fill="'+L+'" stroke="'+D+'" stroke-width="3"/><path d="M248 388v112M205 437h-33m121 0h33" stroke="'+D+'" stroke-width="3"/><circle cx="258" cy="433" r="4" fill="'+D+'"/><circle cx="258" cy="469" r="4" fill="'+D+'"/><path d="M178 446h36v27h-36Zm106 0h36v27h-36Z" fill="none" stroke="'+D+'" stroke-width="2"/>';
    }else if(o.type==='cardigan'){
      body+='<path d="M206 344q41 45 85 0l-12 150h-64Z" fill="#fff6e8"/><path d="M202 345l-44 22 48 130h41V388Zm91 0 44 22-46 130h-42V388Z" fill="'+C+'" stroke="'+D+'" stroke-width="3"/><path d="M249 384v114" stroke="'+D+'" stroke-width="3"/><circle cx="261" cy="417" r="4" fill="'+D+'"/><circle cx="261" cy="449" r="4" fill="'+D+'"/><circle cx="261" cy="480" r="4" fill="'+D+'"/><path d="M179 463h28m84 0h29" stroke="'+D+'" stroke-width="3"/>';
    }else{
      body+='<path d="M206 343l43 48-24 22-40-58Zm86 0-43 48 24 22 40-58Z" fill="'+L+'" stroke="'+D+'" stroke-width="3"/><path d="M249 391v109" stroke="'+D+'" stroke-width="2.5"/><circle cx="250" cy="430" r="3.5" fill="'+D+'"/><circle cx="250" cy="459" r="3.5" fill="'+D+'"/><circle cx="250" cy="489" r="3.5" fill="'+D+'"/><path d="M309 438h34v25h-34Z" fill="none" stroke="'+D+'" stroke-width="2"/>';
    }
    return body;
  }
  function svg(outfit,mood){
    const o=wardrobe[outfit]||wardrobe.charcoal;
    const m=moods[mood]?mood:'sleepy';
    return '<svg class="eli-character-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" role="img" aria-label="eli穿着'+o.name+'，心情'+moods[m].name+'">'+
    '<defs><linearGradient id="eli-bg" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f8f2ed"/><stop offset="1" stop-color="#dce7f3"/></linearGradient><linearGradient id="eli-face" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#ffeadf"/><stop offset=".65" stop-color="#ffe0d2"/><stop offset="1" stop-color="#f2c2b5"/></linearGradient><linearGradient id="eli-hair" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#75666a"/><stop offset=".38" stop-color="#3b353c"/><stop offset="1" stop-color="#252a32"/></linearGradient></defs>'+
    '<rect width="500" height="500" rx="32" fill="url(#eli-bg)"/><circle cx="396" cy="83" r="82" fill="#fff9f2" opacity=".58"/><circle cx="91" cy="126" r="60" fill="#fff" opacity=".24"/><path d="M0 467q120-33 247 1t253-10v42H0Z" fill="#e8ded9" opacity=".7"/>'+
    '<g opacity=".75" fill="#fefcf8"><path d="M75 89l5 12 13 4-13 4-5 12-5-12-13-4 13-4Z"/><circle cx="408" cy="163" r="4"/><circle cx="102" cy="192" r="3"/></g>'+
    garment(o)+
    '<path d="M154 207q-17-15-21 5-6 25 20 38M342 207q17-15 21 5 6 25-20 38" fill="#f2c7b9" stroke="#d8a6a0" stroke-width="3"/>'+
    '<path d="M148 173q2-96 102-102 104 3 105 102l-10 102q-20 75-95 87-82-13-99-88Z" fill="url(#eli-face)" stroke="#d5b0a7" stroke-width="3"/>'+
    '<ellipse cx="178" cy="289" rx="31" ry="15" fill="#efa7ae" opacity=".34"/><ellipse cx="314" cy="289" rx="31" ry="15" fill="#efa7ae" opacity=".34"/>'+
    '<path d="M169 228q23-12 48-3M279 225q24-11 48 3" fill="none" stroke="#70565b" stroke-width="4" stroke-linecap="round"/>'+
    eyes(m)+mouth(m)+
    '<path d="M140 245q-27-76 0-133 20-41 65-51 38-43 94-12 59-5 81 43 25 54-22 133l-13-47q-6 22-32 12l-17-21q-24 30-59 24l-15-21q-15 33-52 34l-11 39Z" fill="url(#eli-hair)" stroke="#3a343a" stroke-width="3"/>'+
    '<path d="M126 170q-17-46 13-78 21-26 57-23 25-43 73-29 52-23 85 14 38 8 43 49-12 40-39 51-14-24-40-28-19 25-55 20-16 22-47 17-24 26-57 19Z" fill="url(#eli-hair)"/>'+
    '<path d="M143 137q26-48 75-50M180 108q45-55 91-44M258 84q46-26 85 12M316 108q37-9 55 24" fill="none" stroke="#8b7c80" stroke-width="5" stroke-linecap="round" opacity=".44"/>'+
    '<path d="M175 115q-23-36-3-60M242 73q-8-39 15-51M325 87q23-32 9-49" fill="none" stroke="#343038" stroke-width="13" stroke-linecap="round"/>'+
    '<path d="M146 191q-24 6-31-12M348 194q24 3 29-15" fill="none" stroke="#494149" stroke-width="7" stroke-linecap="round"/>'+
    '<g transform="translate(37 375)"><ellipse cx="65" cy="85" rx="61" ry="43" fill="#fffaf2" stroke="#d4c9c2" stroke-width="3"/><path d="M16 59 13 20l38 24M86 43l35-24-1 43" fill="#fffaf2" stroke="#d4c9c2" stroke-width="3"/><path d="M30 76q11 10 23 0M78 76q11 10 23 0" fill="none" stroke="#74696b" stroke-width="3" stroke-linecap="round"/><path d="M60 88l5 5 5-5M65 93v6m-8-2q8 9 16 0" fill="none" stroke="#bb8f91" stroke-width="2.5" stroke-linecap="round"/><ellipse cx="29" cy="91" rx="11" ry="5" fill="#f2c3be" opacity=".5"/><ellipse cx="100" cy="91" rx="11" ry="5" fill="#f2c3be" opacity=".5"/></g>'+
    (m==='cheer'?'<path d="M394 210l7 20 19 7-19 7-7 20-7-20-19-7 19-7Z" fill="#f3c66f"/><path d="M102 285l5 13 13 5-13 5-5 13-5-13-13-5 13-5Z" fill="#f3c66f"/>':'')+
    (m==='happy'?'<path d="M391 235q-14-15-26 0-6 12 26 33 32-21 26-33-12-15-26 0Z" fill="#f0aeb5" opacity=".85"/>':'')+
    (m==='sleepy'?'<path d="M388 260q17-13 35-5M403 244q15-9 28-3" fill="none" stroke="#91a9c5" stroke-width="4" stroke-linecap="round" opacity=".75"/>':'')+
    '</svg>';
  }
  window.eliCharacterSVG=svg;
  window.eliCharacterWardrobe=wardrobe;
})();