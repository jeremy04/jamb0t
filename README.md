# jamb0t
Project for jamb0t, the dubtrack.fm bot who jams


1) Clone git repo

2) Install node 0.12.0 (Stable might work as well)

3) Install dependencies:

    npm install

4) Run server:

    USERNAME={email or username} PASSWORD={password} ROOM={room} gulp

4a) If you get an error:

    Error: Cannot find module 'app/app'

4b) Fix node path to find app/app

    export NODE_PATH=:./:./app:./app/src:./app/src/server