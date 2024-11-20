const basamakSayisiInput = document.getElementById("basamakSayisiInput")
const tahminiHesapSuresi1 = document.getElementById("tahminiHesapSuresi1")
const basamakSayisi = document.getElementById("basamakSayisi")
const hesapSuresi = document.getElementById("hesapSuresi")
const tahminiHesapSuresi2 = document.getElementById("tahminiHesapSuresi2")
const tahminiHesapYanilma = document.getElementById("tahminiHesapYanilma")
const result = document.getElementById("result")
const hesaplaButon = document.getElementById("hesaplaButon")

const estimatedSecond = document.getElementById("estimatedSecond")
const calcInfo = document.getElementById("calcInfo")
const resultDiv = document.getElementById("resultDiv")


hesaplaButon.addEventListener("click",hesapla)
basamakSayisiInput.addEventListener("keypress",(e)=>{
    if(e.key == "Enter"){
        hesapla()
    }
})



let sonuc = ""
async function hesapla() {
    if(basamakSayisiInput.value == ""){
        alert("Lütfen geçerli bir basamak sayısı giriniz.")
    }
    else{
        calcInfo.style.display = "none"
        resultDiv.style.display = "none"
        estimatedSecond.style.display = "block"
        let kacBasamak = Number(basamakSayisiInput.value)
        basamakSayisiInput.value = ""
        let tahminiHesapSuresi = (kacBasamak * 0.085).toFixed(3)
        tahminiHesapSuresi1.innerText = tahminiHesapSuresi +  " Saniye"
        const start = performance.now()
        for(let i = 0; i< kacBasamak; i++){
            sonuc += await(await((await fetch(`https://api.pi.delivery/v1/pi?start=${i}&numberOfDigits=1&radix=10`)).json())).content
        }
        estimatedSecond.style.display = "none"
        calcInfo.style.display = "block"
        resultDiv.style.display = "block"
        result.innerText = sonuc
        basamakSayisi.innerText = `${sonuc.length} Basamak`
        const end = performance.now()
        let hesaplamaSuresi = (Math.round(end-start)/1000).toFixed(3)
        hesapSuresi.innerText =  hesaplamaSuresi + " Saniye"
        tahminiHesapSuresi2.innerText = tahminiHesapSuresi +  " Saniye"
        tahminiHesapYanilma.innerText = Math.abs((Number(tahminiHesapSuresi)*1000-Number(hesaplamaSuresi)    *1000)/1000) + " Saniye"
    }
    
}

function copyResult(){
    navigator.clipboard.writeText(result.innerText)
}