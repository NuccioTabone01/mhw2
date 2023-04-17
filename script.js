
function answer(risposta){
    const domandaN = risposta.dataset.questionId;
    risposte[domandaN] = risposta.dataset.choiceId;
    console.log(risposte);
}

function selected(risposta){
    
    const boxes = risposta.parentNode.querySelectorAll(".choice-grid div")
    
    for(let box of boxes){
        if(box !== risposta){ //non selezionati
           
            box.classList.add("unSelected");
            box.classList.remove("selected");
            const uncheckbox = box.querySelector(".checkbox");
            uncheckbox.src= "images/unchecked.png";
        }
    
        else{ //selezionato
         const checkbox = box.querySelector(".checkbox");
         checkbox.src = "images/checked.png" ;
         risposta.classList.add("selected");
         risposta.classList.remove("unSelected");
         
        }
        
    }

}




function onClick(event)
{   
    const risposta = event.currentTarget;
    answer(risposta);
    selected(risposta);
    
    if (terminato()){
       
        termina();

        const ricomincia = document.querySelector("#risultato button");
        ricomincia.addEventListener('click', ricomincia);
    }
    event.stopPropagation();


}

function terminato(){
    console.log("contenitore mappa:  " + Object.keys(risposte).length)
    return Object.keys(risposte).length === 3;
}

function stampaRisultato(){
    let conta = {};
    const values=Object.values(risposte);
    console.log("il values è " + values);
    let maxValue = risposte["one"];
    
    for(let value of values){
        if(conta[value]=== undefined){
            conta[value]=0;
        }    

        conta[value]++;
        
        if(conta[value]>conta[maxValue]){
            maxValue=value; 
        }
    }
    return maxValue;

}

function riavvia(event){
    const box = event.currentTarget;
    window.scrollTo({top:0});
    event.stopPropagation();
    const boxes = document.querySelectorAll(".choice-grid div");
    for(const box of boxes){
        box.classList.remove("selected", "unSelected");
        const uncheckbox = box.querySelector(".checkbox");
        uncheckbox.src= "images/unchecked.png";
        box.addEventListener('click',onClick);
    }
    
    const button = document.querySelector("#risultato");
    button.classList.add("hidden");
    risposte = {} ;
    console.log("lunghezza mappa = " + Object.keys(risposte).length);
    box.addEventListener('click', onClick);
    

}

function termina(){
    const boxes =  document.querySelectorAll(".choice-grid div");
    for(const box of boxes){
       box.removeEventListener("click", onClick);
    }

    const mostrarisultati = document.querySelector("#risultato");
    mostrarisultati.classList.remove("hidden");
    const risultato = stampaRisultato();
    const titolo = document.querySelector("#risultato h1")
    titolo.textContent = RESULTS_MAP[risultato].title;
    const contenuto = document.querySelector("#risultato div");
    contenuto.textContent = RESULTS_MAP[risultato].contents;
    window.scrollTo(0, document.body.scrollHeight);
}


let risposte={}; 
const boxes = document.querySelectorAll(".choice-grid div");
for(const box of boxes)
{
    box.addEventListener('click', onClick);
}

const bottone = document.querySelector("#risultato button");
bottone.addEventListener('click', riavvia);

