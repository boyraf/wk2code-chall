import React, { useEffect, useState } from "react";

function BotCollection({ onEnlistBot, onCreateBot }) {
    const [bots, setBots] = useState([]);
  
    useEffect(() => {
      async function fetchBots() {
        const response = await fetch("http://localhost:3000/bots");
        const data = await response.json();
        setBots(data);
      }
      fetchBots();
    }, []);
  
    const handleEnlistBot = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/bots/${id}/enlist`, {
          method: "PUT",
        });
    
        if (response.ok) {
          const updatedBot = await response.json();
          setBots((prevBots) =>
            prevBots.map((bot) =>
              bot.id === updatedBot.id ? { ...bot, enlisted: true } : bot
            )
          );
          onEnlistBot(updatedBot);
        } else {
          console.log(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.log(`Error: ${error.message}`);
      }
    };
    
    
    
  
    const handleCreateBot = async () => {
      const response = await fetch("http://localhost:3000/bots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: "New Bot" }),
      });
      if (response.ok) {
        const newBot = await response.json();
        setBots((prevBots) => [...prevBots, newBot]);
        onCreateBot(newBot);
      }
    };
  
    return (
      <div>
        <h2>Bot Collection</h2>
        <button onClick={handleCreateBot}>Create New Bot</button>
        <div className="container">
        <div className="bot-card">
          {bots.map((bot) => (
            <li key={bot.id}>
              <img src={`${bot.avatar_url}`} alt={`${bot.bot_class}`}/>
            <span>Name:{bot.name}</span>
            <span>Health:{bot.health}</span>
            <span>Damage:{bot.damage}</span>
            <span>Armor{bot.armor}</span>
            <span>Class:{bot.bot_class}</span>
            <span>catchphrase:{bot.catchphrase}</span>
              {bot.enlisted ? (
                <button disabled>Enlisted</button>
              ) : (
                <button onClick={() => handleEnlistBot(bot.id)}>Enlist</button>
              )}
            </li>
          ))}
        </div>
        </div>
      </div>
    );
  }
  
  export default BotCollection; 
