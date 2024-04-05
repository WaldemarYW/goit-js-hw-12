import{a as h,S as E,i as a}from"./assets/vendor-6e0bf343.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const n of e)if(n.type==="childList")for(const c of n.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&s(c)}).observe(document,{childList:!0,subtree:!0});function o(e){const n={};return e.integrity&&(n.integrity=e.integrity),e.referrerPolicy&&(n.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?n.credentials="include":e.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function s(e){if(e.ep)return;e.ep=!0;const n=o(e);fetch(e.href,n)}})();const w="43225123-d236907a3b16930b7c1176894",L=15;async function p(t,r=1,o=L){const s=`https://pixabay.com/api/?key=${w}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&page=${r}&per_page=${o}`;try{return(await h.get(s)).data.hits}catch(e){return console.error("Error fetching images:",e),[]}}function u(t){const r=document.getElementById("gallery");r.innerHTML="",t.forEach(o=>{const s=`
        <div class="card">
          <a href="${o.largeImageURL}" data-lightbox="gallery-item">
            <img src="${o.webformatURL}" alt="${o.tags}" data-src="${o.largeImageURL}">
          </a>
          <div class="card-info">
            <span>Likes: ${o.likes}</span>
            <span>Views: ${o.views}</span>
            <span>Comments: ${o.comments}</span>
            <span>Downloads: ${o.downloads}</span>
          </div>
        </div>
      `;r.innerHTML+=s})}const g=document.getElementById("search-form"),y=new E(".gallery a",{captionsData:"alt",captionDelay:250}),b=document.getElementById("gallery"),l=document.getElementById("load-more"),d=document.getElementById("loader");let i="",m=1;g.addEventListener("submit",async function(t){if(t.preventDefault(),i=g.querySelector('input[name="search"]').value.trim(),!i){a.error({title:"Error",message:"Please enter a search query.",position:"topCenter"});return}try{const r=await p(i);if(r.length===0){a.warning({title:"Warning",message:"Sorry, there are no images matching your search query. Please try again.",position:"topCenter"});return}u(r),y.refresh(),r.length>=15?l.style.display="block":l.style.display="none",f()}catch(r){console.error("Error searching images:",r),a.error({title:"Error",message:"An error occurred while searching for images. Please try again later.",position:"topCenter"})}});l.addEventListener("click",async function(){d.style.display="block";try{m++;const t=await p(i,m);u(t),y.refresh(),d.style.display="none",t.length<15&&(l.style.display="none"),f()}catch(t){console.error("Error loading more images:",t),a.error({title:"Error",message:"An error occurred while loading more images. Please try again later.",position:"topCenter"}),d.style.display="none"}});function f(){const t=b.querySelector(".card").getBoundingClientRect().height;window.scrollBy({top:t*2,left:0,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map