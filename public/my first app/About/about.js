 let  allSlideBox=document.querySelectorAll(".observe");
 const observer=new IntersectionObserver((items)=>{
  items.forEach((item)=>{
    if(item.isIntersecting){
        item.target.classList.add('classAdd')
       }else{
        item.target.classList.remove('classAdd');
       }
  })
 },{
 });
 allSlideBox.forEach((item)=>{
    observer.observe(item);
 })
 let allButton =document.querySelectorAll('.slideButton');
 let allAbout =document.querySelectorAll('.slideAbout');
 function seeAbout(){
    allAbout.forEach((item)=>{
       item.classList.remove('seeAbout');
       this.nextElementSibling.classList.add("seeAbout");
    })
 }
 allButton.forEach((item)=>{
    item.addEventListener('click',seeAbout);
 })

 let objerveDiv=document.querySelectorAll('.workImg');

let objerve=new IntersectionObserver((obj)=>{
   obj.forEach((item)=>{
      if(item.isIntersecting){
         item.target.classList.add("workImgAdd")
      }else{
         item.target.classList.remove("workImgAdd")
      }
   })

});

objerveDiv.forEach((item)=>{
  objerve.observe(item)
});

// img observe
let imgArray=document.querySelectorAll('.work .workImg img ');
let imgObserve=new IntersectionObserver((items)=>{
   items.forEach((item)=>{
      if(item.isIntersecting){
         item.target.classList.add("imgSlide");
      }else{
         item.target.classList.remove("imgSlide");
      }
   })
})

imgArray.forEach((newItem)=>{
   imgObserve.observe(newItem);
})


const slideImg=document.querySelectorAll('.slideImg');

slideImg.forEach((item,index)=>{
 item.style.left=`${index*100}%`
})
let counter=0;
function auto(){
   counter++;
   function slide(){
      slideImg.forEach((slide)=>{
         slide.style.transform=`translateX(-${counter *100}%)`
   
      })
      
   }
   if(counter===slideImg.length){
      counter=0;
      slide();
   }else{
      slide();
   }
  
}
const interVal=setInterval(auto,2000)
// eslint-disable-next-line no-unused-vars
function goNext(){
   clearInterval(interVal)
   counter++;
   function slide(){
      slideImg.forEach((slide)=>{
         slide.style.transform=`translateX(-${counter *100}%)`
   
      })
   }
   if(counter===slideImg.length){
      counter=0;
      slide();
   }else{
      slide();
   }
  
}

window.addEventListener('onunload',function unLoad(){
   console.log("UNLOAD");
   
clearInterval(interVal);
});
// eslint-disable-next-line no-unused-vars
function goPrev(){
   clearInterval(interVal)
   counter--;
   function slide(){
      slideImg.forEach((slide)=>{
         slide.style.transform=`translateX(-${counter *100}%)`
   
      })
   }
   if(counter===-1){
      counter=slideImg.length-1;
      slide();
   }else{
      slide();
   }
   
}

