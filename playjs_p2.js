
document.addEventListener("DOMContentLoaded",()=>{
	putName();
	document.querySelector("#add_img").addEventListener("click",showNoteForm);
	document.querySelector("#add_note").addEventListener("click",putNote);

	window.addEventListener("resize",()=>{
		form = document.querySelector("#note_form");
		if(form.classList.contains("popup")){
			changePosition(form);
		}
	});

	const dlist = document.querySelectorAll(".accordion");
	dlist.forEach((dl) => {
		let dds = dl.querySelectorAll("dd");
		let dts = dl.querySelectorAll("dt");

		const closeAll = ()=>{
			dds.forEach(dd=>dd.classList.add("closed"));
			dts.forEach(dt=>dt.classList.add("closed"));
		}

		const open = (dt,dd) =>{
			dt.classList.remove("closed");
			dd.classList.remove("closed");
		}

		closeAll();
		dts.forEach(dt => {
			dt.addEventListener("click",()=>{
				closeAll();
				open(dt,dt.nextElementSibling);
			});
		});
		// dds.forEach((dd)=>{dd.style.display="none"});
		
		// dts.forEach((dt)=>{
		// 	dt.style.cursor = "pointer";
		// 	dt.addEventListener("click",()=>{
		// 		dt.style.cursor ="default";
		// 		let dds = dl.querySelectorAll("dd");
		// 		dds.forEach((obj)=>{
		// 			obj.style.display="none";
		// 		});
		// 		dt.nextElementSibling.style.display="block";
		// 	});
		// });
	});
	const INTERVAL_TIME = 4000;

	const slideShows = document.querySelectorAll(".slideshow");
	slideShows.forEach(container => {

		let timer = null;
		const switchImg = () =>{
			// let imgs = container.childNodes;
			// let first = imgs[0];
			// imgs.remove(imgs[0]);
			// first.addClassList("alt");
			// imgs.append(first);

			const imgs = container.querySelectorAll("img");
			const [first,second] = imgs;
			first.classList.add("alt");
			second.classList.remove("alt");

			container.appendChild(first);
		}

		const startTimer = ()=>{
			if(!timer) timer = setInterval(switchImg,INTERVAL_TIME);
		};

		const stopTimer = ()=>{
			if(timer){
				clearInterval(timer);
				timer = null;
			}
		}
		startTimer();

		container.addEventListener("mouseover",stopTimer);
		container.addEventListener("mouseout", startTimer);
	});

	const btn1 = document.querySelector("#getText1");
	const tArea = document.querySelector("#textbox");
	btn1.addEventListener("click", async ()=>{
		tArea.innerHTML="";
		const response = await fetch("data.txt");
		const data = await response.json();
		data.forEach(std=>{
			const str = `${std.name}<br>`;
			tArea.insertAdjacentHTML('beforeend',str);
		})
	});

	
	
	const btn2 = document.querySelector("#getText2");
	btn2.addEventListener("click", async ()=>{
		tArea.innerHTML="";
		const response = await fetch("data.txt");
		const data = await response.json();
		
		
		const tableHTML =`
			<table border="1">
				<tr>
					<th>이름</th>
					<th>아이디</th>
					<th>학과</th>
					<th>수강과목</th>
				</tr>
			${data.map(std=>
				`
				<tr>
					<td>${std.name}</td>
					<td>${std.id}</td>
					<td>${std.department}</td>
					<td>${std.class.join(',')}</td>
				</tr>
				`
			).join('')}
			</table>
			`


		tArea.insertAdjacentHTML('beforeend',tableHTML);



	});
});

const putName = ()=>{
	let foot = document.querySelector("footer>p");
	const date = new Date();
	let str = `허정무, ${date.getFullYear()}`;
	foot.insertAdjacentHTML(`afterbegin`,str);
}

const showNoteForm = ()=>{
	let form = document.querySelector("#note_form");
	form.classList.add("popup");
	form.style.display="block";

	changePosition(form);

}
const closeNoteForm = ()=>{
	let form = document.querySelector("#note_form");
	// document.querySelector("#note_title").value="";
	// document.querySelector("#note_date").value ="";
	// document.querySelector("#note_content").value="";

	const inputs = form.querySelectorAll("input,textarea");
	inputs.forEach((input) => {input.value=""});

	form.classList.remove("popup");
	document.querySelector("#note_form").style.display="none";

}
const putNote = ()=>{
	
	let title = document.querySelector("#note_title");
	let date = document.querySelector("#note_date");
	let content = document.querySelector("#note_content");

	if(title.value =="" && date.value=="" && content.value==""){
		closeNoteForm();
		return;
	}

	let str = `
		<div><b>${title.value}</b><br><i>${date.value}</i><br>${content.value.replace(/\n/g,`<br>`)}</div>`;
	document.querySelector("#note").insertAdjacentHTML("beforeend",str);
	closeNoteForm();

}


const changePosition = (obj)=>{

	
	obj.style.top = (window.innerHeight - obj.offsetHeight)/2+"px";
	obj.style.left = (window.innerWidth - obj.offsetWidth)/2+"px";

	// const {innerWidth:winW, innerHeight:winH} = window;
	// const {offsetWidth:objW, offsetHeight:objH} = obj;

	// const left = (winW - objW)/2 +"px";
	// const top = (winH-objH)/2 +"px";

	// obj.style.left = left;
	// obj.style.top = top;
}


