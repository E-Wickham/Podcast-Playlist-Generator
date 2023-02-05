console.log("LOADED");

//Feeds

// https://allorigins.win/
//Build a heroku app with this tech

const bst = "https://feeds.buzzsprout.com/972934.rss";
const kino = 'https://feeds.buzzsprout.com/226175.rss';
const tech = 'https://feeds.buzzsprout.com/1004689.rss';
const aa = 'https://albertaadvantage.libsyn.com/rss'
const haus = 'https://api.allorigins.win/raw?url=https://feeds.transistor.fm/haus-of-decline';
const darts = 'https://api.allorigins.win/raw?url=https://www.dartsandletters.ca/feed/podcast/';
const iNews = 'https://feed.podbean.com/imperialnews/feed.xml';
const alien = 'https://rss.art19.com/its-probably-not-aliens';
const bad = 'https://api.allorigins.win/raw?url=https://feed.podbean.com/badandbpod/feed.xml';
const harb = 'https://api.allorigins.win/raw?url=https://www.spreaker.com/show/4998079/episodes/feed';
const offc = 'https://api.allorigins.win/raw?url=http://jrs-as.com/tmr/podcast/oc/oc_rss.xml';
const hose = 'https://feeds.buzzsprout.com/1938862.rss';
const inv = 'https://feed.podbean.com/invisibleinstitutions/feed.xml';
const plbck = 'https://feed.podbean.com/pullback/feed.xml';
const grnMj = 'https://api.allorigins.win/raw?url=https://feeds.soundcloud.com/users/soundcloud:users:121527503/sounds.rss';

// ADDED NOVEMBER 16 2022
const rep = 'https://anchor.fm/s/6a01c010/podcast/rss';
const lft = 'https://feeds.buzzsprout.com/1719382.rss';
const press = 'https://feeds.buzzsprout.com/2065306.rss';
const progAb = 'https://feeds.zencastr.com/f/9CGzfgzm.rss';
const cpjme = 'https://feeds.buzzsprout.com/1882083.rss';
const swt = 'https://sweaterweather.libsyn.com/rss';
const mpl = 'https://feeds.buzzsprout.com/1839736.rss';

const spac = 'https://api.allorigins.win/raw?url=https://feeds.soundcloud.com/users/soundcloud:users:233628346/sounds.rss';
const itfr = 'https://api.allorigins.win/raw?url=https://isthisforreal.ca/podcast?format=rss'
let playlist = [];


//get functions

function showGet(show) {
    const request = new XMLHttpRequest();


    request.addEventListener('readystatechange', () => {
        if(request.readyState === 4) {
            let resp = request.responseText;
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(resp,"text/xml");
            var eps = xmlDoc.getElementsByTagName("item");
            let channel = xmlDoc.getElementsByTagName('channel');
            let show = channel[0].getElementsByTagName('title')[0].innerHTML;
            let showDesc = channel[0].getElementsByTagName('description')[0].textContent;            
            let art = channel[0].getElementsByTagName('itunes:image')[0].attributes.href            
            let ep5 = [];
            for (let i = 0; i < 4; i++) {
                //take the items from below, iteratively place them into a dict item and push into an array
                let epTitle = eps[i].querySelector('title').textContent;
                let epDate = eps[i].querySelector('pubDate').textContent;
                let epURL = eps[i].querySelector('enclosure').getAttribute('url');
                let epDur = eps[i].querySelector('enclosure').getAttribute('length');
                let showNotes = eps[i].getElementsByTagName('description')[0].textContent

                //set if statement (if arg is just num use itunes:duration else use enclosure attr)
                //var re = new RegExp("[0-9]");
                //if (re.test(ln)) {
                    //epDur = eps[i].querySelector('enclosure').getAttribute('length');
                //} else {
                    //epDur = eps[i].querySelector('enclosure').getAttribute('url');
                //}
                
                epItem = {
                            'show' : show,
                            'showDesc' : showDesc,
                            'title' :epTitle,
                            'date': epDate,
                            'url': epURL,
                            'time' : epDur,
                            'art' : art,
                            'showNotes' : showNotes
                }
                ep5.push(epItem);
                
            }
        playlist.push(ep5)
        }

    });

    request.open('GET', show);
    request.send();



}

