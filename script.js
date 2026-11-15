var D={
degree:{t:"Inspire Degree College",l:"Undergraduate programmes in commerce, arts, science and computer applications.",c:["B.Com","B.A","B.Sc","BCA","BBA"]},
school:{t:"Inspire School",l:"Early childhood education for the youngest learners, with a focus on foundational learning, creativity and development.",c:["Nursery","LKG","UKG"]},
computer:{t:"Universal Computer Education",l:"Job-ready computer skills, from the basics to programming. Many more courses are available.",c:["Basic Computer","MS Office","MS Excel / Advanced Excel","Tally Prime / GST","Data Entry","Typing","DTP","Photoshop","ADCA","PGDCA","C Programming","C++","Java","Python"]},
jobs:{t:"Jobs & Careers",l:"Career opportunities, job applications and career-related services.",c:["Computer & IT","Office Administration","Accounting","Data Entry","Typing","Designing and DTP","Customer Support","Teaching and Education"]}
};
var P=document.getElementById("p"),tabs=document.querySelectorAll(".tabs button");
function show(k){
 tabs.forEach(function(b){b.setAttribute("aria-selected",b.dataset.k===k)});
 var d=D[k];P.setAttribute("aria-labelledby","t-"+k);
 P.innerHTML="<h3></h3><p class='lead'></p><ul class='chips'></ul><h3 style='margin-top:28px'>Enquire about <span id=en></span></h3><form id=f><label>Your name<input name=n required autocomplete=name></label><label>Phone number<input name=p type=tel required autocomplete=tel></label><label>Course<select name=w></select></label><label>Message (optional)<textarea name=m rows=3></textarea></label><button class=btn type=submit>Send enquiry</button></form><div id=ok role=status></div>";
 P.querySelector("h3").textContent=d.t;P.querySelector(".lead").textContent=d.l;document.getElementById("en").textContent=d.t;
 var u=P.querySelector("ul"),sel=P.querySelector("select");
 d.c.forEach(function(x){var li=document.createElement("li");li.textContent=x;u.appendChild(li);var o=document.createElement("option");o.textContent=x;sel.appendChild(o)});
 var f=document.getElementById("f");
 f.addEventListener("submit",function(e){e.preventDefault();var x=f.elements;
  var m="Hello, I would like to enquire about "+d.t+".\nName: "+x.n.value+"\nPhone: "+x.p.value+"\nCourse: "+x.w.value+(x.m.value?"\nMessage: "+x.m.value:"");
  var url="https://wa.me/919449174324?text="+encodeURIComponent(m);
  var ok=document.getElementById("ok");ok.textContent="Thank you. Tap the button to send your "+d.t+" enquiry on WhatsApp. ";
  var a=document.createElement("a");a.href=url;a.target="_blank";a.rel="noopener";a.textContent="Send on WhatsApp";a.style.fontWeight="700";ok.appendChild(a);
  f.style.display="none";ok.style.display="block";window.open(url,"_blank","noopener");});
}
tabs.forEach(function(b){b.addEventListener("click",function(){show(b.dataset.k)})});
document.querySelectorAll("[data-pick]").forEach(function(a){a.addEventListener("click",function(){show(a.dataset.pick)})});
var role="Staff",mode="login",stage=0,via="pw",lf=document.getElementById("lf"),lm=document.getElementById("lmsg");
function lui(){
 document.getElementById("idL").textContent=role+" ID";
 var r=mode==="register",o=!r&&via==="otp",d=r?stage===2:(!o&&stage===0),e=lf.elements,H=function(i,v){document.getElementById(i).hidden=!v};
 H("phL",r||o);H("otpL",stage===1);H("nameL",r&&stage===2);H("idW",d);H("pwW",d);H("cpL",r&&stage===2);
 e.ph.required=r||o;e.ph.readOnly=(r||o)&&stage>0;e.otp.required=stage===1;e.fn.required=r&&stage===2;e.id.required=d;e.pw.required=d;e.cp.required=r&&stage===2;
 e.pw.autocomplete=r?"new-password":"current-password";
 document.getElementById("lbtn").textContent=o?(stage===0?"Send OTP":"Verify OTP"):!r?"Login":stage===0?"Send OTP":stage===1?"Verify OTP":"Register as "+role.toLowerCase();
 var vb=document.getElementById("viaBtn");vb.parentNode.hidden=true;vb.textContent=via==="otp"?"Login with ID and password instead":"Login with OTP instead";
 document.querySelectorAll("#roleSeg button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.r===role)});
 document.getElementById("swapTxt").textContent=r?"Already registered?":"New here?";document.getElementById("swapBtn").textContent=r?"Back to login":"Register as "+role.toLowerCase();
 lm.style.display="none";document.getElementById("dash").hidden=true;
}
document.querySelectorAll("#roleSeg button").forEach(function(b){b.addEventListener("click",function(){role=b.dataset.r;mode="login";via="pw";stage=0;lf.reset();lui()})});
document.getElementById("swapBtn").addEventListener("click",function(){mode=mode==="login"?"register":"login";via="pw";stage=0;lf.reset();lui()});
function serverMissing(){msg('The login server was not found or is not set up yet. It works on the live Cloudflare site after the setup steps.');var b=document.createElement('button');b.type='button';b.className='ap';b.style.marginLeft='8px';b.textContent='Preview with sample data';b.addEventListener('click',function(){lf.reset();lui();dashShow('Preview')});lm.appendChild(b)}
function msg(t){lm.textContent=t;lm.style.display="block"}
document.getElementById("viaBtn").addEventListener("click",function(){via=via==="pw"?"otp":"pw";stage=0;lf.reset();lui()});
var DB={
Student:[['Notices',['Unit test timetable will be shared by your class teacher.','Fee due date: last day of this month.']],['Today’s timetable',['9:00 Accountancy','10:00 English','11:15 Computer lab']],['Fee status',['Total fee: ₹20,000','Paid: ₹15,000','Balance: ₹5,000']],['Results',['Internal test 1: 18 / 25','Internal test 2: 21 / 25']]],
Staff:[['Notices',['Staff meeting on Saturday, 10:00 am.','Submit internal marks by the end of the month.']],['Mark attendance',['BCA 1st year (Section A)','B.Com 2nd year','School: 5th std']],['My classes today',['9:00 BCA 1st year','11:15 B.Com 2nd year']],['Student lists',['Download class list','Download parent contact list']]],
Management:[['Pending registrations',['Rahul K. (Staff) <button class=ap>Approve</button>','Priya S. (Student) <button class=ap>Approve</button>','Anil M. (Staff) <button class=ap>Approve</button>']],['Post a notice',['Write and send a notice to students, staff or all','Available once login is connected']],['Reports',['New admission enquiries this month: 24','Fees collected this month: ₹1,85,000','Staff present today: 18 of 20']]]};
var MG=[
{n:'Inspire Degree College',e:2018,s:[['Total enrolled students','412'],['New admissions today','3'],['Students present today','356'],['Students absent today','41'],['Active staff','28'],['Fees collected this month','\u20b94,20,000'],['Pending fees','\u20b91,35,000'],['Open complaints','2']],m:['Class-wise student lists','Subject-wise marks','Examination results','Academic performance','Staff attendance and leave','Enquiries and admissions','Complaints and suggestions','Notes and study materials','Staff performance and activity','Daily, monthly and annual reports']},
{n:'Inspire School',e:2018,s:[['Total enrolled children','86'],['New admissions today','1'],['Children present today','71'],['Children absent today','9'],['Teachers and staff','12'],['Fees collected this month','\u20b995,000'],['Pending fees','\u20b922,000'],['Open complaints','1']],m:['Class-wise children','Attendance history','Parent and guardian details','Age-appropriate progress reports','Activity and development records','Fee records','Parent communication','Complaints and suggestions','Staff activity reports']},
{n:'Universal Computer Education',e:1999,s:[['Total enrolled students','146'],['New registrations today','2'],['Active students','118'],['Completed students','28'],['Instructors','9'],['Fees collected this month','\u20b91,10,000'],['Pending payments','\u20b938,000'],['Open complaints','0']],m:['Batch-wise student lists','Student and instructor attendance','Examination marks','Test results','Progress reports','Course and batch records','Enquiries and admissions','Certificates and ID cards','Complaints and suggestions','Staff activity reports']}];
function mgmtPick(who){var d=document.getElementById('dash');
 d.innerHTML='<h3></h3><p class=note>Sample data for preview. In the real version, management ID CHEIF001AK opens all three dashboards, and institution administrators open only their own.</p><h3 style="margin-top:18px">Select institution</h3><p>Choose an institution to open its management dashboard.</p><div class=grid id=ig></div><button type=button class=btn id=lo>Logout</button>';
 d.querySelector('h3').textContent='Management dashboard: welcome, '+nm(who);
 var g=document.getElementById('ig');
 MG.forEach(function(m,i){var c=document.createElement('button');c.type='button';c.className='card';c.style.cssText='text-align:left;cursor:pointer;font:inherit;color:inherit';c.innerHTML='<h3></h3><p></p>';c.querySelector('h3').textContent=m.n;c.querySelector('p').textContent='Established '+m.e+' \u00b7 Management Dashboard';c.addEventListener('click',function(){mgmtDash(i,who)});g.appendChild(c)});
 document.getElementById('lo').addEventListener('click',function(){d.hidden=true});
 d.hidden=false;d.scrollIntoView({behavior:'smooth',block:'nearest'});
}
var NM=['Anita R.','Rahul K.','Sana M.','Vikram S.'],SN=['Suresh P.','Kavya N.','Imran D.'];
var ES=['New','Assigned','In Progress','Responded','Resolved','Closed'],CS=['New','Under Review','Assigned','Action Taken','Resolved','Closed'],SS=['New','Under Review','Accepted','Implemented','Not Accepted'],PS=['Draft','Submitted','Under Review','Approved','Rejected','Withdrawn'],RS=['Pending approval','Published','Unpublished'],AL=['Present','Absent','Late','Approved leave'];
var DFL=['Today','This week','This month','This academic year'];
var CF=[{n:'Inspire Degree College',e:2018,p:'INS',cl:['BCA I','B.Com II','BBA I','B.Sc III'],ds:['Lecturer, Computer Applications','Lecturer, Commerce','Administrative Officer'],fee:18000,sc:0},
{n:'Inspire School',e:2018,p:'INS',cl:['Nursery','LKG','UKG','Nursery'],ds:['Teacher, Nursery','Teacher, LKG','Teacher, UKG'],fee:12000,sc:1},
{n:'Universal Computer Education',e:1999,p:'UVC',cl:['ADCA Batch A','Tally Batch B','Python Batch A','DTP Batch C'],ds:['Instructor, Programming','Instructor, Accounting software','Office Coordinator'],fee:6000,sc:0}];
var MD=[['overview','Overview'],['inst','Institutions'],['stu','Students'],['stf','Staff'],['adm','Admissions'],['enq','Enquiries'],['att','Attendance'],['acad','Academics'],['fee','Fees'],['com','Communication'],['cmp','Complaints'],['sug','Suggestions'],['res','Learning Resources'],['jobs','Jobs & Careers'],['rep','Reports'],['not','Notifications'],['set','Settings']];
var JB={jobs:[['JOB-001','Data Entry Operator','Computer & IT','Open'],['JOB-002','Accounts Assistant','Accounting','Open'],['JOB-003','Office Assistant','Office Administration','Closed']],app:[['Applicant 1','JOB-001','Interview scheduled'],['Applicant 2','JOB-002','Applied']]};
var G={},cur=0,mod='overview',DFi=0,who2='';
function nm(w){var u=String(w).toUpperCase();return /^CHEIF001(AK)?$/.test(u)?'Amjad Khan ('+u+')':w}
function esc(x){return String(x).replace(/[&<>"]/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
function pad(n){return ('00'+n).slice(-3)}
function mk(c){var o={};
 o.stu=NM.map(function(n,i){return [c.p+'26ST'+pad(i+1),n,c.cl[i],i===3?'Inactive':'Active']});
 o.stf=SN.map(function(n,i){return [c.p+'26EMP'+pad(i+1),n,c.ds[i],'Active']});
 o.att=o.stu.map(function(){return 0});o.sat=o.stf.map(function(){return 0});
 o.adm=[['APP-001','Meera T.',c.cl[0],0,'Submitted'],['APP-002','Arjun V.',c.cl[1],1,'Under Review'],['APP-003','Divya L.',c.cl[2],3,'Approved']];
 o.enq=[['ENQ-001','Parent A',c.cl[0],0,'New'],['ENQ-002','Student B',c.cl[1],1,'Assigned'],['ENQ-003','Parent C',c.cl[2],2,'Responded']];
 o.cmp=[['CMP-001','Facilities','New'],['CMP-002','Fees','Under Review']];
 o.sug=[['SUG-001','New activity idea','New'],['SUG-002','Technology','Under Review']];
 o.res=[['Notes: Unit 1',c.cl[0],'Pending approval'],['Notes: Unit 2',c.cl[1],'Published']];
 o.msg=[['Query about timings','Unread'],['Leave request from staff','Unread'],['Fee reminder sent','Read']];
 o.mk=[72,58,81,45];o.dev=[1,0,2,1];o.q='';o.card=null;
 return o}
function FP(c,i){return [c.fee,c.fee/2,0,c.fee][i]||0}
function rs(n){return '\u20b9'+Number(n).toLocaleString('en-IN')}
function tb(h,rows){return '<div class=tw><table><thead><tr>'+h.map(function(x){return '<th>'+x+'</th>'}).join('')+'</tr></thead><tbody>'+rows.map(function(r){return '<tr>'+r.map(function(x){return '<td>'+x+'</td>'}).join('')+'</tr>'}).join('')+'</tbody></table></div>'}
function sel(arr,v,a,i){return '<select data-a='+a+' data-i='+i+'>'+arr.map(function(x){return '<option'+(x===v?' selected':'')+'>'+esc(x)+'</option>'}).join('')+'</select>'}
function cards(a){return '<div class=grid>'+a.map(function(x){return '<div class=card><div class=big>'+x[1]+'</div><div>'+x[0]+'</div></div>'}).join('')+'</div>'}
function toast(t){var e=document.getElementById('pt');if(!e)return;e.textContent=t;setTimeout(function(){e.textContent=''},2500)}
var R={
overview:function(g,c){var cnt=function(a,v){return a.filter(function(x){return x===v}).length};
 var pend=0;g.stu.forEach(function(r,i){pend+=c.fee-FP(c,i)});
 var na=g.adm.filter(function(r){return r[3]<=DFi}).length,ne=g.enq.filter(function(r){return r[3]<=DFi}).length;
 var pc=g.cmp.filter(function(r){return r[2]==='New'||r[2]==='Under Review'}).length;
 return '<h2>Overview</h2>'+cards([['Total students',g.stu.length],['Total staff',g.stf.length],['Students present today',cnt(g.att,0)],['Students absent today',cnt(g.att,1)],['Staff present today',cnt(g.sat,0)],['New admissions ('+DFL[DFi]+')',na],['New enquiries ('+DFL[DFi]+')',ne],['Pending fees',rs(pend)],['Pending complaints',pc]])+'<div class=grid><div class=card><h3>Recent activities</h3><ul><li>Enquiry ENQ-001 received</li><li>Attendance marked for today</li><li>Notes: Unit 2 published</li></ul></div><div class=card><h3>Tasks requiring attention</h3><ul><li>'+g.adm.filter(function(r){return r[4]==='Submitted'}).length+' application(s) waiting for review</li><li>'+pc+' complaint(s) open</li><li>'+g.res.filter(function(r){return r[2]==='Pending approval'}).length+' resource(s) waiting for approval</li></ul></div></div><p class=note>Numbers come from the sample records in the other tabs. Change the records and these numbers change.</p>'},
inst:function(){return '<h2>Institutions</h2><div class=grid>'+CF.map(function(c,i){return '<div class=card><h3>'+c.n+'</h3><p>Established '+c.e+'</p><button type=button class=ap data-a=go data-i='+i+'>Open dashboard</button></div>'}).join('')+'</div><div class=card style="margin-top:16px"><h3>Jobs &amp; Careers</h3><p>Managed in its own section, separate from the three institutions.</p><button type=button class=ap data-a=mod data-i=jobs>Open section</button></div>'},
stu:function(g,c){var q=g.q.toLowerCase(),rows=g.stu.map(function(r,i){return [esc(r[0]),esc(r[1]),esc(r[2]),sel(['Active','Inactive','Completed'],r[3],'ss',i),'<button type=button class=ap data-a=idc data-i='+i+'>ID card</button>']}).filter(function(r,i){return !q||(g.stu[i][0]+g.stu[i][1]).toLowerCase().indexOf(q)>-1});
 var card='';if(g.card!==null){var r=g.stu[g.card];card='<div class=idc><div class=ph0>Photo</div><div><b>'+esc(r[1])+'</b><br>'+esc(r[0])+'<br>'+esc(c.n)+'<br>'+esc(r[2])+'</div><div class=qr>QR</div></div><p class=note>ID card preview. Real cards will have a photograph and a QR code that verifies the card without showing private details.</p>'}
 return '<h2>Students</h2><p><input id=sq placeholder="Search by name or ID" value="'+esc(g.q)+'"> <button type=button class=ap data-a=exp>Export</button></p>'+card+tb(['Student ID','Name','Class','Status','ID card'],rows)+'<h3 style="margin-top:22px">Register a student</h3><p><input id=nn placeholder="Student name"> <select id=nc>'+c.cl.filter(function(x,i,a){return a.indexOf(x)===i}).map(function(x){return '<option>'+x+'</option>'}).join('')+'</select> <button type=button class=ap data-a=addst>Add student</button></p><p class=note>The ID is generated automatically and cannot repeat.'+(c.sc?' For the School, guardian details are added to each child profile.':'')+'</p>'},
stf:function(g,c){return '<h2>Staff</h2>'+tb(['Staff ID','Name','Designation','Status'],g.stf.map(function(r,i){return [esc(r[0]),esc(r[1]),esc(r[2]),sel(['Active','Inactive','On leave'],r[3],'fs',i)]}))+'<h3 style="margin-top:22px">Register staff</h3><p><input id=sn placeholder="Staff name"> <input id=sd placeholder="Designation"> <button type=button class=ap data-a=addsf>Add staff</button></p>'},
adm:function(g){var BK=DFL;return '<h2>Admissions</h2><p class=note>Only this institution\u2019s applications are shown. Filter: '+DFL[DFi]+'.</p>'+tb(['Reference','Applicant','Class / course','Received','Status'],g.adm.filter(function(r){return r[3]<=DFi}).map(function(r){var i=g.adm.indexOf(r);return [r[0],esc(r[1]),esc(r[2]),DFL[r[3]],sel(PS,r[4],'as',i)]}))},
enq:function(g){return '<h2>Enquiries</h2><p class=note>Only this institution\u2019s enquiry team sees these. Filter: '+DFL[DFi]+'.</p>'+tb(['Reference','From','Interested in','Received','Status'],g.enq.filter(function(r){return r[3]<=DFi}).map(function(r){var i=g.enq.indexOf(r);return [r[0],esc(r[1]),esc(r[2]),DFL[r[3]],sel(ES,r[4],'es',i)]}))},
att:function(g){var rows=function(list,arr,a){return list.map(function(r,i){return [esc(r[0]),esc(r[1]),'<button type=button class=ap data-a='+a+' data-i='+i+'>'+AL[arr[i]]+'</button>']})};
 return '<h2>Attendance</h2><p class=note>Click a status to change it: Present, Absent, Late, Approved leave.</p><h3>Students</h3>'+tb(['ID','Name','Today'],rows(g.stu,g.att,'at'))+'<h3 style="margin-top:22px">Staff</h3>'+tb(['ID','Name','Today'],rows(g.stf,g.sat,'sa'))+'<p><button type=button class=ap data-a=exp>Download attendance report</button></p>'},
acad:function(g,c){if(c.sc){return '<h2>Early learning</h2><p class=note>Nursery, LKG and UKG use progress and activity records, not formal exams.</p>'+tb(['Child','Class','Activity and development'],g.stu.map(function(r,i){return [esc(r[1]),esc(r[2]),sel(['Beginning','Developing','Confident'],['Beginning','Developing','Confident'][g.dev[i]],'dv',i)]}))}
 var gr=function(m){return m>=75?'A':m>=60?'B':m>=40?'C':'D'};
 return '<h2>Academics</h2><p class=note>Enter marks out of 100. Percentage and grade are calculated.</p>'+tb(['Student','Class','Marks','Percentage','Grade'],g.stu.map(function(r,i){return [esc(r[1]),esc(r[2]),'<input type=number min=0 max=100 style="width:80px" data-a=mk data-i='+i+' value='+g.mk[i]+'>',g.mk[i]+'%',gr(g.mk[i])]}))},
fee:function(g,c){var t=0,p=0;var rows=g.stu.map(function(r,i){var pd=FP(c,i);t+=c.fee;p+=pd;return [esc(r[0]),esc(r[1]),rs(c.fee),rs(pd),rs(c.fee-pd),pd>=c.fee?'Paid':pd>0?'Part paid':'Unpaid']});
 return '<h2>Fees</h2>'+cards([['Total fees',rs(t)],['Collected',rs(p)],['Pending',rs(t-p)]])+tb(['ID','Student','Fee','Paid','Balance','Status'],rows)+'<p class=note>In the real system, payments are recorded only from verified receipts.</p>'},
com:function(g){return '<h2>Communication</h2>'+tb(['Message','Status',''],g.msg.map(function(r,i){return [esc(r[0]),r[1],r[1]==='Unread'?'<button type=button class=ap data-a=rd data-i='+i+'>Mark read</button>':'']}))+'<h3 style="margin-top:22px">Announcement</h3><p><input id=an placeholder="Write an announcement" style="width:100%;max-width:420px"> <button type=button class=ap data-a=post>Post</button></p>'},
cmp:function(g){return '<h2>Complaints</h2><p class=note>Confidential complaints are visible only to authorised users.</p>'+tb(['Reference','Category','Status'],g.cmp.map(function(r,i){return [r[0],esc(r[1]),sel(CS,r[2],'cs',i)]}))},
sug:function(g){return '<h2>Suggestions</h2>'+tb(['Reference','Category','Status'],g.sug.map(function(r,i){return [r[0],esc(r[1]),sel(SS,r[2],'ug',i)]}))},
res:function(g){return '<h2>Learning resources</h2>'+tb(['Title','Class','Status'],g.res.map(function(r,i){return [esc(r[0]),esc(r[1]),sel(RS,r[2],'rs',i)]}))+'<p class=note>Students see only published materials.</p>'},
jobs:function(){return '<h2>Jobs &amp; Careers</h2><p class=note>Separate from the three institution dashboards.</p><h3>Job opportunities</h3>'+tb(['Reference','Title','Category','Status'],JB.jobs.map(function(r,i){return [r[0],r[1],r[2],sel(['Open','Closed'],r[3],'jb',i)]}))+'<h3 style="margin-top:22px">Applicants</h3>'+tb(['Applicant','Job','Status'],JB.app.map(function(r){return [r[0],r[1],r[2]]}))},
rep:function(){return '<h2>Reports</h2><p>Export reports by institution and date range ('+DFL[DFi]+').</p><div class=grid>'+['Students','Staff','Admissions','Enquiries','Attendance','Academics','Fees','Complaints','Suggestions','Staff activity'].map(function(x){return '<div class=card><b>'+x+'</b><br><button type=button class=ap data-a=exp>Export</button></div>'}).join('')+'</div>'},
not:function(g){return '<h2>Notifications</h2><ul><li>'+g.enq.filter(function(r){return r[4]==='New'}).length+' new enquiry(ies)</li><li>'+g.msg.filter(function(r){return r[1]==='Unread'}).length+' unread message(s)</li><li>'+g.res.filter(function(r){return r[2]==='Pending approval'}).length+' resource(s) waiting for approval</li></ul>'},
set:function(){return '<h2>Settings</h2><h3>Roles and permissions</h3>'+tb(['Role','Access'],[['Super Management (CHEIF001AK)','All three institutions'],['Institution Administrator','Only the assigned institution'],['Other management roles','According to assigned permissions']])+'<h3 style="margin-top:22px">Audit log</h3><ul><li>Student record added</li><li>Admission status changed</li><li>Report exported</li></ul><h3>Login history</h3><ul><li>Management login (sample)</li><li>Staff login (sample)</li></ul><p class=note>In the real system, permissions are enforced by the database, not only by what is shown on screen.</p>'}
};
function render(){var c=CF[cur],g=G[cur];
 document.querySelectorAll('#pnv button').forEach(function(b){b.setAttribute('aria-current',b.dataset.m===mod)});
 document.getElementById('pm').innerHTML=R[mod](g,c);document.getElementById('pm').scrollTop=0}
function openPortal(i,who){cur=i;who2=who;mod='overview';DFi=0;if(!G[i])G[i]=mk(CF[i]);var P=document.getElementById('portal');
 P.innerHTML='<div class=ph><div><b></b><div class=sub>Demo with sample data. Nothing is saved.</div></div><div class=pc><select id=ps aria-label="Institution"></select><select id=pdf aria-label="Date range"></select><span id=pt></span></div></div><nav class=pn id=pnv aria-label="Modules"></nav><main class=pm id=pm></main>';
 P.querySelector('b').textContent='INSPIRE MANAGEMENT \u00b7 '+CF[i].n+' \u00b7 '+nm(who);
 CF.forEach(function(c,k){var o=document.createElement('option');o.value=k;o.textContent=c.n;if(k===i)o.selected=true;document.getElementById('ps').appendChild(o)});
 DFL.forEach(function(x,k){var o=document.createElement('option');o.value=k;o.textContent=x;document.getElementById('pdf').appendChild(o)});
 var nv=document.getElementById('pnv');MD.concat([['logout','Logout']]).forEach(function(m){var b=document.createElement('button');b.type='button';b.dataset.m=m[0];b.textContent=m[1];nv.appendChild(b)});
 document.getElementById('ps').addEventListener('change',function(){openPortal(+this.value,who2)});
 document.getElementById('pdf').addEventListener('change',function(){DFi=+this.value;render()});
 nv.addEventListener('click',function(e){var b=e.target.closest('button');if(!b)return;if(b.dataset.m==='logout'){P.hidden=true;document.body.style.overflow='';try{fetch('/api/logout',{method:'POST'})}catch(x){}loginClose();return}mod=b.dataset.m;render()});
 var pm=document.getElementById('pm');
 pm.addEventListener('click',function(e){var b=e.target.closest('[data-a]');if(!b||b.tagName==='SELECT'||b.tagName==='INPUT')return;act(b.dataset.a,b.dataset.i,b)});
 pm.addEventListener('change',function(e){var b=e.target;if(b.dataset&&b.dataset.a)chg(b.dataset.a,+b.dataset.i,b)});
 pm.addEventListener('input',function(e){if(e.target.id==='sq'){G[cur].q=e.target.value;var p=e.target.selectionStart;render();var s=document.getElementById('sq');s.focus();s.setSelectionRange(p,p)}});
 P.hidden=false;document.body.style.overflow='hidden';render()}
function nextId(list,pre){var n=list.length+1,id;do{id=pre+pad(n++)}while(list.some(function(r){return r[0]===id}));return id}
function act(a,i,b){var g=G[cur],c=CF[cur];i=+i;
 if(a==='go'){openPortal(i,who2);return}
 if(a==='mod'){mod=b.dataset.i;render();return}
 if(a==='exp'){toast('Preview only: nothing was exported');return}
 if(a==='idc'){g.card=i;render();return}
 if(a==='at'){g.att[i]=(g.att[i]+1)%4;render();return}
 if(a==='sa'){g.sat[i]=(g.sat[i]+1)%4;render();return}
 if(a==='rd'){g.msg[i][1]='Read';render();return}
 if(a==='post'){var t=document.getElementById('an').value.trim();if(t){g.msg.unshift(['Announcement: '+t,'Read']);render()}return}
 if(a==='addst'){var n=document.getElementById('nn').value.trim();if(n){var id=nextId(g.stu,c.p+'26ST');g.stu.push([id,n,document.getElementById('nc').value,'Active']);g.att.push(0);g.mk.push(0);g.dev.push(0);render();toast('Added '+id)}return}
 if(a==='addsf'){var m=document.getElementById('sn').value.trim();if(m){var d=document.getElementById('sd').value.trim()||'Staff';var id2=nextId(g.stf,c.p+'26EMP');g.stf.push([id2,m,d,'Active']);g.sat.push(0);render();toast('Added '+id2)}return}}
function chg(a,i,b){var g=G[cur];
 if(a==='ss')g.stu[i][3]=b.value;else if(a==='fs')g.stf[i][3]=b.value;else if(a==='as')g.adm[i][4]=b.value;else if(a==='es')g.enq[i][4]=b.value;else if(a==='cs')g.cmp[i][2]=b.value;else if(a==='ug')g.sug[i][2]=b.value;else if(a==='rs')g.res[i][2]=b.value;else if(a==='jb')JB.jobs[i][3]=b.value;else if(a==='dv')g.dev[i]=b.selectedIndex;else if(a==='mk'){g.mk[i]=Math.max(0,Math.min(100,+b.value||0))}
 render()}
function mgmtDash(i,who){openPortal(i,who)}
function dashShow(who){
 if(role==='Management'){mgmtPick(who);return}
 var d=document.getElementById('dash'),h='<h3></h3><p class=note>Sample data for preview. Real information will come from the college records once login is connected.</p><div class=grid>';
 DB[role].forEach(function(c){h+='<div class=card><h3>'+c[0]+'</h3><ul>'+c[1].map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></div>'});
 h+='</div><button type=button class=btn id=lo>Logout</button>';
 d.innerHTML=h;d.querySelector('h3').textContent=role+' dashboard: welcome, '+who;
 d.querySelectorAll('.ap').forEach(function(b){b.addEventListener('click',function(){b.textContent='Approved';b.disabled=true})});
 document.getElementById('lo').addEventListener('click',function(){d.hidden=true});
 d.hidden=false;d.scrollIntoView({behavior:'smooth',block:'nearest'});
}
lf.addEventListener("submit",function(e){e.preventDefault();var f=lf.elements;
 if(mode==="register"){
  if(stage===0){stage=1;lui();msg("Preview only: no SMS was sent. In the real version, a 6-digit code goes to "+f.ph.value+" if the number is on the college's staff list. Enter any 6 digits to continue.");return}
  if(stage===1){stage=2;lui();msg("Mobile number verified (preview). Now set up your "+role.toLowerCase()+" login.");return}
  if(f.pw.value!==f.cp.value){msg("The two passwords do not match. Enter the same password in both fields.");return}
  stage=0;lf.reset();lui();msg("Preview only: nothing was saved. When login is connected, your "+role.toLowerCase()+" registration will be sent for approval.");return}
 if(via==="otp"){
  if(stage===0){stage=1;lui();msg("Preview only: no SMS was sent. In the real version, a 6-digit code goes to "+f.ph.value+" if the number is registered. Enter any 6 digits to continue.");return}
  var w=f.ph.value;stage=0;lf.reset();lui();dashShow(w);return}
 var idv=f.id.value.trim(),pwv=f.pw.value;
 if(role!=='Management'){msg('Staff and student accounts are not set up yet. Please contact the college office.');return}
 msg('Checking...');
 fetch('/api/login',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({id:idv,password:pwv})}).then(function(r){
  if(r.status===401){msg('Incorrect ID or password.');return}
  if(r.status!==200||(r.headers.get('content-type')||'').indexOf('json')<0){serverMissing();return}
  return r.json().then(function(d){if(!d.ok){msg('Login failed.');return}lf.reset();lui();dashShow(d.name+' ('+d.id+')')})
 }).catch(serverMissing);
});
lui();
var LG=document.getElementById("login");
function loginOpen(r){role=r||"Staff";mode="login";via="pw";stage=0;lf.reset();lui();LG.hidden=false;document.body.style.overflow="hidden";document.getElementById("loginClose").focus()}
function loginClose(){LG.hidden=true;document.getElementById("dash").hidden=true;document.body.style.overflow="";document.getElementById("loginOpen").focus()}
document.getElementById("loginOpen").addEventListener("click",function(){loginOpen("Management")});
document.getElementById("loginClose").addEventListener("click",loginClose);
document.querySelectorAll("[data-login]").forEach(function(b){b.addEventListener("click",function(e){e.preventDefault();loginOpen(b.dataset.role)})});
document.addEventListener("keydown",function(e){if(e.key==="Escape"&&!LG.hidden)loginClose()});
P.innerHTML="<p class='lead'>Select a portal above to see its courses and send an enquiry.</p>";
if(r.status!==200||(r.headers.get('content-type')||'').indexOf('json')<0){serverMissing();return}
