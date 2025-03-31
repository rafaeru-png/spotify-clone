document.addEventListener('DOMContentLoaded', function() {
    // Elementos
    const audioPlayer = document.getElementById('audioPlayer');
    const playBtn = document.getElementById('playBtn');
    const currentTrackCover = document.getElementById('currentTrackCover');
    const currentTrackName = document.getElementById('currentTrackName');
    const currentTrackArtist = document.getElementById('currentTrackArtist');
    const progressFill = document.querySelector('.progress-fill');
    const progressTrack = document.querySelector('.progress-track');
    const playlistContainer = document.getElementById('playlistContainer');
    const featuredPlaylists = document.getElementById('featuredPlaylists');
    const recentTracks = document.getElementById('recentTracks');

    // Estado do player
    let isPlaying = false;
    let currentTrackIndex = 0;

    // Dados das músicas (simulando API)
    const musicData = {
        playlists: [
            {
                id: 1,
                name: "Daily Mix 1",
                description: "Made for you",
                cover: "assets/images/playlist1.jpg",
                tracks: [
                    { id: 1, name: "Blinding Lights", artist: "The Weeknd", file: "assets/songs/song1.mp3" },
                    { id: 2, name: "Save Your Tears", artist: "The Weeknd", file: "assets/songs/song2.mp3" }
                ]
            },
            {
                id: 2,
                name: "Discover Weekly",
                description: "Your weekly mixtape",
                cover: "assets/images/playlist1.jpg",
                tracks: [
                    { id: 3, name: "Levitating", artist: "Dua Lipa", file: "assets/songs/song1.mp3" },
                    { id: 4, name: "Don't Start Now", artist: "Dua Lipa", file: "assets/songs/song2.mp3" }
                ]
            }
        ],
        recentlyPlayed: [
            { id: 5, name: "Watermelon Sugar", artist: "Harry Styles", cover: "assets/images/playlist1.jpg", file: "assets/songs/song1.mp3" },
            { id: 6, name: "Adore You", artist: "Harry Styles", cover: "assets/images/playlist1.jpg", file: "assets/songs/song2.mp3" }
        ]
    };

    // Inicializa a página
    renderPlaylists();
    renderFeatured();
    renderRecentlyPlayed();

    // Event Listeners
    playBtn.addEventListener('click', togglePlay);
    audioPlayer.addEventListener('timeupdate', updateProgress);
    progressTrack.addEventListener('click', seek);

    // Funções
    function renderPlaylists() {
        const playlists = [
            "Músicas Curtidas",
            "Playlist 1",
            "Playlist 2",
            "Playlist 3"
        ];

        playlistContainer.innerHTML = playlists.map(playlist => 
            `<li>${playlist}</li>`
        ).join('');
    }

    function renderFeatured() {
        featuredPlaylists.innerHTML = musicData.playlists.map(playlist => `
            <div class="playlist-card" data-id="${playlist.id}">
                <img src="${playlist.cover}" alt="${playlist.name}">
                <h3>${playlist.name}</h3>
                <p>${playlist.description}</p>
            </div>
        `).join('');

        // Adiciona evento de clique para as playlists
        document.querySelectorAll('.playlist-card').forEach(card => {
            card.addEventListener('click', function() {
                const playlistId = parseInt(this.dataset.id);
                const playlist = musicData.playlists.find(p => p.id === playlistId);
                loadPlaylist(playlist);
            });
        });
    }

    function renderRecentlyPlayed() {
        recentTracks.innerHTML = musicData.recentlyPlayed.map(track => `
            <div class="track-item" data-id="${track.id}">
                <img src="${track.cover}" alt="${track.name}">
                <div class="track-info">
                    <h4>${track.name}</h4>
                    <p>${track.artist}</p>
                </div>
            </div>
        `).join('');

        // Adiciona evento de clique para as músicas recentes
        document.querySelectorAll('.track-item').forEach(item => {
            item.addEventListener('click', function() {
                const trackId = parseInt(this.dataset.id);
                const track = [...musicData.playlists.flatMap(p => p.tracks), ...musicData.recentlyPlayed].find(t => t.id === trackId);
                playTrack(track);
            });
        });
    }

    function loadPlaylist(playlist) {
        // Aqui você carregaria a playlist selecionada
        console.log("Playlist carregada:", playlist.name);
        // Implementação real iria carregar as músicas na interface
    }

    function playTrack(track) {
        currentTrackCover.src = track.cover || "assets/images/playlist1.jpg";
        currentTrackName.textContent = track.name;
        currentTrackArtist.textContent = track.artist;
        audioPlayer.src = track.file;
        audioPlayer.play();
        isPlaying = true;
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }

    function togglePlay() {
        if (audioPlayer.src) {
            if (isPlaying) {
                audioPlayer.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            } else {
                audioPlayer.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            }
            isPlaying = !isPlaying;
        } else {
            // Se não houver música carregada, toca a primeira da lista
            const firstTrack = musicData.playlists[0].tracks[0];
            playTrack(firstTrack);
        }
    }

    function updateProgress() {
        const { currentTime, duration } = audioPlayer;
        const progressPercent = (currentTime / duration) * 100;
        progressFill.style.width = `${progressPercent}%`;
        
        // Atualiza o tempo atual e total (simplificado)
        const timeDisplay = document.querySelectorAll('.progress-bar span');
        timeDisplay[0].textContent = formatTime(currentTime);
        timeDisplay[1].textContent = formatTime(duration);
    }

    function seek(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audioPlayer.duration;
        audioPlayer.currentTime = (clickX / width) * duration;
    }

    function formatTime(seconds) {
        if (isNaN(seconds)) return "0:00";
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
});