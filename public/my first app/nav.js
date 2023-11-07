const list = document.querySelectorAll(".list");
let id=document.querySelectorAll('a');

const a=window.innerWidth;
let b=a*(25*(1/100));
id.forEach((i)=>{
  i.style.width=`${b}px`;
})
function activeLink() {
  list.forEach((item) => item.classList.remove("active"));
  this.classList.add("active");
}
list.forEach((item) =>{ 
  item.addEventListener("click", activeLink)});




let indicator=document.querySelector('.indicator');

let i=document.querySelectorAll('.my');
 i.forEach((ico,m)=>{
  const one=b*0;
  const two=b*1;
  const three=b*2;
  const four=b*3;

  indicator.style.backgroundColor='red';
  ico.addEventListener('click',function(){
    if(m===0){
      indicator.style.transform=`translateX(${one}px)`;
    }else if(m===1){
      indicator.style.transform=`translateX(${two}px)`;
    }else if(m===2){
      indicator.style.transform=`translateX(${three}px)`
    }else if(m===3){
      indicator.style.transform=`translateX(${four}px)`
    }
    
   });
 })

 function king(){
  mk.classList.toggle("addClass");
  mo.classList.toggle('arrowRotate');
 }

 let mo=document.getElementById('1');
 let mk=document.getElementById('2');

  mo.addEventListener('click',king);
