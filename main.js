import './css/style.css';

const getPlanetsAsync = async () => {
    try {
        const url = 'https://planets-info-by-newbapi.p.rapidapi.com/api/v1/planet/list';
        const apiKey = 'c5292ec436msha10e1e5b11ad502p151f59jsn866faf088301';
        const host = 'planets-info-by-newbapi.p.rapidapi.com';

        const resp = await fetch(url, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': apiKey,
                'X-RapidAPI-Host': host,
            }
        });

        const listPlanets = await resp.json();
        
        return listPlanets;
        
    } catch (err) {
        console.error(err);
    }
}

const listPlanets = async () => {

    try{
        const planetsLocal = localStorage.getItem('planetsLocal');

        if(planetsLocal)
        {
            return JSON.parse(planetsLocal);
        }
        else
        {
            const planetsList = await getPlanetsAsync();

            if(planetsList)
            {
                localStorage.setItem('planetsLocal', JSON.stringify(planetsList));
                return planetsList;
            }        
        }
    }
    catch (error) {
        console.error(error);
    }    
}


addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('#menu');
    const imgContainer = document.querySelector('#img-container');
    const title = document.querySelector('#title');
    const descriptionPlanet = document.querySelector('#description');
    const img = document.createElement('img');
    img.className = 'img-planet';
    
    listPlanets().then((planets) => {

        planets.forEach( ({name, key, description, imgSrc}) => {
            const itemNav = document.createElement('a');
            itemNav.textContent = name;
            itemNav.setAttribute('data_key', key);

            if(key === 'zmxk1zx92lo8')
            {
                itemNav.className = 'active';
                const [ image ] = imgSrc;

                img.src = image.img;
                img.alt = image.description;            
                imgContainer.appendChild(img);

                title.textContent = name;
                descriptionPlanet.textContent = description;
            }

            menu.appendChild(itemNav);
        });

        const items = document.querySelectorAll('#menu a');

        items.forEach( item => {
            item.addEventListener('click', () => {
                
                // Se selecciona el item activo para proceder a desactivarlo
                const itemActive = document.querySelector('.active');
                itemActive.classList.toggle('active')
                
                // Se optiene la key del item al que se hizo click
                const keyItem = item.getAttribute('data_key');
                const planetCurrent = planets.find( ({key}) => key === keyItem);
                const { imgSrc, name, description } = planetCurrent;
                const [ image ] = imgSrc;

                img.src = image.img;
                img.alt = image.description;            
                imgContainer.appendChild(img);

                title.textContent = name;
                descriptionPlanet.textContent = description;


                item.classList.toggle('active');


            });
        });
    });
    
});

/* const promesa = new Promise((resolve, reject) => {
    setTimeout(() =>{
        //console.log('Se ha ejecutado después de 2 segundos.');
        //Cuando se resuelve la promesa en necesario llamar al resolve o al reject según sea el caso
        resolve('perro y gato');
    }, 2000);
});

//then => Lo que devuelve la promesa cuando se ejecuta satisfactoriamente
//cath => Lo que devuelve la promesa cuando ha ocurrido un error


promesa.then((perro) => {
    console.log('La promesa se ha resuelto y se da respuesta usando el then.',perro);
}); */

