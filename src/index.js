import './sass/main.scss';

import { Notify } from 'notiflix';

import { getRefs } from './js/getRefs';
import { getPic } from './js/getPic';
import { lastPic } from './js/lastPic';
import { markup } from './js/markup';

const refs = getRefs();
let page = 1;
let searchQuery = '';
let totalHits;

refs.searchForm.addEventListener('submit', onSubmitClick);
refs.loadMoreBtn.addEventListener('click', onMoreLoadBtnClick);

refs.loadMoreBtn.classList.add('is-hidden');

function onSubmitClick(event) {
    event.preventDefault();
    searchQuery = event.currentTarget.elements.searchQuery.value;
    refs.loadMoreBtn.classList.add('is-hidden');    
    refs.gallery.innerHTML = '';
    page = 1;

    if (searchQuery === '') { return Notify.failure('Please enter your search data.') };
    event.target.reset();
    getPic(searchQuery, page).then(res => {
        const imgArray = res.data.hits;
        totalHits = res.data.totalHits;

        if (imgArray.length === 0) {
        refs.loadMoreBtn.classList.add('is-hidden');
        return Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }
        
        Notify.success(`Hooray! We found ${totalHits} images.`);
        markup(res);
        refs.loadMoreBtn.classList.remove('is-hidden');
        lastPic(page, totalHits);
        page += 1;
    });    
};

function onMoreLoadBtnClick() {
    getPic(searchQuery, page).then(res => {
        markup(res);
        lastPic(page, totalHits);
        page += 1;   
    });   
}