<script setup lang="ts">
import {ref} from 'vue'
import { NButton, NIcon ,NInput, NSkeleton} from 'naive-ui'
import { useRouter } from 'vue-router'

    const tutors = ref([
        {rating:"68", name:"Title", surname:'Author', imgPath:'../assets/book-cover.jpg',priceFrom: 70 ,discription:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quos ex in sint explicabo quae atque. Unde officia hic magni doloremque beatae, amet nulla doloribus ad ipsa ea velit atque!'},
        {rating:"68", name:"Title", surname:'Author', imgPath:'../assets/book-cover.jpg',priceFrom: 70 ,discription:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quos ex in sint explicabo quae atque. Unde officia hic magni doloremque beatae, amet nulla doloribus ad ipsa ea velit atque!'},
        {rating:"68", name:"Title", surname:'Author', imgPath:'../assets/book-cover.jpg',priceFrom: 70 ,discription:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quos ex in sint explicabo quae atque. Unde officia hic magni doloremque beatae, amet nulla doloribus ad ipsa ea velit atque!'},
        {rating:"68", name:"Title", surname:'Author', imgPath:'../assets/book-cover.jpg',priceFrom: 70 ,discription:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quos ex in sint explicabo quae atque. Unde officia hic magni doloremque beatae, amet nulla doloribus ad ipsa ea velit atque!'},
        {rating:"68", name:"Title", surname:'Author', imgPath:'../assets/book-cover.jpg',priceFrom: 70 ,discription:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quos ex in sint explicabo quae atque. Unde officia hic magni doloremque beatae, amet nulla doloribus ad ipsa ea velit atque!'},
        {rating:"68", name:"Title", surname:'Author', imgPath:'../assets/book-cover.jpg',priceFrom: 70 ,discription:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quos ex in sint explicabo quae atque. Unde officia hic magni doloremque beatae, amet nulla doloribus ad ipsa ea velit atque!'},
        {rating:"68", name:"Title", surname:'Author', imgPath:'../assets/book-cover.jpg',priceFrom: 70 ,discription:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quos ex in sint explicabo quae atque. Unde officia hic magni doloremque beatae, amet nulla doloribus ad ipsa ea velit atque!'},
        {rating:"68", name:"Title", surname:'Author', imgPath:'../assets/book-cover.jpg',priceFrom: 70 ,discription:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quos ex in sint explicabo quae atque. Unde officia hic magni doloremque beatae, amet nulla doloribus ad ipsa ea velit atque!'},
        {rating:"68", name:"Title", surname:'Author', imgPath:'../assets/book-cover.jpg',priceFrom: 70 ,discription:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime quos ex in sint explicabo quae atque. Unde officia hic magni doloremque beatae, amet nulla doloribus ad ipsa ea velit atque!'},
    ]);

</script>


<template>  
    <div class="main">
        <div class="filters-and-catalog" >
            <div class="filters" >
                <span style="color: white;">Filtry</span>
                <div class="filter">
                <!-- <n-button :focusable="false"  v-for="genre in bookGenres" round class="genre" :type="selectedGenres.includes(genre) ? 'primary' : 'default'"  @click="toggleGenre(genre)" :key="genre" :text-color="iconsColor">
                    {{ genre }}
                </n-button> -->
                </div>
            </div>
            <div class="catalog">
                <!-- <Book @click="goToBook(index)" v-for="(book,index) in books" :available="book.available" :title="book.title" :author="book.author" :cover="book.cover" :key="index"/> -->
            </div>
        </div>
    </div>
</template>


<style scoped>

.main{
    height: calc(100% - var(--navbar-height));
    width: 100%;
    background-color: var(--main-bg-color);
}
#logo {
    height: 100%;
    width: auto ;

    object-fit: contain;
}


.pasek-wyszukiwania{

    border-radius: 10px 10px;
    flex: 1 1 25%;
    max-width: 25%;
}



.filters-and-catalog{
    --padding: 1rem;

    border-radius: 10px;
    padding: var(--padding) ;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 10px;
    height: calc(100% - 2 * var(--padding));
}

.filters-and-catalog > *{
    width: 100%;
    background-color: var(--secondary-color);
}

.filters{
    border-radius: 10px;
    padding: 10px;

    display: flex;
    min-width: 200px;
    height: fit-content;
    flex: 1 1 25%;
    gap: 1rem;
    flex-wrap: wrap;
    align-items: center;

}

.filter{
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.catalog{
    border-radius: 10px;
    flex: 1 1 70%;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(auto-fit,minmax(200px,1fr));
    gap: 10px;
}

.catalog > *{
    justify-self: center;

}
</style>