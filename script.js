const playlists = [
  { name: "Juice WRLD", artist: "Juice WRLD", cover: "assets/covers/juicewrld.jpg", songs: [
      { title: "Lucid Dreams", artist: "Juice WRLD", duration: "3:59", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" },
      { title: "All Girls Are the Same", artist: "Juice WRLD", duration: "2:46", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
      { title: "Robbery", artist: "Juice WRLD", duration: "4:00", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" }
  ]},
  { name: "Nettspend", artist: "Nettspend", cover: "assets/covers/nettspend.jpg", songs: [
      { title: "Money Flow", artist: "Nettspend", duration: "3:21", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3" },
      { title: "Swipe Life", artist: "Nettspend", duration: "2:58", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
      { title: "Reload", artist: "Nettspend", duration: "3:34", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3" }
  ]},
  { name: "Delta", artist: "Twikipedia", cover: "assets/covers/delta.jpg", songs: [
      { title: "Terminal Velocity", artist: "Twikipedia", duration: "3:40", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" },
      { title: "Delta Waves", artist: "Twikipedia", duration: "4:12", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
      { title: "Flight Path", artist: "Twikipedia", duration: "3:50", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" }
  ]}
];

document.addEventListener("DOMContentLoaded", () => {
  renderPlaylistCards();
  renderSidebarPlaylists();
});

function renderPlaylistCards() {
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `<div class="playlist-grid">${playlists.map((pl, index) => `
      <div class="playlist-card" onclick="renderPlaylistView(${index})">
        <img src="${pl.cover}" alt="${pl.name} cover">
        <h3>${pl.name}</h3>
        <p>${pl.artist}</p>
      </div>`).join("")}</div>`;
}

function renderSidebarPlaylists() {
  const listContainer = document.querySelector(".lists ul");
  listContainer.innerHTML = playlists.map((pl, index) => `<li onclick="renderPlaylistView(${index})">${pl.name}</li>`).join("");
}

function renderPlaylistView(index) {
  const pl = playlists[index];
  const mainContent = document.getElementById("main-content");
  mainContent.innerHTML = `<div class="playlist-header">
      <img src="${pl.cover}" alt="${pl.name} cover" class="playlist-cover-large">
      <div><h2>${pl.name}</h2><p>By ${pl.artist}</p>
        <button class="play-btn" onclick="playTrack(${index}, 0)">Play</button>
      </div></div>
    <table class="track-list"><tbody>
      ${pl.songs.map((song, songIndex) => `
        <tr onclick="playTrack(${index}, ${songIndex})">
          <td>${songIndex + 1}</td>
          <td>
            <div class="track-info">
              <strong>${song.title}</strong><br>
              <span>${song.artist}</span>
            </div>
          </td>
          <td class="duration">${song.duration}</td>
        </tr>`).join("")}
    </tbody></table>`;
}

function playTrack(playlistIndex, songIndex) {
  const song = playlists[playlistIndex].songs[songIndex];

  document.querySelector(".current-song p").textContent = song.title;
  document.querySelector(".current-song img").src = playlists[playlistIndex].cover;

  let audio = document.getElementById("audio-player");
  if (!audio) {
    audio = document.createElement("audio");
    audio.id = "audio-player";
    document.body.appendChild(audio);
  }
  audio.src = song.src;
  audio.play();
}
