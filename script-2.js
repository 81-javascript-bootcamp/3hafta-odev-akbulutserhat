const petsModule = (function(){
    const _data = [
        {
            image: "https://pet-uploads.adoptapet.com/1/6/b/406528149.jpg",
            name: "Sam",
            type: "Golden Retriever/St. Bernard Mix",
            sound: "bark",
            soundText: "Bark - type b"
        },
        {
            image: "https://pet-uploads.adoptapet.com/0/f/3/462356648.jpg",
            name: "Mellie",
            type: "Domestic Shorthair",
            sound: "meow",
            soundText: "Meow - type m"
        },
        {
            image: "https://pet-uploads.adoptapet.com/0/0/0/100005015.jpg",
            name: "Karabas",
            type: "Kangal",
            sound: "bark",
            soundText: "Bark - type b"
        },
        {
            image: "https://images.unsplash.com/photo-1592814053501-57ad75c41863?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=750&q=80",
            name: "Pamuk",
            type: "Domestic Shorthair",
            sound: "meow",
            soundText: "Meow - type m"
        }
    ];
    const $tbodyEl = document.querySelector("tbody");

    const getButtons = function(){
        return document.querySelectorAll("button");
    }

    const createPetElement = function(pet){
        return "<tr><td><img class='pet-image' src='"+pet.image+"' /></td><td>"+pet.name+"</td><td>"+pet.type+"</td><td><button data-sound='"+pet.sound+"'>"+pet.soundText+"</button></td></tr>"
    };

    const addToTable = function(content){
        $tbodyEl.innerHTML += content;
    }

    const putPetsInHtml = function(){
        for(let i=0; i< _data.length; i++){
            addToTable(createPetElement(_data[i]));
        }
    }

    const bindKeyboardEvent = function(e) {
        let $soundEl;
            switch(e.key.toLowerCase()) {
                case 'b':
                    $soundEl = document.getElementById("bark");
                    if(!$soundEl) return;
                    $soundEl.play();
                    break;
                case 'm':
                    $soundEl = document.getElementById("meow");
                    if(!$soundEl) return;
                    $soundEl.play();
                    break;
                default:
                    break;
            }
    }

    const changeBackgroundAndImage = function(){
        const $bodyRowElements = document.querySelectorAll("tbody tr");
        const $mainImageEl = document.querySelector(".main-image");
        $bodyRowElements.forEach(row => {
            row.addEventListener("click",function() {
                // Önce bütün elemanlardan class'ı siliyoruz. Ardından tıklanan elemana class'ı ekliyoruz.
                // Bu durum sayesinde önceki tıklamaların stili silinecektir.
                Array.from(this.parentNode.children).forEach(item => item.classList.remove("styled-row"));
                this.classList.add("styled-row");

                // Soldaki resimi tıklanan satırdaki resim ile değiştirme işlemi
                $mainImageEl.src = this.querySelector("td img").src;
            })
        })
    }

    const bindEvents = function(){
        const buttons = getButtons();
        for(let i= 0; i< buttons.length; i++){
            buttons[i].addEventListener("click", function(event){
                event.stopPropagation();
                const soundId = this.dataset.sound;
                const soundElement = document.getElementById(soundId);
                if(soundElement){
                    soundElement.play();
                }
            });
        }

        // klavyeden basılan tuşa göre event listener eklendi.
        window.addEventListener("keydown", function(e) {
            bindKeyboardEvent(e);
        });
    }

    const init = function(){
        putPetsInHtml();
        bindEvents();
        changeBackgroundAndImage();
    }

    return {
        init: init
    }
})();