function find(show) {
    const request = new XMLHttpRequest();

    request.addEventListener('readystatechange', () => {
        if(request.readyState === 4) {
            let resp = request.responseText;
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(resp,"text/xml");
            var eps = xmlDoc.getElementsByTagName("item");
            let channel = xmlDoc.getElementsByTagName('channel');
            let art = channel[0].getElementsByTagName('itunes:image')[0].attributes.href
            let show = channel[0].getElementsByTagName('title')[0].innerHTML;
            let showDesc = channel[0].getElementsByTagName('description')[0].textContent;

            let ep5 = [];
            //console.log(eps)
            for (let i = 0; i < 4; i++) {
                //take the items from below, iteratively place them into a dict item and push into an array
                let items = eps[i];
                let epURL = eps[i].querySelector('enclosure').getAttribute('url');
                let ep = epURL;
                console.log(ep)
                console.log(epURL)

                //console.log(eps[i].getElementsByTagName('description')[0].textContent)
            }
        
        }

    });
    request.open('GET', show);
    request.send();
}

//maybe also pass in the showArray variable as an arg?
function bigGet(callback,callback2){
    let showArray = [itfr,grnMj,spac,bst,kino,tech,iNews,alien,darts,aa,haus,bad,harb,offc,hose,inv,plbck,rep,lft,press,progAb,cpjme,swt,mpl]
    
    for(let i=0; i<showArray.length; i++) {
        try{
            showGet(showArray[i]);
            console.log('Episodes loaded for: ' + showArray[i] )
        }
        catch(err) {
            console.log('Error on: ' + showArray[i]);
        }

    }
    
    setTimeout(callback,2000)
    setTimeout(callback2,2500)
}

// set some sort of on load or timeout function to wait for the arrays to stop loading
let playlistArray = []
let plNum = 0;
function playListCreate() {
    for(let i=0; i < playlist.length; i++){
        for(let k=0; k < 4; k++)
            playlistArray.push(playlist[i][k]);
    }
    playlistArray.sort(() => Math.random() - 0.5)
    console.log(playlistArray)

}
/*
setTimeout(function() {
    for(let i=0; i < playlist.length; i++){
        for(let k=0; k < 4; k++)
            playlistArray.push(playlist[i][k]);
    }
    
  }, 400);

//randomize items in the playlist
let plNum = 0;
  setTimeout(function() {
    playlistArray.sort(() => Math.random() - 0.5)
    console.log(playlistArray)
  }, 410);
*/

//attempt to get first audio on playlist playing
function epLoad(){
    let audioSrc = document.getElementsByTagName("audio");
        audioSrc[0].src = playlistArray[plNum]["url"];

    let audioEpTitle = document.getElementById("showTitle");
        audioEpTitle.innerHTML = playlistArray[plNum]['title']

    let audioEpTitle2 = document.getElementsByClassName("pl-ep-title")[0];
        audioEpTitle2.innerHTML = playlistArray[plNum]['title'];   

    let audioImg = document.getElementById("pod-art")
    let audioImg2 = playlistArray[plNum]['art'].value
        audioImg.src = audioImg2

    let audioPodName = document.getElementById("showName")
    let audioPodName2 = document.getElementsByClassName("pl-title")[0];
        audioPodName2.innerHTML = playlistArray[plNum]['show']
        audioPodName.innerHTML = playlistArray[plNum]['show']

    let audioPubDate = document.getElementsByClassName("pl-pubDate")[0];
        audioPubDate.innerHTML = playlistArray[plNum]['date']

    let aboutShow = document.getElementById("showAbout");
        aboutShow.innerHTML = `<h4>About ${playlistArray[plNum]['show']}: </h4><div> ${playlistArray[plNum]['showDesc']}</div>`

   // let aboutEp = document.getElementById("showNotes");
        //aboutEp.innerHTML = playlistArray[plNum]['showNotes']

}

setTimeout(epLoad, 3000);

let epDurDiv = document.getElementById('episode_duration');

//Next audio 
nxtBtn = document.getElementById("nextep");
nxtBtn.addEventListener('click', function(){
    plNum+=1;
    if(plNum > playlistArray.length) {
        plNum = 0;
        epDurDiv.innerHTML = "/";

        epLoad();
    } else {
        epLoad();
        epDurDiv.innerHTML = "/";
    }
})
//Previous audio 
prevBtn = document.getElementById("prevep");
prevBtn.addEventListener('click', function(){
    plNum-=1;
    if(plNum < 0) {
        plNum = 0;
        epLoad();
        epDurDiv.innerHTML = "/";
    } else {
        epLoad();
        epDurDiv.innerHTML = "/";
    }
})


bigGet(playListCreate,epLoad)
