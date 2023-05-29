console.log("Welcome to Spotify");

//Initialize the Variables
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay=document.getElementById('playButton');
let gif=document.getElementById('gif');
let myProgessBar=document.getElementById('myProgressBar');
let smallPlay=document.getElementById('smallPlay');
let songs=[
    {songName: "Whatever it Takes - Imagine Dragons", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Radioactive - Imagine Dragons", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "E.T. - Katy Perry", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "We Found Love - Rihanna", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "I Bet My Life - Imagine Dragons", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "X Gon' Give It To Ya - DMX", filePath: "songs/6.mp3", coverPath: "covers/6.jpg"},
    {songName: "Rap God - Eminem", filePath: "songs/7.mp3", coverPath: "covers/7.jpg"},
    {songName: "Godzilla - Eminem", filePath: "songs/8.mp3", coverPath: "covers/8.jpg"},
    {songName: "Angel Of The Morning - Juice Newton", filePath: "songs/9.mp3", coverPath: "covers/9.jpg"},
    {songName: "Symphony - Clean Bandit", filePath: "songs/10.mp3", coverPath: "covers/10.jpg"},
]



// audioElement.play();

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        document.getElementById(`${songIndex}`).classList.remove('fa-circle-play');
        document.getElementById(`${songIndex}`).classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();        
        document.getElementById(`${songIndex}`).classList.remove('fa-circle-pause');
        document.getElementById(`${songIndex}`).classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate',()=>{
    //Update Seekbar
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;    
});

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    
    element.addEventListener('click',(e)=>{
        // console.log(e.target);
        if(songIndex==e.target.id && audioElement.paused){
        audioElement.play();
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else if(songIndex==e.target.id && audioElement.played){
        audioElement.pause();
        e.target.classList.remove('fa-circle-pause');
        e.target.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
    else{
        makeAllPlays();
        songIndex=parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src=`songs/${songIndex+1}.mp3`;
        audioElement.currentTime=0;
        document.getElementById('masterPlayName').innerHTML=songs[songIndex].songName;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');}
    })
})
document.getElementById('backward').addEventListener('click',()=>{
    makeAllPlays();
    songNo=songIndex+1;
    songPlay=songNo-1;
    audioElement.src=`songs/${songPlay}.mp3`;
    audioElement.currentTime=0;
    songIndex=songPlay-1;
    if(songIndex<=0){
        songPlay=1;
        audioElement.src=`songs/${songPlay}.mp3`;
        audioElement.currentTime=0;
        document.getElementById(songIndex).classList.remove('fa-circle-play')
        masterPlay.classList.remove('fa-circle-play');
        document.getElementById(songIndex).classList.add('fa-circle-pause')
        masterPlay.classList.add('fa-circle-pause');
        document.getElementById('masterPlayName').innerHTML=songs[songIndex].songName;
        audioElement.play();
        songIndex=0;
    }
    else{
    document.getElementById(`${songIndex}`).classList.remove('fa-circle-play')
    masterPlay.classList.remove('fa-circle-play');
    document.getElementById(`${songIndex}`).classList.add('fa-circle-pause')
    masterPlay.classList.add('fa-circle-pause');
    document.getElementById('masterPlayName').innerHTML=songs[songIndex].songName;
    audioElement.play();}
})
document.getElementById('forward').addEventListener('click',()=>{
    makeAllPlays();
    audioElement.src=`songs/${songIndex+2}.mp3`;
    audioElement.currentTime=0;
    songIndex-=1;
    if(songIndex>=9){
        songIndex=0;
        document.getElementById(0).classList.remove('fa-circle-play')
        masterPlay.classList.remove('fa-circle-play');
        document.getElementById(0).classList.add('fa-circle-pause')
        masterPlay.classList.add('fa-circle-pause');
        audioElement.play();
    }
    else{
    document.getElementById(`${songIndex}`).classList.remove('fa-circle-play')
    masterPlay.classList.remove('fa-circle-play');
    document.getElementById(`${songIndex}`).classList.add('fa-circle-pause')
    masterPlay.classList.add('fa-circle-pause');
    audioElement.play();}
})





