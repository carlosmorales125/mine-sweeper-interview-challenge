import React, { useEffect, useState } from 'react';
import GameTile from './game-tile';
import axios from 'axios';

const MainGame = () => {
    const [gameId, setGameId] = useState('');
    const [localGameTiles, setLocalGameTiles] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const gameUrl = 'http://fathomless-peak-55967.herokuapp.com/games/';
                const data = '{"height": 10, "width": 10, "count": 10}';
                const game = await axios.post(gameUrl, data);

                if (game?.data?.game?.id) {
                    const tempArray = [];
                    let x = 0;
                    let y = 0;
                    setGameId(game.data.game.id);
                    for (let i = 0; i < (game.data.game.height * game.data.game.width); i++) {
                        if (y === game.data.game.width) {
                            y = 0;
                            x++;
                        }
                        const tile = {
                            id: i,
                            x: x,
                            y: y,
                            displayNumber: ''
                        };
                        tempArray.push(tile);
                        y++;
                    }
                    setLocalGameTiles(tempArray);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const handleGameTileClick = async (data) => {
        const { x, y } = data;
        const revealUrl = `http://fathomless-peak-55967.herokuapp.com/games/${gameId}/reveal`;
        const revealCords = { x, y };

        try {
            const revealData = await axios.post(revealUrl, revealCords);
            console.log(revealData.data.cells);
            if (revealData?.data?.status === 'ok') {
                let newLocalTiles = [...localGameTiles];
                if (revealData.data.cells.length === 1) {
                    newLocalTiles = localGameTiles.map(tile => {
                        if (tile.x === x && tile.y === y) {
                            tile.displayNumber = `${revealData.data.cells[0].count}`;
                            return tile;
                        }
                        return tile;
                    });
                }
                setLocalGameTiles(newLocalTiles);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <main style={{display: 'flex', flexWrap: 'wrap', width: '250px', height: '250px'}}>
            {
                localGameTiles.map((tile, i) => <GameTile tileData={tile} handleGameTileClick={handleGameTileClick} key={`${i}-game-tile`} />)
            }
        </main>
    );
};

export default MainGame;