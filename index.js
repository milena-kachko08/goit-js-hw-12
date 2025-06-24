import{a as h,S as g,i as y}from"./assets/vendor-BIn0hBn5.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&a(s)}).observe(document,{childList:!0,subtree:!0});function o(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=o(t);fetch(t.href,r)}})();const $="51015530-5e955df2a81e83cea790abd16";h.defaults.baseURL="https://pixabay.com/api/";const m=async(e,n=1,o=15)=>{const a=new URLSearchParams({key:$,q:e,image_type:"photo",orientaiton:"horizontal",safesearch:"true",page:n,per_page:o});try{return await h.get("",{params:a})}catch(t){throw t}},v=e=>{const n=document.querySelector(".gallery"),o=e.map(({webformatURL:a,largeImageURL:t,tags:r,likes:s,views:S,comments:q,downloads:P})=>`<div class='photo-card'>
          <a href="${t}">
            <img src="${a}" alt="${r}" loading="lazy" />
          </a>
          <div class="info">
            <div>
              <p>Likes</p>
              <p>${s}</p>
            </div>
            <div>
              <p>Views</p>
              <p>${S}</p>
            </div>
            <div>
              <p>Comments</p>
              <p>${q}</p>
            </div>
            <div>
              <p>Downloads</p>
              <p>${P}</p>
            </div>
          </div>
        </div>`).join("");n.insertAdjacentHTML("beforeend",o)},D=()=>{const e=document.querySelector(".gallery");e.innerHTML=""},w=document.querySelector(".form"),E=document.querySelector(".loader"),b=document.querySelector(".load-more");let i=1,p="";const l=15;let c=new g(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});w.addEventListener("submit",M);b.addEventListener("click",O);async function M(e){e.preventDefault();const n=w.elements.search.value.trim();if(!n){R("Search query cannot be empty!");return}p=n,i=1,D(),u(!0),d(!1);try{const{data:o}=await m(p,i,l);if(o.hits.length===0){f("Sorry, there are no images matching your search query. Please try again!");return}v(o.hits),c?c.refresh():c=new g(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250}),i*l>=o.totalHits?L("We're sorry, but you've reached the end of search results."):d(!0)}catch(o){f(`Something went wrong: ${o.message}`)}finally{u(!1)}}async function O(){i+=1,d(!1),u(!0);try{const{data:e}=await m(p,i,l);v(e.hits),c.refresh(),i*l>=e.totalHits?L("We're sorry, but you've reached the end of search results."):d(!0),I()}catch(e){f(`Something went wrong: ${e.message}`)}finally{u(!1)}}function R(e){y.warning({title:"Warning",message:e,position:"topRight"})}function f(e){y.error({title:"Error",message:e,position:"topRight"})}function L(e){y.info({title:"Info",message:e,position:"topRight"})}function I(){const e=document.querySelector(".photo-card");e&&window.scrollBy({top:e.getBoundingClientRect().height*2,behavior:"smooth"})}function u(e){E.style.display=e?"block":"none"}function d(e){b.style.display=e?"block":"none"}
//# sourceMappingURL=index.js.map
