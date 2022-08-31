import React from 'react';

const GameTile = (props) => {
    const {
        tileData,
        handleGameTileClick
    } = props || {};

    let styles = {height: '23px', width: '23px', border: 'solid 1px black', backgroundColor: 'grey'};

    
    const handleClick = () => {
        handleGameTileClick(tileData);
    };

    return (
        <div
            onClick={handleClick} 
            style={{height: '23px', width: '23px', border: 'solid 1px black', backgroundColor: 'grey'}}>
                { `${tileData.displayNumber}` }
        </div>
    );
};

export default GameTile;
