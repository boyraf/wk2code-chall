import React, { useEffect, useState } from "react";

function BotCollection({ onEnlistBot, onBotRelease }) {
    const [bots, setBots] = useState([]);
  
    useEffect(() => {
      fetch('http://localhost:3000/bots')
      .then(response => response.json())
      .then(data => setBots(data))
      .catch(error => console.error(error));
      }, []);
  

    useEffect(() => {
      setBots(bots => bots.filter(bot => !onBotRelease || !onBotRelease(bot.id)));
      }, [onBotRelease]); 
  
    const handleEnlist = (bot) => {
      onEnlistBot(bot);
      };
        
 
    return (
      <div>
        <h2>Bot Collection</h2>
        
        <div className="container">
        <div className="bot-card">
          {bots.map((bot) => (
            <li key={bot.id}>
              <img src={`${bot.avatar_url}`} alt={`${bot.bot_class}`}/>
              <ul >
            <li><span>Name:{bot.name}</span></li>
            <li><span>Health:{bot.health}</span></li>
            <li><span>Damage:{bot.damage}</span></li>
            <li><span>Armor{bot.armor}</span></li>
            <li><span>Class:{bot.bot_class}</span></li>
            <li><span>catchphrase:{bot.catchphrase}</span></li>
            </ul>
              {bot.enlisted ? (
                <button disabled>Enlisted</button>
              ) : (
                <button onClick={() => handleEnlist(bot.id)}>Enlist</button>
              )}
            </li>
          ))}
        </div>
        </div>
      </div>
    );
  }
  
  export default BotCollection; 
